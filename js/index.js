var username = document.getElementById("name");
var email = document.getElementById("email");
var password = document.getElementById("password");
var signUpPage = document.getElementById("signUpPage");
var signInPage = document.getElementById("signInPage");
var signUp = document.getElementById("signUpBtn");
var login = document.getElementById("loginBtn");
var signUpStatus = document.getElementById("status");
var logout = document.getElementById("logout");

// Function to clear form fields
function clearForm(){
    username.value = '';
    email.value = '';
    password.value = '';
}

// Function to switch to the sign-up page
signUpPage.addEventListener("click", function() {
    var name = document.getElementById("name");
    name.classList.replace("d-none", "d-block");
    signInPage.classList.replace("d-none", "d-inline-block");
    signUpPage.classList.replace("d-inline-block", "d-none");
    signUp.classList.replace("d-none", "d-block");
    login.classList.replace("d-block", "d-none");
    signUpStatus.innerHTML = "";
});

// Function to switch to the sign-in page
signInPage.addEventListener("click", function() {
    var name = document.getElementById("name");
    name.classList.replace("d-block", "d-none");
    signInPage.classList.replace("d-inline-block", "d-none");
    signUpPage.classList.replace("d-none", "d-inline-block");
    signUp.classList.replace("d-block", "d-none");
    login.classList.replace("d-none", "d-block");
    signUpStatus.innerHTML = "";
});

var users;

if (localStorage.getItem("users") == null) {
    users = [];
} else {
    users = JSON.parse(localStorage.getItem("users"));
}

// Function to handle sign-up process
signUp.addEventListener("click", function() {
    var nameValue = username.value;
    var emailValue = email.value;
    var passwordValue = password.value;

    var user = {
        name: nameValue,
        email: emailValue,
        password: passwordValue
    };

    if (nameValue == "" || emailValue == "" || passwordValue == "") {
        displayError("All inputs are required");
    } else if (!emailValidation()) {
        displayError("Invalid email");
    } else if (userExists(user)) {
        displayError("Email already exists");
    } else {
        addUser(user);
        clearForm();
        displaySuccess("Account created successfully");
    }
});

// Function to handle login process
login.addEventListener("click", function() {
    var emailValue = email.value;
    var passwordValue = password.value;

    var user = {
        email: emailValue,
        password: passwordValue
    };

    var userName;
    var found = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == user.email && users[i].password == user.password) {
            found = true;
            userName = users[i].name;
            break;
        }
    }
    
    if (found) {
        var home = document.getElementById("welcome");
        home.classList.replace("d-none", "d-block");
        var welcome = document.getElementById("welcomeTxt");
        welcome.innerHTML = "Welcome " + userName;
    } else {
        if (emailValue == "" || passwordValue == "") {
            displayError("All inputs are required");
        } else {
            displayError("Invalid email or password");
        }
    }
    clearForm();
});

// Function to add user to local storage
function addUser(user) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}

// Function to check if user exists
function userExists(user) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].name == user.name && users[i].email == user.email && users[i].password == user.password) {
            return true;
        }
    }
    return false;
}

// Function to validate email
emailValidation = function() {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email.value);
}

// Function to display an error message
function displayError(message){
    signUpStatus.innerHTML = message;
    signUpStatus.style.color = "red";
}

// Function to display a success message
function displaySuccess(message){
    signUpStatus.innerHTML = message;
    signUpStatus.style.color = "green";
}

// Function to logout
logout.addEventListener("click", function() {
    var home = document.getElementById("welcome");
    home.classList.replace("d-block", "d-none");
    signUpStatus.innerHTML = '';
});