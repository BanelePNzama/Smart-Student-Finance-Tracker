 document.getElementById("signupForm").addEventListener("submit", function (e) {
            e.preventDefault();

            let email = document.getElementById("signupEmail").value;
            let password = document.getElementById("signupPassword").value;
            let confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];

            let userExists = users.some(user => user.email === email);
            if (userExists) {
                alert("User already exists");
                return;
            }

            users.push({ email, password });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Account created successfully!");
            window.location.href = "login.html";
        });