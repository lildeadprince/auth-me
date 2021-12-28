import { Router } from 'express';
import { userAuthRoute } from './user-auth.route.js';
import { updateUser } from './user.controller.js';

export const userRoute = new Router();

userRoute.use('/auth', userAuthRoute);

userRoute.use(sessionGuard);
userRoute.put('/data', handlePutUserData);
userRoute.get('/', (req, res) => {
  res.send({
    email: req.session.user.email,
    customData: req.session.user.customData,
  });
});

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
    req.session.user = updatedUser;
    res.status(202).send(updatedUser);
  } catch (e) {
    next(e);
  }
}
