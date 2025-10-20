// CountriesService.mjs
const API_BASE = 'https://restcountries.com/v3.1/all';
const cache = new Map();

/**
 * Get basic country info by name (flag svg URL + region)
 * Returns { flag, region, cca2 } or null if not found.
 */
export async function getCountryByName(countryName) {
  if (!countryName) return null;
  const key = countryName.toLowerCase();
  if (cache.has(key)) return cache.get(key);

  try {
    const res = await fetch(`${API_BASE}/${encodeURIComponent(countryName)}?fullText=false`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const item = data[0];
    const info = {
      flag: item.flags?.svg || item.flags?.png || '',
      region: item.region || '',
      cca2: item.cca2 || ''
    };
    cache.set(key, info);
    return info;
  } catch (err) {
    // logging omitted to satisfy lint rules; consider reporting to a monitoring service here
    return null;
  }
}



// const url = 'https://pokeapi.co/api/v2/pokemon/1';
// const options = {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
      
//   }
// };
// fetch(url, options)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log('first: ', data);
//     console.log('second: ', data.name);
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
//   });
