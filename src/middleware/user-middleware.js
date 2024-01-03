
const validateCreateUser = (req, res, next) => {
    if(
        !req.body.email ||
        !req.body.first_name ||
        !req.body.last_name
    ) {
        // if any of the body params is missing we come inside the if
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Invalid request body for create  contact',
            err: 'Missing mandatory properties to create a contact'
        });
    }

    next();
}

module.exports = {
    validateCreateUser
}