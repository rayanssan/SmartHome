"use strict";

if (localStorage.getItem('environments') === "[]") {
    let noEnvironmentsElement = document.createElement("span");
    noEnvironmentsElement.classList.add("no-environments");
    document.body.appendChild(noEnvironmentsElement);
}

// Creating return button for environments
let environmentsReturnButton = document.createElement("button");
environmentsReturnButton.innerHTML = `<svg class="svg-icon" 
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

environmentsReturnButton.classList.add("return-button");
// Appending button to the website
environmentsOuterWindow.appendChild(environmentsReturnButton);
environmentsReturnButton.style.display = "none";

// Event listener for the environments return button
environmentsReturnButton.addEventListener("click", () => {
    // Confirm before returning if there is an climate window form
    if (document.getElementById("environments").querySelector(".climate-submit-button") &&
        document.getElementById("environments").querySelector(".climate-submit-button").disabled != true) {
        showConfirmationDialog(lang == "en" ? 'Are you sure you want to return without applying these climate settings?' :
            lang == "pt" ? 'Tem certeza que quer voltar sem aplicar estas prefêrencias de climatização?' : null,
            lang == "en" ? 'Yes' :
                lang == "pt" ? 'Sim' : null, lang == "en" ? 'No' :
            lang == "pt" ? 'Não' : null, "negative", "environments", environmentsOuterWindow).then((result) => {
                if (result == "Yes") {
                    returnToProducts();
                }
                else {
                    return;
                }
            });
    }
    // Confirm before returning if there is a lights form
    else if (document.getElementById("environments").querySelector(".lights-submit-button") &&
        document.getElementById("environments").querySelector(".lights-submit-button").disabled != true) {
        showConfirmationDialog(lang == "en" ? 'Are you sure you want to return without applying these lights settings?' :
            lang == "pt" ? 'Tem certeza que quer voltar sem aplicar estas prefêrencias para as luzes?' : null,
            lang == "en" ? 'Yes' :
                lang == "pt" ? 'Sim' : null, lang == "en" ? 'No' :
            lang == "pt" ? 'Não' : null, "negative", "environments", environmentsOuterWindow).then((result) => {
                if (result == "Yes") {
                    returnToProducts();
                }
                else {
                    return;
                }
            });
    }
    // Confirm before returning if there is a blinds form
    else if (document.getElementById("environments").querySelector(".blinds-submit-button") &&
        document.getElementById("environments").querySelector(".blinds-submit-button").disabled != true) {
        showConfirmationDialog(lang == "en" ? 'Are you sure you want to return without applying these blinds settings?' :
            lang == "pt" ? 'Tem certeza que quer voltar sem aplicar estas prefêrencias para os estores?' : null,
            lang == "en" ? 'Yes' :
                lang == "pt" ? 'Sim' : null, lang == "en" ? 'No' :
            lang == "pt" ? 'Não' : null, "negative", "environments", environmentsOuterWindow).then((result) => {
                if (result == "Yes") {
                    returnToProducts();
                }
                else {
                    return;
                }
            });
    }
    // Confirm before returning if there is a fireplace form
    else if (document.getElementById("environments").querySelector(".fireplace-submit-button") &&
        document.getElementById("environments").querySelector(".fireplace-submit-button").disabled != true) {
        showConfirmationDialog(lang == "en" ? 'Are you sure you want to return without applying these fireplace settings?' :
            lang == "pt" ? 'Tem certeza que quer voltar sem aplicar estas prefêrencias para a lareira?' : null,
            lang == "en" ? 'Yes' :
                lang == "pt" ? 'Sim' : null, lang == "en" ? 'No' :
            lang == "pt" ? 'Não' : null, "negative", "environments", environmentsOuterWindow).then((result) => {
                if (result == "Yes") {
                    returnToProducts();
                }
                else {
                    return;
                }
            });
    }
    // Confirm before returning if there is a TV form
    else if (document.getElementById("environments").querySelector(".TV-submit-button") &&
        document.getElementById("environments").querySelector(".TV-submit-button").disabled != true) {
        showConfirmationDialog(lang == "en" ? 'Are you sure you want to return without applying these TV settings?' :
            lang == "pt" ? 'Tem certeza que quer voltar sem aplicar estas prefêrencias para a TV?' : null,
            lang == "en" ? 'Yes' :
                lang == "pt" ? 'Sim' : null, lang == "en" ? 'No' :
            lang == "pt" ? 'Não' : null, "negative", "environments", environmentsOuterWindow).then((result) => {
                if (result == "Yes") {
                    returnToProducts();
                }
                else {
                    return;
                }
            });
    }
    // Confirm before returning if there is an add environment form
    else if (document.getElementById("add-environment-form")) {
        showConfirmationDialog(lang == "en" ? 'Are you sure you want to return without creating this environment?' :
            lang == "pt" ? 'Tem certeza que quer voltar sem criar este ambiente?' : null,
            lang == "en" ? 'Yes' :
                lang == "pt" ? 'Sim' : null, lang == "en" ? 'No' :
            lang == "pt" ? 'Não' : null, "negative", "addEnvironments", environmentsOuterWindow).then((result) => {
                if (result == "Yes") {
                    returnToEnvironments();
                }
                else {
                    expandEnvironmentsButton.style.display = "none";
                    return;
                }
            });
    }
    // If returning from products view, return to main environments view
    else if (Array.from(environmentsWindow.getElementsByClassName("environment-preference-button")).some(
        element => getComputedStyle(element).display !== "none") ||
        document.getElementById("add-environments-selection")) {
        returnToEnvironments();
    }
    // If in product view without any forms return without dialogs
    else {
        returnToProducts();
    }
});

/**
 * Returns to the main environments view.
 * This function is called when the user wishes to return from the list of products 
 * of a previously selected environment.
 * 
 * @param {void}
 * @returns {void}
 */
function returnToEnvironments() {
    // Transition animations
    environmentsOuterWindow.style.animation = "blur-transition-out 0.15s";
    setTimeout(() => {
        environmentsOuterWindow.style.animation = "blur-transition-in 0.15s";
        setTimeout(() => {
            environmentsOuterWindow.style.removeProperty("animation");
        }, 150);

        document.body.classList.remove("no-blur");
        Array.from(document.getElementsByClassName("environment")).forEach(element => {
            element.style.removeProperty("display");
        });

        Array.from(document.getElementsByClassName("environment-preference-button")).forEach(element => {
            element.remove();
        });

        expandEnvironmentsButton.click();
        if (environmentsWindow.classList.contains("add-environment-window")) {
            environmentsWindow.classList.remove("add-environment-window");
        }

        editEnvironmentButton.parentElement.style.display = "none";
        editEnvironmentButton.style.display = "none";

        addProductsSelection.style.display = "none";
        Array.from(document.getElementsByClassName("add-environment-type-button")).forEach(element => {
            element.children[0].style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        });
        if (submitEnvironmentButton) {
            submitEnvironmentButton.style.display = "none";
        }
        addEnvironmentForm.remove();

        environmentsReturnButton.style.display = "none";
        environmentsWindow.style.removeProperty("display");
        environmentsWindow.style.removeProperty("justify-content");
        environmentsOuterWindow.style.justifyContent = "space-between";
        expandEnvironmentsButton.style.removeProperty("display");
        expandEnvironmentsButton.parentElement.style.removeProperty("display");

        setTimeout(() => {
            if (environmentsOuterWindow.style.width != "fit-content") {
                updateScrollButtonVisibility();
            }
        }, 500);

        if (lang === 'en') {
            environmentsText.innerText = "Environments";
        } else if (lang === 'pt') {
            environmentsText.innerText = "Ambientes";
        }
        environmentsText.style.marginLeft = "5px";

    }, 150);
}

/**
 * Returns back to the list of products within a chosen environment.
 * This function is called when the user wishes to return to the list of products
 * after returning from a functionality.
 * 
 * @param {void}
 * @returns {void}
 */
function returnToProducts() {
    // Transition animations
    environmentsOuterWindow.style.animation = "blur-transition-out 0.15s";
    setTimeout(() => {
        environmentsOuterWindow.style.animation = "blur-transition-in 0.15s";
        setTimeout(() => {
            environmentsOuterWindow.style.removeProperty("animation");
        }, 150);

        Climate.returnFromClimate("environments");
        Lights.returnFromLights("environments");
        Blinds.returnFromBlinds("environments");

        if (environmentsWindow.querySelector('.fireplace-window')) {
            environmentsWindow.querySelector('.fireplace-window').remove();
        }

        if (environmentsWindow.querySelector('.TV-window')) {
            environmentsWindow.querySelector('.TV-window').remove();
        }

        if (environmentsWindow.querySelector('.closet-window')) {
            environmentsWindow.querySelector('.closet-window').remove();
        }

        if (document.getElementById("edit-environment-form")) {
            document.getElementById("edit-environment-form").remove();
        }

        if (document.getElementById("smart-pantry-functionality-wrapper")) {
            document.getElementById("smart-pantry-functionality-wrapper").remove();
            document.getElementsByClassName("kitchen-groceries-button")[0].remove();
        }

        if (environmentsWindow.querySelector('.speakers-window')) {
            environmentsWindow.querySelector('.speakers-window').remove();
        }

        environmentsText.innerText = localStorage.getItem("chosenEnvironmentName");

        if (localStorage.getItem("chosenEnvironment") == "bedroom") {
            const bedroomProducts = Array.from(environmentsWindow.getElementsByClassName("bedroomFunctionality"));
            bedroomProducts.forEach(element => {
                element.style.removeProperty("display");
            });
        }
        else if (localStorage.getItem("chosenEnvironment") == "bathroom") {
            const bathroomProducts = Array.from(environmentsWindow.getElementsByClassName("bathroomFunctionality"));
            bathroomProducts.forEach(element => {
                element.style.removeProperty("display");
            });
        }
        else if (localStorage.getItem("chosenEnvironment") == "kitchen") {
            const kitchenProducts = Array.from(environmentsWindow.getElementsByClassName("kitchenFunctionality"));
            kitchenProducts.forEach(element => {
                element.style.removeProperty("display");
            });
        }
        else if (localStorage.getItem("chosenEnvironment") == "living-room") {
            const livingRoomProducts = Array.from(environmentsWindow.getElementsByClassName("livingRoomFunctionality"));
            livingRoomProducts.forEach(element => {
                element.style.removeProperty("display");
            });
        }
        else if (localStorage.getItem("chosenEnvironment") == "office") {
            const officeProducts = Array.from(environmentsWindow.getElementsByClassName("officeFunctionality"));
            officeProducts.forEach(element => {
                element.style.removeProperty("display");
            });
        }

        editEnvironmentButton.style.display = "flex";
        editEnvironmentButton.parentElement.style.display = "flex";
        expandEnvironmentsButton.style.display = "none";

        environmentsOuterWindow.style.removeProperty("flex-direction");
        environmentsWindow.style.removeProperty("flex-direction");
        environmentsWindow.style.removeProperty("align-items");
        environmentsWindow.style.removeProperty("align-content");
    }, 150);
}

// Expand environments view
expandEnvironmentsButton.addEventListener("click", () => {
    if (environmentsWindow.classList.contains("expanded-environments-view")) {
        environmentsWindow.classList.remove("expanded-environments-view");
        expandEnvironmentsButton.innerHTML =
            `<svg class="svg-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" 
            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M429.9 872.8H218.7l232.1-232.1c17.2-17.2 17.2-45 0-62.2-17.2-17.2-45-17.2-62.2 
            0L152.8 814.2V604.8c0-24.3-19.7-44-44-44s-44 19.7-44 44v312c0 24.3 19.7 44 44 44h321c24.3 
            0 44-19.7 44-44s-19.6-44-43.9-44z m486-808h-321c-24.3 0-44 19.7-44 44s19.7 44 44 44H806l-232.1 
            232c-17.2 17.2-17.2 45 0 62.2 8.6 8.6 19.9 12.9 31.1 12.9 11.3 0 22.5-4.3 31.1-12.9l235.7-235.7v209.4c0 
            24.3 19.7 44 44 44s44-19.7 44-44v-312c0.1-24.2-19.6-43.9-43.9-43.9z"  /></svg>`;
        updateScrollButtonVisibility();
        preferencesOuterWindow.style.removeProperty("display");
        document.getElementById("content-windows").style.removeProperty("flex-direction");
        routineOuterWindow.style.removeProperty("display");
    }
    else {
        environmentsWindow.classList.add("expanded-environments-view");
        expandEnvironmentsButton.innerHTML =
            `<svg class="svg-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" 
            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M108.8 648.8H320l-232.1 232c-17.2 17.2-17.2 45 0 
            62.2 17.2 17.2 45 17.2 62.2 0l235.7-235.7v209.4c0 24.3 19.7 44 44 44s44-19.7 
            44-44v-312c0-24.3-19.7-44-44-44h-321c-24.3 0-44 19.7-44 44s19.7 44.1 44 44.1z 
            m486-184h321c24.3 0 44-19.7 44-44s-19.7-44-44-44H704.7l232.1-232.1c17.2-17.2 
            17.2-45 0-62.2-8.6-8.6-19.9-12.9-31.1-12.9-11.3 0-22.5 4.3-31.1 12.9L638.8 
            318.2V108.8c0-24.3-19.7-44-44-44s-44 19.7-44 44v312c0 24.3 19.7 44 44 44z"  /></svg>`;
        environmentsWindow.scrollLeft = 0;
        document.getElementById("content-windows").style.flexDirection = "column";
        updateScrollButtonVisibility();
        preferencesOuterWindow.style.display = "none";
        routineOuterWindow.style.display = "none";
    }
});