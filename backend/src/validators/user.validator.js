import Joi from 'joi';

export const updateUserSchema = Joi.object({
  role: Joi.string().valid('admin', 'analyst'),
  isActive: Joi.boolean()
}).min(1);
