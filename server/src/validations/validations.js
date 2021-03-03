const Joi = require('@hapi/joi');

const validation_Register = Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: {allow:['com','net','org','edu','gov']}}).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    photo: Joi.string(),
    usertype: Joi.number().valid(1,2,3).required(),
    specialization: Joi.string().required()
});

module.exports = { validation_Register}