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

  splitedReq = req.url.split("/");
  console.log(splitedReq);
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
        } else if (splitedReq[1] === "delete") {
          fs.readFile("db.json", "utf8", function (err, data) {
            const jsonDelete = JSON.parse(data);

            const element = jsonDelete.todo.find(
              (todo) => todo.id === parseInt(splitedReq[2])
            );
            jsonDelete.todo = jsonDelete.todo.filter(
              (todo) => todo.id !== parseInt(splitedReq[2])
            );

            fs.writeFile("db.json", JSON.stringify(jsonDelete), function (err) {
              if (err) throw err;
              console.log("Saved!");
            });
            res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
            res.write(templates.deleteTodo(element, d));
            res.end();
          });
        } else if (splitedReq[1] === "edit") {
          fs.readFile("db.json", "utf8", function (err, data) {
            if (err) throw err;
            const jsonEdit = JSON.parse(data);
            const element = jsonEdit.todo.find(
              (todo) => todo.id === parseInt(splitedReq[2])
            );
            res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
            res.write(templates.editTodo(element, d));
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
                var json = JSON.parse(data);
                json.todo.push({
                  id: json.todo.length,
                  owner: result.owner,
                  description: result.description,
                  date: d,
                  checked: false,
                });
                fs.writeFile("db.json", JSON.stringify(json), function (err) {
                  if (err) throw err;
                  console.log("Saved!");
                });
                res.writeHead(200, {
                  "Content-Type": "text/html;charset=utf-8",
                });
                res.write(templates.todoList(json.todo, d));
                res.end();
              });
            }
          });
        } else if (splitedReq[1] === "edit") {
          res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
          collectRequestBodyData(req, (result) => {
            if (result) {
              fs.readFile("db.json", "utf8", function (err, data) {
                if (err) throw err;
                var json = JSON.parse(data);
                const element = json.todo.find(
                  (todo) => todo.id === parseInt(splitedReq[2])
                );
                element.owner = result.owner;
                element.description = result.description;
                element.date = d;
                fs.writeFile("db.json", JSON.stringify(json), function (err) {
                  if (err) throw err;
                  console.log("Saved!");
                });
                res.write(templates.editTodo(element, d, true));
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
