import { load } from 'ts-dotenv';

export default load({
  JWT_PRIVATE_KEY: String,
  CORS_ALLOWED_ORIGINS: String,
  NODE_ENV: ['production' as const, 'development' as const, 'test' as const],
  SERVER_HOST: { type: String, optional: true, default: 'localhost' },
  SERVER_PORT: { type: Number, optional: true, default: 4001 },
  DB_HOST: { type: String, optional: true, default: 'db' },
  DB_PORT: { type: Number, optional: true, default: 5432 },
  DB_USER: { type: String, optional: true, default: 'postgres' },
  DB_PASS: { type: String, optional: true, default: 'postgres' },
  DB_NAME: { type: String, optional: true, default: 'postgres' },
  SMTP_HOST: { type: String, optional: true, default: 'in-v3.mailjet.com' },
  SMTP_PORT: { type: Number, optional: true, default: 465 },
  SMTP_USER: String,
  SMTP_PASS: String,
  EMAIL_FROM: { type: String, optional: true, default: 'contactwildrent@gmail.com' },
  FRONTEND_URL: String,
});
