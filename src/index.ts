import express from 'express';
import mongoose from 'mongoose';
import path from "node:path";
import dotenv from 'dotenv';

import { router } from './routes';

dotenv.config();

if(!process.env.MONGO_URL){
  throw new Error('MONGO_URL is not defined in the enviroment variable.')
}

const DB_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

mongoose.connect(DB_URL)
  .then(() => {
    const app = express();
    app.use('uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
    app.use(express.json());
    app.use(router);

    app.listen(PORT, () => {
      console.log(`🚀👌 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(() => console.log('erro ao conectar ao mongo DB'));



