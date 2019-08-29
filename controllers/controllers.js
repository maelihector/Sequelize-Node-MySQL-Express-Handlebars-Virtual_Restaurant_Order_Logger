// Import express
const express = require("express");

// Create an express router to handle app routes
const router = express.Router();

// Import order model to use its database functions
const order = require("../models/order.js");

// Create all our routes and set up logic within those routes where required
// Get all orders data and dump on index.handlebars
router.get("/", function(req, res) {
  order.all(function(data) {
    let hbsObject = {
      orders: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

// Post a new order with 'order_name'
router.post("/api/orders", function(req, res) {
  order.create([
    "order_name"
  ], [
    req.body.order_name
  ], function(result) {
    // Send back the ID of the new order
    res.json({ id: result.insertId });
  });
});

// Update an order's 'devoured' boolean
router.put("/api/orders/:id", function(req, res) {
  let condition = "id = " + req.params.id;

  console.log("condition", condition);

  order.update({
    devoured: req.body.devoured,
    paid: req.body.paid
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
