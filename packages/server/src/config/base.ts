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
  dataFolder: path.join(paths.packages, 'devdb/data'),
  logFolder: path.join(paths.server, 'logs'),
  certsFolder: path.join(paths.server, 'certs'),

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

  logging: {
    console: {
      level: 'debug',
    },

    // file: {
    //   enabled: false,
    //   path: path.join(paths.server, 'logs'),
    //   level: 'info',
    // },

    // papertrail: {
    //   enabled: false,
    //   host: null,
    //   port: null,
    //   level: 'debug',
    //   program: 'app',
    // },
  },
};

export default base;
