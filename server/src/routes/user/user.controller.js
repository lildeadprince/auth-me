import { findAuthenticIdentity } from '../../service/user/index.js';
import { registerUserIdentity } from '../../service/user/user.js';

export async function loginUser({ username, password }) {
  return findAuthenticIdentity(username, password);
}

export async function registerUser({ username, password }) {
  return registerUserIdentity(username, password);
}
