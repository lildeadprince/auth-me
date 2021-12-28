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
    id,
    email,
  };

  await addUser(id, hash, {
    id,
    email,
  });

  // return getUserData(id);
  return userData;
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
    const userData = await dbConnection.get(`user:${id}`);
    debug(typeof userData, 'user data', userData);
    return JSON.parse(userData);
  }
  return null;
}

export async function findAuthenticIdentity(email, password) {
  const user = await findIdentity(email);

  if (user) {
    if (await checkIdentityAuthenticity(user, password)) {
      return user;
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
  const userId = await dbConnection.get(`user-id:${email}`);
  return getUserData(userId);
}

export async function checkIdentityAuthenticity(user, password) {
  const identityHash = await createUserSecretHash(user.id, password);
  const identityId = await dbConnection.get(`hash-id:${identityHash}`);

  return identityId === user.id;
}
