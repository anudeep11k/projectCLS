import mongoose from 'mongoose';
const DancehallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, index: true, unique: true },
  parish: String,
  status: String,
  year_built: Number,
  address: String,
  lat: Number,
  lng: Number,
  description_html: String,
  images: [{ url: String, caption: String }],
  sources: [{ label: String, url: String }],
}, { timestamps: true });

export default mongoose.model('Dancehall', DancehallSchema);
