// server/routes/stories.js
import express from 'express';
import Story from '../models/Story.js';

const router = express.Router();

/**
 * POST /api/stories
 * Public endpoint to submit a story (Your Story form)
 * Body: { name, email, phone, dancehall, story_text, media_urls }
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, story_text } = req.body || {};
    if (!name || !email || !story_text) {
      return res.status(400).json({ ok: false, message: 'name, email and story_text are required' });
    }

    const created = await Story.create(req.body);
    // In production you'd probably queue a moderation email/notification here
    res.status(201).json({ ok: true, result: { id: created._id, status: created.status } });
  } catch (err) {
    console.error('POST /api/stories error', err);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});

/**
 * GET /api/stories
 * Admin endpoint (no auth here) — returns stories, supports status filter
 * Query: status (pending/approved/rejected), page, limit
 */
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const skip = (Math.max(1, parseInt(page, 10)) - 1) * parseInt(limit, 10);
    const docs = await Story.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean();
    const total = await Story.countDocuments(filter);
    res.json({ ok: true, total, page: Number(page), limit: Number(limit), results: docs });
  } catch (err) {
    console.error('GET /api/stories error', err);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});

/**
 * GET /api/stories/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).lean();
    if (!story) return res.status(404).json({ ok: false, message: 'Story not found' });
    res.json({ ok: true, result: story });
  } catch (err) {
    console.error('GET /api/stories/:id error', err);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});

/**
 * PUT /api/stories/:id
 * Update story (e.g., change status to 'approved')
 */
router.put('/:id', async (req, res) => {
  try {
    const updated = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ ok: false, message: 'Story not found' });
    res.json({ ok: true, result: updated });
  } catch (err) {
    console.error('PUT /api/stories/:id error', err);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});

export default router;
