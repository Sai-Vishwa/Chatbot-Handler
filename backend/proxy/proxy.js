const {createProxyMiddleware} = require("http-proxy-middleware");

const setRequestBodydata = (proxyReq, req, res) => {
    if(req.body && Object.keys(req.body).length > 0) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  }
  const responseHandle = (proxyRes, req, res) => proxyRes.headers['access-control-allow-origin'] = '*'
  const proxyError = (err, req, res) => {
    console.error('Proxy Error:', err);
    res.status(500).send('Proxy Error');
  }

  const authProxy = createProxyMiddleware({
    target: 'http://localhost:4003/login',
    changeOrigin: true,
    pathRewrite: {
      '^/login': ''
    },
    on: {
      proxyReq: (proxyReq, req, res) => setRequestBodydata(proxyReq, req, res),
      proxyRes: (proxyRes, req, res) => responseHandle(proxyRes, req, res),
      error: (err, req, res) => proxyError(err, req, res)
    }
  });

  const botProxy = createProxyMiddleware({
    target: 'http://localhost:4004/bot',
    changeOrigin: true,
    pathRewrite: {
      '^/bot': ''
    },
    on: {
      proxyReq: (proxyReq, req, res) => setRequestBodydata(proxyReq, req, res),
      proxyRes: (proxyRes, req, res) => responseHandle(proxyRes, req, res),
      error: (err, req, res) => proxyError(err, req, res)
    }
  });

  module.exports = { 
    authProxy, botProxy
  }