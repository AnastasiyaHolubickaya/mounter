import express, { json } from 'express';
import cors from 'cors';
import config from './config/bd.js';
import mongoose from 'mongoose';
import users from './routes/users/users.js';

const port = 3000;
const app = express();

// * Connect to DB
mongoose.connect(config.db);
mongoose.connection.on('connected', () => console.log('Connected to DB!'));
mongoose.connection.on('error', (error) =>
  console.log(`Connected to DB  failed: ${error}`)
);

// * Config
app.use(json());
app.use(cors());

// * Routes
app.use('/users', users);

// * Start server
app.listen(port, () => console.log(` Server started in port: ${port} `));
