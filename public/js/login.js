$(document).ready(function () {
    
    
    
    $(function () {
        $("#yourLoggedin").hide();
        $(".login-button").on("click", function () {
            event.preventDefault();
            $("#nav-mobile, #yourLoggedin ").toggle();
        });
    });
    
    

    

        
    
    
    //button ON CLICK
	// $(".login-button").on("click", function (event) {
    //     event.preventDefault();
        
	  
    //     console.log("Logging in...");
    //     //hide the log in button
    //     $("#yourLoggedin").show();
    //     $("#nav-mobile").hide();
        
    //     //redirect to main page
    //     window.location.href = "#http://localhost:8080/homepage";
    //     //hiding login page
    //     logged = true;
    //     //$("#yourLoggedin").show();

	// });
  });
  