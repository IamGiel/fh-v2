$(document).ready(function () {
	// when user clicks add-btn
    

	$(".login-button").on("click", function (event) {
        event.preventDefault();
        
	  
    console.log("Logging in...");
    //hide the log in button
        $("#nav-mobile").hide();
        $("#nav-mobile").text("You are in!");

        window.location.href = "#http://localhost:8080/homepage";
       

	});
  });
  