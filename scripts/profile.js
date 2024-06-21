"use strict";

var buttons = document.getElementById("profileContainer");
var post = document.getElementById("formUser");
var returnButton = document.getElementById("return-from-groceries-button");
var formPIN = document.getElementById("formPIN");
var formPINconfirm = document.getElementById("formPINconfirm");
var formAdminConfirm = document.getElementById("formAdminConfirm");
var permissionButton = document.getElementById("permissionButton");
var environmentButton = document.getElementById("environmentButton");

var addUserWindow = document.getElementById("add-user-window");
var addPermissionWindow = document.getElementById("add-permission-window");

var nameInput = document.getElementById("nameInput");
var passwordInput = document.getElementById("passwordInput");
var passConfInput = document.getElementById("passConfInput");
var addButton = document.getElementById("addButton");

function addProfiles(){
    buttons.style.display = "none";
    returnButton.style.display="none";
    post.style.display = "flex";
    formPIN.style.display="flex"
    permissionButton.style.display="flex";
    formPINconfirm.style.display="flex";
    formAdminConfirm.style.display="flex";
    document.getElementById("welcome").innerHTML = "Add Profile";
}

function showProfiles(){
    buttons.style.display = "flex";
    post.style.display = "none";
    returnButton.style.display="flex";
    formPIN.style.display="none"
    permissionButton.style.display="none";
    formPINconfirm.style.display="none";
    formAdminConfirm.style.display="none";
    permissionsList.style.display="none";
    document.getElementById("welcome").innerHTML = "Welcome back!";
}

function showCreateUser(){
    addUserWindow.style.display = "block";
    addPermissionWindow.style.display = "none";
}

function validatePIN(){
    if (passwordInput.value.length == 4 && passConfInput.value.length == 4 && passwordInput.value == passConfInput.value) {
        return true;
    } else {
        return false;
    }
}

const windows = document.querySelector(".windows"),
      linksPerm = document.querySelectorAll(".link_perm"),
      linksEnv = document.querySelectorAll(".link_env"),
      linksIcon = document.querySelectorAll(".link_icon");      

linksPerm.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        windows.classList.toggle("show-permissions");         
    })
});

linksEnv.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        windows.classList.toggle("show-environments");  
    })
});

linksIcon.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        windows.classList.toggle("show-icons");  
    })
});

addButton.addEventListener("click", event => {
    event.preventDefault();

    showConfirmationDialog(
        lang == "en" ? "Are you sure you want to add this new user?" : lang == "pt" ? "Tem certeza que quer adicionar este novo perfil?" : null,
        lang == "en" ? "Yes" : lang == "pt" ? "Sim" : null,
        lang == "en" ? "No" : lang == "pt" ? "Não" : null,
        "positive",
        "addUser",
        addUserWindow,
        lang == "en" ? "Profile added with success!" : " Perfil adicionado com sucesso!",
        () => {
            document.body.style.cursor = "wait";
            passJorgeStatus(true);
            setTimeout( () => {
                location.href = "SmartHomeProfiles.html";
            }, 2000);
        }
    ) 
});