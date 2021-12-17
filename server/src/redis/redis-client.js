import Redis from 'ioredis';

export function createRedisClient(protocol, user, pass, host, port) {
  const redisTarget = `${protocol}://${user}:${pass}@${host}:${port}`;
  return new Redis(redisTarget);
}
