// // src/js/services/ApiService.mjs
// export const JobAPI = (() => {
//   const BASE_URL = 'http://localhost:5000/api/jobs'; // Change to your deployed server URL later

//   async function fetchJobsFromServer(query = '', filters = {}) {
//     const params = new URLSearchParams({
//       query: query || 'developer',
//       location: filters.location || 'remote',
//       type: filters.type || 'all',
//       experience: filters.experience || 'all'
//     });

//     try {
//       const response = await fetch(`${BASE_URL}?${params}`);
//       if (!response.ok) throw new Error('Failed to fetch jobs');
//       return await response.json();
//     } catch (err) {
//       console.error('API fetch error:', err);
//       throw err;
//     }
//   }

//   return { fetchJobsFromServer };
// })();
