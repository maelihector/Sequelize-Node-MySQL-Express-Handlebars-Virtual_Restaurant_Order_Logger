// Make sure the DOM is fully loaded
$(document).ready(function () {

  // Global variables
  let customerSelect = $("#existing-customer");

  // Function to get list of all customers and render the list on the DOM
  function getCustomers() {
    $.get("/api/customers", renderCustomerList);
  }

  // Functions to build, and append an <option> for each customer in the database for the dropdown <select> list
  function renderCustomerList(data) {
    let rowsToAdd = [];
    for (let i = 0; i < data.length; i++) {
      rowsToAdd.push(createCustomerRow(data[i]));
    }
    customerSelect.empty();
    customerSelect.append("<option value='' table=''>Select Customer</option>");
    customerSelect.append(rowsToAdd);

    // Call function that checks which customer are paid in full
    checkPaidCustomers(data);
  }
  // Function that creates each row within the customer list
  function createCustomerRow(customer) {
    let listOption = $("<option>");
    listOption.attr("value", customer.id);
    listOption.attr("table", customer.TableId);
    listOption.text(customer.name);
    return listOption;
  }

  // Function that checks which customers are paid up
  function checkPaidCustomers(data) {

    // Create variables to store paid and unpaid customers
    let paidCustomers = [];
    let unpaidCustomers = [];

    // Loop through each customer object in customers array
    $.each(data, function (customers, customer) {

      // Grab reference to each customer's Orders array, and customer id
      let customerOrders = customer.Orders;
      let customerId = customer.id;

      // Loop through each customer's Orders array
      $.each(customerOrders, function (order, paid) {

        // Grab reference to each order's paid value
        let paidUp = paid.paid;
        // If order is paid=true, push customer id to paidCustomers array, else push to unpaidCustomers array
        if (paidUp) {
          paidCustomers.push(customerId);
        } else {
          unpaidCustomers.push(customerId);
        }

      });
    });

    // Filter duplicate customer ids from both arrays (duplicates are present because each customer can have several orders)
    let uniquePaidCustomers = paidCustomers.filter((item, i, array) => array.indexOf(item) === i);
    let uniqueUnpaidCustomers = unpaidCustomers.filter((item, i, array) => array.indexOf(item) === i);
    // Get array of customers where  only ALL orders are paid for (not if customer also has an unpaid order)
    let allPaidCustomers = ($(uniquePaidCustomers).not(uniqueUnpaidCustomers).get());

    // Only call the grayCustomerOut function if there is at least one allPaidCustomer present
    if (allPaidCustomers.length > 0) {
      grayCustomerOut(allPaidCustomers);
    }
  }

  // Function that grays out customer with all orders paid
  function grayCustomerOut(allPaidCustomers) {

    // Loop through all paid customers
    for (let i = 0; i < allPaidCustomers.length; i++) {
      // Find customer's name element on the DOM
      let customerSeat = document.querySelector('h3[customerId="' + allPaidCustomers[i] + '"]');
      // Gray out element
      $(customerSeat).css("color", "#8c8989");

    }
  }

  // Call function to render customers to DOM on page load
  getCustomers();

});