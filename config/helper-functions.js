const HelperFunction = {};

// Helper function for SQL syntax
HelperFunction.printQuestionMarks = function(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
HelperFunction.objToSql = function(ob) {
  var arr = [];

  // Loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // Check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // If string with spaces, add quotations
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  // Translate array of strings to a single comma-separated string
  return arr.toString();
}

// Export helper functions
module.exports = HelperFunction;