import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
  tags: { type: [String] },
  createdAt: { type: Date, default: Date.now },
});
