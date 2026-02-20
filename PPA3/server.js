// server.js
// Appointment scheduling server (PPA 3)
// Uses Node.js http module only (no frameworks)

const http = require("http");
const url = require("url");

// In memory data model
const slots = [];

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
}

function nextId() {
  return slots.length + 1;
}

function validateSlotTimes(startTime, endTime) {
  if (typeof startTime !== "string" || startTime.trim().length === 0) {
    return { ok: false, message: "startTime is required" };
  }

  if (typeof endTime !== "string" || endTime.trim().length === 0) {
    return { ok: false, message: "endTime is required" };
  }

  return { ok: true, message: "" };
}

function validateSlotTimes(startTime, endTime) {

  if (typeof startTime !== "string" || startTime.trim().length === 0) {
    return { ok: false, message: "startTime is required" };
  }

  if (typeof endTime !== "string" || endTime.trim().length === 0) {
    return { ok: false, message: "endTime is required" };
  }

  if (endTime <= startTime) {
    return { ok: false, message: "endTime must be after startTime" };
  }

  return { ok: true, message: "" };
}

function isDuplicate(startTime, endTime) {
  return slots.some(function (slot) {
    return slot.startTime === startTime && slot.endTime === endTime;
  });
}


const server = http.createServer(function (req, res) {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (req.method === "GET" && path === "/api/slots") {
    sendJson(res, 200, slots);
    return;
  }

  if (req.method === "POST" && path === "/api/slots") {
    const startTime = query.startTime;
    const endTime = query.endTime;

    const result = validateSlotTimes(startTime, endTime);

    if (!result.ok) {
      sendJson(res, 400, { error: result.message });
      return;
    }
    if (isDuplicate(startTime, endTime)) {
  sendJson(res, 409, { error: "Duplicate slot" });
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
  
const fs = require("fs");

if (req.method === "GET" && path === "/provider.html") {
  fs.readFile("provider.html", function (err, data) {
    if (err) {
      sendJson(res, 500, { error: "Server error" });
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
  return;
}

if (req.method === "GET" && path === "/provider.js") {
  const fs = require("fs");

  fs.readFile("provider.js", function (err, data) {
    if (err) {
      sendJson(res, 500, { error: "Server error" });
      return;
    }

    res.writeHead(200, { "Content-Type": "application/javascript" });
    res.end(data);
  });

  return;
}

  sendJson(res, 404, { error: "Not found" });
});

server.listen(3000, function () {
  console.log("Server running at http://localhost:3000");
});
