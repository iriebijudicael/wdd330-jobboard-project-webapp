// // CountriesService.mjs
// const API_BASE = 'https://restcountries.com/v3.1/all';
// const cache = new Map();

// /**
//  * Get basic country info by name (flag svg URL + region)
//  * Returns { flag, region, cca2 } or null if not found.
//  */
// export async function getCountryByName(countryName) {
//   if (!countryName) return null;
//   const key = countryName.toLowerCase();
//   if (cache.has(key)) return cache.get(key);

//   try {
//     const res = await fetch(`${API_BASE}/${encodeURIComponent(countryName)}?fullText=false`);
//     if (!res.ok) return null;
//     const data = await res.json();
//     if (!Array.isArray(data) || data.length === 0) return null;

//     const item = data[0];
//     const info = {
//       flag: item.flags?.svg || item.flags?.png || '',
//       region: item.region || '',
//       cca2: item.cca2 || ''
//     };
//     cache.set(key, info);
//     return info;
//   } catch (err) {
//     console.error('countriesService error', err);
//     return null;
//   }
// }
