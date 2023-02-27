exports.indexPage = () => {
  return `
          <html>
              <head>
                  <meta charset="utf-8">
                  <title>Lista de Pessoas</title>
                  <link rel="stylesheet" href="w3.css">
              </head>
              <body>
                  <h1>Lista de Pessoas</h1>
                  
                  <table class="w3-table-all">
                  <tr>
                  <th>Tipo</th>
                  
                  </tr>
                          <tr><td><a href="pessoas">Pessoas</a></td></tr>
                          <tr> <td><a href="sexo">Sexo</a></td></tr>
                          <tr> <td><a href="desporto">Desporto</a></td></tr>
                          <tr><td><a href="profissao">Top 10 profissões</a></td></tr>
                        </table>
                 
              </body>
          </html>
      `;
};

exports.pessoasPage = (lista) => {
  return `
        <html>
            <head>
                <meta charset="utf-8">
                <title>Lista de Pessoas</title>
                <link rel="stylesheet" href="w3.css">
            </head>
            <body>
                <h1>Lista de Pessoas</h1>
                
                <table class="w3-table-all">
                <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Sexo</th>
                <th>Idade</th>
                <th>Cidade</th>
                </tr>
                <tr><td><a href="/">Voltar</a></td></tr>
                    ${lista
                      .map(
                        (item) => `<tr>
                        <td>${item.id}</td>
                        <td>${item.nome}</td>
                    <td>${item.sexo}</td>
                    <td>${item.idade}</td>
                    <td>${item.morada.cidade}</td></tr>`
                      )
                      .join("")}
                      
                      </table>
               
            </body>
        </html>
    `;
};

exports.distPage = (lista) => {
  return `
          <html>
              <head>
                  <meta charset="utf-8">
                  <title>Lista de Pessoas</title>
                  <link rel="stylesheet" href="w3.css">
              </head>
              <body>
                  <h1>Lista de Pessoas</h1>
                  
                  <table class="w3-table-all">
                  <tr>
                  <th>Tipo</th>
                  <th>Tamanho</th>
             
                  </tr>
                      ${lista
                        .map(
                          ([key, item]) => `<tr>
                          <td><a href="${item.path}">${key}</a></td>
                          <td>${item.size}</td>
                    </tr>`
                        )
                        .join("")}
                        <tr><td><a href="/">Voltar</a></td></tr>
                        </table>
                        
              </body>
          </html>
      `;
};
