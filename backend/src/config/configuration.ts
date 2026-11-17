import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),

  MONGO_URI: Joi.string().uri().required(),

  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES_IN: Joi.string().default('15m'),

  REFRESH_TOKEN_TTL_DAYS: Joi.number().default(30),
  COOKIE_SECURE: Joi.boolean().default(false),

  APP_URL: Joi.string().uri().default('http://localhost:3000'),

  ADMIN_EMAIL: Joi.string().email().lowercase(),
  ADMIN_PASSWORD: Joi.string().min(12),
}).and('ADMIN_EMAIL', 'ADMIN_PASSWORD');

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
  refreshToken: {
    ttlDays: 1, //parseInt(process.env.REFRESH_TOKEN_TTL_DAYS, 10) || 30
  },
  cookie: {
    secure: process.env.COOKIE_SECURE !== 'false',
  },
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
  appUrl: process.env.APP_URL,
});
