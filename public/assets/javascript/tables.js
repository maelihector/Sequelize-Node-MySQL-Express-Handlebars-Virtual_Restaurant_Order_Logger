// Make sure the DOM is fully loaded
$(document).ready(function () {

  // Function to create four tables in database
  function createRestaurantTables(data) {

    if (data.length < 4) {

      for (let i = 1; i < 5; i++) {
        let newTable = {
          table_number: i
        }

        $.ajax("/api/tables", {
          type: "POST",
          data: newTable
        })
      }
    }
  }

  // Function needed to load landing page
  function getTables() {
    $.get("/api/tables").then(data => createRestaurantTables(data));
  }

  // Load Table data as soon as page loads
  getTables();

});