import dotenv from 'dotenv';
import Debug from 'debug';

const debug = Debug('env-setup');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
  debug('env=', process.env.NODE_ENV);
  dotenv.config();
}

const { NODE_ENV, PORT, SESSION_REDIS_HOST, SESSION_REDIS_PORT, SESSION_REDIS_USER, SESSION_REDIS_PASS } = process.env;

console.table({
  NODE_ENV,
  PORT,
  SESSION_REDIS_HOST,
  SESSION_REDIS_PORT,
  SESSION_REDIS_USER,
  SESSION_REDIS_PASS,
});
