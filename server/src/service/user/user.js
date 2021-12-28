import Debug from 'debug';
import { createRedisClient } from '../../redis/redis-client.js';
import { createNewIdentity, createUserSecretHash } from './identity.js';

const debug = Debug('service:user');

/*
  This is a BIG little secret, but this app uses the same in-memory DB instance
  for pseudo-persistent auth storage because I just don't give a flying fuck about
  this implementation detail for prototype and too lazy to spin up a proper instance relation DB
  just for MVP.

  Also its actual persistence might cost me a penny.
 */
const dbConnection = createRedisClient(
  process.env.SESSION_REDIS_USE_HTTPS ? 'rediss' : 'redis',
  process.env.SESSION_REDIS_USER,
  process.env.SESSION_REDIS_PASS,
  process.env.SESSION_REDIS_HOST,
  process.env.SESSION_REDIS_PORT,
);

export async function registerUserIdentity(email, password) {
  const { id, hash } = await createNewIdentity(password);
  const userData = {
    email,
    customData: undefined,
  };

  await addUser(id, hash, userData);

  // getUserData(id)
  return [id, userData];
}

async function addUser(id, hash, userData) {
  await Promise.all([
    dbConnection.set(`hash-id:${hash}`, id),
    dbConnection.set(`user-id:${userData.email}`, id),
    dbConnection.set(`user:${id}`, JSON.stringify(userData)),
  ]);
}

export async function updateUserData(id, userData) {
  await dbConnection.set(`user:${id}`, JSON.stringify(userData));
}

export async function getUserData(id) {
  if (id) {
    return JSON.parse(await dbConnection.get(`user:${id}`));
  } else {
    return null;
  }
}

export async function findAuthenticIdentity(email, password) {
  // find random-generated salt associated with the string
  const userId = await findIdentity(email);

  if (userId) {
    debug('Found user:', userId);
    // is registered
    if (await checkIdentityAuthenticity(userId, password)) {
      return userId;
    }
    // not authentic identity
    debug('User not authenticated:', email, password);
  } else {
    // user do not exist
    debug('User not found for auth:', email);
  }

  return null;
}

export async function findIdentity(email) {
  return dbConnection.get(`user-id:${email}`);
}

export async function checkIdentityAuthenticity(userId, password) {
  const identityHash = await createUserSecretHash(userId, password);

  // find ID associated with hashed identity
  const identityId = await dbConnection.get(`hash-id:${identityHash}`);

  // if found, then it most likely a hit. But check the ID equality for hash collision
  return identityId === userId;
}
