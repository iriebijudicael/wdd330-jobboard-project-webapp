// server.js
/* eslint-env node */
/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import fs from 'fs'; 
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, '../data/mock-jobs.json');

// --- GET: return all jobs (with filters) ---
app.get('/api/jobs', (req, res) => {
  try {
    const jobs = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    const { q = '', type = 'all', experience = 'all', location = '' } = req.query;

    let filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(q.toLowerCase())
    );

    if (type !== 'all') filtered = filtered.filter((j) => j.type === type);
    if (experience !== 'all') filtered = filtered.filter((j) => j.experience === experience);
    if (location)
      filtered = filtered.filter((j) =>
        j.location.toLowerCase().includes(location.toLowerCase())
      );

    res.json(filtered);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read job data' });
  }
});

// --- POST: create new job ---
app.post('/api/jobs', (req, res) => {
  try {
    const newJob = req.body;
    const jobs = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    jobs.push(newJob);
    fs.writeFileSync(DATA_PATH, JSON.stringify(jobs, null, 2));
    res.status(201).json(newJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save job' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
