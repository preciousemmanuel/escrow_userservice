import Joi from 'joi';

const create= Joi.object({
    value:Joi.string().required(),

   

});

const verify= Joi.object({
    value:Joi.string().required(),
    codee:Joi.string().required().length(4),

   

})

export default {create,verify}