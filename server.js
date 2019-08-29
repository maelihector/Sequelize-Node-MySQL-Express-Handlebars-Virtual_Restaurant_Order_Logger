// Import app dependencies
const express = require("express");
const bodyParser = require("body-parser");

// Specify the PORT
const PORT = process.env.PORT || 8080;

// Create an instanance of the Express app and set it const 'app'
const app = express();

// Serve static content for the app from the "public" directory in the application directory
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());


// Make Handlebars the default templating engine
// Import 'express-handlebars'
const exphbs = require("express-handlebars");
// Create an engine, name it 'handlebars', and initialize it
// Make its default layout equal to 'main' (view/layouts/main.handlebars)
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// Configure the app's view engine with the above created engine: 'handlebars'
app.set("view engine", "handlebars");


// Import routes and give the server access to them.
const routes = require("./controllers/controllers.js");
app.use(routes);

// Start our server
app.listen(PORT, function() {
  // Log (server-side) when the server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
