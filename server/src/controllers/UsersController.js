const User = require('../models/User.model');
const UserEvent = require('../models/UserEvent.model');
const Event = require('../models/Event.model');
const dateformat = require('dateformat');
const _ = require('lodash');
const { successRes, errorRes } = require('../helpers/Response.helper');
const ObjectId = require('mongodb').ObjectID;

const findLastUserEventDate = (userEvents, events) => {
    const result = [];

    userEvents.forEach(userEvent => {
       const { startDate, _id } = events.find(event => event._id.toString() === userEvent.eventId);
       const { userId } = userEvents.find(ue => ue.eventId === _id.toString());

       if (!result.find(el => el.userId === userId)) {
           result.push({ startDate, userId });
       }
    });

    return result;
}

const index = async (req, res) => {
    const users = await User.find({}).lean();
    const userIds = users.map(el => el._id.toString());

    const usersEventsCount = await UserEvent.aggregate([
        { $match: { userId: { $in: userIds }}},
        { $group: { _id: '$userId', sum: { $sum: 1 }}}
    ]);

    const userEvents = await UserEvent.find({ userId: { $in: userIds } }).lean();
    const eventsIds = userEvents.map(el => ObjectId(el.eventId));

    const events = await Event.find({
        _id: { $in: eventsIds },
        startDate: { $gte: new Date() }
    }).sort({ startDate: 1 }).lean();

    const mappedUserEvents = events.map(event => {
        const filteredEvent = userEvents.find(ue => event._id.toString() === ue.eventId);

        return filteredEvent;
    })

    const usersLastStartDate = findLastUserEventDate(_.compact(mappedUserEvents), events);

    const mappedUsers = users.map(user => {
        let eventsSum;
        let usersStartDate;

        if (usersEventsCount.length !== 0) {
            eventsSum = usersEventsCount.find(el => el._id === user._id.toString());
            usersStartDate = usersLastStartDate.find(el => el.userId === user._id.toString());
        }

        user.userEvents = (eventsSum && eventsSum.sum) || 0;
        user.usersStartDate = (usersStartDate && dateformat(usersStartDate.startDate, 'dd.mm.yyyy')) || '-';
        user.userName = user.firstName + ' ' + user.lastName;

        return user;
    });

    return successRes(res, mappedUsers);
}

const userEvents = async (req, res) => {
    const { id } = req.params;

    const userEvents = await UserEvent.find({ userId: { $in: id } }).lean();
    const userEventsIds = userEvents.map(el => el.eventId);

    const events = await Event.find({ _id: { $in: userEventsIds } });

    const mappedEvents = events.map(event => {
        event.formattedStartDate = dateformat(event.startDate, 'dd.mm.yyyy');
        event.formattedEndDate = dateformat(event.endDate, 'dd.mm.yyyy');

        return event;
    });

    return successRes(res, mappedEvents);
}

const createEvent = async (req, res, next) => {
    const { title, description, startDate, endDate, userId } = req.body;

    const userEvents = await UserEvent.find({ userId: { $in: userId } }).lean();
    const userEventsIds = userEvents.map(el => el.eventId);

    if (userEventsIds.length) {
        const events = await Event.find({ _id: { $in: userEventsIds }} &&
            { startDate: { $gte: new Date(startDate), $lt: new Date(endDate) }} ||
            { endDate: { $gte: new Date(startDate), $lt: new Date(endDate) }});

        if (events.length) {
            return errorRes(res, 400, 'You can’t create event for this time');
        }
    }

    if (title && description && startDate && endDate && userId) {
        const event = await Event.create(req.body);

        const userEventParams = { eventId: event._id, userId: userId }

        if (event) { await UserEvent.create(userEventParams); }

        return successRes(res, event);
    }

    return errorRes(res, 400, 'Bad request');
}

const createUser = async(params) => {
    const { firstName, lastName, email, phoneNumber } = params;

    if (firstName && lastName && email && phoneNumber) {
        return await User.create(params);
    }

    const err = new Error('All fields are required!');
    err.status = 400;

    throw err;
}

const create = async (req, res) => {
    try {
        await createUser(req.body);

        return successRes(res);
    } catch (err) {
        return errorRes(res, err.code, err.message);
    }
};

const show = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: ObjectId(id) });

    if (user) return successRes(res, user);

    return errorRes(res, 404, 'User not found');
};

const update = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phoneNumber } = req.body;
    const attrs = {};

    if (firstName) attrs.firstName = firstName;
    if (lastName) attrs.lastName = lastName;
    if (email) attrs.email = email;
    if (phoneNumber) attrs.phoneNumber = phoneNumber;

    const user = await User.findOneAndUpdate({ _id: ObjectId(id) }, attrs);

    if (user) return successRes(res, { message: 'User updated successfully!' });

    return errorRes(res, 404, 'User not found');
};

const destroy = async (req, res) => {
    const { id } = req.params;

    if (!id) return errorRes(res, 400, 'Bad request');

    await User.deleteOne({ _id: ObjectId(id) });

    return successRes(res, { message: 'User deleted successfully!' });
};

module.exports = {
    index,
    create,
    show,
    update,
    destroy,
    createEvent,
    userEvents
};
