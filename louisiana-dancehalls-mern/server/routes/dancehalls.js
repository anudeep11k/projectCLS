// server/routes/dancehalls.js
import express from 'express';
import slugify from 'slugify';
import Dancehall from '../models/Dancehall.js';

const router = express.Router();

/**
 * GET /api/dancehalls
 * Query params:
 *  - parish (string)           : filter by parish
 *  - q (string)                : search by name (case-insensitive)
 *  - page (number), limit (number) : pagination
 */
router.get('/', async (req, res) => {
  try {
    const { parish, q, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (parish) filter.parish = parish;
    if (q) filter.name = new RegExp(q, 'i');

    const skip = (Math.max(1, parseInt(page, 10)) - 1) * parseInt(limit, 10);
    const docs = await Dancehall.find(filter).sort({ name: 1 }).skip(skip).limit(Number(limit)).lean();
    const total = await Dancehall.countDocuments(filter);

    res.json({ ok: true, total, page: Number(page), limit: Number(limit), results: docs });
  } catch (err) {
    console.error('GET /api/dancehalls error', err);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});

/**
 * GET /api/dancehalls/:slug
 */
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const hall = await Dancehall.findOne({ slug }).lean();
    if (!hall) return res.status(404).json({ ok: false, message: 'Dancehall not found' });
    res.json({ ok: true, result: hall });
  } catch (err) {
    console.error('GET /api/dancehalls/:slug error', err);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});

/**
 * POST /api/dancehalls
 * Create a new dancehall
 * Body: JSON with fields matching the Dancehall model
 */
router.post('/', async (req, res) => {
  try {
    const payload = req.body || {};
    if (!payload.name) return res.status(400).json({ ok: false, message: 'Name is required' });

    payload.slug = payload.slug || slugify(payload.name, { lower: true, strict: true });
    const exists = await Dancehall.findOne({ slug: payload.slug });
    if (exists) return res.status(409).json({ ok: false, message: 'A dancehall with that slug already exists' });

    const created = await Dancehall.create(payload);
    res.status(201).json({ ok: true, result: created });
  } catch (err) {
    console.error('POST /api/dancehalls error', err);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});

/**
 * PUT /api/dancehalls/:slug
 * Update an existing dancehall by slug
 */
router.put('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const payload = req.body || {};

    // If name changed and slug not provided, recalc slug
    if (payload.name && !payload.slug) {
      payload.slug = slugify(payload.name, { lower: true, strict: true });
    }

    const updated = await Dancehall.findOneAndUpdate({ slug }, payload, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ ok: false, message: 'Dancehall not found' });
    res.json({ ok: true, result: updated });
  } catch (err) {
    console.error('PUT /api/dancehalls/:slug error', err);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});

export default router;
