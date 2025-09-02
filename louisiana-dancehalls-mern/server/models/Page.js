import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, index: true, unique: true },
  content_html: String
}, { timestamps: true });

export default mongoose.model('Page', PageSchema);
