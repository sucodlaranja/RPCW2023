var axios = require("axios");
const todo = require("../models/todo");

module.exports.list = () => {
  return todo.find().then((data) => data);
};

module.exports.delete = (id) => {
  return todo.deleteOne({ _id: id });
};

module.exports.add = (newTodo) => {
  return todo.create(newTodo).then((data) => data);
};

module.exports.update = (id, changedTodo) => {
  return todo.updateOne({ _id: id }, { $set: changedTodo });
};
