import mongoose from 'mongoose';

const MapPointSchema = new mongoose.Schema({
  dancehall_slug: { type: String, index: true },
  name: String,
  parish: String,
  lat: Number,
  lng: Number
}, { timestamps: true });

export default mongoose.model('MapPoint', MapPointSchema);
