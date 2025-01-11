// CORE
import dotenv from 'dotenv';
import 'express-async-errors';

dotenv.config();

import express from 'express';
const app = express();

// DATABASE
import connectDB from './database/connect.js';

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('Express server is running!');
});

// SERVER
const port = process.env.PORT || 5000;

const start = async () => {
  console.log('[server] Starting server...');
  try {
    // connect DB
    await connectDB(process.env.MONGO_URI);
    console.log('[server] Connected to Bookmark Manager Database!');

    // start server
    const server = app.listen(
      port,
      console.log(`[server] Server is listening at port: ${port}. Lessgo!`)
    );
    console.log(`[server] version ${process.env.npm_package_version}`);
  } catch (error) {
    console.error(`[server] Start error:`, error);
  }
};

start();
