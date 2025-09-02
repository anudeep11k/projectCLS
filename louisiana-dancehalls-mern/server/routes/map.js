// server/routes/map.js
import express from 'express';
import MapPoint from '../models/MapPoint.js';
import slugify from 'slugify';

const router = express.Router();

/**
 * GET /api/map
 * returns all map points; optionally filter by parish
 * query: parish
 */
router.get('/', async (req, res) => {
  try {
    const { parish } = req.query;
    const filter = {};
    if (parish) filter.parish = parish;
    const points = await MapPoint.find(filter).lean();
    res.json({ ok: true, results: points });
  } catch (err) {
    console.error('GET /api/map error', err);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});

/**
 * POST /api/map
 * create a map point
 * body: { dancehall_slug, name, parish, lat, lng }
 */
router.post('/', async (req, res) => {
  try {
    const payload = req.body || {};
    if (!payload.name || typeof payload.lat !== 'number' || typeof payload.lng !== 'number') {
      return res.status(400).json({ ok: false, message: 'name, lat and lng are required (lat/lng numbers)' });
    }
    // ensure dancehall_slug exists or create a slugified version if not provided
    payload.dancehall_slug = payload.dancehall_slug || slugify(payload.name, { lower: true, strict: true });

    const created = await MapPoint.create(payload);
    res.status(201).json({ ok: true, result: created });
  } catch (err) {
    console.error('POST /api/map error', err);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});

export default router;
