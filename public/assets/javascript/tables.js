// Make sure the DOM is fully loaded
$(document).ready(function () {

  // Function needed to load landing page
  function getTables() {
    $.get("/api/tables");
  }

  // Load Table data as soon as page loads
  getTables();

});