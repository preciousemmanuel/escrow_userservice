import Joi from 'joi';

const signup= Joi.object({
    name:Joi.string().required(),

    password:Joi.string().required(),

})

export default {signup}