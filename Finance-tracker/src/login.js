document.querySelector(".login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(
        user => user.email === email && user.password === password
    );

    if (validUser) {
        localStorage.setItem("loggedInUser", email);
        window.location.href = "index.html"; 
    } else {
        alert("Invalid email or password");
    }
});

