// Require the Order model
const db = require("../../models");


// Routes
module.exports = function (app) {


  // Get all orders
  app.get("/api/orders", (req, res) => {
    db.Order.findAll({
      include: [db.Customer, db.Table]
    }).then(results => res.json(results))
    .catch(err => res.json(err));
  });

  // Post a new order with 'order_name'
  app.post("/api/orders", function (req, res) {
    db.Order.create(req.body)
      .then(results => res.json(results))
      .catch(err => res.json(err));
  });

  // Update an order's 'devoured' boolean
  app.put("/api/order-devoured/:id", function (req, res) {
    db.Order.update({
        devoured: req.body.devoured
      }, {
        where: {
          id: req.params.id
        }
      }).then(results => res.json(results))
      .catch(err => res.json(err));
  });

    // Update an order's 'paid' boolean
    app.put("/api/order-paid/:id", function (req, res) {
      db.Order.update({
          paid: req.body.paid
        }, {
          where: {
            id: req.params.id
          }
        }).then(results => res.json(results))
        .catch(err => res.json(err));
    });

};