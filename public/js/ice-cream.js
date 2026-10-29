document.getElementById("ice-cream-form").onsubmit = () => {

    let isValid = true;

    clearErrors();

    let name = document.getElementById("fname").value.trim();
    if (name === "") {
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    
    let lname = document.getElementById("lname").value.trim();
    if (lname === "") {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    let email = document.getElementById("email").value.trim();
    if (email === "" || !email.includes("@")) {
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }

    let flavor = document.getElementById("flavor").value;
    if (flavor === "none") {
        document.getElementById("err-flavor").style.display = "block";
        isValid = false;
    }

    let coneSelected = false;
    let coneButtons = document.getElementsByName("conetype");
    for (let i = 0; i < coneButtons.length; i++) {
        if (coneButtons[i].checked) {
            coneSelected = true;
        }
    }

    if (!coneSelected) {
        document.getElementById("err-cone").style.display = "block";
        isValid = false;
    }

    return isValid;
};

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}