const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
    let isValid = true;

    const name = document.getElementById("name");
    const nameError = document.getElementById("name-error");
    if (name.value.trim() === "") {
        nameError.textContent = "Please enter your name.";
        isValid = false;
    } else {
        nameError.textContent = "";
    }

    const email = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    if (email.value.trim() === "") {
        emailError.textContent = "Please enter your email.";
        isValid = false;
    } else if (!email.value.includes("@")) {
        emailError.textContent = "Your email needs an @ symbol.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    const flavor = document.getElementById("flavor");
    const flavorError = document.getElementById("flavor-error");
    if (flavor.value === "") {
        flavorError.textContent = "Please choose a flavor.";
        isValid = false;
    } else {
        flavorError.textContent = "";
    }

    const cone = document.querySelector('input[name="conetype"]:checked');
    const coneError = document.getElementById("cone-error");
    if (cone === null) {
        coneError.textContent = "Please choose a cone.";
        isValid = false;
    } else {
        coneError.textContent = "";
    }

    if (!isValid) {
        event.preventDefault();
    }
});