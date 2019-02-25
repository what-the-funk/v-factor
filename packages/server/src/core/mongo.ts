// import chalk from 'chalk';
import mongoose from 'mongoose';

import config, { isDevMode } from '../config';

const onDBError = (error: any) => {
  console.error(`connection error: ${error}`);
};

const onDBOpen = () => {
  console.log(`Connected to ${config.db.uri}.`);
};

export default (): mongoose.Connection => {
  const db: mongoose.Connection = mongoose.connection;

  if (db.readyState !== 1) {
    console.log(`Connecting to ${config.db.uri}...`);
    mongoose.connect(config.db.uri, config.db.options);

    mongoose.Promise = Promise;
    mongoose.set('debug', isDevMode());

    db.on('error', onDBError);
    db.once('open', onDBOpen);
  }

  return db;
};
