import express from "express";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// Variables de entorno (por defecto para docker-compose)
const pool = new Pool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "biciaruta",
  port: Number(process.env.DB_PORT) || 5432,
  max: 10 // conexiones en pool
});

// Salud
app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, db: "up" });
  } catch {
    res.status(500).json({ ok: false, db: "down" });
  }
});

// Crear reporte
app.post("/reports", async (req, res) => {
  const { lat, lon, type, note } = req.body || {};
  if (lat == null || lon == null) {
    return res.status(400).json({ error: "lat/lon requeridos" });
  }
  try {
    const q = `
      INSERT INTO reports(lat, lon, type, note)
      VALUES($1,$2,$3,$4)
      RETURNING id, created_at
    `;
    const { rows } = await pool.query(q, [lat, lon, type || null, note || null]);
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "db_error" });
  }
});

// Consultar cercanos (bounding box simple; rápido para MVP)
app.get("/reports/near", async (req, res) => {
  const { lat, lon, radius = 0.01 } = req.query;
  if (lat == null || lon == null) {
    return res.status(400).json({ error: "lat/lon requeridos" });
  }
  const latF = parseFloat(lat);
  const lonF = parseFloat(lon);
  const r = parseFloat(radius);
  try {
    const q = `
      SELECT id, lat, lon, type, note, created_at
      FROM reports
      WHERE lat BETWEEN $1 AND $2
        AND lon BETWEEN $3 AND $4
      ORDER BY created_at DESC
      LIMIT 200
    `;
    const { rows } = await pool.query(q, [latF - r, latF + r, lonF - r, lonF + r]);
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "db_error" });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`API listening on ${port}`));
