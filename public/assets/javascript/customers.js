// Make sure the DOM is fully loaded
$(document).ready(function () {

  // Function to get list of all customers and render the list on the DOM
  function getCustomers() {
    $.get("/api/customers")
      .then((data) => checkPaidCustomers(data))
      .then(() => filterCustomers())
      .then(() => addDeleteBtns());
  }

  // Create variables to store paid and unpaid customers
  let paidCustomers = [];
  let unpaidCustomers = [];

  // Function that checks which customers are paid up
  function checkPaidCustomers(data) {

    for (let i = 0; i < data.length; i++) {

      if (!data[i].leftTable) {

        // Grab reference to each customer's Orders array, and customer id
        let customerOrders = data[i].Orders;
        let customerId = data[i].id;

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
      }
    }
  }

  // Filter duplicate customer ids from both arrays (duplicates are present because each customer can have several orders)
  function filterCustomers() {

    let uniquePaidCustomers = paidCustomers.filter((item, i, array) => array.indexOf(item) === i);
    let uniqueUnpaidCustomers = unpaidCustomers.filter((item, i, array) => array.indexOf(item) === i);

    // Get array of customers where  only ALL orders are paid for (not if customer also has an unpaid order)
    let allPaidCustomers = ($(uniquePaidCustomers).not(uniqueUnpaidCustomers).get());

    // Add a delete btn to customers who are paid up
    if (allPaidCustomers.length > 0) {

      // Loop through all paid customers
      for (let i = 0; i < allPaidCustomers.length; i++) {

        // Find customer's name element on the DOM
        let customerSeat = document.querySelector('h3[customerId="' + allPaidCustomers[i] + '"]');
        // Gray out element
        $(customerSeat).css("color", "#8c8989");
        // Create and add button
        let btn = $("<button>");
        btn.attr("id", "leftTable");
        btn.text("X");
        // Grab reference to parent element where button should append to
        customerSeat = customerSeat.parentElement;
        // Append button
        $(customerSeat).append(btn);
      }
    }
  }

  // Function that adds an event listener to the delete buttons created at filterCustomers()
  function addDeleteBtns() {
    // Grab all buttons needed
    const buttons = document.querySelectorAll("#leftTable");
    // Attach event listener to each button
    for (const button of buttons) {
      button.addEventListener('click', updateDatabase);
    }
  }

  // Function that is called when a click event on a delete button is triggered
  function updateDatabase() {

    // Grab customer id, and customer div from DOM
    let customerToUpdate = $(this)[0].previousElementSibling.attributes[0].value;
    let divToRemove = $(this)[0].parentElement.parentElement;

    // Remove customer div from DOM
    $(divToRemove).remove();

    // Send upated call to api
    $.ajax("/api/customers/" + customerToUpdate, {
      type: "PUT"
    }).then(() => location.reload());
  }

  // Call function to render customers to DOM on page load
  getCustomers();

});