import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dancehalls from './routes/dancehalls.js';
import pages from './routes/pages.js';
import stories from './routes/stories.js';
import map from './routes/map.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error', err));

app.use('/api/dancehalls', dancehalls);
app.use('/api/pages', pages);
app.use('/api/stories', stories);
app.use('/api/map', map);

app.get('/', (_req, res) => res.json({ ok: true, name: 'Louisiana Dance Halls API' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
