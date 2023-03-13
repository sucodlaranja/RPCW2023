var express = require("express");
var router = express.Router();
const todo = require("../controllers/todo");

/* GET home page. */
router.get("/", function (req, res, next) {
  const d = new Date().toISOString().slice(0, 16);
  todo
    .list()
    .then((data) => {
      const task = req.query.id
        ? data.find((t) => t.id == req.query.id)
        : undefined;

      res.render("index", { slist: data, d, task });
    })
    .catch((err) => res.render("error", { error: err }));
});

router.get("/delete/:id", function (req, res, next) {
  todo
    .delete(req.params.id)
    .then(() => res.redirect("/"))
    .catch((err) => res.render("error", { error: err }));
});

router.get("/do/:id", function (req, res, next) {
  todo.getTodo(req.params.id).then((data) => {
    data.checked = true;
    todo.update(data).then(() => res.redirect("/"));
  });
});

router.get("/undo/:id", function (req, res, next) {
  todo
    .getTodo(req.params.id)
    .then((data) => {
      data.checked = false;
      todo.update(data).then(() => res.redirect("/"));
    })
    .catch((err) => res.render("error", { error: err }));
});

router.get("/edit/:id", function (req, res, next) {
  res.redirect("/?id=" + req.params.id);
});

router.post("/add", function (req, res, next) {
  const newTask = req.body;
  newTask.checked = false;
  newTask.date = new Date().toISOString().slice(0, 16);
  todo
    .add(newTask)
    .then(() => res.redirect("/"))
    .catch((err) => res.render("error", { error: err }));
});

router.post("/edit/:id", function (req, res, next) {
  todo
    .getTodo(req.params.id)
    .then((newTask) => {
      if (req.body.owner) newTask.owner = req.body.owner;
      if (req.body.description) newTask.description = req.body.description;

      todo.update(newTask).then(() => res.redirect("/"));
    })
    .catch((err) => res.render("error", { error: err }));
});

module.exports = router;
