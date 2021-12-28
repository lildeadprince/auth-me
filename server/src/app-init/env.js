import dotenv from 'dotenv';
import Debug from 'debug';

const debug = Debug('env-setup');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
  debug('env=', process.env.NODE_ENV);
  dotenv.config();
}
// console.warn(JSON.stringify(process.env, null, 2));
