// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require("http");
var axios = require("axios");
var templates = require("./templates");
var static = require("./static.js");
const fs = require("fs");
const { parse } = require("querystring");

// Server creation

var alunosServer = http.createServer(function (req, res) {
  // Logger: what was requested and when it was requested
  var d = new Date().toISOString().substring(0, 16);
  console.log(req.method + " " + req.url + " " + d);

  // Handling request
  if (static.staticResource(req)) {
    static.serveStaticResource(req, res);
  } else {
    switch (req.method) {
      case "GET":
        // GET /alunos --------------------------------------------------------------------
        if (req.url == "/") {
          fs.readFile("db.json", "utf8", function (err, data) {
            if (err) throw err;
            var json = JSON.parse(data);

            // Render page with the student's list
            res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
            res.write(templates.todoList(json.todo, d));
            res.end();
          });
        } else {
          res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
          res.write(
            "<p>" +
              req.method +
              " " +
              req.url +
              " unsupported on this server.</p>"
          );
          res.end();
        }
        break;
      case "POST":
        if (req.url == "/") {
          res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
          collectRequestBodyData(req, (result) => {
            if (result) {
              fs.readFile("db.json", "utf8", function (err, data) {
                if (err) throw err;
                const json = JSON.parse(data);
                console.log(result);
                if (result.type === "do") {
                  json.todo.map((todo) => {
                    if (todo.id === parseInt(result.id)) todo.checked = true;
                  });
                } else if (result.type === "undo") {
                  json.todo.map((todo) => {
                    if (todo.id === parseInt(result.id)) todo.checked = false;
                  });
                } else if (result.type === "delete") {
                  json.todo = json.todo.filter((todo) => {
                    return todo.id !== parseInt(result.id);
                  });
                } else if (result.type === "startEdit") {
                  res.write(templates.todoList(json.todo, d, true, result.id));
                } else if (result.type === "edit") {
                  json.todo.map((todo) => {
                    if (todo.id === parseInt(result.id)) {
                      if (result.owner) todo.owner = result.owner;
                      if (result.description)
                        todo.description = result.description;
                    }
                  });
                } else {
                  json.todo.push({
                    id: json.todo.length,
                    owner: result.owner,
                    description: result.description,
                    date: d,
                    checked: false,
                  });
                }
                fs.writeFile("db.json", JSON.stringify(json), function (err) {
                  if (err) throw err;
                  console.log("Saved!");
                });
                res.writeHead(200, {
                  "Content-Type": "text/html;charset=utf-8",
                });
                if (result.type !== "startEdit") {
                  res.write(templates.todoList(json.todo, d));
                }
                res.end();
              });
            }
          });
        } else {
          res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
          res.write("<p>Unsupported POST request: " + req.url + "</p>");
          res.write('<p><a href="/">Return</a></p>');
          res.end();
        }
        break;

      default:
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.write("<p>" + req.method + " unsupported in this server.</p>");
        res.end();
    }
  }
});

alunosServer.listen(7777, () => {
  console.log("Servidor à escuta na porta 7777...");
});

function collectRequestBodyData(request, callback) {
  if (request.headers["content-type"] === "application/x-www-form-urlencoded") {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      callback(parse(body));
    });
  } else {
    callback(null);
  }
}
