import { findAuthenticIdentity, updateUserData } from '../../service/user/index.js';
import { registerUserIdentity } from '../../service/user/user.js';

export async function loginUser({ email, password }) {
  return findAuthenticIdentity(email, password);
}

export async function registerUser({ email, password }) {
  return registerUserIdentity(email, password);
}

export async function updateUser(user, customData) {
  const userData = {
    email: user.email,
    customData,
  };
  await updateUserData(user.id, userData);

  // fetch just updated value
  // totally unnecessary call, but just for fun and consistency
  // return getUserData(user.id);
  return userData;
}
