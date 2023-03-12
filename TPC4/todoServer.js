// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require("http");
var axios = require("axios");
var templates = require("./templates");
var static = require("./static.js");
const fs = require("fs");
const { parse } = require("querystring");
const url = "http://localhost:3000/todo";
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
          axios.get(url).then((response) => {
            // Render page with the student's list
            res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
            res.write(templates.todoList(response.data, d));
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
              axios.get(url).then(async (response) => {
                const json = response.data;
                if (result.type === "do") {
                  const elem = json.find(
                    (todo) => todo.id === parseInt(result.id)
                  );

                  elem.checked = true;
                  await axios.put(url + "/" + result.id, elem);
                } else if (result.type === "undo") {
                  const elem = json.find(
                    (todo) => todo.id === parseInt(result.id)
                  );

                  elem.checked = false;
                  await axios.put(url + "/" + result.id, elem);
                } else if (result.type === "delete") {
                  await axios.delete(url + "/" + result.id);
                } else if (result.type === "startEdit") {
                  res.write(templates.todoList(json, d, result.id));
                } else if (result.type === "edit") {
                  const todo = json.find(
                    (todo) => todo.id === parseInt(result.id)
                  );
                  if (result.owner) todo.owner = result.owner;
                  if (result.description) todo.description = result.description;
                  await axios.put(url + "/" + result.id, todo);
                } else {
                  const newTodo = {
                    owner: result.owner,
                    description: result.description,
                    date: d,
                    checked: false,
                  };
                  await axios.post(url, newTodo);
                }

                res.writeHead(200, {
                  "Content-Type": "text/html;charset=utf-8",
                });
                if (result.type !== "startEdit") {
                  const response = await axios.get(url);
                  res.write(templates.todoList(response.data, d));
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
