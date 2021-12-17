import session from 'express-session';
import ConnectRedis from 'connect-redis';
import { createRedisClient } from '../redis/redis-client.js';

const { SESSION_REDIS_HOST, SESSION_REDIS_PORT, SESSION_REDIS_USER, SESSION_REDIS_PASS } = process.env;
const SESSION_REDIS_USE_HTTPS = process.env.SESSION_REDIS_USE_HTTPS === 'true';

export function redisSessionMiddleware() {
  const RedisSessionStore = ConnectRedis(session);
  const RedisSessionStoreConnection = new RedisSessionStore({
    client: createRedisClient(
      SESSION_REDIS_USE_HTTPS ? 'rediss' : 'redis',
      SESSION_REDIS_USER,
      SESSION_REDIS_PASS,
      SESSION_REDIS_HOST,
      SESSION_REDIS_PORT,
    ),
    ttl: 15 * 60, // 15 minutes
  });

  return session({
    store: RedisSessionStoreConnection,
    saveUninitialized: false,
    secret: 'the ca|<e is a 1ie',
    resave: false,
  });
}
