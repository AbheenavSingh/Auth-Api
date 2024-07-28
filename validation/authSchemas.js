const Joi = require('joi');

const signupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email(({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })).required(),
  password: Joi.string().min(6).required(),
});

const signinSchema = Joi.object({
  email: Joi.string().email(({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })).required(),
  password: Joi.string().required(),
});

const resetPasswordRequestSchema = Joi.object({
  email: Joi.string().email(({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })).required(),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  signupSchema,
  signinSchema,
  resetPasswordRequestSchema,
  resetPasswordSchema
};
