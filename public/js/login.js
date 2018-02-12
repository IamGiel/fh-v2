$(document).ready(function () {

    
    // Getting references to our form and inputs
    
    var emailInput = $("#email-input");
    var passwordInput = $("#password-input");
    

    // When the form is submitted, we validate there's an email and password entered
    $("#loggingIn").on("click", function (event) {
        event.preventDefault();
        console.log("on click - >>>>>>>>>");
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    // loginUser does a post to our "api/login" route and if successful, renders the features (map, email, chat) of the page
    function loginUser(email, password) {

        
        $.post("/api/authenticate", {
            email: email,
            password: password
        }).then(function (data) {
            console.log("logged in");
            console.log(data);
        }).catch(function (err) {
            console.log(err);
        });
    }

});

//psuedo code
//1. on button click, ajax call 
