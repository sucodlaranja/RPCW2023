var axios = require("axios");

module.exports.list = () => {
  return axios
    .get("http://localhost:3000/todo?_sort=owner")
    .then((resp) => resp.data)
    .catch((err) => err);
};

module.exports.getTodo = (id) => {
  return axios
    .get("http://localhost:3000/todo/" + id)
    .then((resp) => resp.data)
    .catch((err) => err);
};

module.exports.delete = (id) => {
  return axios
    .delete("http://localhost:3000/todo/" + id)
    .then((resp) => resp.data)
    .catch((err) => err);
};

module.exports.add = (todo) => {
  return axios
    .post("http://localhost:3000/todo", todo)
    .then((resp) => resp.data)
    .catch((err) => err);
};

module.exports.update = (todo) => {
  return axios
    .put("http://localhost:3000/todo/" + todo.id, todo)
    .then((resp) => resp.data)
    .catch((err) => err);
};
