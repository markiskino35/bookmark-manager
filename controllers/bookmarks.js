import Bookmark from '../models/Bookmark.js';

// GET /
const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.status(200).json({ bookmarks });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch bookmarks', error: error.message });
  }
};

// POST /
const createBookmark = async (req, res) => {
  const { title, url, description, tags } = req.body;
  if (!title || !url) {
    return res.status(400).json({ message: 'Title and URL are required.' });
  }
  try {
    const newBookmark = await Bookmark.create({
      title,
      url,
      description,
      tags,
    });
    return res.status(201).json({ message: 'Bookmark added' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getBookmarks, createBookmark };
