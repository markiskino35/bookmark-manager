// CORE ------------------------------------
import dotenv from 'dotenv';
import 'express-async-errors';

dotenv.config();

import express from 'express';
const app = express();

import path from 'path';

// security packages
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

// compression packages
import compression from 'compression';

// IMPORT ROUTER ------------------------------------
// bookmark import
import bookmarks from './routes/bookmarks.js';

// IMPORT MIDDLEWARE ------------------------------------

// DATABASE  ------------------------------------
import connectDB from './database/connect.js';

// USE MIDDLEWARE ------------------------------------
const root = path.join(
  new URL('.', import.meta.url).pathname,
  'client',
  'dist'
);

// initial config
app.set('trust proxy', 1);
app.disable('x-powered-by');

// header
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    strictTransportSecurity: false,
    xPoweredBy: false,
  })
);
app.use(async function (req, res, next) {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// security
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(
  mongoSanitize({
    replaceWith: '_',
  })
);

// compression
app.use(compression());

// for use in deployment production build
app.use('/bookmark', express.static(root));

app.use('/api/bookmarks', bookmarks);

// for use in deployment
app.get('/bookmark/*', (req, res) => {
  res.sendFile(
    path.join(
      new URL('.', import.meta.url).pathname,
      'client',
      'dist',
      'index.html'
    )
  );
});

// SERVER ------------------------------------
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
