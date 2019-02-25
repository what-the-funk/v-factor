import express from 'express';

export default (app: express.Application): void => {
  // define a route handler for the healthcheck
  app.get('/health', (_, res: express.Response) => {
    res.sendStatus(200);
  });
};
