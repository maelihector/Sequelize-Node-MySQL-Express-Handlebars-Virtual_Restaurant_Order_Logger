// Make sure the DOM is fully loaded
$(document).ready(function() {
  
  // Global variables
  let customerSelect = $("#existing-customer");
  
  // Function to get list of all customers, then render the list on the DOM
  function getCustomers() {
    $.get("/api/customers", renderCustomerList);
  }
  
  // Functions to build and append an <option> to <select id="existing-customer"> element for each customer in the database
  function renderCustomerList(data) {
    let rowsToAdd = [];
    for (let i = 0; i < data.length; i++) {
      rowsToAdd.push(createCustomerRow(data[i]));
    }
    customerSelect.empty();
    customerSelect.append("<option value='' table=''>Select Customer</option>");
    customerSelect.append(rowsToAdd);
  }
  function createCustomerRow(customer) {
    let listOption = $("<option>");
    listOption.attr("value", customer.id);
    listOption.attr("table", customer.TableId);
    listOption.text(customer.name);
    return listOption;
  }

  // Call function to render customers on DOM on page load
  getCustomers();

  // Function that checks if a certain customer has all of their orders paid=true
  function getCustomer(){
    $.get("/api/customers/3");
  }

});