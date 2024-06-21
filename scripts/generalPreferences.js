"use strict";

// Creating return button for general preferences
let preferencesReturnButton = document.createElement("button");
preferencesReturnButton.innerHTML = `<svg class="svg-icon" 
style="width: 1em; margin: auto; transform: scale(1.2); display: flex; 
height: 1em; fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" 
version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M810.666667 469.333333H304.64l154.88-186.026666a42.666667 42.666667 0 
    1 0-65.706667-54.613334l-213.333333 256a50.773333 50.773333 0 0 0-3.84 6.4c0 
    2.133333 0 3.413333-2.986667 5.546667A42.666667 42.666667 0 0 0 170.666667 
    512a42.666667 42.666667 0 0 0 2.986666 15.36c0 2.133333 0 3.413333 2.986667 
    5.546667a50.773333 50.773333 0 0 0 3.84 6.4l213.333333 256A42.666667 
    42.666667 0 0 0 426.666667 810.666667a42.666667 42.666667 0 0 0 
    27.306666-9.813334 42.666667 42.666667 0 0 0 5.546667-60.16L304.64 
    554.666667H810.666667a42.666667 42.666667 0 0 0 0-85.333334z" fill="#FFFFFF" />
</svg>`;

preferencesReturnButton.classList.add("return-button");
// Appending button to the website
preferencesOuterWindow.appendChild(preferencesReturnButton);
preferencesReturnButton.style.display = "none";

function returnToGeneral() {
    preferencesElements.forEach(element => {
        if (!element.classList.contains("product-not-available")) {
            element.style.removeProperty("display");
        }
    });

    Climate.returnFromClimate("general");
    Lights.returnFromLights("general");
    Blinds.returnFromBlinds("general");
    generalVacuumRobotInstance.vacuumRobotWindow.remove();
    chatGPTIframe.remove();
    if (document.getElementById("no-internet-message")) {
        document.getElementById("no-internet-message").remove();
    }
    
    preferencesReturnButton.style.display = "none";
    if (!document.querySelector(".no-environments")) {
        preferencesWindow.style.display = "grid";
    }
    updateScrollButtonVisibility();
    if (lang === 'en') {
        preferencesText.innerText = "General";
    }
    else if (lang === 'pt') {
        preferencesText.innerText = "Opções Gerais";
    }
    preferencesText.style.marginLeft = "5px";
}

// Event listener for the general preferences return button
preferencesReturnButton.addEventListener("click", () => {
    preferencesOuterWindow.style.animation = "blur-transition-out 0.15s";
    setTimeout(() => {
        preferencesOuterWindow.style.animation = "blur-transition-in 0.15s";
        setTimeout(() => {
            preferencesOuterWindow.style.removeProperty("animation");
        }, 150);
        if (document.getElementById("general-home-preferences").querySelector(".climate-submit-button") &&
            document.getElementById("general-home-preferences").querySelector(".climate-submit-button").disabled != true) {
            showConfirmationDialog(lang == "en" ? 'Are you sure you want to return without applying these climate settings?' :
                lang == "pt" ? 'Tem certeza que quer voltar sem aplicar estas prefêrencias de climatização?' : null,
                lang == "en" ? 'Yes' :
                    lang == "pt" ? 'Sim' : null, lang == "en" ? 'No' :
                lang == "pt" ? 'Não' : null, "negative", "general", preferencesOuterWindow).then((result) => {
                    if (result == "Yes") {
                        returnToGeneral();
                    }
                    else {
                        return;
                    }
                });
        }
        else if (document.getElementById("general-home-preferences").querySelector(".lights-submit-button") &&
        document.getElementById("general-home-preferences").querySelector(".lights-submit-button").disabled != true) {
        showConfirmationDialog(lang == "en" ? 'Are you sure you want to return without applying these lights settings?' :
            lang == "pt" ? 'Tem certeza que quer voltar sem aplicar estas prefêrencias de iluminação?' : null,
            lang == "en" ? 'Yes' :
                lang == "pt" ? 'Sim' : null, lang == "en" ? 'No' :
            lang == "pt" ? 'Não' : null, "negative", "general", preferencesOuterWindow).then((result) => {
                if (result == "Yes") {
                    returnToGeneral();
                }
                else {
                    return;
                }
            });
        }
        else if (document.getElementById("general-home-preferences").querySelector(".blinds-submit-button") &&
        document.getElementById("general-home-preferences").querySelector(".blinds-submit-button").disabled != true) {
        showConfirmationDialog(lang == "en" ? 'Are you sure you want to return without applying these blinds settings?' :
            lang == "pt" ? 'Tem certeza que quer voltar sem aplicar estas prefêrencias para os estores?' : null,
            lang == "en" ? 'Yes' :
                lang == "pt" ? 'Sim' : null, lang == "en" ? 'No' :
            lang == "pt" ? 'Não' : null, "negative", "general", preferencesOuterWindow).then((result) => {
                if (result == "Yes") {
                    returnToGeneral();
                }
                else {
                    return;
                }
            });
        }
        else if (document.getElementById("general-home-preferences").querySelector(".vacuum-robot-submit-button") &&
        document.getElementById("general-home-preferences").querySelector(".vacuum-robot-submit-button").disabled != true) {
        showConfirmationDialog(lang == "en" ? 'Are you sure you want to return without applying these settings for the vacuum robot?' :
            lang == "pt" ? 'Tem certeza que quer voltar sem aplicar estas prefêrencias para o robô aspirador?' : null,
            lang == "en" ? 'Yes' :
                lang == "pt" ? 'Sim' : null, lang == "en" ? 'No' :
            lang == "pt" ? 'Não' : null, "negative", "general", preferencesOuterWindow).then((result) => {
                if (result == "Yes") {
                    returnToGeneral();
                }
                else {
                    return;
                }
            });
        }
        else {
            returnToGeneral();
        }
    }, 150);
});