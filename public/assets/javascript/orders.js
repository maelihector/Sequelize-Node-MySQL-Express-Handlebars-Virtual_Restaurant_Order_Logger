// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  // Add a new order with just new'order_name'
  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    let newOrder = {
      order_name: $("#new-order").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/orders", {
      type: "POST",
      data: newOrder
    }).then(
      function () {
        console.log("created new order");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".change-devoured").on("click", function (event) {
    // Make sure to preventDefault on a click event.   
    event.preventDefault();

    let id = $(this).data("id");
    let devoured = $(this).data("devoured");

    let newDevouredState = {
      devoured: devoured,
      paid: 0
    };

    // Send the PUT request.
    $.ajax("/api/orders/" + id, {
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

  $(".change-paid").on("click", function (event) {
    // Make sure to preventDefault on a click event.   
    event.preventDefault();

    let id = $(this).data("id");
    let paid = $(this).data("paid");

    console.log(paid);

    let newPaidState = {
      devoured: 1,
      paid: paid
    };

    // Send the PUT request.
    $.ajax("/api/orders/" + id, {
      type: "PUT",
      data: newPaidState
    }).then(
      function () {
        console.log("changed paid to", paid);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});