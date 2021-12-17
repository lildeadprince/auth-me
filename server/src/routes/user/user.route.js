import { Router } from 'express';
import { userAuthRoute } from './user-auth.route.js';

export const userRoute = new Router();

userRoute.use('/auth', userAuthRoute);
userRoute.get('/', handleGetSessionUser);

function handleGetSessionUser(req, res, next) {
  try {
    const { user } = req.session;

    if (user) {
      res.send(user);
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e);
  }
}
