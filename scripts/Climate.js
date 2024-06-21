"use strict";

/**
 * Represents climate control settings
 */
class Climate {

    /**
     * Creates a new Climate instance.
     * @param {HTMLElement} climateButton - The button element that triggers the climate control settings component.
     * @param {String} context - The context in which the climate control settings operates, 
     * has to be set to either "general" or "environments", set to "general" by default.
     * @param {String} environmentName - The name of the environment this Climate instance will be associated with, 
     * set to "All Environments" by default.
     * @param {String} climateProducts - The climate products associated with this instance, set to "all" by default.
     */
    constructor(climateButton, context = "general", environmentName = "All Environments", climateProducts = "all") {

        this._climateButton = climateButton;
        this._context = context;
        this._environmentName = environmentName;
        this._climateProducts = climateProducts;

        // Setting up local storage

        if (localStorage.getItem(`climate-${environmentName}`)) {
            this._localStorageValues = JSON.parse(localStorage.getItem(`climate-${environmentName}`));
        } else {
            this._localStorageValues = {
                ACPowerState: "off",
                notSubmittedACPowerState: "off",
                temperature: "16",
                notSubmittedTemperature: "16",
                ACFanSpeed: "2",
                notSubmittedACFanSpeed: "2",
                airDiffuser: "off",
                notSubmittedAirDiffuser: "off",
                airPurifier: "off",
                notSubmittedAirPurifier: "off",
                humidifier: "off",
                notSubmittedHumidifier: "off",
                dehumidifier: "off",
                notSubmittedDehumidifier: "off",
            };
        }

        this._localStorageValues.notSubmittedACPowerState = this._localStorageValues.ACPowerState;
        this._localStorageValues.notSubmittedTemperature = this._localStorageValues.temperature;
        this._localStorageValues.notSubmittedACFanSpeed = this._localStorageValues.ACFanSpeed;
        this._localStorageValues.notSubmittedAirDiffuser = this._localStorageValues.airDiffuser;
        this._localStorageValues.notSubmittedAirPurifier = this._localStorageValues.airPurifier;
        this._localStorageValues.notSubmittedHumidifier = this._localStorageValues.humidifier;
        this._localStorageValues.notSubmittedDehumidifier = this._localStorageValues.dehumidifier;

        localStorage.setItem(`climate-${environmentName}`, JSON.stringify(this._localStorageValues));

        // Cliamte elements window
        this._climateWindow = document.createElement("form");

        this.climateEnvironmentsSelection = null;
        if (this.context == "general") {
            // Climate environment selection if context is general
            this.climateEnvironmentsSelection = document.createElement("select");
        }
        // AC power button
        this.ACPowerButton = document.createElement("button");
        // AC temperature control window
        this.ACTempWindow = document.createElement("div");
        // AC lower temperature button
        this.ACTempDown = document.createElement("button");
        // AC temperature value display
        this.ACTempDisplay = document.createElement("input");
        // AC raise temperature button
        this.ACTempUp = document.createElement("button");
        // AC fan speed wrapper
        this.ACFanSpeedWrapper = document.createElement("div");
        // AC fan speed element
        this.ACFanSpeed = document.createElement("div");
        // Section divide hr bar number 1
        this.divideBar1 = document.createElement('hr');
        // Wrapper for other than AC settings 
        this.climateWindowLowerWrapper = document.createElement('div');
        // Air diffuser wrapper
        this.airDiffuserWrapper = document.createElement("div");
        // Air diffuser element
        this.airDiffuser = document.createElement("select");
        // Air diffuser scents
        this.scentsArray;
        lang == "en" ? this.scentsArray = ["Off", "Roses", "Wood", "Lavender", "Pine", "Ocean"] :
            lang == "pt" ? this.scentsArray = ["Desligado", "Rosas", "Madeira", "Lavanda", "Pinho", "Oceano"] : null;
        // Air Purifier Wrapper
        this.airPurifierWrapper = document.createElement('div');
        // Air Purifier
        this.airPurifier = document.createElement('select');
        // Humidifier Wrapper
        this.humidifierWrapper = document.createElement('div');
        // Humidifier
        this.humidifier = document.createElement('select');
        // Dehumidifier Wrapper
        this.dehumidifierWrapper = document.createElement('div');
        // Dehumidifier
        this.dehumidifier = document.createElement('select');
        // Section divide hr bar number 2
        this.divideBar2 = document.createElement('hr');
        // AC submit button
        this.climateSubmitButton = document.createElement("button");

        Climate.allInstances.push(this);
        if (this.climateWindow) {
            this.createUI();
            this.climateButtonEvent();
            this.incrementTemperature();
            this.decrementTemperature();
            this.toggleACPower();
            this.climateFormSubmission();
        }
    }

    // Static array to keep track of all created climate instances
    static allInstances = [];

    /**
     * Restores climate settings and UI to match localStorage values when returning from
     * AC settings in a given context.
     * Removes the climate window associated with the provided context,
     * and ensures that notSubmitted settings match their respective current values.
     * This method is static and can be called on the class itself, as it operates on all instances.
     * @param {String} context - The context from which to return from Climate settings.
     */
    static returnFromClimate(context) {

        Climate.allInstances.forEach((instance) => {
            if (instance.context == context) {
                instance.ACTempDisplay.value = instance.localStorageValues.temperature;

                instance.retrieveClimateSettings("do-not-update-stats");
                instance.climateWindow.remove();
            }

            instance.localStorageValues.notSubmittedACPowerState = instance.localStorageValues.ACPowerState;
            instance.localStorageValues.notSubmittedTemperature = instance.localStorageValues.temperature;
            instance.localStorageValues.notSubmittedACFanSpeed = instance.localStorageValues.ACFanSpeed;
            instance.localStorageValues.notSubmittedAirDiffuser = instance.localStorageValues.airDiffuser;
            instance.localStorageValues.notSubmittedAirPurifier = instance.localStorageValues.airPurifier;
            instance.localStorageValues.notSubmittedHumidifier = instance.localStorageValues.humidifier;
            instance.localStorageValues.notSubmittedDehumidifier = instance.localStorageValues.dehumidifier;

            localStorage.setItem(`climate-${instance.environmentName}`, JSON.stringify(instance.localStorageValues));
        });
    }

    // Getter and setters for important attributes

    /**
     * Gets the climate button.
     * @property {HTMLElement} climateButton
     */
    get climateButton() {
        return this._climateButton;
    }

    /**
     * Gets the current context.
     * @property {String} context
     */
    get context() {
        return this._context;
    }

    /**
     * Gets the environment name.
     * @property {String} environmentName
     */
    get environmentName() {
        return this._environmentName;
    }

    /**
     * Gets the climate products.
     * @property {Array} climateProducts
     */
    get climateProducts() {
        return this._climateProducts;
    }

    /**
     * Gets the local storage values related to climate settings.
     * @property {Object} localStorageValues
     */
    get localStorageValues() {
        return this._localStorageValues;
    }

    /**
     * Gets the climate window.
     * @property {HTMLElement} climateWindow
     */
    get climateWindow() {
        return this._climateWindow;
    }

    /**
     * Sets the climate button.
     * @param {HTMLElement} climateButton - The climate button element to set.
     */
    set climateButton(climateButton) {
        this._climateButton = climateButton;
    }

    /**
     * Sets the current context.
     * @param {String} context - The context to set.
     */
    set context(context) {
        this._context = context;
    }

    /**
     * Sets the environment name.
     * @param {String} environmentName - The environment name to set.
     */
    set environmentName(environmentName) {
        this._environmentName = environmentName;
    }

    /**
     * Sets the climate products.
     * @param {Array} climateProducts - An array of climate products to set.
     */
    set climateProducts(climateProducts) {
        this._climateProducts = climateProducts;
    }

    /**
     * Sets the local storage values related to climate settings.
     * @param {Object} localStorageValues - An object containing climate-related local storage values to set.
     */
    set localStorageValues(localStorageValues) {
        this._localStorageValues = localStorageValues;
    }

    /**
    * Sets the climate window to a new climate window
    * @param {HTMLElement} climateWindow - The climate window to be set.
    */
    set climateWindow(climateWindow) {
        this._climateWindow = climateWindow;
    }

    // Methods

    /**
     * Creates the user interface (UI) elements for this Climate instance.
     * Configures and styles various elements such as power button, temperature control,
     * fan speed, and air diffuser settings.
     */
    createUI() {
        this.climateWindow.classList.add("climate-window");

        if (this.context == "general") {
            this.climateEnvironmentsSelection.innerHTML = `<option>${lang == "en" ? "All Environments" : lang == "pt" ? "Todos os Ambientes" : null}</option>`;

            let climateSelectOptionsDefault = JSON.parse(localStorage.getItem('environments'))
                .filter(environment => environment.products.some(product => product.includes("AC")) || environment.products.some(product => product.includes("Diffuser"))
                    || environment.products.some(product => product.includes("AirPurifier")) ||
                    environment.products.some(product => product.includes("Humidifier")) || environment.products.some(product => product.includes("Dehumidifier")))
                .map(environment => `<option>${environment.name}</option>`)
                .join('');

            this.climateEnvironmentsSelection.innerHTML += climateSelectOptionsDefault;

            climateSelectOptionsDefault = this.climateEnvironmentsSelection.innerHTML;
            this.climateEnvironmentsSelection.addEventListener("click", () => {
                const climateSelectOptionsDynamic = `<option>${lang == "en" ? "All Environments" : lang == "pt" ? "Todos os Ambientes" : null}</option>` +
                    JSON.parse(localStorage.getItem('environments')).filter(environment => environment.products.some(product => product.includes("AC")) ||
                        environment.products.some(product => product.includes("Diffuser"))
                        || environment.products.some(product => product.includes("AirPurifier")) ||
                        environment.products.some(product => product.includes("Humidifier")) || environment.products.some(product => product.includes("Dehumidifier")))
                        .map(environment => `<option>${environment.name}</option>`).join('');
                if (climateSelectOptionsDynamic != climateSelectOptionsDefault) {
                    this.climateEnvironmentsSelection.style.cursor = "wait";
                    this.climateEnvironmentsSelection.innerHTML = climateSelectOptionsDynamic;
                    climateSelectOptionsDefault = climateSelectOptionsDynamic;
                    setTimeout(() => {
                        this.climateEnvironmentsSelection.style.removeProperty("cursor");
                    }, 1000);
                }
            });
            
            this.climateEnvironmentsSelection.addEventListener("change", () => {
                let selectedEnvironment = this.climateEnvironmentsSelection.value;
                this.climateWindow.getElementsByTagName('hr')[1].style.display = "flex";
                if (lang == "pt") {
                    if (selectedEnvironment == "Quarto" && localStorage.getItem("climate-Bedroom")) {
                        selectedEnvironment = "Bedroom";
                    }
                    else if (selectedEnvironment == "Cozinha" && localStorage.getItem("climate-Kitchen")) {
                        selectedEnvironment = "Kitchen";
                    }
                    else if (selectedEnvironment == "Escritório" && localStorage.getItem("climate-Office")) {
                        selectedEnvironment = "Office";
                    }
                    else if (selectedEnvironment == "Casa de Banho" && localStorage.getItem("climate-Bathroom")) {
                        selectedEnvironment = "Bathroom";
                    }
                    else if (selectedEnvironment == "Sala de Estar" && localStorage.getItem("climate-Living Room")) {
                        selectedEnvironment = "Living Room";
                    }
                } else if (lang == "en") {
                    if (selectedEnvironment == "Bedroom" && localStorage.getItem("climate-Quarto")) {
                        selectedEnvironment = "Quarto";
                    }
                    else if (selectedEnvironment == "Kitchen" && localStorage.getItem("climate-Cozinha")) {
                        selectedEnvironment = "Cozinha";
                    }
                    else if (selectedEnvironment == "Office" && localStorage.getItem("climate-Escritório")) {
                        selectedEnvironment = "Escritório";
                    }
                    else if (selectedEnvironment == "Bathroom" && localStorage.getItem("climate-Casa de Banho")) {
                        selectedEnvironment = "Casa de Banho";
                    }
                    else if (selectedEnvironment == "Living Room" && localStorage.getItem("climate-Sala de Estar")) {
                        selectedEnvironment = "Sala de Estar";
                    }
                }

                if (selectedEnvironment == "All Environments" || selectedEnvironment == "Todos os Ambientes") {
                    this.environmentName = "All Environments";
                    if (!this.isClimateLocalStorageValuesEqual()) {
                        this.climateWindow.insertBefore(Object.assign(document.createElement('p'),
                        {
                            className: 'various-message', style: "margin-bottom: 0px; font-size: 20px;",
                            innerHTML: lang === "en" ? "<i>Various climate settings currently applied</i>" :
                                "<i>Várias configurações de climatização aplicadas atualmente</i>"
                        }), this.climateWindow.getElementsByTagName('hr')[0]);
                    }
                    this.localStorageValues = JSON.parse(localStorage.getItem(`climate-All Environments`));

                    this.climateWindow.getElementsByTagName('p')[0].style.display = "flex";
                    this.climateWindow.getElementsByTagName('hr')[0].style.display = "flex";
                    this.ACTempWindow.style.display = "flex";
                    this.ACFanSpeedWrapper.style.display = "flex";
                    this.ACPowerButton.style.display = "flex";
                    this.airPurifierWrapper.style.display = "flex";
                    this.airDiffuserWrapper.style.display = "flex";
                    this.dehumidifierWrapper.style.display = "flex";
                    this.humidifierWrapper.style.display = "flex";
                } else {
                    if (this.climateWindow.querySelector('.various-message')) {
                        this.climateWindow.querySelector('.various-message').remove();
                    }
                    const matchingInstance = Climate.allInstances.find(instance => instance.environmentName === selectedEnvironment);
                    this.environmentName = matchingInstance.environmentName;
                    this.climateProducts = matchingInstance.climateProducts;
                    this.localStorageValues = matchingInstance.localStorageValues;

                    const productsToHide = [];

                    if (!matchingInstance.climateProducts.some(item => item.includes("AC"))) {
                        productsToHide.push("AC");
                    }
                    if (!matchingInstance.climateProducts.some(item => item.includes("AirPurifier"))) {
                        productsToHide.push("AirPurifier");
                    }
                    if (!matchingInstance.climateProducts.some(item => item.includes("AirDiffuser"))) {
                        productsToHide.push("AirDiffuser");
                    }
                    if (!matchingInstance.climateProducts.some(item => item.includes("Dehumidifier"))) {
                        productsToHide.push("Dehumidifier");
                    }
                    if (!matchingInstance.climateProducts.some(item => item.includes("Humidifier"))) {
                        productsToHide.push("Humidifier");
                    }

                    // Hide or show elements based on productsToHide
                    if (!this.climateWindow.getElementsByTagName('p')[0].classList.contains("air-diffuser-text") &&
                        !this.climateWindow.getElementsByTagName('p')[0].classList.contains("dehumidifier-text") &&
                        !this.climateWindow.getElementsByTagName('p')[0].classList.contains("humidifier-text") &&
                        !this.climateWindow.getElementsByTagName('p')[0].classList.contains("air-purifier-text")) {
                        this.climateWindow.getElementsByTagName('p')[0].style.display = productsToHide.includes("AC") ? "none" : "flex";
                    }
                    if (this.climateWindow.getElementsByTagName('p')[0].style.display == "none") {
                        this.climateWindow.getElementsByTagName('hr')[0].style.display = "none";
                    }
                    else {
                        this.climateWindow.getElementsByTagName('hr')[0].style.display = "flex";
                    }
                    if (productsToHide.includes("AirPurifier") && productsToHide.includes("AirDiffuser") && productsToHide.includes("Dehumidifier")
                        && productsToHide.includes("Humidifier")) {
                        this.climateWindow.getElementsByTagName('hr')[1].style.display = "none";
                    }
                    else {
                        this.climateWindow.getElementsByTagName('hr')[1].style.display = "flex";
                    }
                    this.ACTempWindow.style.display = productsToHide.includes("AC") ? "none" : "flex";
                    this.ACFanSpeedWrapper.style.display = productsToHide.includes("AC") ? "none" : "flex";
                    this.ACPowerButton.style.display = productsToHide.includes("AC") ? "none" : "flex";
                    this.airPurifierWrapper.style.display = productsToHide.includes("AirPurifier") ? "none" : "flex";
                    this.airDiffuserWrapper.style.display = productsToHide.includes("AirDiffuser") ? "none" : "flex";
                    this.dehumidifierWrapper.style.display = productsToHide.includes("Dehumidifier") ? "none" : "flex";
                    this.humidifierWrapper.style.display = productsToHide.includes("Humidifier") ? "none" : "flex";
                }

                this.ACTempDisplay.value = this.localStorageValues.temperature;
                if (this.ACFanSpeed.querySelectorAll(".fan-speed-option")[parseInt(this.localStorageValues.ACFanSpeed) - 1]) {
                    this.ACFanSpeed.querySelectorAll(".fan-speed-option")[parseInt(this.localStorageValues.ACFanSpeed) - 1].click();
                }
                this.localStorageValues.notSubmittedACPowerState = this.localStorageValues.ACPowerState;
                this.localStorageValues.notSubmittedTemperature = this.localStorageValues.temperature;
                this.localStorageValues.notSubmittedACFanSpeed = this.localStorageValues.ACFanSpeed;
                this.localStorageValues.notSubmittedAirDiffuser = this.localStorageValues.airDiffuser;
                this.localStorageValues.notSubmittedAirPurifier = this.localStorageValues.airPurifier;
                this.localStorageValues.notSubmittedHumidifier = this.localStorageValues.humidifier;
                this.localStorageValues.notSubmittedDehumidifier = this.localStorageValues.dehumidifier;

                this.retrieveClimateSettings();
                this.updateSubmitButtonVisibility();
            });


            this.climateWindow.appendChild(this.climateEnvironmentsSelection);
            this.climateWindow.appendChild(document.createElement('hr'));
        }

        let productsCount = 0;
        if (this.climateProducts == "all") {
            // AC
            if (JSON.parse(localStorage.getItem('environments'))
                .filter(environment => environment.products.some(product => product.includes("AC"))).length > 0) {
                this.createAC();
                this.climateWindow.appendChild(this.divideBar1);
            }

            this.climateWindowLowerWrapper.classList.add("climate-window-lower-wrapper");
            this.climateWindow.appendChild(this.climateWindowLowerWrapper);

            // Diffuser
            if (JSON.parse(localStorage.getItem('environments'))
                .filter(environment => environment.products.some(product => product.includes("Diffuser"))).length > 0) {
                this.createDiffuser();
            }

            // Air Purifier
            if (JSON.parse(localStorage.getItem('environments'))
                .filter(environment => environment.products.some(product => product.includes("AirPurifier"))).length > 0) {
                this.createAirPurifier();
            }

            // Humidifier
            if (JSON.parse(localStorage.getItem('environments'))
                .filter(environment => environment.products.some(product => product.includes("Humidifier"))).length > 0) {
                this.createHumidifier();
            }

            // Dehumidifier
            if (JSON.parse(localStorage.getItem('environments'))
                .filter(environment => environment.products.some(product => product.includes("Dehumidifier"))).length > 0) {
                this.createDehumidifier();
            }
        } else {
            for (const product of this.climateProducts) {
                if (product.includes("AirDiffuser") || product.includes("AirPurifier") ||
                    product.includes("Humidifier") || product.includes("Dehumidifier")) {
                    this.climateWindowLowerWrapper.classList.add("climate-window-lower-wrapper");
                    this.climateWindow.appendChild(this.climateWindowLowerWrapper);
                }
                if (product.includes("AC")) {
                    // AC
                    this.createAC();
                    this.climateWindow.appendChild(this.divideBar1);
                }
                else if (product.includes("AirDiffuser")) {
                    // Diffuser
                    this.createDiffuser();
                }
                else if (product.includes("AirPurifier")) {
                    // Air Purifier
                    this.createAirPurifier();
                }
                else if (product.includes("Humidifier")) {
                    // Humidifier
                    this.createHumidifier();
                }
                else if (product.includes("Dehumidifier")) {
                    // Dehumidifier
                    this.createDehumidifier();
                }
                productsCount++
            }
        }

        if ((productsCount > 1 || !this.climateProducts.includes("AC")) && (!this.climateProducts.includes("AC") && productsCount != 1)) {
            this.climateWindow.appendChild(this.divideBar2);
        }

        // Submit button
        if (lang == "en") {
            this.climateSubmitButton.innerText = "Apply";
        } else if (lang == "pt") {
            this.climateSubmitButton.innerText = "Aplicar";
        }
        this.climateSubmitButton.classList.add("climate-submit-button");
        this.climateSubmitButton.type = "submit";
        this.climateWindow.appendChild(this.climateSubmitButton);

        // Check local storage to maintain previously selected AC temperature if page is refreshed
        this.ACTempDisplay.value = this.localStorageValues.temperature;

        this.retrieveClimateSettings();
        this.updateSubmitButtonVisibility();

        if (!this.isClimateLocalStorageValuesEqual() && this.environmentName == "All Environments") {
            this.climateWindow.insertBefore(Object.assign(document.createElement('p'),
            {
                className: 'various-message', style: "margin-bottom: 0px; font-size: 20px;",
                innerHTML: lang === "en" ? "<i>Various climate settings currently applied</i>" :
                    "<i>Várias configurações de climatização aplicadas atualmente</i>"
            }), this.climateWindow.getElementsByTagName('hr')[0]);
        }
    }

    /**
     * Creates the Air Conditioner (AC) component in the climate control settings.
     */
    createAC() {
        this.ACTempWindow.classList.add("AC-temp-window");
        this.ACTempWindow.style.display = "flex";
        if (this.localStorageValues.ACPowerState) {
            this.climateWindow.appendChild(this.ACTempWindow);
        }

        let ACTempWindowText = document.createElement('p');
        ACTempWindowText.innerText = lang == "en" ? "Air Conditioner" : lang == "pt" ? "Ar-condicionado" : null;
        ACTempWindowText.style.fontSize = "larger";
        this.climateWindow.appendChild(ACTempWindowText);

        this.ACPowerButton.innerHTML = `<svg height="20px" width="20px" 
        version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512">
        <g>
            <g>
            <path d="m256,501c-120.6,0-218.7-98.1-218.7-218.7 0-91.6 57.9-174.1 144.2-205.4 10.6-3.9 22.3,1.6 26.2,12.2 
            3.8,10.6-1.6,22.3-12.2,26.2-70.1,25.5-117.3,92.6-117.3,167 0,98.1 79.8,177.8 177.8,177.8 
            98.1,0 177.8-79.8 177.8-177.8 0-74.4-47.1-141.6-117.3-167-10.6-3.8-16.1-15.6-12.2-26.2 3.8-10.6 
            15.6-16.1 26.2-12.2 86.2,31.3 144.2,113.8 144.2,205.4 0,120.6-98.1,218.7-218.7,218.7z"/>
            <path d="m256,308.8c-11.3,0-20.4-9.1-20.4-20.4v-257c0-11.3 9.1-20.4 20.4-20.4 11.3,0 20.4,9.1 20.4,20.4v256.9c0,11.3-9.1,20.5-20.4,20.5z"/>
            </g>
        </g>
        </svg>`;
        this.ACPowerButton.classList.add("AC-power-button");
        this.ACPowerButton.type = "button";
        this.ACPowerButton.style.display = "flex";
        this.ACPowerButton.style.border = "3px solid red";
        this.ACPowerButton.querySelector("svg").style.fill = "red";
        this.climateWindow.appendChild(this.ACPowerButton);

        this.ACTempDown.innerText = "-";
        this.ACTempDown.classList.add("AC-temp-down");
        this.ACTempDown.type = "button";
        this.ACTempDown.style.display = "flex";
        this.ACTempWindow.appendChild(this.ACTempDown);

        let ACTempAndCelsiusWrapper = document.createElement('div');
        ACTempAndCelsiusWrapper.style = "display: flex;\
        align-items: center;\
        flex-direction: row;\
        margin-left: 20px;\
        margin-right: 10px;\
        flex-wrap: nowrap;\
        justify-content: flex-start;"
        this.ACTempWindow.appendChild(ACTempAndCelsiusWrapper);

        this.ACTempDisplay.classList.add("AC-temp-display");
        this.ACTempDisplay.value = "16";
        this.ACTempDisplay.type = "text";
        ACTempAndCelsiusWrapper.appendChild(this.ACTempDisplay);
        this.ACTempDisplay.addEventListener("input", () => {
            if (isNaN(this.ACTempDisplay.value)) {
                this.ACTempDisplay.value = 16;
            }
            else if (this.ACTempDisplay.value.length > 2) {
                this.ACTempDisplay.value = this.ACTempDisplay.value.slice(0, 2); // Truncate the input to the first 2 characters
            }
        });
        this.ACTempDisplay.addEventListener("focusout", () => {
            if (this.ACTempDisplay.value < 16 || isNaN(this.ACTempDisplay.value)) {
                // If it is, set the value to 16
                this.ACTempDisplay.value = 16;
            }
            else if (this.ACTempDisplay.value > 30) {
                this.ACTempDisplay.value = 30;
            }
            else {
                this.ACTempDisplay.value = parseInt(this.ACTempDisplay.value);
            }
            this.localStorageValues.notSubmittedTemperature = this.ACTempDisplay.value;
            localStorage.setItem(`climate-${this.environmentName}`, JSON.stringify(this.localStorageValues));
            this.updateSubmitButtonVisibility();
        });

        let ACTempDisplayCelsiusSign = document.createElement('span');
        ACTempDisplayCelsiusSign.style.fontSize = "x-large";
        ACTempDisplayCelsiusSign.innerText = " ºC";
        ACTempAndCelsiusWrapper.appendChild(ACTempDisplayCelsiusSign);

        this.ACTempUp.innerText = "+";
        this.ACTempUp.classList.add("AC-temp-up");
        this.ACTempUp.type = "button";
        this.ACTempUp.style.display = "flex";
        this.ACTempWindow.appendChild(this.ACTempUp);

        this.ACFanSpeedWrapper.classList.add("AC-fan-wrapper");
        this.ACFanSpeedWrapper.style.display = "flex";
        this.ACFanSpeedWrapper.style.gap = "10px";
        this.ACFanSpeedWrapper.style.alignItems = "center";

        const ACFanSpeedText = document.createElement("p");
        ACFanSpeedText.classList.add("AC-fan-speed-text");
        if (lang == "en") {
            ACFanSpeedText.innerText = "Fan Speed:"
        }
        else if (lang == "pt") {
            ACFanSpeedText.innerText = "Velocidade da ventoinha:"
        }
        this.ACFanSpeedWrapper.appendChild(ACFanSpeedText)

        this.ACFanSpeed.classList.add("AC-fan-speed");
        this.ACFanSpeed.style.display = "flex";
        this.ACFanSpeed.innerHTML = `
        <button type="button" class="fan-speed-option" value="1">1</button>
        <button type="button" class="fan-speed-option" value="2">2</button>
        <button type="button" class="fan-speed-option" value="3">3</button>`
        Array.from(this.ACFanSpeed.getElementsByClassName("fan-speed-option")).forEach(option => {
            option.addEventListener("click", () => {

                Array.from(this.ACFanSpeed.getElementsByClassName("fan-speed-option")).forEach(option => {
                    option.style.removeProperty("background");
                    option.style.removeProperty("color");
                });

                option.style.background = "green";
                option.style.color = "white";
                this.updateSubmitButtonVisibility();
                this.localStorageValues.notSubmittedACFanSpeed = option.value;
                localStorage.setItem(`climate-${this.environmentName}`, JSON.stringify(this.localStorageValues));
                this.updateSubmitButtonVisibility();
            });
        })
        this.ACFanSpeedWrapper.appendChild(this.ACFanSpeed);
    }

    /**
     * Creates the Air Diffuser component in the climate control settings.
     */
    createDiffuser() {
        this.airDiffuserWrapper.classList.add("air-diffuser-wrapper");
        this.airDiffuserWrapper.style.display = "flex";
        this.airDiffuserWrapper.style.flexDirection = "column";
        this.airDiffuserWrapper.style.alignItems = "center";

        const airDiffuserText = document.createElement("p");
        airDiffuserText.classList.add("air-diffuser-text");
        if (lang == "en") {
            airDiffuserText.innerText = "Diffuser Scent:";
        }
        else if (lang == "pt") {
            airDiffuserText.innerText = "Aroma do Difusor:";
        }
        this.airDiffuserWrapper.appendChild(airDiffuserText);

        this.airDiffuser.classList.add("air-diffuser");
        this.airDiffuser.style.display = "flex";
        this.airDiffuser.innerHTML = `
            <option value="off">${this.scentsArray[0]}</option>
            <option value="Roses">${this.scentsArray[1]}</option>
            <option value="Wood">${this.scentsArray[2]}</option>
            <option value="Lavender">${this.scentsArray[3]}</option>
            <option value="Pine">${this.scentsArray[4]}</option>
            <option value="Ocean">${this.scentsArray[5]}</option>
        `
        this.airDiffuserWrapper.appendChild(this.airDiffuser);
        this.climateWindowLowerWrapper.appendChild(this.airDiffuserWrapper);

        if (this.airDiffuser.value != "off") {
            this.airDiffuser.style.outline = "green 2px solid";
        }
        else {
            this.airDiffuser.style.outline = "red 2px solid";
        }
        this.airDiffuser.addEventListener("change", () => {
            this.localStorageValues.notSubmittedAirDiffuser = this.airDiffuser.value;
            localStorage.setItem(`climate-${this.environmentName}`, JSON.stringify(this.localStorageValues));
            this.updateSubmitButtonVisibility();
            if (this.airDiffuser.value != "off") {
                this.airDiffuser.style.outline = "green 2px solid";
            }
            else {
                this.airDiffuser.style.outline = "red 2px solid";
            }
        });
    }

    /**
     * Creates the Air Purifier component in the climate control settings.
     */
    createAirPurifier() {
        this.airPurifierWrapper.classList.add("air-purifier-wrapper");
        this.airPurifierWrapper.style.display = "flex";
        this.airPurifierWrapper.style.flexDirection = "column";
        this.airPurifierWrapper.style.alignItems = "center";

        const airPurifierText = document.createElement("p");
        airPurifierText.classList.add("air-purifier-text");
        if (lang == "en") {
            airPurifierText.innerText = "Air Purifier:"
        }
        else if (lang == "pt") {
            airPurifierText.innerText = "Purificador de Ar:"
        }
        this.airPurifierWrapper.appendChild(airPurifierText);

        this.airPurifier.classList.add("air-purifier");
        this.airPurifier.style.display = "flex";
        this.airPurifier.innerHTML = `
                    <option value="off">${lang == "en" ? "Off" : lang == "pt" ? "Desligado" : null}</option>
                    <option value="on">${lang == "en" ? "On" : lang == "pt" ? "Ligado" : null}</option>
                `
        this.airPurifierWrapper.appendChild(this.airPurifier);
        this.climateWindowLowerWrapper.appendChild(this.airPurifierWrapper);

        if (this.airPurifier.value != "off") {
            this.airPurifier.style.outline = "green 2px solid";
        }
        else {
            this.airPurifier.style.outline = "red 2px solid";
        }
        this.airPurifier.addEventListener("change", () => {
            this.localStorageValues.notSubmittedAirPurifier = this.airPurifier.value;
            localStorage.setItem(`climate-${this.environmentName}`, JSON.stringify(this.localStorageValues));
            this.updateSubmitButtonVisibility();
            if (this.airPurifier.value != "off") {
                this.airPurifier.style.outline = "green 2px solid";
            }
            else {
                this.airPurifier.style.outline = "red 2px solid";
            }
        });
    }

    /**
     * Creates the Humidifier component in the climate control settings.
     */
    createHumidifier() {
        this.humidifierWrapper.classList.add("humidifier-wrapper");
        this.humidifierWrapper.style.display = "flex";
        this.humidifierWrapper.style.flexDirection = "column";
        this.humidifierWrapper.style.alignItems = "center";

        const humidifierText = document.createElement("p");
        humidifierText.classList.add("humidifier-text");
        if (lang == "en") {
            humidifierText.innerText = "Humidifier:"
        }
        else if (lang == "pt") {
            humidifierText.innerText = "Humidificador:"
        }
        this.humidifierWrapper.appendChild(humidifierText);

        this.humidifier.classList.add("humidifier");
        this.humidifier.style.display = "flex";
        this.humidifier.innerHTML = `
            <option value="off">${lang == "en" ? "Off" : lang == "pt" ? "Desligado" : null}</option>
            <option value="on">${lang == "en" ? "On" : lang == "pt" ? "Ligado" : null}</option>
        `
        this.humidifierWrapper.appendChild(this.humidifier);
        this.climateWindowLowerWrapper.appendChild(this.humidifierWrapper);

        if (this.humidifier.value != "off") {
            this.humidifier.style.outline = "green 2px solid";
        }
        else {
            this.humidifier.style.outline = "red 2px solid";
        }
        this.humidifier.addEventListener("change", () => {
            this.localStorageValues.notSubmittedHumidifier = this.humidifier.value;
            localStorage.setItem(`climate-${this.environmentName}`, JSON.stringify(this.localStorageValues));
            this.updateSubmitButtonVisibility();
            if (this.humidifier.value == "on") {
                this.humidifier.style.outline = "green 2px solid";
                this.dehumidifier.value = "off";
                this.dehumidifier.disabled = true;
            }
            else {
                this.humidifier.style.outline = "red 2px solid";
                this.dehumidifier.style.outline = "red 2px solid";
                this.dehumidifier.disabled = false;
            }
        });
    }

    /**
     * Creates the Dehumidifier component in the climate control settings.
     */
    createDehumidifier() {
        this.dehumidifierWrapper.classList.add("dehumidifier-wrapper");
        this.dehumidifierWrapper.style.display = "flex";
        this.dehumidifierWrapper.style.flexDirection = "column";
        this.dehumidifierWrapper.style.alignItems = "center";

        const dehumidifierText = document.createElement("p");
        dehumidifierText.classList.add("dehumidifier-text");
        if (lang == "en") {
            dehumidifierText.innerText = "Dehumidifier:"
        }
        else if (lang == "pt") {
            dehumidifierText.innerText = "Deshumidificador:"
        }
        this.dehumidifierWrapper.appendChild(dehumidifierText);

        this.dehumidifier.classList.add("dehumidifier");
        this.dehumidifier.style.display = "flex";
        this.dehumidifier.innerHTML = `
            <option value="off">${lang == "en" ? "Off" : lang == "pt" ? "Desligado" : null}</option>
            <option value="on">${lang == "en" ? "On" : lang == "pt" ? "Ligado" : null}</option>
        `
        this.dehumidifierWrapper.appendChild(this.dehumidifier);
        this.climateWindowLowerWrapper.appendChild(this.dehumidifierWrapper);


        if (this.dehumidifier.value != "off") {
            this.dehumidifier.style.outline = "green 2px solid";
        }
        else {
            this.dehumidifier.style.outline = "red 2px solid";
        }
        this.dehumidifier.addEventListener("change", () => {
            this.localStorageValues.notSubmittedDehumidifier = this.dehumidifier.value;
            localStorage.setItem(`climate-${this.environmentName}`, JSON.stringify(this.localStorageValues));
            this.updateSubmitButtonVisibility();
            if (this.dehumidifier.value == "on") {
                this.dehumidifier.style.outline = "green 2px solid";
                this.humidifier.value = "off";
                this.humidifier.disabled = true;
            }
            else {
                this.humidifier.style.outline = "red 2px solid";
                this.dehumidifier.style.outline = "red 2px solid";
                this.humidifier.disabled = false;
            }
        });
    }

    /**
     * Applies Event listener to the climate button.
     * If the context is "general," retrieves climate settings and displays the climate window.
     * If the context is "environments," retrieves climate settings and displays the 
     * climate window within the environments view.
     */
    climateButtonEvent() {
        // Event listener for the climate button
        if (this.context == "general") {
            this.climateButton.addEventListener("click", () => {
                this.retrieveClimateSettings();
                preferencesOuterWindow.style.animation = "blur-transition-out 0.15s";
                setTimeout(() => {
                    preferencesOuterWindow.style.animation = "blur-transition-in 0.15s";
                    setTimeout(() => {
                        preferencesOuterWindow.style.removeProperty("animation");
                    }, 150);
                    preferencesElements.forEach(element => {
                        element.style.display = "none";
                    });
                    if (this.climateWindow) {
                        preferencesWindow.appendChild(this.climateWindow);
                    }
                    if (this.ACFanSpeed.querySelector(".fan-speed-option")) {
                        this.ACFanSpeed.querySelectorAll(".fan-speed-option")[parseInt(this.localStorageValues.ACFanSpeed) - 1].click();
                    }
                    this.airDiffuser.value = this.localStorageValues.airDiffuser;
                    this.updateSubmitButtonVisibility();
                    preferencesWindow.style.display = "flex";
                    preferencesReturnButton.style.removeProperty("display");
                    if (lang === 'en') {
                        preferencesText.innerHTML = "Climate";
                    }
                    else if (lang === 'pt') {
                        preferencesText.innerHTML = "Climatização";
                    }
                    preferencesText.style.marginLeft = "42px";
                }, 150);
            });
        }
        else if (this.context == "environments") {
            this.climateButton.addEventListener("click", () => {
                this.retrieveClimateSettings();
                environmentsOuterWindow.style.animation = "blur-transition-out 0.15s";
                setTimeout(() => {
                    environmentsOuterWindow.style.animation = "blur-transition-in 0.15s";
                    setTimeout(() => {
                        environmentsOuterWindow.style.removeProperty("animation");
                    }, 150);
                    document.querySelectorAll(".environment-preference-button").forEach(element => {
                        element.style.display = "none";
                    });
                    environmentsWindow.appendChild(this.climateWindow);
                    if (this.ACFanSpeed.querySelector(".fan-speed-option")) {
                        this.ACFanSpeed.querySelectorAll(".fan-speed-option")[parseInt(this.localStorageValues.ACFanSpeed) - 1].click();
                    }
                    this.airDiffuser.value = this.localStorageValues.airDiffuser;
                    this.updateSubmitButtonVisibility();
                    if (lang === 'en') {
                        environmentsText.innerHTML = `Climate<p class='subp'>${this.environmentName}</p>`;
                    }
                    else if (lang === 'pt') {
                        environmentsText.innerHTML = `Climatização<p class='subp'>${this.environmentName}</p>`;
                    }
                }, 150);
            });
        }
    }

    /**
     * Applies Event listener to the AC power button.
     * Toggles between turning the AC power on or off and updates the UI accordingly.
     */
    toggleACPower() {
        this.ACPowerButton.addEventListener("click", () => {
            if (this.ACPowerButton.querySelector("svg").style.fill == "green") {
                this.ACPowerButton.style.border = "3px solid red";
                this.ACPowerButton.querySelector("svg").style.fill = "red";
                this.ACTempWindow.remove();
                this.ACFanSpeedWrapper.remove();
                this.updateSubmitButtonVisibility();
                this.localStorageValues.notSubmittedACPowerState = "off";
                localStorage.setItem(`climate-${this.environmentName}`, JSON.stringify(this.localStorageValues));
                this.updateSubmitButtonVisibility();
            } else {
                this.ACPowerButton.style.border = "3px solid green";
                this.ACPowerButton.querySelector("svg").style.fill = "green";
                this.climateWindow.insertBefore(this.ACTempWindow, this.divideBar1);
                this.climateWindow.insertBefore(this.ACFanSpeedWrapper, this.divideBar1);
                this.updateSubmitButtonVisibility();
                this.localStorageValues.notSubmittedACPowerState = "on";
                localStorage.setItem(`climate-${this.environmentName}`, JSON.stringify(this.localStorageValues));
                this.updateSubmitButtonVisibility();
            }
        });
    }

    /**
     * Event listener for incrementing the AC temperature.
     */
    incrementTemperature() {
        this.ACTempUp.addEventListener("click", () => {
            if (parseInt(this.ACTempDisplay.value) < 30) {
                this.ACTempDisplay.value = parseInt(this.ACTempDisplay.value) + 1;
                this.localStorageValues.notSubmittedTemperature = this.ACTempDisplay.value;
                localStorage.setItem(`climate-${this.environmentName}`, JSON.stringify(this.localStorageValues));
                this.updateSubmitButtonVisibility();
            }
        });
    }

    /**
     * Event listener for decrementing the AC temperature.
     */
    decrementTemperature() {
        this.ACTempDown.addEventListener("click", () => {
            if (parseInt(this.ACTempDisplay.value) > 16) {
                this.ACTempDisplay.value = parseInt(this.ACTempDisplay.value) - 1;
                this.localStorageValues.notSubmittedTemperature = this.ACTempDisplay.value;
                localStorage.setItem(`climate-${this.environmentName}`, JSON.stringify(this.localStorageValues));
                this.updateSubmitButtonVisibility();
            }
        });
    }

    /**
     * Applies Event listener to the form submission within the climate window.
     * Prevents the default form submission, shows a confirmation dialog,
     * and updates climate settings based on user input.
     */
    climateFormSubmission() {
        this.climateWindow.addEventListener("submit", event => {
            event.preventDefault()
            let dialog;
            let acceptDialog;
            let declineDialog;
            let confirmationMessage;
            if (lang == "en") {
                dialog = "Are you sure you want to change the climate settings?";
                acceptDialog = "Yes";
                declineDialog = "No";
                confirmationMessage = "The climate settings were successfully changed";
            }
            else if (lang == "pt") {
                dialog = "Tem certeza que quer mudar as configurações de climatização?";
                acceptDialog = "Sim";
                declineDialog = "Não";
                confirmationMessage = "As configurações de climatização foram alteradas com sucesso";
            }
            showConfirmationDialog(dialog, acceptDialog, declineDialog, "negative",
                this.context, (this.context == "environments" ? environmentsOuterWindow : preferencesOuterWindow), confirmationMessage, () => {
                    this.localStorageValues.airDiffuser = this.localStorageValues.notSubmittedAirDiffuser;
                    this.localStorageValues.airPurifier = this.localStorageValues.notSubmittedAirPurifier;
                    this.localStorageValues.humidifier = this.localStorageValues.notSubmittedHumidifier;
                    this.localStorageValues.dehumidifier = this.localStorageValues.notSubmittedDehumidifier;
                    if (this.ACPowerButton.querySelector("svg") && this.ACPowerButton.querySelector("svg").style.fill == "green") {
                        this.localStorageValues.ACPowerState = "on";
                        this.localStorageValues.temperature = this.localStorageValues.notSubmittedTemperature;
                        this.localStorageValues.ACFanSpeed = this.localStorageValues.notSubmittedACFanSpeed;
                    }
                    else {
                        this.localStorageValues.ACPowerState = "off";
                    }
                    if (this.environmentName == "All Environments" && this.context == "general") {
                        // Update values for All Environments
                        for (let i = 0; i < localStorage.length; i++) {
                            const key = localStorage.key(i);
                            if (key && key.startsWith("climate-")) {
                                // Update the localStorage value based on the environment name
                                const environmentName = key.replace("climate-", "");
                                localStorage.setItem(key, JSON.stringify(this.localStorageValues));
                                let matchingInstance = Climate.allInstances.find(instance => instance.environmentName === environmentName);


                                // Setting up local storage
                                if (matchingInstance) {
                                    if (localStorage.getItem(`climate-${environmentName}`)) {
                                        matchingInstance.localStorageValues = JSON.parse(localStorage.getItem(`climate-${environmentName}`));
                                    } else {
                                        matchingInstance.localStorageValues = {
                                            ACPowerState: "off",
                                            notSubmittedACPowerState: "off",
                                            temperature: "16",
                                            notSubmittedTemperature: "16",
                                            ACFanSpeed: "2",
                                            notSubmittedACFanSpeed: "2",
                                            airDiffuser: "off",
                                            notSubmittedAirDiffuser: "off",
                                            airPurifier: "off",
                                            notSubmittedAirPurifier: "off",
                                            humidifier: "off",
                                            notSubmittedHumidifier: "off",
                                            dehumidifier: "off",
                                            notSubmittedDehumidifier: "off",
                                        };
                                    }

                                    matchingInstance.localStorageValues.notSubmittedACPowerState = matchingInstance.localStorageValues.ACPowerState;
                                    matchingInstance.localStorageValues.notSubmittedTemperature = matchingInstance.localStorageValues.temperature;
                                    matchingInstance.localStorageValues.notSubmittedACFanSpeed = matchingInstance.localStorageValues.ACFanSpeed;
                                    matchingInstance.localStorageValues.notSubmittedAirDiffuser = matchingInstance.localStorageValues.airDiffuser;
                                    matchingInstance.localStorageValues.notSubmittedAirPurifier = matchingInstance.localStorageValues.airPurifier;
                                    matchingInstance.localStorageValues.notSubmittedHumidifier = matchingInstance.localStorageValues.humidifier;
                                    matchingInstance.localStorageValues.notSubmittedDehumidifier = matchingInstance.localStorageValues.dehumidifier;

                                    localStorage.setItem(`climate-${environmentName}`, JSON.stringify(matchingInstance.localStorageValues));
                                }
                            }
                        }

                    } else {
                        // Update values for the specific environment
                        const localStorageKey = `climate-${this.environmentName}`;
                        localStorage.setItem(localStorageKey, JSON.stringify(this.localStorageValues));
                    }
                    this.retrieveClimateSettings();
                    this.updateSubmitButtonVisibility();
                }
            )
        });
    }

    /**
     * Updates the climate settings based on the stored values in localStorage.
     * Also, visually represents the state of various climate devices.
     * @param {string} updateStats - Determines whether to update climate stats. Defaults to "update-stats".
     */
    retrieveClimateSettings(updateStats = "update-stats") {
        this.airDiffuser.value = this.localStorageValues.airDiffuser;
        if (this.airDiffuser.value != "off") {
            this.airDiffuser.style.outline = "green 2px solid";
        }
        else {
            this.airDiffuser.style.outline = "red 2px solid";
        }

        this.airPurifier.value = this.localStorageValues.airPurifier;
        if (this.airPurifier.value != "off") {
            this.airPurifier.style.outline = "green 2px solid";
        }
        else {
            this.airPurifier.style.outline = "red 2px solid";
        }

        this.humidifier.value = this.localStorageValues.humidifier;
        if (this.humidifier.value == "on") {
            this.humidifier.style.outline = "green 2px solid";
            this.dehumidifier.value = "off";
            this.dehumidifier.style.outline = "red 2px solid";
            this.dehumidifier.disabled = true;
        }
        else {
            this.humidifier.style.outline = "red 2px solid";
            this.humidifier.disabled = false;
        }

        this.dehumidifier.value = this.localStorageValues.dehumidifier;
        if (this.dehumidifier.value == "on") {
            this.dehumidifier.style.outline = "green 2px solid";
            this.humidifier.value = "off";
            this.humidifier.style.outline = "red 2px solid";
            this.humidifier.disabled = true;
        }
        else {
            this.dehumidifier.style.outline = "red 2px solid";
            this.humidifier.disabled = false;
        }

        if (this.localStorageValues.ACPowerState == 'on') {
            this.ACPowerButton.style.border = "3px solid green";
            if (this.ACPowerButton.querySelector("svg")) {
                this.ACPowerButton.querySelector("svg").style.fill = "green";
            }
            if (this.climateProducts == "all") {
                this.climateWindow.insertBefore(this.ACTempWindow, this.climateSubmitButton);
                this.climateWindow.insertBefore(this.ACFanSpeedWrapper, this.climateSubmitButton);
                this.climateWindow.insertBefore(this.divideBar1, this.climateSubmitButton);
                this.climateWindow.insertBefore(this.climateWindowLowerWrapper, this.climateSubmitButton);
                this.climateWindow.insertBefore(this.divideBar2, this.climateSubmitButton);
            } else {
                for (let product of this.climateProducts) {
                    if (product.includes("AC")) {
                        this.ACPowerButton.parentNode.insertBefore(this.ACTempWindow, this.ACPowerButton.nextSibling);
                        this.ACTempWindow.parentNode.insertBefore(this.ACFanSpeedWrapper, this.ACTempWindow.nextSibling);
                    }
                    if (product.includes("AirDiffuser") || product.includes("AirPurifier") ||
                        product.includes("Humidifier") || product.includes("Dehumidifier")) {
                        this.climateWindow.insertBefore(this.climateWindowLowerWrapper, this.climateSubmitButton);
                        this.climateWindow.insertBefore(this.divideBar2, this.climateSubmitButton);
                    }
                }
            }
            this.updateSubmitButtonVisibility();

        }
        else {
            this.ACPowerButton.style.border = "3px solid red";
            if (this.ACPowerButton.querySelector("svg")) {
                this.ACPowerButton.querySelector("svg").style.fill = "red";
            }
            this.ACTempWindow.remove();
            this.ACFanSpeedWrapper.remove();
            this.updateSubmitButtonVisibility();

            this.localStorageValues.ACPowerState = "off";
            this.localStorageValues.notSubmittedACPowerState = "off";
            this.localStorageValues.notSubmittedTemperature = this.localStorageValues.temperature;
            this.localStorageValues.notSubmittedACFanSpeed = this.localStorageValues.ACFanSpeed;

            localStorage.setItem(`climate-${this.environmentName}`, JSON.stringify(this.localStorageValues));
        }

        if (updateStats != "do-not-update-stats") {
            this.updateClimateStats();
        }
    }

    /**
     * Updates the climate statistics based on the current climate settings.
     */
    updateClimateStats() {
        if (lang == "en") {
            if (this.environmentName == "All Environments" && this.context == "general") {
                if (this.isClimateLocalStorageValuesEqual()) {
                    const climateInfo = [];

                    if (this.environmentName == "All Environments") {
                        if (this.localStorageValues.ACPowerState == "on") {
                            climateInfo.push(`AC ${this.localStorageValues.ACPowerState}, ${this.localStorageValues.temperature} ºC, fan speed: ${this.localStorageValues.ACFanSpeed}`);
                        } else {
                            climateInfo.push(`AC ${this.localStorageValues.ACPowerState}`);
                        }
                        climateInfo.push(`diffuser: ${this.localStorageValues.airDiffuser.toLowerCase()}`);
                        climateInfo.push(`air purifier: ${this.localStorageValues.airPurifier}`);
                        if (this.localStorageValues.humidifier == "on") {
                            climateInfo.push("humidifier: on");
                        } else if (this.localStorageValues.dehumidifier == "on") {
                            climateInfo.push("dehumidifier: on");
                        } else {
                            climateInfo.push("humidifier/dehumidifier: off");
                        }
                    }
                    else {
                        // Check and add climate products information
                        if (this.climateProducts.some(product => product.includes("AC"))) {
                            if (this.localStorageValues.ACPowerState == "on") {
                                climateInfo.push(`AC ${this.localStorageValues.ACPowerState}, ${this.localStorageValues.temperature} ºC, fan speed: ${this.localStorageValues.ACFanSpeed}`);
                            } else {
                                climateInfo.push(`AC ${this.localStorageValues.ACPowerState}`);
                            }
                        }
                        if (this.climateProducts.some(product => product.includes("AirDiffuser"))) {
                            climateInfo.push(`diffuser: ${this.localStorageValues.airDiffuser.toLowerCase()}`);
                        }
                        if (this.climateProducts.some(product => product.includes("AirPurifier"))) {
                            climateInfo.push(`air purifier: ${this.localStorageValues.airPurifier}`);
                        }
                        if (this.climateProducts.some(product => product.includes("Humidifier")) && this.climateProducts.some(product => product.includes("Dehumidifier"))) {
                            if (this.localStorageValues.humidifier == "on") {
                                climateInfo.push("humidifier: on");
                            } else if (this.localStorageValues.dehumidifier == "on") {
                                climateInfo.push("dehumidifier: on");
                            } else {
                                climateInfo.push("humidifier/dehumidifier: off");
                            }
                        }
                        else if (this.climateProducts.some(product => product.includes("Humidifier"))) {
                            if (this.localStorageValues.humidifier == "on") {
                                climateInfo.push("humidifier: on");
                            } else {
                                climateInfo.push("humidifier: off");
                            }
                        }
                        else if (this.climateProducts.some(product => product.includes("Dehumidifier"))) {
                            if (this.localStorageValues.dehumidifier == "on") {
                                climateInfo.push("dehumidifier: on");
                            } else {
                                climateInfo.push("dehumidifier: off");
                            }
                        }
                    }
                    document.getElementById("climate-stats-text").innerHTML = `<b>Climatization - All Environments</b>: ${climateInfo.join(", ")}`;
                } else {
                    document.getElementById("climate-stats-text").innerHTML = `<b>Climatization - All Environments</b>: various settings`;
                }
            } else {
                const climateInfo = [];

                // Check and add climate products information
                if (this.climateProducts.some(product => product.includes("AC"))) {
                    if (this.localStorageValues.ACPowerState == "on") {
                        climateInfo.push(`AC ${this.localStorageValues.ACPowerState}, ${this.localStorageValues.temperature} ºC, fan speed: ${this.localStorageValues.ACFanSpeed}`);
                    } else {
                        climateInfo.push(`AC ${this.localStorageValues.ACPowerState}`);
                    }
                }
                if (this.climateProducts.some(product => product.includes("AirDiffuser"))) {
                    climateInfo.push(`diffuser: ${this.localStorageValues.airDiffuser.toLowerCase()}`);
                }
                if (this.climateProducts.some(product => product.includes("AirPurifier"))) {
                    climateInfo.push(`air purifier: ${this.localStorageValues.airPurifier}`);
                }
                if (this.climateProducts.some(product => product.includes("Humidifier")) && this.climateProducts.some(product => product.includes("Dehumidifier"))) {
                    if (this.localStorageValues.humidifier == "on") {
                        climateInfo.push("humidifier: on");
                    } else if (this.localStorageValues.dehumidifier == "on") {
                        climateInfo.push("dehumidifier: on");
                    } else {
                        climateInfo.push("humidifier/dehumidifier: off");
                    }
                }
                else if (this.climateProducts.some(product => product.includes("Humidifier"))) {
                    if (this.localStorageValues.humidifier == "on") {
                        climateInfo.push("humidifier: on");
                    } else {
                        climateInfo.push("humidifier: off");
                    }
                }
                else if (this.climateProducts.some(product => product.includes("Dehumidifier"))) {
                    if (this.localStorageValues.dehumidifier == "on") {
                        climateInfo.push("dehumidifier: on");
                    } else {
                        climateInfo.push("dehumidifier: off");
                    }
                }

                document.getElementById("climate-stats-text").innerHTML = `<b>Climatization - </b><b>${this.environmentName}</b>: ${climateInfo.join(", ")}`;
            }
        }
        else if (lang == "pt") {

            let scentNameInPortuguese;
            if (this.localStorageValues.airDiffuser == "off") {
                scentNameInPortuguese = this.scentsArray[0].toLowerCase();
            }
            if (this.localStorageValues.airDiffuser == "Roses") {
                scentNameInPortuguese = this.scentsArray[1].toLowerCase();
            }
            else if (this.localStorageValues.airDiffuser == "Wood") {
                scentNameInPortuguese = this.scentsArray[2].toLowerCase();
            }
            else if (this.localStorageValues.airDiffuser == "Lavender") {
                scentNameInPortuguese = this.scentsArray[3].toLowerCase();
            }
            else if (this.localStorageValues.airDiffuser == "Pine") {
                scentNameInPortuguese = this.scentsArray[4].toLowerCase();
            }
            else if (this.localStorageValues.airDiffuser == "Ocean") {
                scentNameInPortuguese = this.scentsArray[5].toLowerCase();
            }

            if (this.environmentName == "All Environments" && this.context == "general") {
                if (this.isClimateLocalStorageValuesEqual()) {
                    const climateInfo = [];

                    if (this.climateProducts == "all") {
                        if (this.localStorageValues.ACPowerState == "on") {
                            climateInfo.push(`AC ligado, ${this.localStorageValues.temperature} ºC, velocidade da ventoinha: ${this.localStorageValues.ACFanSpeed}`);
                        } else {
                            climateInfo.push(`AC desligado`);
                        }
                        climateInfo.push(`difusor: ${scentNameInPortuguese}`);
                        climateInfo.push(`purificador: ${this.localStorageValues.airPurifier == "on" ? "ligado" : "desligado"}`);
                        if (this.localStorageValues.humidifier == "on") {
                            climateInfo.push("humidificador: ligado");
                        } else if (this.localStorageValues.dehumidifier == "on") {
                            climateInfo.push("deshumidificador: ligado");
                        } else {
                            climateInfo.push("humidificador/deshumidificador: desligado");
                        }
                    }
                    else {
                        // Check and add climate products information
                        if (this.climateProducts.some(product => product.includes("AC"))) {
                            if (this.localStorageValues.ACPowerState == "on") {
                                climateInfo.push(`AC ligado, ${this.localStorageValues.temperature} ºC, velocidade da ventoinha: ${this.localStorageValues.ACFanSpeed}`);
                            } else {
                                climateInfo.push(`AC desligado`);
                            }
                        }
                        if (this.climateProducts.some(product => product.includes("AirDiffuser"))) {
                            climateInfo.push(`difusor: ${scentNameInPortuguese}`);
                        }
                        if (this.climateProducts.some(product => product.includes("AirPurifier"))) {
                            climateInfo.push(`purificador: ${this.localStorageValues.airPurifier == "on" ? "ligado" : "desligado"}`);
                        }
                        if (this.climateProducts.some(product => product.includes("Humidifier")) && this.climateProducts.some(product => product.includes("Dehumidifier"))) {
                            if (this.localStorageValues.humidifier == "on") {
                                climateInfo.push("humidificador: ligado");
                            } else if (this.localStorageValues.dehumidifier == "on") {
                                climateInfo.push("deshumidificador: ligado");
                            } else {
                                climateInfo.push("humidificador/deshumidificador: desligado");
                            }
                        }
                        else if (this.climateProducts.some(product => product.includes("Humidifier"))) {
                            if (this.localStorageValues.humidifier == "on") {
                                climateInfo.push("humidificador: ligado");
                            } else {
                                climateInfo.push("humidificador: desligado");
                            }
                        }
                        else if (this.climateProducts.some(product => product.includes("Dehumidifier"))) {
                            if (this.localStorageValues.dehumidifier == "on") {
                                climateInfo.push("deshumidificador: ligado");
                            } else {
                                climateInfo.push("deshumidificador: desligado");
                            }
                        }
                    }
                    document.getElementById("climate-stats-text").innerHTML = `<b>Climatização - Todos os Ambientes</b>: ${climateInfo.join(", ")}`;
                } else {
                    document.getElementById("climate-stats-text").innerHTML = `<b>Climatização - Todos os Ambientes</b>: várias configurações`;
                }
            } else {
                const climateInfo = [];

                // Check and add climate products information
                if (this.climateProducts.some(product => product.includes("AC"))) {
                    if (this.localStorageValues.ACPowerState == "on") {
                        climateInfo.push(`AC ligado, ${this.localStorageValues.temperature} ºC, velocidade da ventoinha: ${this.localStorageValues.ACFanSpeed}`);
                    } else {
                        climateInfo.push(`AC desligado`);
                    }
                }
                if (this.climateProducts.some(product => product.includes("AirDiffuser"))) {
                    climateInfo.push(`difusor: ${scentNameInPortuguese}`);
                }
                if (this.climateProducts.some(product => product.includes("AirPurifier"))) {
                    climateInfo.push(`purificador: ${this.localStorageValues.airPurifier == "on" ? "ligado" : "desligado"}`);
                }
                if (this.climateProducts.some(product => product.includes("Humidifier")) && this.climateProducts.some(product => product.includes("Dehumidifier"))) {
                    if (this.localStorageValues.humidifier == "on") {
                        climateInfo.push("humidificador: ligado");
                    } else if (this.localStorageValues.dehumidifier == "on") {
                        climateInfo.push("deshumidificador: ligado");
                    } else {
                        climateInfo.push("humidificador/deshumidificador: desligado");
                    }
                }
                else if (this.climateProducts.some(product => product.includes("Humidifier"))) {
                    if (this.localStorageValues.humidifier == "on") {
                        climateInfo.push("humidificador: ligado");
                    } else {
                        climateInfo.push("humidificador: desligado");
                    }
                }
                else if (this.climateProducts.some(product => product.includes("Dehumidifier"))) {
                    if (this.localStorageValues.dehumidifier == "on") {
                        climateInfo.push("deshumidificador: ligado");
                    } else {
                        climateInfo.push("deshumidificador: desligado");
                    }
                }

                document.getElementById("climate-stats-text").innerHTML = `<b>Climatização - </b><b>${this.environmentName}</b>: ${climateInfo.join(", ")}`;
            }
        }
    }

    /**
     * Checks if the climate-related values in localStorage are equal.
     * @returns {boolean} - Returns true if all climate-related values are equal; otherwise, returns false.
     */
    isClimateLocalStorageValuesEqual() {
        let firstValue = null;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("climate")) {
                const value = localStorage.getItem(key);
                if (firstValue === null) {
                    firstValue = value;
                } else if (value !== firstValue) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Updates the visibility and text content of the climate submit button based on climate settings.
     */
    updateSubmitButtonVisibility() {
        if (this.localStorageValues.ACPowerState == "off" && this.localStorageValues.notSubmittedACPowerState == "off" &&
            this.environmentName == "All Environments" && this.context == "general" && !this.isClimateLocalStorageValuesEqual() &&
            this.localStorageValues.notSubmittedTemperature == this.localStorageValues.temperature &&
            this.localStorageValues.notSubmittedACFanSpeed == this.localStorageValues.ACFanSpeed) {
            this.climateSubmitButton.removeAttribute("disabled");
            this.climateSubmitButton.innerText = lang == "en" ? "Apply" : lang == "pt" ? "Aplicar" : null;
        }
        else if ((this.localStorageValues.ACPowerState != "off" && this.localStorageValues.notSubmittedACPowerState != "off") &&
            (!this.isClimateLocalStorageValuesEqual() && this.environmentName == "All Environments" && this.context == "general")) {
            this.climateSubmitButton.removeAttribute("disabled");
            this.climateSubmitButton.innerText = lang == "en" ? "Apply" : lang == "pt" ? "Aplicar" : null;
        }
        else if (this.localStorageValues.ACPowerState == "off" && this.localStorageValues.notSubmittedACPowerState == "off" &&
            this.localStorageValues.notSubmittedAirDiffuser == this.localStorageValues.airDiffuser &&
            this.localStorageValues.notSubmittedAirPurifier == this.localStorageValues.airPurifier &&
            this.localStorageValues.notSubmittedHumidifier == this.localStorageValues.humidifier &&
            this.localStorageValues.notSubmittedDehumidifier == this.localStorageValues.dehumidifier) {
            this.climateSubmitButton.setAttribute("disabled", true);
            this.climateSubmitButton.innerText = lang == "en" ? "No changes to apply" : lang == "pt" ? "Nenhuma mudança a aplicar" : null;
        }
        else if (this.localStorageValues.notSubmittedTemperature != this.localStorageValues.temperature ||
            this.localStorageValues.notSubmittedACPowerState != this.localStorageValues.ACPowerState ||
            this.localStorageValues.notSubmittedACFanSpeed != this.localStorageValues.ACFanSpeed ||
            this.localStorageValues.notSubmittedAirDiffuser != this.localStorageValues.airDiffuser ||
            this.localStorageValues.notSubmittedAirPurifier != this.localStorageValues.airPurifier ||
            this.localStorageValues.notSubmittedHumidifier != this.localStorageValues.humidifier ||
            this.localStorageValues.notSubmittedDehumidifier != this.localStorageValues.dehumidifier) {
            this.climateSubmitButton.removeAttribute("disabled");
            this.climateSubmitButton.innerText = lang == "en" ? "Apply" : lang == "pt" ? "Aplicar" : null;
        } else {
            this.climateSubmitButton.setAttribute("disabled", true);
            this.climateSubmitButton.innerText = lang == "en" ? "No changes to apply" : lang == "pt" ? "Nenhuma mudança a aplicar" : null;
        }
    }

}