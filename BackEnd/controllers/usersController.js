import pool from '../config/dataBase.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function listUsers(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT id, username, email, created_at FROM users ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getUser(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid_id' });
  try {
    const [rows] = await pool.query('SELECT id, username, email, created_at FROM users WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'not_found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function createUser(req, res, next) {
  try {
    const { username, email, password } = req.body || {};
    if (!username || !email || !password) return res.status(400).json({ error: 'missing_fields' });
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const [result] = await pool.query('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [username, email, hash]);
    const insertId = result.insertId;
    const [rows] = await pool.query('SELECT id, username, email, created_at FROM users WHERE id = ?', [insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid_id' });
  try {
    const { username, email, password } = req.body || {};
    const sets = [];
    const values = [];
    if (username) { sets.push('username = ?'); values.push(username); }
    if (email) { sets.push('email = ?'); values.push(email); }
    if (password) { const hash = await bcrypt.hash(password, SALT_ROUNDS); sets.push('password_hash = ?'); values.push(hash); }
    if (sets.length === 0) return res.status(400).json({ error: 'no_fields' });
    values.push(id);
    const sql = `UPDATE users SET ${sets.join(', ')} WHERE id = ?`;
    const [result] = await pool.query(sql, values);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'not_found' });
    const [rows] = await pool.query('SELECT id, username, email, created_at FROM users WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid_id' });
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'not_found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export default { listUsers, getUser, createUser, updateUser, deleteUser };
