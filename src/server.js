// import express from 'express';
// import fetch from 'node-fetch';
// import cors from 'cors';

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// const RAPID_API_KEY = 'f4d5096a6amsh22d9b06fb71fdf9p1fff95jsn14e7fe135821';
// const API_URL = 'https://linkedin-jobs-search.p.rapidapi.com/';

// app.get('/api/jobs', async (req, res) => {
//   const { query = 'developer', location = 'remote' } = req.query;

//   try {
//     const response = await fetch(API_URL, {
//       method: 'POST',
//       headers: {
//         'x-rapidapi-key': RAPID_API_KEY,
//         'x-rapidapi-host': 'linkedin-jobs-search.p.rapidapi.com',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         search_terms: query,
//         location,
//         page: 1
//       })
//     });

//     if (!response.ok) throw new Error(`API Error: ${response.status}`);

//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching from LinkedIn API:', error);
//     res.status(500).json({ message: 'Error fetching jobs' });
//   }
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
