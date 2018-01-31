$(document).ready(function () {
  // when user clicks add-btn

  $(".modal-trigger").on("click", function (event) {
    event.preventDefault();
    
    
    console.log("Adding newWorker...");

    // make a newWorker obj NOTE: THIS IS MYSQL MODEL EQUIVALENT, SO MAKE SURE EACH PROPERTY MATCHES THE MODEL
    var newWorker = {
      url_link: $(".url_link").val().trim(),
      // name from name input
      name: $(".inputName").val().trim(),
      // zip-code from input
      zip_code: $(".inputZipcode").val().trim(),
      // email from input
      email: $(".inputEmail").val().trim(),
      // phone from input
      phone: $(".inputPhone").val().trim(),
      // service input
      service: $("#inputService :selected").text().trim()

    };

    console.log(newWorker);
    // send an AJAX POST-request using jQuery
    $.post("/api/posts", newWorker)
      // on success, run this callback
      .then(function (data) {
        // log the data we found
        console.log(data);
        // tell the user we're adding a newWorker with an alert window
        console.log("Adding newWorker...");
      });
      //match this target id/classes to html or handlebars
      $(".url_link").val(""),
      $(".inputName").val(""),
      $(".inputZipcode").val(""),
      $(".inputEmail").val(""),
      $(".inputPhone").val(""),
      $("#inputService").val("")
  });
});
