const validator = require('validator')

const validateSinUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName) {
        throw new Error("Please enter valid name")
    } else if(!validator.isEmail(emailId)) {
        throw new Error("Please give valid email!")
    } else if(!validator.isStrongPassword(password)) {
        throw new Error("Please give strong password")
    }
}

module.exports = {
    validateSinUpData
}