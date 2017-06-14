$(document).ready(function(){
    $("#login").submit(function(event){
        event.preventDefault();
        var requestConfig={
            method: "POST",
            url: "/",
            contentType: 'application/json',
            data: JSON.stringify({
                operation: "signIn",
                email: $("#email").val(),
                password: $("#password").val()
            })
        };
        $.ajax(requestConfig).then(function(message){
            var failure = document.getElementById("failure-message");
            if(failure){
                var container = document.getElementById("login");
                container.removeChild(failure);
            }
            if(message.success){
                window.location.href="/routes/playground";
            } else{
                console.log("fail to login");
                var failure = document.createElement("div");
                failure.id = "failure-message";
                var failureMessage = document.createTextNode("Invalid account or password, try again.");
                failure.style.color = "#ff0000";
                failure.appendChild(failureMessage);
                var container = document.getElementById("login");
                var sibling = document.getElementById("sign-in");
                container.insertBefore(failure, sibling);
            }
        });
    })
    $("#register").click(function(event){
        event.preventDefault();
        var requestConfig = {
            method: "POST",
            url: "/",
            contentType: 'application/json',
            data: JSON.stringify({
                operation: "register",
                email: $("#email").val(),
                password: $("#password").val()
            })
        }
        $.ajax(requestConfig).then(function(response){
            var container = document.getElementById("login");
            var sibling = document.getElementById("sign-in");
            var displayMessage = document.getElementById("failure-message");
            container.removeChild(displayMessage);
            if(!response.success){
                var failure = document.createElement("div");
                failure.id = "failure-message";
                var failureMessage = document.createTextNode(response.message);
                failure.style.color = "#ff0000";
                failure.appendChild(failureMessage);
                container.insertBefore(failure, sibling);
            } else{
                var failure = document.createElement("div");
                failure.id = "failure-message";
                var failureMessage = document.createTextNode("Success to create account, please log in.");
                failure.style.color = "#00ff00";
                failure.appendChild(failureMessage);
                container.insertBefore(failure, sibling);
            }
        });
    })
})
