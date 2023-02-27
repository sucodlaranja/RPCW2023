const http = require("http");
const url = require("url");
const mypages = require("./mypages");
const getRequests = require("./get_request");
const fs = require("fs");
http
  .createServer(async (req, res) => {
    const dicUrl = url.parse(req.url, true);

    const separatedPath = dicUrl.path.split("/");

    if (dicUrl.path == "/") {
      res.writeHead(200, { "Content-Type": "text/html", charset: "utf-8" });
      res.write(mypages.indexPage());
      res.end();
    } else if (dicUrl.path == "/pessoas") {
      const pessoas = await getRequests.getPessoas();
      res.writeHead(200, { "Content-Type": "text/html", charset: "utf-8" });
      res.write(mypages.pessoasPage(pessoas));
      res.end();
    } else if (dicUrl.path === "/w3.css") {
      fs.readFile("w3.css", (err, data) => {
        res.writeHead(200, { "Content-Type": "text/css" });

        if (err) throw err;
        res.write(data);
        res.end();
      });
    } else if (dicUrl.path === "/ordenada") {
      const pessoasordenada = await getRequests.getPessoasOrdenada();
      res.writeHead(200, { "Content-Type": "text/html", charset: "utf-8" });
      res.write(mypages.pessoasPage(pessoasordenada));
      res.end();
    } else if (dicUrl.path === "/sexo") {
      const pessoasSexDist = await getRequests.getPessoasSexDist();
      res.writeHead(200, { "Content-Type": "text/html", charset: "utf-8" });
      res.write(mypages.distPage(pessoasSexDist));
      res.end();
    } else if (separatedPath[1] === "sexo") {
      const pessoasBySex = await getRequests.getPessoasBySex(separatedPath[2]);
      res.writeHead(200, { "Content-Type": "text/html", charset: "utf-8" });
      res.write(mypages.pessoasPage(pessoasBySex));
      res.end();
    } else if (dicUrl.path === "/desporto") {
      const pessoasSportDist = await getRequests.getPessoasSportDist();
      res.writeHead(200, { "Content-Type": "text/html", charset: "utf-8" });
      res.write(mypages.distPage(pessoasSportDist));
      res.end();
    } else if (separatedPath[1] === "desporto") {
      const pessoasBySport = await getRequests.getPessoasBySport(
        separatedPath[2]
      );
      res.writeHead(200, { "Content-Type": "text/html", charset: "utf-8" });
      res.write(mypages.pessoasPage(pessoasBySport));
      res.end();
    } else if (dicUrl.path === "/profissao") {
      const pessoasProfDist = await getRequests.getPessoasProfDist();
      res.writeHead(200, { "Content-Type": "text/html", charset: "utf-8" });
      res.write(mypages.distPage(pessoasProfDist));
      res.end();
    } else if (separatedPath[1] === "profissao") {
      const pessoasByProf = await getRequests.getPessoasByProf(
        separatedPath[2]
      );
      res.writeHead(200, { "Content-Type": "text/html", charset: "utf-8" });
      res.write(mypages.pessoasPage(pessoasByProf));
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "text/html", charset: "utf-8" });
      res.write("Operation not supported");
      res.end();
    }
  })
  .listen(7777);

console.log("Server running at http://localhost:7777/");
