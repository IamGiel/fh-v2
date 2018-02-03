$(document).ready(function () {
	// when user clicks add-btn
  
	$(".login-button").on("click", function (event) {
	  event.preventDefault();
        
	  
	console.log("Logging in...");
        $("#tempLoginLink").attr("href", "https://www.w3schools.com/jquery/");

	});
  });
  