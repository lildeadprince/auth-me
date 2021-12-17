import express from 'express';
import { redisSessionMiddleware as redisSessionStorage } from './app-init/redis-session.js';
import { baseSetupMiddleware as baseSetup } from './app-init/express-app.js';
import { securityMiddleware as security } from './app-init/security.js';
import { appRouter } from './routes/index.js';

express()
  .use(baseSetup())
  .use(redisSessionStorage())
  .use(security())

  .use(appRouter)

  .use(unhandledErrorHandler)

  .listen(process.env.PORT || 3000);

function unhandledErrorHandler(error, req, res, next) {
  console.error(error);
  res.status(500).send(error);
}
