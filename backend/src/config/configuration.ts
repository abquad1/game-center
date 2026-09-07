import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),

  MONGO_URI: Joi.string().uri().required(),

  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES_IN: Joi.string().default('15m'),

  APP_URL: Joi.string().uri().default('http://localhost:3000'),
});

export default () => ({
  nodeEnv: process.env.NODE_ENV,
  port: 3000, //parseInt(process.env.PORT, 10)
  database: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  appUrl: process.env.APP_URL,
});
