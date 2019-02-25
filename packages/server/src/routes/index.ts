import express from 'express';
import mongoose from 'mongoose';

// import config from '../config';
import addHealthRoutes from './health';

export default (app: express.Application, _db: mongoose.Connection) => {
  addHealthRoutes(app);
};
