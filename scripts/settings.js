"use strict";

const settingsDiv = document.getElementById("settings");
const settingsToggle = () => {
    if (document.body.id == 'SmartHomeGroceriesPage' && cart.style.outlineColor == "green") {
        cart.click();
    }
    if (document.getElementById("user") && document.getElementById("user").style.outlineColor == "green") {
        document.getElementById("user").click();
    }

    if (settingsDiv.style.outline == "green solid 2px") {
        settingsDiv.style.removeProperty("outline");
        Array.from(settingsDiv.children).splice(1).forEach(setting => {
            setting.style.display = "none";
        });
    } else {
        settingsDiv.style.outline = "green solid 2px";
        Array.from(settingsDiv.children).splice(1).forEach(setting => {
            setting.style.display = "unset";
        });
    }
};

settingsDiv.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent the click event from propagating to the document
    settingsToggle();
});

if (document.body.id == "SmartHomePage") {
    document.getElementById("settings").getElementsByTagName("div")[0].addEventListener("click", () => {
        let dialog;
        let acceptDialog;
        let declineDialog;
        let confirmationMessage;
        if (lang == "en") {
            dialog = "Are you sure you want to restore the layout to default?";
            acceptDialog = "Yes";
            declineDialog = "No";
            confirmationMessage = "Layout Restored";
        }
        else if (lang == "pt") {
            dialog = "Tem certeza que quer restorar o layout para configuração padrão?";
            acceptDialog = "Sim";
            declineDialog = "Não";
            confirmationMessage = "Layout Restorado";
        }
        showConfirmationDialog(dialog, acceptDialog, declineDialog, "negative",
            "settings", document.getElementsByTagName("footer")[0], confirmationMessage, () => {
                localStorage.removeItem("environmentOrder");
                localStorage.removeItem("houseName");
                localStorage.removeItem("preferencesOrder");
                document.body.style.cursor = "wait";
                document.body.style.pointerEvents = "none";
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        )
    });
}

if (localStorage.getItem("darkmode") && localStorage.getItem("darkmode") == "on" || window.matchMedia('(prefers-color-scheme: dark)').matches &&
    (localStorage.getItem("darkmode") == "on" || !localStorage.getItem("darkmode"))) {
    document.body.classList.add("darkmode");
    document.getElementById("settings").getElementsByTagName("div")[document.body.id == "SmartHomePage" ? 1 : 0].innerText = lang == "en" ? "Turn off darkmode"
        : lang == "pt" ? "Desligar modo escuro" : null;
}
else {
    document.getElementById("settings").getElementsByTagName("div")[document.body.id == "SmartHomePage" ? 1 : 0].innerText = lang == "en" ? "Turn on darkmode"
        : lang == "pt" ? "Ligar modo escuro" : null;
}

document.getElementById("settings").getElementsByTagName("div")[document.body.id == "SmartHomePage" ? 1 : 0].addEventListener("click", () => {
    let dialog;
    let acceptDialog;
    let declineDialog;
    let confirmationMessage;
    if (lang == "en") {
        if (document.body.classList.contains("darkmode") || (document.body.classList.contains("darkmode") && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            dialog = "Are you sure you want to turn dark mode off?";
            confirmationMessage = "Dark mode off";
        }
        else {
            dialog = "Are you sure you want to turn dark mode on?";
            confirmationMessage = "Dark mode on";
        }
        acceptDialog = "Yes";
        declineDialog = "No";
    }
    else if (lang == "pt") {
        if (document.body.classList.contains("darkmode") || (document.body.classList.contains("darkmode") && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            dialog = "Tem certeza que quer desligar o modo escuro?";
            confirmationMessage = "Modo escuro desligado";
        }
        else {
            dialog = "Tem certeza que quer ligar o modo escuro?";
            confirmationMessage = "Modo escuro ligado";
        }
        acceptDialog = "Sim";
        declineDialog = "Não";
    }
    showConfirmationDialog(dialog, acceptDialog, declineDialog, "negative",
        "settings", document.getElementsByTagName("footer")[0], confirmationMessage, () => {
            if (document.body.classList.contains("darkmode") || (document.body.classList.contains("darkmode") && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.body.classList.remove("darkmode");
                document.getElementById("settings").getElementsByTagName("div")[document.body.id == "SmartHomePage" ? 1 : 0].innerText = lang == "en" ? "Turn on darkmode"
                    : lang == "pt" ? "Ligar modo escuro" : null;
                localStorage.setItem("darkmode", "off");
            } else {
                document.body.classList.add("darkmode");
                document.getElementById("settings").getElementsByTagName("div")[document.body.id == "SmartHomePage" ? 1 : 0].innerText = lang == "en" ? "Turn off darkmode"
                    : lang == "pt" ? "Desligar modo escuro" : null;
                localStorage.setItem("darkmode", "on");
            }
        });
});

document.addEventListener("click", (event) => {
    if (event.target !== settingsDiv && !settingsDiv.contains(event.target)) {
        // Click is outside the settings div
        settingsDiv.style.removeProperty("outline");
        Array.from(settingsDiv.children).splice(1).forEach(setting => {
            setting.style.display = "none";
        });
    }
});

if (document.getElementById("user")) {
    document.addEventListener("click", function (event) {
        var userSettingsWrapper = document.querySelector('#user-settings-wrapper');
        var userElement = document.getElementById("user");

        if (event.target !== userElement && !userElement.contains(event.target) && event.target !== userSettingsWrapper) {
            // Clicked outside of #user and #user-settings-wrapper, hide the menu
            userElement.style.outline = "unset";
            userSettingsWrapper.style.display = "none";
        }
    });

    document.getElementById("user").addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent the click event from reaching the document level
        var userSettingsWrapper = document.querySelector('#user-settings-wrapper');
        if (document.body.id == 'SmartHomeGroceriesPage' && cart.style.outlineColor == "green") {
            cart.click();
        }
        if (document.getElementById("settings").style.outlineColor == "green") {
            document.getElementById("settings").click();
        }

        // Toggle the display of userSettingsWrapper
        userSettingsWrapper.style.display = userSettingsWrapper.style.display === "flex" ? "none" : "flex";

        // Toggle the outline style
        this.style.outline = userSettingsWrapper.style.display === "none" ? "unset" : "green solid 2px";

        // Set user name when displaying
        if (userSettingsWrapper.style.display === "flex") {
            document.querySelector("#user-name").innerText = localStorage.getItem("icon") === "./media/images/man.png" ? "Diego" :
                localStorage.getItem("icon") === "./media/images/woman.png" ? "Melissa" : localStorage.getItem("icon") === "./media/images/student.png" ? "Jorge"
                    : "Diego";
        }
    });

    document.getElementById('user-delete').style.color = "red";
    document.getElementById('user-delete').addEventListener("click", () => {
        let userName = localStorage.getItem("icon") === "./media/images/man.png" ? "Diego" :
            localStorage.getItem("icon") === "./media/images/woman.png" ? "Melissa" : localStorage.getItem("icon") === "./media/images/student.png" ? "Jorge"
                : "Diego";
        document.getElementById("user").click();
        showConfirmationDialog(lang == "en" ? `Are you sure you want to delete ${userName}'s profile?<br>This action is irreversible!` :
            lang == "pt" ? `Tem certeza que quer deletar o perfil de ${userName}?<br>Esta ação é irreversível!` : null,
            lang == "en" ? 'Yes' :
                lang == "pt" ? 'Sim' : null, lang == "en" ? 'No' :
            lang == "pt" ? 'Não' : null, "negative", "user", document.getElementById('user-settings-wrapper')).then((result) => {
                if (result == "Yes") {
                    if (localStorage.getItem("icon") === "./media/images/man.png" || localStorage.getItem("icon") === "./media/images/woman.png") {
                        if (localStorage.getItem("icon") === "./media/images/man.png") {
                            alert(lang == "en" ? "Diego's profile cannot be deleted in order to preserve the functionality of this prototype." :
                                "O perfil de Diego não pode ser deletado de modo a preservar a funcionalidade deste protótipo.");
                        } else {
                            alert(lang == "en" ? "Melissa's profile cannot be deleted in order to preserve the functionality of this prototype." :
                                "O perfil de Melissa não pode ser deletado de modo a preservar a funcionalidade deste protótipo.");
                        }
                        document.getElementById("user").click();
                        for (let child of Array.from(document.getElementById("user-settings-wrapper").children)) {
                            child.style.display = "block";
                        }
                    }
                    else {
                        localStorage.removeItem("users");
                        localStorage.removeItem("jorgeStatus");
                        localStorage.setItem("icon", "deleted jorge");
                        location.href = "SmartHomeProfiles.html";
                    }
                }
                else {
                    document.getElementById("user").click();
                    for (let child of Array.from(document.getElementById("user-settings-wrapper").children)) {
                        child.style.display = "block";
                    }
                }
            });
    });
}