// server/routes/pages.js
import express from 'express';
import Page from '../models/Page.js';

const router = express.Router();

/**
 * GET /api/pages/:slug
 * returns a page (About, Film, Links, Look & Listen, etc.)
 */
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await Page.findOne({ slug }).lean();
    if (!page) return res.status(404).json({ ok: false, message: 'Page not found' });
    res.json({ ok: true, result: page });
  } catch (err) {
    console.error('GET /api/pages/:slug error', err);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});

/**
 * POST /api/pages
 * Create a new page
 * Body: { title, slug, content_html }
 */
router.post('/', async (req, res) => {
  try {
    const { title, slug, content_html } = req.body || {};
    if (!title || !slug) return res.status(400).json({ ok: false, message: 'title and slug are required' });

    const existing = await Page.findOne({ slug });
    if (existing) return res.status(409).json({ ok: false, message: 'Page with that slug already exists' });

    const page = await Page.create({ title, slug, content_html });
    res.status(201).json({ ok: true, result: page });
  } catch (err) {
    console.error('POST /api/pages error', err);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});

/**
 * PUT /api/pages/:slug
 * Update page content
 */
router.put('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const payload = req.body || {};
    const updated = await Page.findOneAndUpdate({ slug }, payload, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ ok: false, message: 'Page not found' });
    res.json({ ok: true, result: updated });
  } catch (err) {
    console.error('PUT /api/pages/:slug error', err);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});

export default router;
