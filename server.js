const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  } else if (reqPath === '/about' || reqPath === '/about/' || reqPath === '/gioi-thieu') {
    reqPath = '/about.html';
  } else if (reqPath === '/catalog' || reqPath === '/catalog/' || reqPath === '/san-pham') {
    reqPath = '/catalog.html';
  } else if (reqPath === '/articles' || reqPath === '/articles/' || reqPath === '/bai-viet') {
    reqPath = '/articles.html';
  } else if (reqPath === '/single-blog' || reqPath === '/single-blog/' || reqPath === '/blog' || reqPath === '/blog/' || reqPath === '/article' || reqPath === '/article/' || reqPath === '/bai-viet-chi-tiet' || reqPath === '/post' || reqPath === '/post/') {
    reqPath = '/single-blog.html';
  } else if (reqPath === '/contact' || reqPath === '/contact/' || reqPath === '/lien-he') {
    reqPath = '/contact.html';
  } else if (reqPath === '/cart' || reqPath === '/cart/' || reqPath === '/gio-hang' || reqPath === '/gio-hang/') {
    reqPath = '/cart.html';
  } else if (reqPath === '/checkout' || reqPath === '/checkout/' || reqPath === '/thanh-toan' || reqPath === '/thanh-toan/') {
    reqPath = '/checkout.html';
  } else if (reqPath === '/orders' || reqPath === '/orders/' || reqPath === '/don-hang' || reqPath === '/don-hang/') {
    reqPath = '/orders.html';
  } else if (reqPath === '/admin' || reqPath === '/admin/' || reqPath === '/cms' || reqPath === '/cms/' || reqPath === '/quan-tri') {
    reqPath = '/admin.html';
  }

  const filePath = path.join(PUBLIC_DIR, reqPath);

  // Security check to prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Access denied');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`🌿 Website Tinh Dầu CALOHA đang chạy tại: http://localhost:${PORT}`);
});
