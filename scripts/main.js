"use strict";

// Removing loading animation
window.addEventListener('load', () => {
    document.body.classList.remove("loading-animation")
});

// Check local storage to maintain previously selected environment background if page is refreshed
if (localStorage.getItem("chosenEnvironment") && document.body.id != "SmartHomeGroceriesPage") {
    document.body.style.backgroundImage = `url(./media/images/${localStorage.getItem("chosenEnvironment")}.jpg)`;
}

// ---------------------- Most important elements of the website ----------------------

// General preferences elements
let preferencesOuterWindow = document.getElementById("general-home-preferences");
let climateStats = document.getElementById("climate-stats");
let climateStatsText = document.getElementById("climate-stats-text");
let preferencesWindow = document.getElementById("general-home-preferences-selection");
let preferencesElements = Array.from(document.getElementsByClassName("preference"));
let preferencesText = document.getElementById("preferences-text");
if (document.getElementById('groceries')) {
    document.getElementById('groceries').addEventListener('click', () => {
        location.href = 'SmartHomeGroceries.html';
    });
}

// Routine elements
let routineOuterWindow = document.getElementById("routine-window");
let routineWindow = document.getElementById("routine");
let routineText = document.getElementById("routine-text");
let setRoutineButton = document.getElementById("set-routine-button");

// Environments elements
let environmentsOuterOuterWindow = document.getElementById("environments-routine-outer-window");
let environmentsOuterWindow = document.getElementById("environments");
let environmentsWindow = document.getElementById("environment-selection");
let environmentsElements = document.querySelectorAll(".environment");
let environmentsText = document.getElementById("environments-text");
let expandEnvironmentsButton = document.getElementById("expand-environments-button");
let editEnvironmentButton = document.getElementById("edit-environment-button");

if (document.body.id == "SmartHomePage" || document.body.id == "SmartHomeHelpPage") {
    document.getElementById("profiles").addEventListener("click", () => {
        localStorage.setItem("profilesPageReferrer", window.location.href);
        location.href = "SmartHomeProfiles.html";
    });
    if (document.body.id == "SmartHomeHelpPage") {
        if (localStorage.getItem("helpPageReferrer")) {
            if (localStorage.getItem("helpPageReferrer").includes("SmartHomeProfiles.html") ||
            localStorage.getItem("helpPageReferrer").includes("SmartHomeAddUser.html")) {
                document.getElementById("user").style.display = "none";
            }
        }
    }
}
if (document.getElementById("more-info")) {
    document.getElementById("more-info").addEventListener("click", () => {
        localStorage.setItem("helpPageReferrer", window.location.href);
        location.href = "SmartHomeHelp.html";
    });
}

// ------------------------------------- Products ------------------------------------

const allProducts = {
    "AC": { en: "Air Conditioner", pt: "Ar-condicionado" },
    "AirPurifier": { en: "Air Purifier", pt: "Purificador de Ar" },
    "AirDiffuser": { en: "Air Diffuser", pt: "Difusor de Ar" },
    "Humidifier": { en: "Humidifier", pt: "Humidificador" },
    "Dehumidifier": { en: "Dehumidifier", pt: "Deshumidificador" },
    "Lights": { en: "Lights", pt: "Luzes" },
    "Blinds": { en: "Blinds", pt: "Estores" },
    "Cabinets": { en: "Cabinets", pt: "Armários" },
    "Fridge": { en: "Fridge", pt: "Frigorífico" },
    "Pantry": { en: "Pantry", pt: "Dispensa" },
    "FlushToilet": { en: "Automatic Toilet Flush", pt: "Descarga Automática" },
    "Fireplace": { en: "Fireplace", pt: "Lareira" },
    "Speakers": { en: "Speakers", pt: "Speakers" },
    "TV": { en: "TV", pt: "TV" }
};

const bathroomProducts = [
    { id: "addBathroomFlushToilet", en: "Automatic Toilet Flush", pt: "Descarga Automática" },
    { id: "addBathroomAirDiffuser", en: "Air Diffuser", pt: "Difusor de Ar" },
    { id: "addBathroomDehumidifier", en: "Dehumidifier", pt: "Deshumidificador" },
    { id: "addBathroomLights", en: "Lights", pt: "Luzes" },
    { id: "addBathroomSpeakers", en: "Speakers", pt: "Speakers" },
    { id: "addBathroomBlinds", en: "Blinds", pt: "Estores" },
];

const kitchenProducts = [
    { id: "addKitchenAC", en: "Air Conditioner", pt: "Ar-condicionado" },
    { id: "addKitchenAirPurifier", en: "Air Purifier", pt: "Purificador de Ar" },
    { id: "addKitchenAirDiffuser", en: "Air Diffuser", pt: "Difusor de Ar" },
    { id: "addKitchenDehumidifier", en: "Dehumidifier", pt: "Deshumidificador" },
    { id: "addKitchenCabinets", en: "Cabinets", pt: "Armários" },
    { id: "addKitchenHumidifier", en: "Humidifier", pt: "Humidificador" },
    { id: "addKitchenLights", en: "Lights", pt: "Luzes" },
    { id: "addKitchenFridge", en: "Fridge", pt: "Frigorífico" },
    { id: "addKitchenPantry", en: "Pantry", pt: "Dispensa" },
    { id: "addKitchenSpeakers", en: "Speakers", pt: "Speakers" },
    { id: "addKitchenTV", en: "TV", pt: "TV" },
    { id: "addKitchenBlinds", en: "Blinds", pt: "Estores" },
];

const livingRoomProducts = [
    { id: "addLivingRoomAC", en: "Air Conditioner", pt: "Ar-condicionado" },
    { id: "addLivingRoomAirPurifier", en: "Air Purifier", pt: "Purificador de Ar" },
    { id: "addLivingRoomAirDiffuser", en: "Air Diffuser", pt: "Difusor de Ar" },
    { id: "addLivingRoomDehumidifier", en: "Dehumidifier", pt: "Deshumidificador" },
    { id: "addLivingRoomFireplace", en: "Fireplace", pt: "Lareira" },
    { id: "addLivingRoomHumidifier", en: "Humidifier", pt: "Humidificador" },
    { id: "addLivingRoomLights", en: "Lights", pt: "Luzes" },
    { id: "addLivingRoomSpeakers", en: "Speakers", pt: "Speakers" },
    { id: "addLivingRoomTV", en: "TV", pt: "TV" },
    { id: "addLivingRoomBlinds", en: "Blinds", pt: "Estores" },
];

const bedroomProducts = [
    { id: "addBedroomAC", en: "Air Conditioner", pt: "Ar-condicionado" },
    { id: "addBedroomAirPurifier", en: "Air Purifier", pt: "Purificador de Ar" },
    { id: "addBedroomAirDiffuser", en: "Air Diffuser", pt: "Difusor de Ar" },
    { id: "addBedroomDehumidifier", en: "Dehumidifier", pt: "Deshumidificador" },
    { id: "addBedroomFireplace", en: "Fireplace", pt: "Lareira" },
    { id: "addBedroomSmartCloset", en: "Smart Closet", pt: "Closet Inteligente" },
    { id: "addBedroomHumidifier", en: "Humidifier", pt: "Humidificador" },
    { id: "addBedroomLights", en: "Lights", pt: "Luzes" },
    { id: "addBedroomSpeakers", en: "Speakers", pt: "Speakers" },
    { id: "addBedroomTV", en: "TV", pt: "TV" },
    { id: "addBedroomBlinds", en: "Blinds", pt: "Estores" },
];

const officeProducts = [
    { id: "addOfficeAC", en: "Air Conditioner", pt: "Ar-condicionado" },
    { id: "addOfficeAirPurifier", en: "Air Purifier", pt: "Purificador de Ar" },
    { id: "addOfficeAirDiffuser", en: "Air Diffuser", pt: "Difusor de Ar" },
    { id: "addOfficeDehumidifier", en: "Dehumidifier", pt: "Deshumidificador" },
    { id: "addOfficeFireplace", en: "Fireplace", pt: "Lareira" },
    { id: "addOfficeHumidifier", en: "Humidifier", pt: "Humidificador" },
    { id: "addOfficeLights", en: "Lights", pt: "Luzes" },
    { id: "addOfficeSpeakers", en: "Speakers", pt: "Speakers" },
    { id: "addOfficeTV", en: "TV", pt: "TV" },
    { id: "addOfficeBlinds", en: "Blinds", pt: "Estores" },
];

// -------------------------------------------------------------------------------------
// Function to create confirmation dialogs

/**
 * Displays a confirmation dialog box with accept and decline buttons for user interaction.
 *
 * @param {String} dialog - The main message or question displayed in the dialog box.
 * @param {String} acceptDialog - The label for the accept/positive action button.
 * @param {String} declineDialog - The label for the decline/negative action button.
 * @param {String} actionType - The type of action associated with the accept button.
 * @param {String} context - The context of the website in which the dialog is displayed.
 * @param {HTMLElement} elementToAppend - The element to which the confirmation box will be appended.
 * @param {String} confirmationMessage - The message to display after the user confirms the action.
 * @param {Function} onConfirm - The function to execute when the user clicks the accept button.
 * @requires actionType - must be one of the following options: "positive" or "negative".
 * @requires context - must be one of the following options: 
 * "general", "routine, "routineList", "environments", "addEnvironments", 
 * "groceries", "settings", "user", "addUser", or "language".
 * @returns {Promise<String>} - Resolves with "Yes" or "No" based on the user's choice.
 */
async function showConfirmationDialog(
    dialog,
    acceptDialog,
    declineDialog,
    actionType,
    context,
    elementToAppend,
    confirmationMessage = null,
    onConfirm = null
) {
    const confirmationBox = document.createElement("div");
    confirmationBox.className = "confirmation-box";

    confirmationBox.innerHTML = `
        <p style="font-size: x-large;">${dialog}</p>
        <div style="display: flex;">
            <button>${acceptDialog}</button>
            <button>${declineDialog}</button>
        </div>
    `;

    const buttons = confirmationBox.querySelectorAll('button');
    const yesButton = buttons[0];
    const noButton = buttons[1];

    yesButton.style.color = noButton.style.color = "white";
    yesButton.style.paddingRight = yesButton.style.paddingLeft =
        noButton.style.paddingRight = noButton.style.paddingLeft = "15px";

    if (actionType === "positive") {
        yesButton.style.backgroundColor = "green";
        yesButton.style.outline = "-webkit-focus-ring-color auto 1px";
        noButton.style.backgroundColor = "red";
    } else if (actionType === "negative") {
        yesButton.style.backgroundColor = "red";
        noButton.style.backgroundColor = "green";
        noButton.style.outline = "-webkit-focus-ring-color auto 1px";
    }

    if (context === "language" || context === "settings") {
        elementToAppend.prepend(confirmationBox);
        document.body.scrollIntoView(false);
    } else {
        // Transition animations
        elementToAppend.style.animation = "blur-transition-out 0.15s";
        setTimeout(() => {
            elementToAppend.style.animation = "blur-transition-in 0.15s";
            setTimeout(() => {
                elementToAppend.style.removeProperty("animation");
            }, 150);
            // Hiding the content inside the window
            if (context === "general" || context === "environments" || context === "addEnvironments" || context === "routine" ||
            context === "routineList" || context === "groceries" ||  context == "user" || context === "addUser") {
                const hideElements = () => {
                    for (let child of Array.from(elementToAppend.children)) {
                        child.style.display = "none";
                    }
                };

                hideElements();
                elementToAppend.appendChild(confirmationBox);
            }
        }, 150);
    }

    return new Promise((resolve) => {

        // If user answers YES
        const callbackYesButton = () => {
            if (!confirmationMessage) {
                confirmationBox.remove();
                if (context == "groceries" || context == "routine") {
                    onConfirm();
                    return;
                }
            }
            else {
                onConfirm();
            }

            if (context === "groceries") {
                confirmationBox.innerHTML = `<p style = "font-size: x-large;">${confirmationMessage}</p>
                <br>
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 512 512">
                <polyline points="416 128 192 384 96 288" style="fill:none;stroke:green;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
                </svg>
                <button id="ok-purchase-button">OK</button>
                `
            } else {
                confirmationBox.innerHTML = `<p style = "font-size: x-large;">${confirmationMessage}</p>
                <br>
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 512 512">
                <polyline points="416 128 192 384 96 288" style="fill:none;stroke:green;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
                </svg>
                `
            }
            if (context == "language" || context === "settings") {
                document.body.scrollIntoView(false);
            }

            if (confirmationMessage && context === "groceries") {
                document.getElementById("ok-purchase-button").addEventListener("click", () => {
                    confirmationBox.remove();
                    for (let child of Array.from(cartView.children)) {
                        child.style.display = "flex";
                    }
                    document.getElementById('payment-method-choice').style.removeProperty("display");
                    cart.click();
                })
            }
            else if (confirmationMessage) {
                setTimeout(() => {
                    confirmationBox.remove();
                    if (context === "general" || context === "environments" || context === "addEnvironments" || context === "routine"
                    || context === "routineList" ||  context == "user" || context === "addUser") {
                        const showElements = () => {
                            if (context === "general") {
                                preferencesText.style.removeProperty("display");
                                preferencesReturnButton.style.removeProperty("display");
                                preferencesWindow.style.display = "flex";
                            } else if (context === "environments") {
                                environmentsText.style.removeProperty("display");
                                environmentsReturnButton.style.removeProperty("display");
                                expandEnvironmentsButton.style.removeProperty("display");
                                environmentsWindow.style.display = "flex";
                            } else if (context === "addEnvironments") {
                                environmentsText.style.removeProperty("display");
                                environmentsReturnButton.style.removeProperty("display");
                                environmentsWindow.style.removeProperty("display");
                                addEnvironmentForm.remove();
                                returnToEnvironments();
                            } else {
                                for (let child of Array.from(elementToAppend.children)) {
                                    child.style.removeProperty("display");
                                };
                            }
                        };

                        showElements();
                    }
                }, 3000);
            } else {
                confirmationBox.remove();
                if (context === "general" || context === "environments" || context === "addEnvironments" || context === "routine"
                || context === "routineList" || context === "groceries") {
                    const showElements = () => {
                        if (context === "general") {
                            preferencesText.style.removeProperty("display");
                            preferencesReturnButton.style.removeProperty("display");
                            preferencesWindow.style.display = "flex";
                        } else if (context === "environments" || context === "addEnvironments") {
                            environmentsText.style.removeProperty("display");
                            environmentsReturnButton.style.removeProperty("display");
                            if (context === "environments") {
                                environmentsWindow.style.display = "flex";
                                expandEnvironmentsButton.style.removeProperty("display");
                            }
                            else {
                                environmentsWindow.style.removeProperty("display");
                            }
                        } else if (context === "routine") {
                            for (let child of Array.from(document.getElementById("activitybox").children)) {
                                child.style.removeProperty("display");
                            };
                        } else if (context === "routineList") {
                            for (let child of Array.from(document.getElementById("listbox").children)) {
                                child.style.removeProperty("display");
                            }
                        } else if (context === "groceries") {
                            for (let child of Array.from(cartView.children)) {
                                child.style.display = "flex";
                            }
                        }
                    };

                    showElements();
                }
            }
            resolve("Yes");
        };

        // If user answers NO
        const callbackNoButton = () => {
            if (!confirmationMessage) {
                confirmationBox.remove();
                if (context == "groceries") {
                    for (let child of Array.from(cartView.children)) {
                        child.style.display = "flex";
                    }
                    creditCardForm.style.display = "flex";
                }
            }
            else {
                let cancellingMessage;
                if (context == "groceries") {
                    cancellingMessage = lang === "en" ? "Purchase cancelled" : lang === "pt" ? "Compra cancelada" : null;
                } else if (context == "addUser") {
                    cancellingMessage = lang === "en" ? "User not added" : lang === "pt" ? "Usuário não foi adicionado" : null;
                } else {
                    cancellingMessage = lang === "en" ? "The action was cancelled" : lang === "pt" ? "A ação foi cancelada" : null;
                }

                confirmationBox.innerHTML = `<p style="font-size: x-large;">${cancellingMessage}</p>
                <br>
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 512 512">
                <line x1="368" y1="368" x2="144" y2="144" style="fill:none;stroke:red;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
                <line x1="368" y1="144" x2="144" y2="368" style="fill:none;stroke:red;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
                </svg>
                `;
                if (context == "language" || context === "settings") {
                    document.body.scrollIntoView(false);
                    languageSelect.value = lang;
                }
            }

            if (confirmationMessage) {
                setTimeout(() => {
                    confirmationBox.remove();
                    if (context === "general" || context === "environments" || context === "addEnvironments" || context === "routine"
                    || context === "routineList" || context === "groceries" ||  context == "user" || context === "addUser") {
                        const showElements = () => {
                            if (context === "general") {
                                preferencesText.style.removeProperty("display");
                                preferencesReturnButton.style.removeProperty("display");
                                preferencesWindow.style.display = "flex";
                            } else if (context === "environments" || context === "addEnvironments") {
                                environmentsText.style.removeProperty("display");
                                environmentsReturnButton.style.removeProperty("display");
                                environmentsWindow.style.removeProperty("display");
                                if (context == "environments") {
                                    expandEnvironmentsButton.style.removeProperty("display");
                                    environmentsWindow.style.display = "flex";
                                }
                            } else if (context === "routine") {
                                for (let child of Array.from(document.getElementById("activitybox").children)) {
                                    child.style.removeProperty("display");
                                };
                            }
                            else if (context === "routineList") {
                                for (let child of Array.from(document.getElementById("listbox").children)) {
                                    child.style.removeProperty("display");
                                }
                            } else if (context === "groceries") {
                                for (let child of Array.from(cartView.children)) {
                                    if (child != document.getElementById('cash-payment-message') &&
                                    child != document.getElementById('credit-card-form') &&
                                    child != document.getElementById('payment-button')) {
                                        child.style.display = "flex";
                                    }
                     
                                }
                            } else if (context === "addUser") {
                                for (let child of Array.from(addUserWindow.children)) {
                                    child.style.removeProperty("display");
                                }
                            }
                            else if (context === "user") {
                                for (let child of Array.from(document.getElementById("user-settings-wrapper").children)) {
                                    child.style.display = "flex";
                                }
                            }
                        };

                        showElements();
                    }
                }, 3000);
            } else {
                confirmationBox.remove();
                if (context === "general" || context === "environments" || context === "addEnvironments" || context === "routine") {
                    const showElements = () => {
                        if (context === "general") {
                            preferencesText.style.removeProperty("display");
                            preferencesReturnButton.style.removeProperty("display");
                            preferencesWindow.style.display = "flex";
                        } else if (context === "environments" || context === "addEnvironments") {
                            environmentsText.style.removeProperty("display");
                            environmentsReturnButton.style.removeProperty("display");
                            environmentsWindow.style.removeProperty("display");
                            if (context == "environments") {
                                expandEnvironmentsButton.style.removeProperty("display");
                                environmentsWindow.style.display = "flex";
                            }
                        } else if (context === "routine") {
                            for (let child of Array.from(document.getElementById("activitybox").children)) {
                                child.style.removeProperty("display");
                            };
                        }
                        else if (context === "routineList") {
                            for (let child of Array.from(document.getElementById("listbox").children)) {
                                child.style.removeProperty("display");
                            }
                        }
                    };

                    showElements();
                }
            }
            resolve("No");
        };

        yesButton.addEventListener("click", callbackYesButton);
        noButton.addEventListener("click", callbackNoButton);
    });
}
