var http = require("http");
var url = require("url");
var fs = require("fs");

http
  .createServer(function (req, res) {
    var number = url.parse(req.url, true).pathname.split("/")[1];
    let file;
    if (number == "") {
      file = "index.html";
      res.writeHead(200, { "Content-Type": "text/html" });
    } else {
      res.writeHead(200, { "Content-Type": "text/xml" });
      file = "files/arq" + number + ".xml";
    }
    fs.readFile(file, function (err, data) {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write("Erro: " + err);
      } else {
        res.write(data);
      }
      res.end();
    });
  })
  .listen(7777);

console.log("Servidor a correr na porta 7777");
