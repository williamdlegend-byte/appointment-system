const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer(function (req, res) {

  let filePath = "public" + req.url;

  if (req.url === "/") {
    filePath = "public/index.html";
  }

  const ext = path.extname(filePath);

  let contentType = "text/html";
  if (ext === ".css") contentType = "text/css";
  if (ext === ".js") contentType = "application/javascript";

  fs.readFile(filePath, function (err, content) {
    if (err) {
      res.writeHead(404);
      res.end("File not found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

server.listen(3000, function () {
  console.log("Server running at http://localhost:3000");
});

