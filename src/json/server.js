import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const jobs = JSON.parse(fs.readFileSync("./data/mock-data.json"));

app.get("/api/jobs", (req, res) => {
  const { q, location, type, experience } = req.query;
  let filtered = jobs;

  if (q) filtered = filtered.filter(job => job.title.toLowerCase().includes(q.toLowerCase()));
  if (location && location !== "") filtered = filtered.filter(job => job.location.toLowerCase().includes(location.toLowerCase()));
  if (type && type !== "all") filtered = filtered.filter(job => job.job_type.toLowerCase() === type.toLowerCase());
  if (experience && experience !== "all") filtered = filtered.filter(job => job.experience_level.toLowerCase() === experience.toLowerCase());

  res.json(filtered);
});

app.post("/api/jobs", (req, res) => {
  const newJob = req.body;
  newJob.id = Date.now();
  jobs.push(newJob);
  fs.writeFileSync("./data/mock-data.json", JSON.stringify(jobs, null, 2));
  res.status(201).json(newJob);
});

app.listen(3000, () => console.log("✅ API running at http://localhost:3000"));
