exports.todoList = function (slist, d, edit = false, id) {
  var pagHTML = `
      <!DOCTYPE html>
      <html>
          <head>
              <meta charset="UTF-8"/>
              <link rel="icon" href="favicon.png"/>
              <link rel="stylesheet" href="w3.css"/>
              <title>Student Management</title>
          </head>
          <body>
          
              <div class="w3-card-4">
  
                  <header class="w3-container w3-teal">
                      <h1>TODO List</h1>
                  </header>
                  <form class="w3-container" method="POST">
                  <fieldset>
                      <legend>Name</legend>
                      
                      <input class="w3-input w3-round" type="text" name="owner">
                  </fieldset>
                  <fieldset>
                      <legend>Description</legend>
                      
                      <input class="w3-input w3-round" type="text" name="description">
                  </fieldset>

                
                  <br/>
                  <button class="w3-btn w3-green w3-mb-2 " type="submit">Add</button>
              </form> `;
  if (edit) {
    element = slist.find((todo) => todo.id === parseInt(id));
    pagHTML += `<form class="w3-container" method="POST">
              <fieldset>
                  <legend>Name</legend>
                  
                  <input class="w3-input w3-round" type="text" name="owner" value="${element.owner}">
              </fieldset>
              <fieldset>
                  <legend>Description</legend>
                  
                  <input class="w3-input w3-round" type="text" name="description" value="${element.description}">
              </fieldset>

            
              <br/>
              <input type="hidden" name="type" value="edit" />
              <input type="hidden" name="id" value="${id}" />
              <button class="w3-btn w3-yellow w3-mb-2 " type="submit">edit</button>
          </form>`;
  }
  pagHTML += `
                  <div class="w3-container">
                  <header class="w3-container w3-red">
                  <h1>TODO List</h1>
                    </header>
                      <table class="w3-table-all">
                          <tr>
                              <th>Owner</th>
                              <th>Description</th>
                              <th>Date</th>
                              <th>Operations </th>
                           
                          </tr>
                  `;
  const todoList = slist.filter((todo) => !todo.checked);
  for (let i = 0; i < todoList.length; i++) {
    pagHTML += `
                  <tr>
                      <td>${todoList[i].owner}</td>
                        <td>${todoList[i].description}</td>
                        <td>${todoList[i].date}</td>
                        <td class="w3-row">
                        <form method="POST" class="w3-col m2">
                                                <input type="hidden" name="type" value="delete"  /> 
                                                <input type="hidden"  name="id" value="${todoList[i].id}"/>
                                                <button class="w3-btn w3-red w3-mb-2 " type="submit">delete</button>
                                                </form>

                                                <form method="POST" class="w3-col m2">
                                                <input type="hidden" name="type" value="startEdit" /> 
                                                <input type="hidden"  name="id" value="${todoList[i].id}"/>
                                                <button class="w3-btn w3-yellow w3-mb-2 " type="submit">edit</button>
                                                </form>

                                                <form method="POST" class="w3-col m2">
                                                <input type="hidden" name="type" value="do" hidden /> 
                                                <input type="hidden"  name="id" value="${todoList[i].id}"/>
                                                <button class="w3-btn w3-green w3-mb-2 " type="submit">do</button>
                                                </form>
                        </td>
                       
                  </tr>
          `;
  }

  pagHTML += `  </table>
  </div>
  <div class="w3-container">
  <header class="w3-container w3-green">
                  <h1>Done List</h1>
                    </header>
                      <table class="w3-table-all">
                          <tr>
                              <th>Owner</th>
                              <th>Description</th>
                              <th>Date</th>
                              <th>Operations </th>
                          </tr>
                          `;

  const doneList = slist.filter((todo) => todo.checked);
  for (let i = 0; i < doneList.length; i++) {
    pagHTML += `
                                          <tr>
                                              <td>${doneList[i].owner}</td>
                                                <td>${doneList[i].description}</td>
                                                <td>${doneList[i].date}</td>
                                                <td class="w3-row">
                                                <form method="POST" class="w3-col m2">
                                                <input type="text" name="type" value="delete" hidden /> 
                                                <input type="text" hidden name="id" value="${doneList[i].id}"/>
                                                <button class="w3-btn w3-red w3-mb-2 " type="submit">delete</button>
                                                </form>

                                                <form method="POST" class="w3-col m2">
                                                <input type="text" name="type" value="startEdit" hidden /> 
                                                <input type="text" hidden name="id" value="${doneList[i].id}"/>
                                                <button class="w3-btn w3-yellow w3-mb-2 " type="submit">edit</button>
                                                </form>

                                                <form method="POST" class="w3-col m2">
                                                <input type="text" name="type" value="undo" hidden /> 
                                                <input type="text" hidden name="id" value="${doneList[i].id}"/>
                                                <button class="w3-btn w3-red w3-mb-2 " type="submit">undo</button>
                                                </form>
                                                </td>
                                                
                                          </tr>
                                  `;
  }

  pagHTML += `
              </table>
              </div>
                  <footer class="w3-container w3-blue">
                      <h5>Generated by RPCW2023 in ${d}</h5>
                  </footer>
              </div>
          </body>
      </html>
      `;
  return pagHTML;
};

exports.deleteTodo = function (todo, d) {
  var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Delete Person</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Delete Person</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Name</legend>
                        <label>Owner</label>
                        <input class="w3-input w3-round" type="text" name="owner" readonly value="${todo.owner}">
                        <label>Description</label>
                        <input class="w3-input w3-round" type="text" name="description" readonly value="${todo.owner}">
                    </fieldset>

                   
                    <br/>
                </form>

                <footer class="w3-container w3-purple">
                    <h5>Generated by RPCW2023 in ${d} - [<a href="/">Return</a>]</h5>
                </footer>
            
            </div>
            `;
  return pagHTML;
};

exports.editTodo = function (todo, d, readOnly = false) {
  var pagHTML = `
      <!DOCTYPE html>
      <html>
          <head>
              <meta charset="UTF-8"/>
              <link rel="icon" href="favicon.png"/>
              <link rel="stylesheet" href="w3.css"/>
              <title>Form demo</title>
          </head>
          <body>
              <div class="w3-card-4">
                  <header class="w3-container w3-purple">
                      <h2>Person Form</h2>
                  </header>
              
                  <form class="w3-container" method="POST">
                      <fieldset>
                          <legend>Name</legend>
                          <label>Owner</label>
                          <input class="w3-input w3-round" type="text" name="owner"`;
  if (readOnly) pagHTML += ` readonly `;

  pagHTML += `value="${todo.owner}">
                          <label>Description</label>
                          <input class="w3-input w3-round" type="text" name="description"`;
  if (readOnly) pagHTML += ` readonly `;

  pagHTML += `value="${todo.description}">
                      </fieldset>
  
                     
                      <br/>`;

  if (!readOnly)
    pagHTML += `<button class="w3-btn w3-purple w3-mb-2" type="submit">Edit</button>`;
  pagHTML += ` </form>
  
                  <footer class="w3-container w3-purple">
                      <h5>Generated by RPCW2023 in ${d} - [<a href="/">Return</a>]</h5>
                  </footer>
              
              </div>
              `;
  return pagHTML;
};
