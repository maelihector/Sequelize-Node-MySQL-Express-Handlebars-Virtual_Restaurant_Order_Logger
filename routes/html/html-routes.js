const db = require("../../models");

module.exports = function (app) {
  // Get Tables, and include all associations and nested arrays
  app.get("/", (req, res) => {
    db.Table.findAll({
        include: [{
          all: true,
          nested: true
        }]
      })
      // Render the return object to handlebars
      .then(tables => res.render("index", {
        tables: tables
      }))
      .catch(err => res.json(err));
  });
};