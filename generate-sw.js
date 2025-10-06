import { generateSW } from 'workbox-build';

generateSW({
  globDirectory: 'dist/',
  globPatterns: ['**/*.{js,css,html,png,jpg,svg,json}'],
  swDest: 'dist/service-worker.js',
  clientsClaim: true,
  skipWaiting: true,
}).then(({ count, size }) => {
  console.log(`Service Worker generado: ${count} archivos, ${size} bytes cacheados`);
});
