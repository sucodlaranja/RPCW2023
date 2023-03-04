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
                        
                        <td><a href="pessoa/${item.id}">${item.id}</a></td>
                        <td>${item.nome}</td>
                    <td>${item.sexo}</td>
                    <td>${item.idade}</td>
                    <td>${item.morada.cidade}</td></tr>`
                      )
                      .join("")}
                      
                      </tabe>
               l
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

exports.pessoaPage = (pessoa) => {
  let html = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>${pessoa[0][1]}</title>
            <link rel="stylesheet" href="../w3.css">
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-margin">
                    <h1 class="w3-left w3-text-white">${pessoa[0][1]}</h1>
                </header>
                <div class="w3-container w3-round-xlarge w3-blue-grey">
                    <ul class="w3-ul">
                    <a href="/" class="w3-btn w3-white w3-border w3-border-teal w3-round-xlarge w3-center-elem">Voltar</a>
`;

  pessoa.forEach(([key, value]) => {
    if (value instanceof Object && !(value instanceof Array)) {
      html += `
                <li class="w3-bar no-padding w3-hover-teal">
                    <div class="w3-bar-item w3-round-large">
                        <span class="w3-tag w3-padding w3-round-large w3-teal w3-center">${key}</span>
                            <ul class="w3-ul w3-margin-left">
`;
      Object.entries(value).forEach(([key2, value2]) => {
        html += `
                                <li class="w3-bar no-padding">
                                    <div class="w3-bar-item w3-round-large">
                                        <span class="w3-tag w3-padding w3-round-large w3-teal w3-center">${key2}</span>
                                        <span class="w3-margin-left">${value2}</span>
                                    </div>
                                </li>
`;
      });

      html += `
                            </ul>
                    </div>
                </li>
`;
    } else {
      html += `
                                <li class="w3-bar no-padding w3-hover-teal">
                                    <div class="w3-bar-item w3-round-large">
                                        <span class="w3-tag w3-padding w3-round-large w3-teal w3-center">${key}</span>
                                        <span class="w3-margin-left">${value}</span>
                                    </div>
                                </li>
        `;
    }
  });

  html += `
                    </ul>
                </div>
            </div>
        </body>
    </html>
`;
  return html;
};
