import { Router } from 'express';
import { userAuthRoute } from './user-auth.route.js';
import { updateUser } from './user.controller.js';
import { getUserData } from '../../service/user/index.js';

export const userRoute = new Router();

userRoute.use('/auth', userAuthRoute);

userRoute.use(sessionGuard);
userRoute.put('/data', handlePutUserData);
userRoute.get('/', handleGetUser);

async function handleGetUser(req, res, next) {
  try {
    // only session ID may be used in this case, because of session locality (2 browsers, 2 sessions, and only
    // "persistent" storage has the latest committed data)
    const userData = await getUserData(req.session.user.id);
    req.session.user = {
      ...req.session.user,
      ...userData,
    };

    res.send(userData);
  } catch (e) {
    next(e);
  }
}

function sessionGuard(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

async function handlePutUserData(req, res, next) {
  try {
    const updatedUser = await updateUser(req.session.user, req.body.data);

    req.session.user = {
      ...req.session.user,
      ...updatedUser,
    };

    res.status(202).send(updatedUser);
  } catch (e) {
    next(e);
  }
}
