"use strict";

/**
 * Represents a vacuum robot its various settings.
 */
class VacuumRobot {

    /**
     * Initializes a new instance of VacuumRobot.
     */
    constructor() {
        this._vacuumRobotButton = document.getElementById("vacuum-robot");

        // Vacuum roboot elements window
        this._vacuumRobotWindow = document.createElement("form");
        // Vacuum roboot environments selection
        this._vacuumEnvironmentsSelection = document.createElement('select');
        // Vacuum robot submit button
        this._vacuumRobotSubmitButton = document.createElement("button");

        this.createUI();
        this.vacuumRobotButtonEvent();
    }

    /**
     * Gets the button element for the vacuum robot.
     * @property {HTMLButtonElement} vacuumRobotButton
     */
    get vacuumRobotButton() {
        return this._vacuumRobotButton;
    }

    /**
     * Gets the select element for vacuum robot environments selection.
     * @property {HTMLSelectElement} vacuumEnvironmentsSelection
     */
    get vacuumEnvironmentsSelection() {
        return this._vacuumEnvironmentsSelection;
    }

    /**
     * Gets the form element for the vacuum robot.
     * @returns {HTMLFormElement} The vacuum robot form.
     */
    get vacuumRobotWindow() {
        return this._vacuumRobotWindow;
    }

    /**
     * Gets the submit button for the vacuum robot.
     * @returns {HTMLButtonElement} The vacuum robot submit button.
     */
    get vacuumRobotSubmitButton() {
        return this._vacuumRobotSubmitButton;
    }

    /**
     * Creates the user interface (UI) elements for this vacuum robot instance.
     */
    createUI() {
        this.vacuumRobotWindow.id = "vacuum-robot-window";

        this.vacuumRobotState = document.createElement("p");
        this.vacuumRobotState.style.textAlign = "center";
        if (!localStorage.getItem("vacuum-robot")) {
            this.vacuumRobotState.innerText = lang == "en" ? "The vacuum robot is currently resting 😴" :
                "O robô aspirador está a descansar no momento 😴";
        }
        else {
            this.vacuumEnvironmentsSelection.prepend(Object.assign(document.createElement('option'), {
                innerHTML: `${lang == "en" ? "Rest" : "Descansar"}`, value: "rest-robot", className: "rest-robot"
            }));
            this.updateVacuumRobotState();
        }
        this.vacuumRobotWindow.appendChild(this.vacuumRobotState);

        let vacuumRobotWindowDivisor1 = document.createElement("hr");
        this.vacuumRobotWindow.appendChild(vacuumRobotWindowDivisor1);

        let environmentSelectionText = document.createElement('p');
        environmentSelectionText.innerText = lang == "en" ? "Send vacuum robot to:" :
            lang == "pt" ? "Enviar o robô aspirador para:" : null;
        this.vacuumRobotWindow.appendChild(environmentSelectionText);

        let vacuumSelectOptionsDefault = JSON.parse(localStorage.getItem('environments')).map(
            environment => `<option>${environment.name}</option>`).join('');
        this.vacuumEnvironmentsSelection.innerHTML = `${vacuumSelectOptionsDefault}`;
        vacuumSelectOptionsDefault = this.vacuumEnvironmentsSelection.innerHTML;
        this.vacuumEnvironmentsSelection.addEventListener("click", () => {
            const selectOptionsDynamic = (JSON.parse(localStorage.getItem('environments'))).map(
                environment => `<option>${environment.name}</option>`).join('');
            if (selectOptionsDynamic != vacuumSelectOptionsDefault) {
                this.vacuumEnvironmentsSelection.style.cursor = "wait";
                this.vacuumEnvironmentsSelection.innerHTML = `${selectOptionsDynamic}`;
                vacuumSelectOptionsDefault = selectOptionsDynamic;
                setTimeout(() => {
                    this.vacuumEnvironmentsSelection.style.removeProperty("cursor");
                }, 1000);
            }
        })
        this.vacuumRobotWindow.appendChild(this.vacuumEnvironmentsSelection);

        let vacuumRobotWindowDivisor2 = document.createElement("hr");
        this.vacuumRobotWindow.appendChild(vacuumRobotWindowDivisor2);

        this.vacuumRobotSubmitButton.innerText = lang == "en" ? "Apply" : lang == "pt" ? "Aplicar" : null;
        this.vacuumRobotSubmitButton.id = "vacuum-robot-submit-button";
        this.vacuumRobotWindow.appendChild(this.vacuumRobotSubmitButton);

        if (localStorage.getItem("vacuum-robot") && this.vacuumEnvironmentsSelection.value == JSON.parse(localStorage.getItem("vacuum-robot")).environment) {
            this.vacuumRobotSubmitButton.disabled = true;
            this.vacuumRobotSubmitButton.innerText = lang == "en" ? "Vacuum robot already in this environment." : "O robô aspirador já está neste ambiente";
        }
        this.vacuumEnvironmentsSelection.addEventListener("change", () => {
            if (localStorage.getItem("vacuum-robot") && this.vacuumEnvironmentsSelection.value == JSON.parse(localStorage.getItem("vacuum-robot")).environment) {
                this.vacuumRobotSubmitButton.disabled = true;
                this.vacuumRobotSubmitButton.innerText = lang == "en" ? "Vacuum robot already in this environment." : "O robô aspirador já está neste ambiente";
            }
            else {
                this.vacuumRobotSubmitButton.innerText = lang == "en" ? "Apply" : lang == "pt" ? "Aplicar" : null;
                this.vacuumRobotSubmitButton.disabled = false;
            }
        });

        this.vacuumRobotSubmitButton.addEventListener("click", event => {
            event.preventDefault();
            showConfirmationDialog(lang == "en" && this.vacuumEnvironmentsSelection.value == "rest-robot" ?
                `Are you sure you want to send the vacuum robot to rest?` :
                lang == "pt" && this.vacuumEnvironmentsSelection.value == "rest-robot" ?
                    `Tem certeza que quer enviar o robô aspirador para descansar?` : lang == "en" ?
                        `Are you sure you want to send the vacuum robot to "<span>${this.vacuumEnvironmentsSelection.value}</span>"?` :
                        lang == "pt" ? `Tem certeza que quer enviar o robô aspirador para "<span>${this.vacuumEnvironmentsSelection.value}</span>"?` : null,
                lang == "en" ? "Yes" : lang == "pt" ? "Sim" : null,
                lang == "en" ? "No" : lang == "pt" ? "Não" : null,
                "negative",
                "general",
                preferencesOuterWindow,
                lang == "en" && this.vacuumEnvironmentsSelection.value == "rest-robot" ?
                `The vacuum robot was successfully sent to rest` :
                lang == "pt" && this.vacuumEnvironmentsSelection.value == "rest-robot" ?
                    `O robô aspirador foi enviado para descansar com sucesso` :
                lang == "en" ? `The vacuum robot was successfully sent to "<span>${this.vacuumEnvironmentsSelection.value}</span>"` : lang == "pt" ?
                    `O robô aspirador foi enviado para "<span>${this.vacuumEnvironmentsSelection.value}</span>" com sucesso` : null, () => {
                        if (this.vacuumEnvironmentsSelection.value == "rest-robot") {
                            this.updateVacuumRobotState(true);
                        }
                        else {
                            this.vacuumRobotSubmitButton.disabled = true;
                            this.vacuumRobotSubmitButton.innerText =
                                lang == "en" ? "Vacuum robot already in this environment." : "O robô aspirador já está neste ambiente";

                            if (!this.vacuumEnvironmentsSelection.querySelector(".rest-robot")) {
                                this.vacuumEnvironmentsSelection.prepend(Object.assign(document.createElement('option'), {
                                    innerHTML: `${lang == "en" ? "Rest" :
                                        "Descansar"}`, value: "rest-robot", className: "rest-robot"
                                }));
                            }

                            // Set the value in localStorage along with the expiration time
                            const expirationTime = new Date().getTime() + 10 * 60 * 1000; // 10 minutes in milliseconds
                            localStorage.setItem("vacuum-robot", JSON.stringify({
                                environment: this.vacuumEnvironmentsSelection.value,
                                expirationTime: expirationTime
                            }));

                            // Display the current state with the time left
                            this.updateVacuumRobotState();
                        }
                    });
        });
    }

    /**
     * Updates the state of the vacuum robot, including cleaning progress and remaining time.
     * Uses intervals to periodically check and update the displayed information.
     */
    updateVacuumRobotState(clear = false) {
        // Set an interval to update the state and check the expiration time
        const intervalId = setInterval(() => {
            const storedData = localStorage.getItem("vacuum-robot");
            if (storedData) {
                const data = JSON.parse(storedData);
                const remainingTime = Math.max(0, data.expirationTime - new Date().getTime());

                const minutes = Math.floor(remainingTime / (60 * 1000));
                const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

                this.vacuumRobotState.innerHTML = lang == "en"
                    ? `The vacuum robot is currently cleaning:<br>"<span>${data.environment}</span>"<br>Time left: ${minutes} minutes and ${seconds} seconds 😶‍🌫️`
                    : `O robô aspirador está no momento a limpar:<br>"<span>${data.environment}</span>"<br>Tempo restante: ${minutes} minutos e ${seconds} segundos 😶‍🌫️`;
            }

            if (storedData) {
                const data = JSON.parse(storedData);
                const remainingTime = data.expirationTime - new Date().getTime();

                if (remainingTime <= 0) {
                    // Clear the value in localStorage
                    localStorage.removeItem("vacuum-robot");

                    // Clear the interval
                    clearInterval(intervalId);

                    this.vacuumRobotState.innerText = lang == "en" ? "The vacuum robot is currently resting 😴" :
                        "O robô aspirador está a descansar no momento 😴";

                    this.vacuumEnvironmentsSelection.options.remove(0);

                    if (this.vacuumRobotSubmitButton.disabled == true) {
                        this.vacuumRobotSubmitButton.disabled = false;
                    }
                }
            }
        }, 1000); // Check every second
        if (clear) {
            // Clear the value in localStorage
            localStorage.removeItem("vacuum-robot");

            // Clear the interval
            clearInterval(intervalId);

            this.vacuumRobotState.innerText = lang == "en" ? "The vacuum robot is currently resting 😴" :
                "O robô aspirador está a descansar no momento 😴";

            this.vacuumEnvironmentsSelection.options.remove(0);

            if (this.vacuumRobotSubmitButton.disabled == true) {
                this.vacuumRobotSubmitButton.disabled = false;
            }
        }
    }

    /**
     * Handles the event for the vacuum robot button, updating preferences and UI accordingly.
     */
    vacuumRobotButtonEvent() {
        // Event listener for the vacuum robot button
        this.vacuumRobotButton.addEventListener("click", () => {
            preferencesOuterWindow.style.animation = "blur-transition-out 0.15s";
            setTimeout(() => {
                preferencesOuterWindow.style.animation = "blur-transition-in 0.15s";
                setTimeout(() => {
                    preferencesOuterWindow.style.removeProperty("animation");
                }, 150);
                preferencesElements.forEach(element => {
                    element.style.display = "none";
                });
                preferencesWindow.appendChild(this.vacuumRobotWindow);

                preferencesWindow.style.display = "flex";
                preferencesReturnButton.style.removeProperty("display");
                if (lang === 'en') {
                    preferencesText.innerHTML = "Vacuum Robot";
                }
                else if (lang === 'pt') {
                    preferencesText.innerHTML = "Robô Aspirador";
                }
                preferencesText.style.marginLeft = "42px";
                if (localStorage.getItem("vacuum-robot")) {
                    if (!this.vacuumEnvironmentsSelection.querySelector(".rest-robot")) {
                        this.vacuumEnvironmentsSelection.prepend(Object.assign(document.createElement('option'), {
                            innerHTML: `${lang == "en" ? "Rest" : "Descansar"}`, value: "rest-robot", className: "rest-robot"
                        }));
                    }
                    this.updateVacuumRobotState();
                }
            }, 150);
        });
    }

}