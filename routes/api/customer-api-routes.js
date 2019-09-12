// Require the Order model
const db = require("../../models");


// Customer routes
module.exports = function (app) {

  // Get all customers including their orders array
  app.get("/api/customers", function (req, res) {
    db.Customer.findAll({
      include: [db.Order]
    }).then(results => res.json(results))
    .catch(err => res.json(err))
  });

  // Get one customer based on id
  app.get("/api/customers/:id", function (req, res) {
    db.Customer.findOne({
        where: {
          id: req.params.id
        },
        include: [{ all: true, nested: true }]
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

  // Update leftTable to true for customer based on id
  app.put("/api/customers/:id", function (req, res) {
    db.Customer.update({
      leftTable: 1,
    },{
        where: {
          id: req.params.id
        }
      }).then(results => res.json(results))
      .catch(err => res.json(err))
  });

};