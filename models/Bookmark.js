import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    tags: { type: [String] },
  },
  { timestamps: true }
);

const Bookmark = mongoose.model('Bookmark', BookmarkSchema);
export default Bookmark;
