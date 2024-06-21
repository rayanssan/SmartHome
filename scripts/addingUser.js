"use strict";

var permissions = [document.getElementById(""), document.getElementById(""), document.getElementById(""), document.getElementById(""), document.getElementById(""), document.getElementById("")]
var permissionsList = document.getElementById("permissionsList");
var environmentsList = document.getElementById("environmentsList");
var iconsList = document.getElementById("iconsList");

var addButton = document.getElementById("addButton");
if (addButton) {
    addButton.innerText = lang == "en" ? "Please finish filling this form" : "Por favor preencha este formulário";
}

var nameInput = document.getElementById("nameInput");
var addButton = document.getElementById("addButton");

class User {
    constructor(name, permissions, environments, icon) {
        this.name = name;
        this.permissions = permissions;
        this.environments = environments;
        this.icon = icon;
    }
}

function createUser() {
    var permissionArray = JSON.parse(localStorage.getItem("permissionArray")) || [];
    var environmentSelectArray = JSON.parse(localStorage.getItem("environmentSelectArray")) || [];
    var iconArray = JSON.parse(localStorage.getItem("iconArray")) || [];
    var newUser = new User(document.getElementById("nameInput").value, permissionArray, environmentSelectArray, iconArray);
    var users = JSON.parse(localStorage.getItem("users")) || [];

    if (permissionArray.length != 0) {
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
    }

}

function validatePermission(id) {
    var permission = document.getElementById(id);
    var permissionArray = JSON.parse(localStorage.getItem("permissionArray")) || [];
    var index = permissionArray.indexOf(id);
    if (permission.style.filter === "invert(100%)") {
        permission.style.filter = "none";
        permissionArray.splice(index, 1);
        localStorage.setItem("permissionArray", JSON.stringify(permissionArray));
    } else {
        permission.style.filter = "invert(100%)";
        permissionArray.push(id);
        localStorage.setItem("permissionArray", JSON.stringify(permissionArray));
    }

}

function validateEnvironment(id) {
    var environment = document.getElementById(id);
    var environmentArray = JSON.parse(localStorage.getItem("environmentArray")) || [];
    var index = environmentArray.indexOf(id);
    if (environment.style.filter === "invert(100%)") {
        environment.style.filter = "none";
        environmentArray.splice(index, 1);
        localStorage.setItem("environmentArray", JSON.stringify(environmentArray));
    } else {
        environment.style.filter = "invert(100%)";
        environmentArray.push(id);
        localStorage.setItem("environmentArray", JSON.stringify(environmentArray));
    }

}

function validateIcon(id) {
    document.getElementById("iconsList").querySelectorAll("button").forEach(button => {
        button.style.border = "unset";
        button.style.padding = "9px";
    })

    var icon = document.getElementById(id);
    var iconArray = JSON.parse(localStorage.getItem("iconArray")) || [];
    var index = iconArray.indexOf(id);
    if (icon.style.padding === "15px") {
        icon.style.padding = "9px";
        icon.style.border = "0px"
        iconArray.splice(index, 1);
        localStorage.setItem("iconArray", JSON.stringify(iconArray));
    } else {
        icon.style.padding = "15px";
        icon.style.border = "5px solid green"
        iconArray = []
        iconArray.push(id);
        localStorage.setItem("iconArray", JSON.stringify(iconArray));
    }

}

function addEnvironmentSelect() {
    var environmentSelect = document.getElementById("environmentsSelect");
    var environmentSelectArray = JSON.parse(localStorage.getItem("environmentSelectArray")) || [];

    var selectedEnvironment = environmentSelect.value;

    environmentSelectArray = []
    environmentSelectArray.push(selectedEnvironment);
    localStorage.setItem("environmentSelectArray", JSON.stringify(environmentSelectArray));

}

function checkInputs() {
    if (nameInput.value != '' && (document.querySelector('#admin').checked ||
        Array.from(document.querySelectorAll('#permissionsList button')).some(button => button.style.filter == 'invert(100%)')
        && Array.from(document.querySelectorAll('#environmentsSelect input[type=checkbox]')).some(checkbox => checkbox.checked))
        && Array.from(document.querySelectorAll('#iconsList button')).some(button => button.style.borderColor == 'green')) {
        addButton.disabled = false;
        addButton.innerText = lang == "en" ? "Create new profile" : "Criar novo perfil";
    } else {
        addButton.disabled = true;
        addButton.innerText = lang == "en" ? "Please finish filling this form" : "Por favor preencha este formulário";
    }
}

if (document.body.id == "SmartHomeAddUserPage") {
    nameInput.addEventListener("input", checkInputs);
    Array.from(document.querySelectorAll('#permissionsList button')).forEach(button => {
        button.addEventListener("click", checkInputs);
    })
    Array.from(document.querySelectorAll('#iconsList button')).forEach(button => {
        button.addEventListener("click", checkInputs);
    });
    Array.from(document.querySelectorAll('input[type=checkbox]')).forEach(checkbox => {
        checkbox.addEventListener("change", checkInputs)
    })

    document.getElementById("perm-cancel").addEventListener("click", () => {
        Array.from(document.querySelectorAll('#permissionsList button')).forEach(button => {
            button.style.filter = 'unset';
        });
        checkInputs();
    })

    document.getElementById("icon-cancel").addEventListener("click", () => {
        Array.from(document.querySelectorAll('#iconsList button')).forEach(button => {
            button.style.removeProperty('border');
            button.style.removeProperty('padding');
        })
        checkInputs();
    })

    document.getElementById('environmentsSelect').innerHTML += `<input type="checkbox" oninput="checkInputs()" name="room"\ 
    id="environmentOption-All Environments" checked value="All Environments">
    <label for="environmentOption-All Environments">${lang == "en" ? "All Environments" : "Todos os Ambientes"}</label><br>`;
    document.getElementById('environmentsSelect').innerHTML += `${JSON.parse(localStorage.getItem("environments")).map(environment => `
    <input type="checkbox" oninput="checkInputs()" id="routineEnvironmentOption-${environment.name}" name="room" value="${environment.name}">
    <label for="routineEnvironmentOption-${environment.name}">${environment.name}</label><br>`).join('')}`;
}

function checkCheckBox() {
    var permButton = document.getElementById("permissions");
    var permText = document.querySelector(".subp");
    var checkBox = document.getElementById("admin");
    var permissionArray = JSON.parse(localStorage.getItem("permissionArray")) || [];

    checkBox.addEventListener("change", () => {
        if (checkBox.checked) {
            permButton.disabled = true;
            permText.style.display = "none";
            permButton.textContent = lang == "en" ? "Admins have all the permissions" : lang == "pt" ? "Admins têm todas as permissões" : null;
            permissionArray.push("admin");
            localStorage.setItem("permissionArray", JSON.stringify(permissionArray));
        } else {
            permButton.disabled = false;
            permText.style.display = "block";
            permButton.textContent = lang == "en" ? "See the list of permissions" : lang == "pt" ? "Ver lista de permissões" : null;
            localStorage.removeItem("permissionArray");
        }
    });
}

function showPermissions() {
    permissionsList.style.display = "flex";
}

function showEnvironments() {
    environmentsList.style.display = "flex";
}

function showIcons() {
    iconsList.style.display = "flex";
}

//var userIcon = 
//var userName = 


function jorge(status) {
    if (localStorage.getItem('users')) {
        const user = document.getElementById("div-user-3");
        const trueIcon = document.getElementById("user3");
        const usersData = JSON.parse(localStorage.getItem('users'));

        if (usersData && usersData.length > 0) {
            const currentUser = usersData[0];
            const name = currentUser.name;

            if (status) {
                user.style.display = "block";
                document.getElementById("user-3-name-display").innerHTML = name;

                const iconArray = JSON.parse(localStorage.getItem('iconArray'));
                if (iconArray) {
                    const icon = iconArray[0];
                    const iconElement = document.getElementById(icon);

                    if (iconElement) {
                        const iconImage = iconElement.getElementsByTagName('img')[0];
                        if (iconImage) {
                            trueIcon.src = iconImage.src;
                        }
                    }
                }
            } else {
                user.style.display = "none";
            }
        }
    }
}


function passJorgeStatus(status) {
    localStorage.setItem("jorgeStatus", JSON.stringify(status));
}

function executeJorge() {
    var statusJorge = JSON.parse(localStorage.getItem("jorgeStatus"));
}

window.addEventListener("load", executeJorge());

function realIcon(validation) {
    if (validation == "user1") {
        localStorage.setItem("icon", "./media/images/man.png");
    } else if (validation == "user2") {
        localStorage.setItem("icon", "./media/images/woman.png");
    } else if (validation == "user3") {
        localStorage.setItem("icon", "./media/images/student.png");
    }

    location.href = "SmartHome.html"
}

if (document.body.id == "SmartHomePage" || document.body.id == "SmartHomeGroceriesPage" || document.body.id == "SmartHomeHelpPage") {
    function myFunction() {
        if (localStorage.getItem("icon") === "./media/images/student.png" && document.body.id === "SmartHomePage") {
            document.querySelectorAll(".environment").forEach(environment => {
                const paragraphText = environment.querySelector('p').innerText.toLowerCase();
                if (paragraphText.includes("jorge")) {
                    environment.style.setProperty("display", "flex", "important");
                }
            });
        }
        var icon = localStorage.getItem("icon") || "./media/images/man.png";
        console.log("hey you found the easter egg. congrats 🥚");
        document.getElementById('user').querySelector("img").src = icon;
    }
    myFunction();
}