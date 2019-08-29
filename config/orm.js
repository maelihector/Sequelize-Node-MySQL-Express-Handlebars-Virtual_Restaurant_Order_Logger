// Import MySQL connection
const connection = require("./connection.js");

// Import helper functions
const HelperFunction = require('./helper-functions.js');

// Create orm object for all SQL statement functions
const orm = {

  // Select all orders 
  all: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + " ORDER BY id desc;";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  // Insert a new order
  create: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += HelperFunction.printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  // Update an order
  update: function (table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += HelperFunction.objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
};

// Export orm object
module.exports = orm;