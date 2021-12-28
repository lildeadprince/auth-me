import { Router } from 'express';
import Debug from 'debug';
import { loginUser, registerUser } from './user.controller.js';
import { findIdentity, getUserData } from '../../service/user/user.js';

const debug = Debug('route:user-auth');

export const userAuthRoute = new Router();

userAuthRoute.post('/logout', handleLogout);

userAuthRoute.use(authValidationGuard);
userAuthRoute.post('/register', handleRegister);
userAuthRoute.post('/login', handleLogin);

function authValidationGuard(req, res, next) {
  // todo npm i -S joi
  if (req.body.email && req.body.email) {
    next();
  } else {
    console.error('Bad email or password');
    res.status(400).send({ message: 'Bad email or password' });
  }
}

async function handleRegister(req, res, next) {
  try {
    if (!(await findIdentity(req.body.email))) {
      const [id, userData] = await registerUser(req.body);
      if (id) {
        const sessionUserData = { id, ...userData };
        populateSession(req, res, sessionUserData);

        res.status(201).send({ user: userData });
      } else {
        // user should've been returned if no exception were thrown
        res.sendStatus(500);
      }
    } else {
      res.status(409).send({ message: 'email is already used' });
    }
  } catch (e) {
    next(e);
  }
}

async function handleLogin(req, res, next) {
  try {
    const id = await loginUser(req.body);

    if (id) {
      const userData = await getUserData(id);
      populateSession(req, res, { id, ...userData });

      res.status(200).send({
        user: userData,

        message: `Hi, ${userData.email}!`
          // force brotli compression for testing purposes
          // (usually compression is not used for content `contentSize < MTU`) http_mtu_default=1500
          .repeat(239),
      });
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e);
  }
}

function handleLogout(req, res) {
  req.session.destroy(err => {
    if (!err) {
      res.sendStatus(200);
    } else {
      debug('Failed to remove user session', err);
      console.error(err);
      res.sendStatus(400);
    }
  });
}

function populateSession(req, res, user) {
  // add JWT maybe? or not..
  req.session.user = user;
}
