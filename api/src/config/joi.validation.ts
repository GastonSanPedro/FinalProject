import * as Joi from 'joi';

export const JoiValidationSchena = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3001)
})