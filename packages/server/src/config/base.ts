import path from 'path';

import paths from './paths';

const {
  HTTP_PORT = 9000,
  HTTPS_PORT = 9443,
  NODE_IP = '0.0.0.0',
  MONGO_URI = 'mongodb://localhost/devdb',
} = process.env;

const base = {
  ip: NODE_IP,
  httpPort: HTTP_PORT,
  httpsPort: HTTPS_PORT,

  rootPath: paths.root,
  dataFolder: path.join(paths.packages, 'devdb', 'data'),

  db: {
    uri: MONGO_URI,
    options: {
      autoReconnect: true,
      reconnectTries: 1000000,
      reconnectInterval: 3000,
      useNewUrlParser: true,
      useCreateIndex: false,
    },
  },
};

export default base;
