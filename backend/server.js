/**
 * Simple Express backend server for the Study Planner application.
 * Provides API endpoints for managing subjects and schedules.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Routes

/**
 * GET /api/subjects
 * Retrieves all subjects from the database.
 */
app.get('/api/subjects', (req, res) => {
  res.json(db.subjects);
});

/**
 * POST /api/subjects
 * Adds a new subject to the database.
 */
app.post('/api/subjects', (req, res) => {
  const { name, difficulty, weeklyHours } = req.body;
  
  if (!name || !weeklyHours || weeklyHours <= 0) {
    return res.status(400).json({ error: 'Invalid subject data' });
  }

  const newSubject = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name,
    difficulty,
    weeklyHours
  };

  db.subjects.push(newSubject);
  res.json(newSubject);
});

/**
 * DELETE /api/subjects/:id
 * Deletes a subject by ID.
 */
app.delete('/api/subjects/:id', (req, res) => {
  const { id } = req.params;
  db.subjects = db.subjects.filter(s => s.id !== id);
  db.schedule = null; // Clear schedule when subjects change
  res.json({ success: true });
});

/**
 * GET /api/schedule
 * Retrieves the generated schedule.
 */
app.get('/api/schedule', (req, res) => {
  res.json(db.schedule);
});

/**
 * POST /api/schedule
 * Generates and saves a new schedule.
 */
app.post('/api/schedule', (req, res) => {
  const { schedule } = req.body;
  db.schedule = schedule;
  res.json({ success: true, schedule });
});

// Start the server
app.listen(PORT, () => {
  console.log(`\n✓ Study Planner Backend running at http://localhost:${PORT}\n`);
});
