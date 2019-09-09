// Require the Order model
const db = require("../../models");


// Customer routes
module.exports = function (app) {

  app.get("/api/customers", function (req, res) {
    db.Customer.findAll({
      include: [db.Order, db.Table]
    }).then(results => res.json(results))
    .catch(err => res.json(err))
  });

  // Get one customer based on id
  app.get("/api/customers/:id", function (req, res) {
    db.Customer.findOne({
        where: {
          id: req.params.id
        }
      }).then(results => res.json(results))
      .catch(err => res.json(err))
  });

  // Add a customer
  app.post("/api/customers", function (req, res) {
    db.Customer.create(req.body)
      .then(dbCustomer => {
        res.json(dbCustomer);
        console.log(dbCustomer);
      })
      .catch(err => res.json(err))
  });

  // Delete a customer based on id
  app.delete("/api/customers/:id", function (req, res) {
    db.Customer.destroy({
        where: {
          id: req.params.id
        }
      }).then(results => res.json(results))
      .catch(err => res.json(err))
  });

};