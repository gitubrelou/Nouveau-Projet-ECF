import pool from '../config/dataBase.js';

// GET /api/ -> return all sites
export async function getAllSites(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM sites ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

// GET /api/sites/:id
export async function getSiteById(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid_id' });
  try {
    const [rows] = await pool.query('SELECT * FROM sites WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'not_found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

// POST /api/sites
// Expected body: an object with fields matching the sites table columns.
// We'll accept an open shape but only insert known fields if present.
export async function createSite(req, res, next) {
  try {
    const body = req.body || {};
    // Example common fields — adjust to your actual schema if different
    const allowed = ['title', 'description', 'image', 'url'];
    const fields = [];
    const placeholders = [];
    const values = [];
    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        fields.push(key);
        placeholders.push('?');
        values.push(body[key]);
      }
    }
    if (fields.length === 0) return res.status(400).json({ error: 'no_fields' });

    const sql = `INSERT INTO sites (${fields.join(',')}) VALUES (${placeholders.join(',')})`;
    const [result] = await pool.query(sql, values);
    const insertId = result.insertId;
    const [rows] = await pool.query('SELECT * FROM sites WHERE id = ?', [insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
}

// PUT /api/sites/:id
export async function updateSite(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid_id' });
  try {
    const body = req.body || {};
    const allowed = ['title', 'description', 'image', 'url'];
    const sets = [];
    const values = [];
    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        sets.push(`${key} = ?`);
        values.push(body[key]);
      }
    }
    if (sets.length === 0) return res.status(400).json({ error: 'no_fields' });
    values.push(id);
    const sql = `UPDATE sites SET ${sets.join(', ')} WHERE id = ?`;
    const [result] = await pool.query(sql, values);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'not_found' });
    const [rows] = await pool.query('SELECT * FROM sites WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/sites/:id
export async function deleteSite(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid_id' });
  try {
    const [result] = await pool.query('DELETE FROM sites WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'not_found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export default { getAllSites, getSiteById, createSite, updateSite, deleteSite };

