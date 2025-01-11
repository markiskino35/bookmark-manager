import express from 'express';
const router = express.Router();

import { getBookmarks, createBookmark } from '../controllers/bookmarks.js';

router.route('/').get(getBookmarks).post(createBookmark);

export default router;
