import corsAnywhere from 'cors-anywhere';

// Listen on a specific port (e.g., 8080)
const host = 'localhost';
const port = 8080;

corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, () => {
  console.log(`CORS Anywhere proxy running on ${host}:${port}`);
});
