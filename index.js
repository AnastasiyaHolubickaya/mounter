import express, { json } from 'express';
import cors from 'cors';

import config from './config/db.js';
import mongoose from 'mongoose';

console.log(config.db);

//*Connect for db
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to DB');
  // log(chalk.green.underline('Connected to DB'));
});
mongoose.connection.on('error', (error) => {
  console.log(`Connected to DB failed: ${error}`);
  //log(chalk.magenta('Connected to DB failed') + chalk.red(error));
});

const port = 3000;
const app = express();

app.use(json());
app.use(cors());

app.use('/users', users);

//app.use(express.static('./dist'));

app.listen(port, () => {
  console.log(` Server started in port: ${port} `);
});
