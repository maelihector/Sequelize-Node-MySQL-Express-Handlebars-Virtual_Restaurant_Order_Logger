// Make sure the DOM is fully loaded
$(document).ready(function () {

  // Global variables
  let customerExists;

  // Function to create a new order
  function sendOrder(customer, table) {
    let newOrder = {
      order_name: $("#new-order").val().trim(),
      CustomerId: customer,
      TableId: table
    }
    // Send the POST request.
    $.ajax("/api/orders", {
      type: "POST",
      data: newOrder
    }).then(function () {
      location.reload();
    });
  }

  // Function to display correct customer form when entering a new order
  function toggleCustomerForm() {
    let existingCheckbox = document.querySelector('input[value="existing"]');
    let newCheckbox = document.querySelector('input[value="new"]');
    let newCustomerForm = $('.new-customer-form');
    let existingCustomerForm = $('.existing-customer-form');
    existingCustomerForm.css('display', 'none');
    let tableSelectDiv = $("#table-select-div");

    existingCheckbox.onchange = function () {
      if (existingCheckbox.checked) {
        existingCustomerForm.css('display', 'block');
        newCustomerForm.css('display', 'none');
        tableSelectDiv.css('display', 'none');
        existingCheckbox.checked = false;
        customerExists = true;
      } else {
        newCustomerForm.css('display', 'block');
      }
    }

    newCheckbox.onchange = function () {
      if (newCheckbox.checked) {
        newCustomerForm.css('display', 'block');
        existingCustomerForm.css('display', 'none');
        tableSelectDiv.css('display', 'block');
        newCheckbox.checked = false;
        customerExists = false;
      } else {
        existingCustomerForm.css('display', 'block');
      }
    }

  }

  // Call toggleCustomerForm on page load
  toggleCustomerForm();

  // Add a new customer
  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event
    event.preventDefault();

    // If customer already exists grab their customer id and table number
    if (customerExists) {

      // Do not submit if customer didn't choose their name from the drop down
      if ($("#existing-customer").find(':selected').attr('value') === '') {
        return;
      }
      // Grab existing customer id and table number
      let customerId = $("#existing-customer").find(':selected').attr('value');
      let tableNum = $("#existing-customer").find(':selected').attr('table');

      // Send new order with customer id and table number
      sendOrder(customerId, tableNum);

      // Else grab new customer id and table number
    } else {

      // Will not submit unless there is a name input
      if (!($("#customer-name").val().trim())) {
        return;
      }

      // Will not submit unless there is a table selected
      if (!($("#table-select").val().trim())) {
        return;
      }

      let newCustomer = {
        name: $("#customer-name").val().trim(),
        TableId: $("#table-select").val().trim()
      };

      $.ajax("/api/customers", {
        type: "POST",
        data: newCustomer

        // After customer has been added with a table id, add their order
      }).then(result => sendOrder(result.id, result.TableId));
    }
  });

  // Click event that changes the Order's devoured to true
  $(".change-devoured").on("click", function (event) {
    // Make sure to preventDefault on a click event.   
    event.preventDefault();

    let id = $(this).data("id");
    let devoured = $(this).data("devoured");

    let newDevouredState = {
      devoured: devoured
    };

    // Send the PUT request.
    $.ajax("/api/order-devoured/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function () {
        console.log("changed devoured to", devoured);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // Click event that changes the Order's paid variable to true
  $(".change-paid").on("click", function (event) {
    // Make sure to preventDefault on a click event.   
    event.preventDefault();

    let id = $(this).data("id");
    let paid = $(this).data("paid");

    let newPaidState = {
      paid: paid
    };

    // Send the PUT request.
    $.ajax("/api/order-paid/" + id, {
      type: "PUT",
      data: newPaidState
    }).then(
      function () {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

});