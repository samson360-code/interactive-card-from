let inputt = document.querySelectorAll('input'),
    output = Array.from(document.querySelectorAll('.output')),
    form = document.querySelector("form"),
    button = document.querySelector("form button"),
    error = document.querySelectorAll(".error"),
    thank = document.querySelector(".thank"),
    formReceiver = document.querySelector(".form"),
    cont = document.querySelector("#continue"),
    flag = true,
    changeLisnter = false;

var arrayRegex = [/^[A-Za-z\s]+$/, /^\d+(\.\d+)?$/, /^\d+(\.\d+)?$/, /^\d+(\.\d+)?$/, /^\d+(\.\d+)?$/];
[output[0], output[1]] = [output[1], output[0]];
var inputValidator = function (element, index, event) {
    if (element.value.trim() == "") {
        output[index].innerHTML = element.getAttribute("default");
        error[index].innerHTML = " input can't be empty";
        element.style.outlineColor = "red";
        flag = false;
    }
    else if ((element.getAttribute("type") == "number") && (Number(element.getAttribute("max")) < Number(element.value.length))) {
        error[index].innerHTML = "more than maximum limit";
        element.style.outlineColor = "red";
        flag = false;
    }
    else if (!arrayRegex[index].test(element.value)) {
        error[index].innerHTML = "invalid input";
        element.style.outlineColor = "red";
        flag = false;
    }
    else {
        output[index].innerHTML = element.value;
        error[index].innerHTML = "";
        element.style.outlineColor = "black";
    }
}
inputt.forEach((element, index) => {
    element.addEventListener('input', function (e) {
        inputValidator(element, index);
    })
});

inputt.forEach((element, index) => {
    element.addEventListener('change', function (e) {
        inputValidator(element, index);
        changeLisnter = true;
    })
});
if (changeLisnter) {
    inputt.forEach((element, index) => {
        element.addEventListener('click', function (e) {
            inputValidator(element, index);
        })
    });
}
inputt.forEach((element, index) => {
    element.addEventListener('blur', function () {
        output[index].innerHTML = element.value;
        error[index].innerHTML = "";
        element.style.outlineColor = "black";
        if (!flag && element.value.trim() == "") {
            output[index].innerHTML = element.getAttribute("default");
        }
    })
});

button.addEventListener("click", () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
    flag = true;
    inputt.forEach((element, index) => {
        inputValidator(element, index);
        if (flag) {
            output[index].innerHTML = element.value;
        }

    })
    setTimeout(() => {
        if (flag) {
            setTimeout(button.style.background = "linear-gradient( to right ,hsl(249, 99%, 64%) ,hsl(278, 94%, 30%))")    
            form.reset();
            thank.style.display = "flex";
            formReceiver.style.display = "none"
        }
    }, 500);
  
});
setTimeout(() => {
    cont.addEventListener("click", () => {
        thank.style.display = "none";
        formReceiver.style.display = "flex";
        location.reload();
    });
    
}, 500);
