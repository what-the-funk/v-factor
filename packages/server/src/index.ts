import { readFileSync } from 'fs';
import { resolve } from 'path';
// import http from 'http';
import https from 'https';
import express from 'express';

import config from './config';
import initialSetup from './core/init';
import connectDatabase from './core/mongo';
import createExpressApp from './core/express';

initialSetup();

const db = connectDatabase();
const app: express.Application = createExpressApp(db);
const certificate = readFileSync(resolve(`${__dirname}/../certs/cert.dev.pem`));
const privateKey = readFileSync(resolve(`${__dirname}/../certs/key.dev.pem`));
// const httpServer: http.Server = http.createServer(app);
const credentials: https.ServerOptions = { key: privateKey, cert: certificate };
const httpsServer: https.Server = https.createServer(credentials, app);

// httpServer.listen(config.httpPort);
httpsServer.listen(config.httpsPort);
