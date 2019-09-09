// Require the Order model
const db = require("../../models");


// Table routes
module.exports = function (app) {

  // Get all tables including nested associations
  app.get("/api/tables", function (req, res) {
    db.Table.findAll({
        include: [{ all: true, nested: true }]
      }).then(results => res.json(results))
      .catch(err => res.json(err))
  });

  // Get one table based on id
  app.get("/api/tables/:id", function (req, res) {
    db.Table.findOne({
      include: [db.Customer, db.Order],
        where: {
          id: req.params.id
        }
      }).then(results => res.json(results))
      .catch(err => res.json(err))
  });

};