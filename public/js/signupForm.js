$(document).ready(function () {
  // when user clicks add-btn

  $("#formSubmit").on("click", function (event) {
    event.preventDefault();
    if (!newWorker.url_link) {
      alert("please check all the input fields");
    }
    
    
    console.log("Adding newWorker..."); 

    // make a newWorker obj NOTE: THIS IS MYSQL MODEL EQUIVALENT, SO MAKE SURE EACH PROPERTY MATCHES THE MODEL
    var newWorker = {
      url_link: $(".url_link").val().trim(),
      // name from name input
      name: $(".inputName").val().trim(),
      // zip-code from input
      zip_code: $(".inputZipcode").val().trim(),
     //comment on expertise
      comment: $(".expert_on").val().trim(),
      // email from input
      email: $(".inputEmail").val().trim(),
      // password from input
      password: $(".inputPassword").val().trim(),
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
      });
      // clear input fields
      $(".url_link").val(""),
      $(".inputName").val(""),
      $(".inputZipcode").val(""),
      $(".expert_on").val().trim(),
      $(".inputEmail").val(""),
      $(".inputPassword").val(""),
      $(".inputPhone").val(""),
      $("#inputService").val("")
  });
});
