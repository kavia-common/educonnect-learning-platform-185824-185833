/* Optional dev proxy: forward /api to backend if REACT_APP_BACKEND_URL is set */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  const target = process.env.REACT_APP_BACKEND_URL;
  if (!target) return;
  app.use('/api', createProxyMiddleware({
    target,
    changeOrigin: true,
    secure: false
  }));
};
