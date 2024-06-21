"use strict";

/**
 * Represents lights settings.
 */
class Lights {

    /**
    * Creates a new instance of Lights.
    * @param {HTMLElement} lightsButton - The button associated with lights.
    * @param {Number} lightsCount - The count of lights.
    * @param {String} context - The context of the lights instance, must be either "general" or "environments". 
    * Defaults to "general".
    * @param {String} environmentName - The environment name associated with lights. Defaults to "All Environments".
    */
    constructor(lightsButton, lightsCount, context = "general", environmentName = "All Environments") {
        this._lightsButton = lightsButton;
        this._lightsCount = lightsCount;
        this._context = context;
        this._environmentName = environmentName;

        // lights elements window
        this._lightsWindow = document.createElement("form");
        // lights submit button
        this._lightsSubmitButton = document.createElement('button');

        Lights.allInstances.push(this);
        this.createUI();
        this.lightsButtonEvent();
    }

    // Static array to keep track of all created lights instances
    static allInstances = [];

    /**
     * Removes the lights window associated with the provided context,
     * This method is static and can be called on the class itself, as it operates on all instances.
     * @param {String} context - The context from which to return from Lights settings.
     */
    static returnFromLights(context) {
        Lights.allInstances.forEach((instance) => {
            if (instance.context == context) {
                instance.lightsWindow.remove();
            }
        });
    }

    get lightsButton() {
        return this._lightsButton;
    }

    get lightsCount() {
        return this._lightsCount;
    }

    get lightsWindow() {
        return this._lightsWindow;
    }

    get context() {
        return this._context;
    }

    get environmentName() {
        return this._environmentName;
    }

    get lightsSubmitButton() {
        return this._lightsSubmitButton;
    }

    set lightsButton(lightsButton) {
        this._lightsButton = lightsButton;
    }

    set lightsCount(lightsCount) {
        this._lightsCount = lightsCount;
    }

    set lightsWindow(lightsWindow) {
        this._lightsWindow = lightsWindow;
    }

    set context(context) {
        this._context = context;
    }

    set environmentName(environmentName) {
        this._environmentName = environmentName;
    }

    set lightsSubmitButton(lightsSubmitButton) {
        this._lightsSubmitButton = lightsSubmitButton;
    }

    /**
     * Creates the user interface (UI) elements for this lights instance.
     */
    createUI() {
        this.lightsWindow.classList.add("lights-window");

        if (this.context == "general") {
            this.selectsWrapper = document.createElement('div');
            this.selectsWrapper.style.display = "flex";
            this.selectsWrapper.style.flexWrap = "wrap";
            this.selectsWrapper.style.justifyContent = "center";
            this.lightsWindow.appendChild(this.selectsWrapper);

            this.lightsEnvironmentsSelection = document.createElement("select");
            this.lightsEnvironmentsSelection.innerHTML = `<option>${lang == "en" ? "All Environments" : lang == "pt" ? "Todos os Ambientes" : null}</option>`;
            let lightsSelectOptionsDefault = JSON.parse(localStorage.getItem('environments')).filter(environment =>
                environment.products.some(product => product.includes("Lights"))).map(
                    environment => `<option>${environment.name}</option>`).join('');
            this.lightsEnvironmentsSelection.innerHTML += lightsSelectOptionsDefault;
            lightsSelectOptionsDefault = this.lightsEnvironmentsSelection.innerHTML;
            this.lightsEnvironmentsSelection.addEventListener("click", () => {
                const lightsSelectOptionsDynamic = `<option>${lang == "en" ? "All Environments" : lang == "pt" ? "Todos os Ambientes" : null}</option>` +
                    JSON.parse(localStorage.getItem('environments'))
                        .filter(environment => environment.products.some(product => product.includes("Lights"))).map(
                            environment => `<option>${environment.name}</option>`).join('');
                if (lightsSelectOptionsDynamic != lightsSelectOptionsDefault) {
                    this.lightsEnvironmentsSelection.style.cursor = "wait";
                    this.lightsEnvironmentsSelection.innerHTML = lightsSelectOptionsDynamic;
                    lightsSelectOptionsDefault = lightsSelectOptionsDynamic;
                    setTimeout(() => {
                        this.lightsEnvironmentsSelection.style.removeProperty("cursor");
                    }, 1000);
                }
            })
            this.lightsEnvironmentsSelection.style.width = "fit-content";
            this.selectsWrapper.appendChild(this.lightsEnvironmentsSelection);

            let lightsSelect = document.createElement('select');
            lightsSelect.style.width = "fit-content";

            lightsSelect.innerHTML = `<option>${lang == "en" ? "All lights" : "Todas as Luzes"}</option>`;
            lightsSelect.disabled = true;
            lightsSelect.addEventListener("change", () => {
                this.lightsSubmitButton.innerText = lang == "en" ? "Apply" : lang == "pt" ? "Aplicar" : null;
                this.lightsSubmitButton.disabled = false;
            });

            this.selectsWrapper.appendChild(lightsSelect);
            if (!this.isLightsLocalStorageValuesEqual()) {
                this.lightsSubmitButton.innerText = lang === "en" ? "Apply" : lang === "pt" ? "Aplicar" : null;
                this.lightsSubmitButton.disabled = false;
                this.selectsWrapper.appendChild(Object.assign(document.createElement('p'),
                    {
                        className: 'various-message', style: "margin-bottom: 0px;margin-top: 10px;",
                        innerHTML: lang === "en" ? "<i>Various lights settings currently applied</i>" :
                            "<i>Várias configurações de luzes aplicadas atualmente</i>"
                    }));
            }

            this.lightsEnvironmentsSelection.addEventListener("change", () => {
                this.environmentName = this.lightsEnvironmentsSelection.value;
                if (this.environmentName == "Todos os Ambientes" || this.environmentName == "All Environments") {
                    this.environmentName = "All Environments";
                    lightsSelect.innerHTML = `<option>${lang == "en" ? "All lights" : "Todas as Luzes"}</option>`;
                    lightsSelect.disabled = true;
                    if (!this.isLightsLocalStorageValuesEqual() && this.environmentName == "All Environments") {
                        this.lightsSubmitButton.innerText = lang === "en" ? "Apply" : lang === "pt" ? "Aplicar" : null;
                        this.lightsSubmitButton.disabled = false;
                        this.selectsWrapper.appendChild(Object.assign(document.createElement('p'),
                            {
                                className: 'various-message', style: "margin-bottom: 0px;margin-top: 10px;",
                                innerHTML: lang === "en" ? "<i>Various lights settings currently applied</i>" :
                                    "<i>Várias configurações de luzes aplicadas atualmente</i>"
                            }));
                    }
                }
                else {
                    if (this.selectsWrapper.querySelector('.various-message')) {
                        this.selectsWrapper.querySelector('.various-message').remove();
                    }
                    this.lightsCount = Lights.allInstances.find(light => light.environmentName === this.environmentName).lightsCount;
                    lightsSelect.innerHTML = '';
                    lightsSelect.disabled = false;
                    if (this.lightsCount > 1) {
                        lightsSelect.innerHTML = `<option>${lang == "en" ? "All lights in this environment"
                            : "Todas as luzes neste ambiente"}</option>`;
                    }
                    for (let i = 1; i <= this.lightsCount; i++) {
                        let option = document.createElement('option');
                        option.value = i;
                        option.text = lang == "en" ? `Light ${i}` : `Luz ${i}`;
                        lightsSelect.appendChild(option);
                    }
                    this.selectsWrapper.appendChild(lightsSelect);
                }

                if (this.environmentName != "All Environments" || this.isLightsLocalStorageValuesEqual()) {
                    this.lightsSubmitButton.innerText = lang == "en" ? "No changes to apply" : lang == "pt" ? "Nenhuma mudança a aplicar" : null;
                    this.lightsSubmitButton.disabled = true;
                }

                if (localStorage.getItem(`lights-${this.environmentName}`)) {
                    this.lightsWindow.querySelector(`#${JSON.parse(localStorage.getItem(`lights-${this.environmentName}`)).intensity}`).click();
                    this.colorPalette.value = JSON.parse(localStorage.getItem(`lights-${this.environmentName}`)).color;
                    this.lightsSubmitButton.innerText = lang === "en" ? "Apply" : lang === "pt" ? "Aplicar" : null;
                    this.lightsSubmitButton.disabled = false;

                    if (JSON.parse(localStorage.getItem(`lights-${this.environmentName}`)).state == "on") {
                        this.lightsPowerButton.style.border = "3px solid green";
                        this.lightsPowerButton.querySelector("svg").style.fill = "green";
                        this.lightsIntensityText.style.display = "flex";
                        this.lightsIntensityWindow.style.display = "flex";
                        this.labelForColorPalette.style.display = "flex";
                        this.colorPalette.style.display = "flex";
                    }
                    else {
                        this.lightsPowerButton.style.border = "3px solid red";
                        this.lightsPowerButton.querySelector("svg").style.fill = "red";
                        this.lightsIntensityText.style.display = "none";
                        this.lightsIntensityWindow.style.display = "none";
                        this.labelForColorPalette.style.display = "none";
                        this.colorPalette.style.display = "none";
                    }
                }
                else {
                    this.lightsPowerButton.style.border = "3px solid red";
                    this.lightsPowerButton.querySelector("svg").style.fill = "red";
                    this.lightsIntensityText.style.display = "none";
                    this.lightsIntensityWindow.style.display = "none";
                    this.labelForColorPalette.style.display = "none";
                    this.colorPalette.style.display = "none";
                }
            });

            this.lightsWindowDivisor1 = document.createElement("hr");
            this.lightsWindow.appendChild(this.lightsWindowDivisor1);
        }

        if (this.context != "general") {
            let lightsSelect = document.createElement('select');
            lightsSelect.style.width = "fit-content";
            if (this.lightsCount > 1) {
                lightsSelect.innerHTML = `<option>${lang == "en" ? "All lights in this environment"
                    : "Todas as luzes neste ambiente"}</option>`;
            }
            for (let i = 1; i <= this.lightsCount; i++) {
                let option = document.createElement('option');
                option.value = i;
                option.text = lang == "en" ? `Light ${i}` : `Luz ${i}`;
                lightsSelect.appendChild(option);
            }
            this.lightsWindow.appendChild(lightsSelect);

            lightsSelect.addEventListener("change", () => {
                this.lightsSubmitButton.innerText = lang == "en" ? "Apply" : lang == "pt" ? "Aplicar" : null;
                this.lightsSubmitButton.disabled = false;
            });

            this.lightsWindowDivisor1 = document.createElement("hr");
            this.lightsWindow.appendChild(this.lightsWindowDivisor1);
        }

        this.lightsPowerButton = document.createElement("button");
        this.lightsPowerButton.innerHTML = `<svg height="20px" width="20px" 
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
        this.lightsPowerButton.classList.add("lights-power-button");
        this.lightsPowerButton.type = "button";
        this.lightsPowerButton.style.display = "flex";
        this.lightsPowerButton.style.border = "3px solid red";
        this.lightsPowerButton.querySelector("svg").style.fill = "red";
        this.lightsWindow.appendChild(this.lightsPowerButton);

        this.lightsIntensityText = document.createElement("p");
        this.lightsIntensityText.id = "lights-intensity-text";
        if (languageSelect.value === 'en') {
            this.lightsIntensityText.innerText = "Intensity Levels:";
        }
        else if (languageSelect.value === 'pt') {
            this.lightsIntensityText.innerText = "Níveis de Intensidade:";
        }
        this.lightsIntensityText.style.display = "flex";
        this.lightsWindow.appendChild(this.lightsIntensityText);

        this.lightsIntensityWindow = document.createElement("div");
        this.lightsIntensityWindow.id = "lights-intensity-window";
        this.lightsIntensityWindow.style.display = "flex";
        this.lightsWindow.appendChild(this.lightsIntensityWindow);

        this.lights1 = document.createElement("button");
        this.lights1.innerHTML = "1";
        this.lights1.id = "lights-1";
        this.lights1.type = "button";
        this.lights1.classList.add("lights-intensity-option-button");
        this.lights1.style.display = "flex";
        this.lightsIntensityWindow.appendChild(this.lights1);

        this.lights2 = document.createElement("button");
        this.lights2.id = "lights-2";
        this.lights2.type = "button";
        this.lights2.classList.add("lights-intensity-option-button");
        this.lights2.innerHTML = "2";
        this.lights2.style.display = "flex";
        this.lightsIntensityWindow.appendChild(this.lights2);

        this.lights3 = document.createElement("button");
        this.lights3.innerHTML = "3";
        this.lights3.id = "lights-3";
        this.lights3.type = "button";
        this.lights3.classList.add("lights-intensity-option-button");
        this.lights3.style.color = "black";
        this.lights3.style.display = "flex";
        this.lightsIntensityWindow.appendChild(this.lights3);

        this.lightsWindow.querySelectorAll(".lights-intensity-option-button").forEach(button => {
            button.addEventListener("click", () => {
                // Clear outline from all buttons
                this.lightsWindow.querySelectorAll(".lights-intensity-option-button").forEach(otherButton => {
                    otherButton.style.outline = "none";
                    otherButton.style.removeProperty("scale");
                });

                // Add a green 2px outline to the clicked button
                button.style.outline = "3px solid orange";
                button.style.scale = "1.17";
            });
        });

        this.labelForColorPalette = document.createElement("label");
        this.labelForColorPalette.setAttribute("for", "color-palette");
        if (languageSelect.value === 'en') {
            this.labelForColorPalette.innerText = "Color:";
        }
        else if (languageSelect.value === 'pt') {
            this.labelForColorPalette.innerText = "Cor:";
        }
        this.lightsWindow.appendChild(this.labelForColorPalette);

        this.colorPalette = document.createElement("input");
        this.colorPalette.type = "color";
        this.colorPalette.id = "color-palette"
        this.lightsWindow.appendChild(this.colorPalette);

        if (localStorage.getItem(`lights-${this.environmentName}`)) {
            document.getElementById("house-name").style.backgroundColor = JSON.parse(localStorage.getItem(`lights-${this.environmentName}`)).color + "7F";
            this.colorPalette.value = JSON.parse(localStorage.getItem(`lights-${this.environmentName}`)).color;

            const backgroundColor = getComputedStyle(document.getElementById("house-name")).backgroundColor;
            const textColor = calculateContrastColor(backgroundColor);
            document.getElementById("house-name").style.color = textColor;
        }
        else {
            this.colorPalette.value = "#ffffff";
        }

        this.lightsWindowDivisor2 = document.createElement("hr");
        this.lightsWindow.appendChild(this.lightsWindowDivisor2);

        this.lightsSubmitButton.innerText = lang == "en" ? "Apply" : lang == "pt" ? "Aplicar" : null;
        this.lightsSubmitButton.classList.add("lights-submit-button");
        this.lightsWindow.appendChild(this.lightsSubmitButton);

        this.lightsIntensityText.style.display = "none";
        this.lightsIntensityWindow.style.display = "none";
        this.labelForColorPalette.style.display = "none";
        this.colorPalette.style.display = "none";
        this.lightsPowerButton.addEventListener("click", () => {
            if (this.lightsPowerButton.querySelector("svg").style.fill == "red") {
                this.lightsPowerButton.style.border = "3px solid green";
                this.lightsPowerButton.querySelector("svg").style.fill = "green";
                this.lightsIntensityText.style.display = "flex";
                this.lightsIntensityWindow.style.display = "flex";
                this.labelForColorPalette.style.display = "flex";
                this.colorPalette.style.display = "flex";
            }
            else {
                this.lightsPowerButton.style.border = "3px solid red";
                this.lightsPowerButton.querySelector("svg").style.fill = "red";
                this.lightsIntensityText.style.display = "none";
                this.lightsIntensityWindow.style.display = "none";
                this.labelForColorPalette.style.display = "none";
                this.colorPalette.style.display = "none";
            }
        });

        [this.lightsWindow.querySelectorAll("input"), this.lightsWindow.querySelectorAll("button")].forEach(elements => {
            elements.forEach(element => {
                element.addEventListener("click", () => {
                    this.lightsSubmitButton.innerText = lang === "en" ? "Apply" : lang === "pt" ? "Aplicar" : null;
                    this.lightsSubmitButton.disabled = false;
                });
            });
        });

        if (this.context == "general") {
            this.lightsSubmitButton.addEventListener("click", event => {
                event.preventDefault();
                showConfirmationDialog(lang == "en" ? "Are you sure you want to change the settings of the lights?" :
                    lang == "pt" ? "Tem certeza que quer mudar as configurações das luzes?" : null,
                    lang == "en" ? "Yes" : lang == "pt" ? "Sim" : null,
                    lang == "en" ? "No" : lang == "pt" ? "Não" : null,
                    "negative",
                    "general",
                    preferencesOuterWindow,
                    lang == "en" ? "The settings of the lights were successfully changed" : lang == "pt" ?
                        "As configurações das luzes foram alteradas com sucesso" : null, () => {

                            if (this.environmentName === "All Environments") {
                                const lightsData = {
                                    state: this.lightsPowerButton.querySelector("svg").style.fill === "red" ? "off" : "on",
                                    intensity: this.lights1.style.outlineColor === "orange" ? "lights-1" :
                                        this.lights2.style.outlineColor === "orange" ? "lights-2" :
                                            this.lights3.style.outlineColor === "orange" ? "lights-3" : null,
                                    color: this.colorPalette.value
                                };

                                // Set local storage for all keys that start with "lights"
                                Object.keys(localStorage)
                                    .filter(key => key.startsWith('lights'))
                                    .forEach(key => localStorage.setItem(key, JSON.stringify(lightsData)));

                                for (const option of Array.from(this.lightsEnvironmentsSelection.options)) {
                                    let environment = option.value;
                                    if (environment == "Todos os Ambientes") {
                                        environment = "All Environments";
                                    }
                                    localStorage.setItem(`lights-${environment}`, JSON.stringify(lightsData));
                                }
                            }
                            else {
                                localStorage.setItem(`lights-${this.environmentName}`, JSON.stringify(
                                    {
                                        state: this.lightsPowerButton.querySelector("svg").style.fill == "red" ? "off" : "on",
                                        intensity: this.lights1.style.outlineColor === "orange" ? "lights-1" :
                                            this.lights2.style.outlineColor === "orange" ? "lights-2" :
                                                this.lights3.style.outlineColor === "orange" ? "lights-3" : null,
                                        color: this.colorPalette.value
                                    }
                                ));
                            }

                            // Set main banner background color equal to lights color if they are on
                            if (localStorage.getItem(`lights-${this.environmentName}`) && JSON.parse(localStorage.getItem(`lights-${this.environmentName}`)).state == "on") {
                                document.getElementById("house-name").style.backgroundColor = JSON.parse(localStorage.getItem(`lights-${this.environmentName}`)).color + "b3";
                                localStorage.setItem("houseNameBackgroundColor", document.getElementById("house-name").style.backgroundColor);

                                const backgroundColor = getComputedStyle(document.getElementById("house-name")).backgroundColor;
                                const textColor = calculateContrastColor(backgroundColor);
                                document.getElementById("house-name").style.color = textColor;
                            }

                            this.lightsSubmitButton.disabled = true;
                            this.lightsSubmitButton.innerText = lang == "en" ? "No changes to apply" : lang == "pt" ? "Nenhuma mudança a aplicar" : null;

                            if (localStorage.getItem(`lights-${this.environmentName}`)) {
                                this.lightsSubmitButton.innerText = lang === "en" ? "Apply" : lang === "pt" ? "Aplicar" : null;
                                this.lightsSubmitButton.disabled = false;
                            }
                        });
            });
        }
        else if (this.context == "environments") {
            this.lightsSubmitButton.addEventListener("click", event => {
                event.preventDefault();
                showConfirmationDialog(lang == "en" ? "Are you sure you want to change the settings of the lights?" :
                    lang == "pt" ? "Tem certeza que quer mudar as configurações das luzes?" : null,
                    lang == "en" ? "Yes" : lang == "pt" ? "Sim" : null,
                    lang == "en" ? "No" : lang == "pt" ? "Não" : null,
                    "negative",
                    "environments",
                    environmentsOuterWindow,
                    lang == "en" ? "The settings of the lights were successfully changed" : lang == "pt" ?
                        "As configurações das luzes foram alteradas com sucesso" : null, () => {

                            localStorage.setItem(`lights-${this.environmentName}`, JSON.stringify(
                                {
                                    state: this.lightsPowerButton.querySelector("svg").style.fill == "red" ? "off" : "on",
                                    intensity: this.lights1.style.outlineColor === "orange" ? "lights-1" :
                                        this.lights2.style.outlineColor === "orange" ? "lights-2" :
                                            this.lights3.style.outlineColor === "orange" ? "lights-3" : null,
                                    color: this.colorPalette.value
                                }
                            ));

                            // Set main banner background color equal to lights color if they are on
                            if (JSON.parse(localStorage.getItem(`lights-${this.environmentName}`)).state == "on") {
                                document.getElementById("house-name").style.backgroundColor = JSON.parse(localStorage.getItem(`lights-${this.environmentName}`)).color + "b3";
                                localStorage.setItem("houseNameBackgroundColor", document.getElementById("house-name").style.backgroundColor);

                                const backgroundColor = getComputedStyle(document.getElementById("house-name")).backgroundColor;
                                const textColor = calculateContrastColor(backgroundColor);
                                document.getElementById("house-name").style.color = textColor;
                            }

                            this.lightsSubmitButton.disabled = true;
                            this.lightsSubmitButton.innerText = lang == "en" ? "No changes to apply" : lang == "pt" ? "Nenhuma mudança a aplicar" : null;

                            if (localStorage.getItem(`lights-${this.environmentName}`)) {
                                this.lightsSubmitButton.innerText = lang === "en" ? "Apply" : lang === "pt" ? "Aplicar" : null;
                                this.lightsSubmitButton.disabled = false;
                            }
                        });
            });
        }
    }

    /**
     * Checks if the lights-related values in localStorage are equal.
     * @returns {boolean} - Returns true if all lights-related values are equal; otherwise, returns false.
     */
    isLightsLocalStorageValuesEqual() {
        let firstValue = null;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("lights")) {
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
     * Handles the event for the lights button, updating preferences and UI accordingly.
     */
    lightsButtonEvent() {
        // Event listener for the lights button
        if (this.context == "general") {
            this.lightsButton.addEventListener("click", () => {
                preferencesOuterWindow.style.animation = "blur-transition-out 0.15s";
                setTimeout(() => {
                    preferencesOuterWindow.style.animation = "blur-transition-in 0.15s";
                    setTimeout(() => {
                        preferencesOuterWindow.style.removeProperty("animation");
                    }, 150);
                    preferencesElements.forEach(element => {
                        element.style.display = "none";
                    });
                    preferencesWindow.appendChild(this.lightsWindow);
                    preferencesWindow.style.display = "flex";
                    preferencesReturnButton.style.removeProperty("display");
                    if (lang === 'en') {
                        preferencesText.innerHTML = "Lights";
                    }
                    else if (lang === 'pt') {
                        preferencesText.innerHTML = "Luzes";
                    }
                    preferencesText.style.marginLeft = "42px";

                    if (!localStorage.getItem(`lights-${this.environmentName}`) && this.lights2) {
                        this.lights2.click();
                        this.lightsPowerButton.style.border = "3px solid red";
                        this.lightsPowerButton.querySelector("svg").style.fill = "red";
                        this.lightsIntensityText.style.display = "none";
                        this.lightsIntensityWindow.style.display = "none";
                        this.labelForColorPalette.style.display = "none";
                        this.colorPalette.style.display = "none";
                    }
                    else if (localStorage.getItem(`lights-${this.environmentName}`)) {
                        this.lightsWindow.querySelector(`#${JSON.parse(localStorage.getItem(`lights-${this.environmentName}`)).intensity}`).click();
                        this.colorPalette.value = JSON.parse(localStorage.getItem(`lights-${this.environmentName}`)).color;

                        if (JSON.parse(localStorage.getItem(`lights-${this.environmentName}`)).state == "on") {
                            this.lightsPowerButton.style.border = "3px solid green";
                            this.lightsPowerButton.querySelector("svg").style.fill = "green";
                            this.lightsIntensityText.style.display = "flex";
                            this.lightsIntensityWindow.style.display = "flex";
                            this.labelForColorPalette.style.display = "flex";
                            this.colorPalette.style.display = "flex";
                        }
                        else {
                            this.lightsPowerButton.style.border = "3px solid red";
                            this.lightsPowerButton.querySelector("svg").style.fill = "red";
                            this.lightsIntensityText.style.display = "none";
                            this.lightsIntensityWindow.style.display = "none";
                            this.labelForColorPalette.style.display = "none";
                            this.colorPalette.style.display = "none";
                        }
                    }
                    this.lightsSubmitButton.innerText = lang == "en" ? "No changes to apply" : lang == "pt" ? "Nenhuma mudança a aplicar" : null;
                    this.lightsSubmitButton.disabled = true;
                    if (!this.isLightsLocalStorageValuesEqual() && this.environmentName == "All Environments") {
                        this.lightsSubmitButton.innerText = lang === "en" ? "Apply" : lang === "pt" ? "Aplicar" : null;
                        this.lightsSubmitButton.disabled = false;
                    }
                }, 150);
            });
        } else if (this.context == "environments") {
            this.lightsButton.addEventListener("click", () => {
                environmentsOuterWindow.style.animation = "blur-transition-out 0.15s";
                setTimeout(() => {
                    environmentsOuterWindow.style.animation = "blur-transition-in 0.15s";
                    setTimeout(() => {
                        environmentsOuterWindow.style.removeProperty("animation");
                    }, 150);
                    document.querySelectorAll(".environment-preference-button").forEach(element => {
                        element.style.display = "none";
                    });
                    environmentsWindow.appendChild(this.lightsWindow);
                    environmentsWindow.style.display = "flex";
                    environmentsReturnButton.style.removeProperty("display");
                    if (lang === 'en') {
                        environmentsText.innerHTML = `Lights<p class='subp'>${this.environmentName}</span></p>`;
                    }
                    else if (lang === 'pt') {
                        environmentsText.innerHTML = `Luzes<p class='subp'>${this.environmentName}</span></p>`;
                    }
                    environmentsText.style.marginLeft = "42px";

                    if (!localStorage.getItem(`lights-${this.environmentName}`) && this.lights2) {
                        this.lights2.click();
                        this.lightsPowerButton.style.border = "3px solid red";
                        this.lightsPowerButton.querySelector("svg").style.fill = "red";
                        this.lightsIntensityText.style.display = "none";
                        this.lightsIntensityWindow.style.display = "none";
                        this.labelForColorPalette.style.display = "none";
                        this.colorPalette.style.display = "none";
                    }
                    else if (localStorage.getItem(`lights-${this.environmentName}`)) {
                        this.lightsWindow.querySelector(`#${JSON.parse(localStorage.getItem(`lights-${this.environmentName}`)).intensity}`).click();
                        this.colorPalette.value = JSON.parse(localStorage.getItem(`lights-${this.environmentName}`)).color;

                        if (JSON.parse(localStorage.getItem(`lights-${this.environmentName}`)).state == "on") {
                            this.lightsPowerButton.style.border = "3px solid green";
                            this.lightsPowerButton.querySelector("svg").style.fill = "green";
                            this.lightsIntensityText.style.display = "flex";
                            this.lightsIntensityWindow.style.display = "flex";
                            this.labelForColorPalette.style.display = "flex";
                            this.colorPalette.style.display = "flex";
                        }
                        else {
                            this.lightsPowerButton.style.border = "3px solid red";
                            this.lightsPowerButton.querySelector("svg").style.fill = "red";
                            this.lightsIntensityText.style.display = "none";
                            this.lightsIntensityWindow.style.display = "none";
                            this.labelForColorPalette.style.display = "none";
                            this.colorPalette.style.display = "none";
                        }
                    }
                    this.lightsSubmitButton.innerText = lang == "en" ? "No changes to apply" : lang == "pt" ? "Nenhuma mudança a aplicar" : null;
                    this.lightsSubmitButton.disabled = true;
                    if (!this.isLightsLocalStorageValuesEqual() && this.environmentName == "All Environments") {
                        this.lightsSubmitButton.innerText = lang === "en" ? "Apply" : lang === "pt" ? "Aplicar" : null;
                        this.lightsSubmitButton.disabled = false;
                    }
                }, 150);
            });
        }
    }

}