const http = require("http");
const url = require("url");
const fs = require("fs");

const slots = [];

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
}

function nextId() {
  return slots.length + 1;
}

const server = http.createServer(function (req, res) {

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  // GET all slots
  if (req.method === "GET" && path === "/api/slots") {
    sendJson(res, 200, slots);
    return;
  }

  // POST new slot
  if (req.method === "POST" && path === "/api/slots") {

    const startTime = query.startTime;
    const endTime = query.endTime;

    if (!startTime || !endTime) {
      sendJson(res, 400, { error: "Missing startTime or endTime" });
      return;
    }

    const slot = {
      id: nextId(),
      startTime: startTime,
      endTime: endTime,
      status: "available"
    };

    slots.push(slot);

    sendJson(res, 201, slot);
    return;
  }

  // Serve provider.html
  if (req.method === "GET" && path === "/provider.html") {
    fs.readFile("public/provider.html", function (err, data) {
      if (err) {
        sendJson(res, 500, { error: "Server error" });
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
    return;
  }

  // Serve provider.js
  if (req.method === "GET" && path === "/provider.js") {
    fs.readFile("public/provider.js", function (err, data) {
      if (err) {
        sendJson(res, 500, { error: "Server error" });
        return;
      }
      res.writeHead(200, { "Content-Type": "application/javascript" });
      res.end(data);
    });
    return;
  }

  // Serve CSS
  if (req.method === "GET" && path === "/style.css") {
    fs.readFile("public/style.css", function (err, data) {
      if (err) {
        sendJson(res, 500, { error: "Server error" });
        return;
      }
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });
    return;
  }

  sendJson(res, 404, { error: "Not found" });
});

server.listen(3002, function () {
  console.log("PPA5 running at http://localhost:3002");
});