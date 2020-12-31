const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UsersController');

router.get('/users', UserController.index);
router.get('/user/:id', UserController.show);
router.get('/user/:id/events', UserController.userEvents);
router.post('/user', UserController.create);
router.post('/user/:id/event', UserController.createEvent);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.destroy);

module.exports = router;
