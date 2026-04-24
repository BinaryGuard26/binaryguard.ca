import type { Request, Response } from 'express';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('Missing DATABASE_URL for DigitalOcean PostgreSQL.');
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

function normalizeRating(value: unknown): number {
  const rating = Number(value ?? 5);
  if (!Number.isFinite(rating)) return 5;
  return Math.min(5, Math.max(1, Math.round(rating)));
}

export async function getReviews(req: Request, res: Response) {
  try {
    const includeNonFeatured = req.query.featured === 'false';
    const values: unknown[] = [true];
    let whereClause = 'where approved = $1';

    if (!includeNonFeatured) {
      values.push(true);
      whereClause += ' and featured = $2';
    }

    const result = await pool.query(
      `
        select id, name, company, role, rating, message, created_at
        from public.client_reviews
        ${whereClause}
        order by created_at desc
        limit 6
      `,
      values
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('GET /api/reviews failed', error);
    return res.status(500).json({ error: 'Unable to load client reviews.' });
  }
}

export async function postReview(req: Request, res: Response) {
  try {
    const body = req.body ?? {};

    const payload = {
      name: String(body.name ?? '').trim(),
      company: String(body.company ?? '').trim() || null,
      role: String(body.role ?? '').trim() || null,
      email: String(body.email ?? '').trim() || null,
      rating: normalizeRating(body.rating),
      message: String(body.message ?? '').trim(),
      consent: Boolean(body.consent),
    };

    if (!payload.name || !payload.message) {
      return res.status(400).json({ error: 'Name and feedback message are required.' });
    }

    if (!payload.consent) {
      return res.status(400).json({ error: 'Consent is required before submitting feedback.' });
    }

    await pool.query(
      `
        insert into public.client_reviews
        (name, company, role, email, rating, message, consent, approved, featured)
        values ($1, $2, $3, $4, $5, $6, $7, false, false)
      `,
      [
        payload.name,
        payload.company,
        payload.role,
        payload.email,
        payload.rating,
        payload.message,
        payload.consent,
      ]
    );

    return res.status(201).json({ success: true });
  } catch (error) {
    console.error('POST /api/reviews failed', error);
    return res.status(500).json({ error: 'Unable to submit feedback.' });
  }
}

export default async function reviewsHandler(req: Request, res: Response) {
  if (req.method === 'GET') {
    return getReviews(req, res);
  }

  if (req.method === 'POST') {
    return postReview(req, res);
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}
