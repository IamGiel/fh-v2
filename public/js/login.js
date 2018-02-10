$(document).ready(function () {

    
    // Getting references to our form and inputs
    var loginForm = $("#loggingIn");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");

    emailInput.val("email");
    passwordInput.val("password");
    console.log("firing here")
    

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function (event) {
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

        
        $.post("/api/login", {
            email: email,
            password: password
        }).then(function (data) {
            console.log("logged in");
            res.render(true);
            // If there's an error, log the error
        }).catch(function (err) {
            console.log(err);
        });
    }

});

//psuedo code
//1. on button click, ajax call 
