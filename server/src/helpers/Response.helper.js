const successRes = (res, data) => {
    return res.status(200).json(data);
};

const errorRes = (res, status, errorMessage) => {
    errorMessage = errorMessage || 'Something went wrong...';

    return res.status(status).json({ message: errorMessage });
};

module.exports = {
    successRes,
    errorRes
};
