// vite.config.js
export default {
  root: 'src', // optional: if your HTML lives in /src
  publicDir: '../public', // optional
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: '../dist'
  }
}