// // WeatherService.mjs
// const WEATHER_BASE = 'https://api.open-meteo.com/v1/forecast';

// export async function getCurrentTemp(lat, lon) {
//   if (typeof lat !== 'number' || typeof lon !== 'number') return null;
//   try {
//     const params = new URLSearchParams({
//       latitude: lat,
//       longitude: lon,
//       current_weather: true,
//       timezone: 'UTC'
//     });
//     const res = await fetch(`${WEATHER_BASE}?${params}`);
//     if (!res.ok) return null;
//     const data = await res.json();
//     return data.current_weather?.temperature ?? null;
//   } catch (err) {
//     console.error('WeatherService error', err);
//     return null;
//   }
// }
