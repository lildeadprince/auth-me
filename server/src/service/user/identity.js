import crypto from 'crypto';
import Debug from 'debug';

const debug = Debug('service:user:identity');

export async function createNewIdentity(secret) {
  const id = crypto.randomBytes(32).toString('hex');
  const hash = await createUserSecretHash(id, secret);

  return {
    id,
    hash,
  };
}

export async function createUserSecretHash(salt, secret) {
  debug('create hash', secret, salt);
  debug();
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(secret, salt, 10000, 64, 'sha3-256', (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.toString('hex'));
      }
    });
  });
}
