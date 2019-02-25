import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';

// import config from '../config';
import createRoutes from '../routes';

const initMiddleware = (app: express.Application): void => {
  app.use(helmet());
  // app.use(helmet.contentSecurityPolicy({}));
  // app.use(helmet.permittedCrossDomainPolicies());
  // app.use(helmet.dnsPrefetchControl());
  // app.use(helmet.frameguard());
  // app.use(helmet.hidePoweredBy());
  // app.use(helmet.hsts());
  // app.use(helmet.ieNoOpen());
  // app.use(helmet.noCache());
  // app.use(helmet.noSniff());
  // app.use(helmet.referrerPolicy());
  // app.use(helmet.xssFilter());
  app.use(bodyParser.json());
};

export default (db: mongoose.Connection): express.Application => {
  const app: express.Application = express();

  initMiddleware(app);

  createRoutes(app, db);

  return app;
};
