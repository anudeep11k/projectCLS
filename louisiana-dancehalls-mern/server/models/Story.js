import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  dancehall: String,
  story_text: String,
  media_urls: [String],
  status: { type: String, default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Story', StorySchema);
