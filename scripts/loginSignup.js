// const loginContainer=document.getElementById("loginContainer");

const loginBtn = document.getElementById("login");
const remembermeCheckbox = document.getElementById("rememberMe");
const wrongInput = document.getElementById("wrongInput");
const emptyInput = document.getElementById("emptyInput");

const users = JSON.parse(localStorage.getItem("users")) || [];

function isValidUser(username, password) {
    return users.some(user => user.username === username && user.password === password);
}

function checkLoginCredentials() {
    // wrongInput.classList.add("hide");

    const inputUsername = document.getElementById("username").value;
    const inputPassword = document.getElementById("password").value;

    if (inputUsername === "" || inputPassword === ""){
        console.log("test");
        emptyInput.classList.remove("hide");}
    else if (isValidUser(inputUsername, inputPassword)) {
        const remember = remembermeCheckbox.checked;
        remember ? localStorage.setItem("remember", "yes") : localStorage.setItem("remember", "no");
        localStorage.setItem("loggedIn", "yes");
        window.location.href = "../index.html";
    } else
        wrongInput.classList.remove("hide");
}

function checkLoggedUser() {
    // const userLoggedIn = localStorage.getItem("loggedIn");
    userLoggedIn=yes;
    if (userLoggedIn == "yes" || userLoggedIn == null) {
        window.location.href = "../index.html";
    }
}

window.onload = checkLoggedUser();

loginBtn.addEventListener("click", checkLoginCredentials);
