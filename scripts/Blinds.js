"use strict";

/**
 * Represents blinds settings.
 */
class Blinds {

    /**
     * Creates a new instance of Blinds.
     * @param {HTMLElement} blindsButton - The button associated with blinds.
     * @param {Number} blindsCount - The count of blinds.
     * @param {String} context - The context of the blinds instance, must be either
     * "general" or "environments". Defaults to "general"
     * @param {String} environmentName - The environment name associated with blinds. Defaults to "All Environments".
     */
    constructor(blindsButton, blindsCount, context = "general", environmentName = "All Environments") {
        this._blindsButton = blindsButton;
        this._blindsCount = blindsCount;
        this._context = context;
        this._environmentName = environmentName;

        // Blinds elements window
        this._blindsWindow = document.createElement("form");
        // Blinds submit button
        this._blindsSubmitButton = document.createElement('button');

        Blinds.allInstances.push(this);
        this.createUI();
        this.blindsButtonEvent();
    }

    // Static array to keep track of all created Blinds instances
    static allInstances = [];

    /**
     * Removes the blinds window associated with the provided context,
     * This method is static and can be called on the class itself, as it operates on all instances.
     * @param {String} context - The context from which to return from Blinds settings.
     */
    static returnFromBlinds(context) {
        Blinds.allInstances.forEach((instance) => {
            if (instance.context == context) {
                // TODO
                instance.blindsWindow.remove();
            }
        });
    }

    get blindsButton() {
        return this._blindsButton;
    }

    get blindsCount() {
        return this._blindsCount;
    }

    get blindsWindow() {
        return this._blindsWindow;
    }

    get context() {
        return this._context;
    }

    get environmentName() {
        return this._environmentName;
    }

    get blindsSubmitButton() {
        return this._blindsSubmitButton;
    }

    set blindsButton(blindsButton) {
        this._blindsButton = blindsButton;
    }

    set blindsCount(blindsCount) {
        this._blindsCount = blindsCount;
    }

    set blindsWindow(blindsWindow) {
        this._blindsWindow = blindsWindow;
    }

    set context(context) {
        this._context = context;
    }

    set environmentName(environmentName) {
        this._environmentName = environmentName;
    }

    set blindsSubmitButton(blindsSubmitButton) {
        this._blindsSubmitButton = blindsSubmitButton;
    }

    /**
     * Creates the user interface (UI) elements for this Blinds instance.
     */
    createUI() {
        this.blindsWindow.classList.add("blinds-window");

        if (this.context == "general") {

            this.selectsWrapper = document.createElement('div');
            this.selectsWrapper.style.display = "flex";
            this.selectsWrapper.style.flexWrap = "wrap";
            this.selectsWrapper.style.justifyContent = "center";
            this.blindsWindow.appendChild(this.selectsWrapper);

            this.blindsEnvironmentsSelection = document.createElement("select");
            this.blindsEnvironmentsSelection.innerHTML = `<option>${lang == "en" ? "All Environments" : lang == "pt" ?
                "Todos os Ambientes" : null}</option>`;
            let blindsSelectOptionsDefault = JSON.parse(localStorage.getItem('environments')).filter(
                environment => environment.products.some(product => product.includes("Blinds"))).map(
                    environment => `<option>${environment.name}</option>`).join('');
            this.blindsEnvironmentsSelection.innerHTML += blindsSelectOptionsDefault;
            blindsSelectOptionsDefault = this.blindsEnvironmentsSelection.innerHTML;
            this.blindsEnvironmentsSelection.addEventListener("click", () => {
                const blindsSelectOptionsDynamic = `<option>${lang == "en" ? "All Environments" : lang == "pt" ?
                    "Todos os Ambientes" : null}</option>` + JSON.parse(localStorage.getItem('environments'))
                        .filter(environment => environment.products.some(product => product.includes("Blinds"))).map(
                            environment => `<option>${environment.name}</option>`).join('');
                if (blindsSelectOptionsDynamic != blindsSelectOptionsDefault) {
                    this.blindsEnvironmentsSelection.style.cursor = "wait";
                    this.blindsEnvironmentsSelection.innerHTML = blindsSelectOptionsDynamic;
                    blindsSelectOptionsDefault = blindsSelectOptionsDynamic;
                    setTimeout(() => {
                        this.blindsEnvironmentsSelection.style.removeProperty("cursor");
                    }, 1000);
                }
            })
            this.blindsEnvironmentsSelection.style.width = "fit-content";
            this.selectsWrapper.appendChild(this.blindsEnvironmentsSelection);

            let blindsSelect = document.createElement('select');
            blindsSelect.style.width = "fit-content";

            blindsSelect.innerHTML = `<option value=0>${lang == "en" ? "All Blinds" : "Todos os Estores"}</option>`;
            blindsSelect.disabled = true;
            blindsSelect.addEventListener("change", () => {
                this.blindsSubmitButton.innerText = lang == "en" ? "Apply" : lang == "pt" ? "Aplicar" : null;
                this.blindsSubmitButton.disabled = false;
            });
            this.selectsWrapper.appendChild(blindsSelect);
            if (!this.isBlindsLocalStorageValuesEqual()) {
                this.selectsWrapper.appendChild(Object.assign(document.createElement('p'),
                    {
                        className: 'various-message', style: "margin-bottom: 0px;margin-top: 10px;",
                        innerHTML: lang === "en" ? "<i>Various blinds settings currently applied</i>" :
                            "<i>Várias configurações de estores aplicadas atualmente</i>"
                    }));
            }

            this.blindsEnvironmentsSelection.addEventListener("change", () => {
                this.environmentName = this.blindsEnvironmentsSelection.value;
                if (this.environmentName == "All Environments" || this.environmentName == "Todos os Ambientes") {
                    this.environmentName = "All Environments";
                    blindsSelect.innerHTML = `<option>${lang == "en" ? "All Blinds" : "Todos os Estores"}</option>`;
                    blindsSelect.disabled = true;
                    if (!this.isBlindsLocalStorageValuesEqual() && this.environmentName == "All Environments") {
                        this.blindsSubmitButton.innerText = lang === "en" ? "Apply" : lang === "pt" ? "Aplicar" : null;
                        this.blindsSubmitButton.disabled = false;
                        this.selectsWrapper.appendChild(Object.assign(document.createElement('p'),
                            {
                                className: 'various-message', style: "margin-bottom: 0px;margin-top: 10px;",
                                innerHTML: lang === "en" ? "<i>Various blinds settings currently applied</i>" :
                                    "<i>Várias configurações de estores aplicadas atualmente</i>"
                            }));
                    }
                }
                else {
                    if (this.selectsWrapper.querySelector('.various-message')) {
                        this.selectsWrapper.querySelector('.various-message').remove();
                    }
                    this.blindsCount = Blinds.allInstances.find(blind => blind.environmentName === this.environmentName).blindsCount;
                    blindsSelect.innerHTML = "";
                    blindsSelect.disabled = false;
                    if (this.blindsCount > 1) {
                        blindsSelect.innerHTML = `<option value=0>${lang == "en" ? "All blinds in this environment"
                            : "Todos os estores neste ambiente"}</option>`;
                    }
                    for (let i = 1; i <= this.blindsCount; i++) {
                        let option = document.createElement('option');
                        if (this.blindsCount == 1) {
                            option.value = 0;
                        }
                        else {
                            option.value = i;
                        }
                        option.text = lang == "en" ? `Blind ${i}` : `Estore ${i}`;
                        blindsSelect.appendChild(option);
                    }
                }

                if (this.environmentName != "All Environments" || this.isBlindsLocalStorageValuesEqual()) {
                    this.blindsSubmitButton.innerText = lang == "en" ? "No changes to apply" : lang == "pt" ? "Nenhuma mudança a aplicar" : null;
                    this.blindsSubmitButton.disabled = true;
                }

                if (localStorage.getItem(`blinds-${this.environmentName}`)) {
                    this.slider_input.value = localStorage.getItem(`blinds-${this.environmentName}`);
                    this.showSliderValue();
                    this.blindsSubmitButton.innerText = lang == "en" ? "Apply" : lang == "pt" ? "Aplicar" : null;
                    this.blindsSubmitButton.disabled = false;
                }
                else {
                    this.slider_input.value = 50;
                    this.showSliderValue();
                }
            });

            this.blindsWindowDivisor1 = document.createElement("hr");
            this.blindsWindow.appendChild(this.blindsWindowDivisor1);
        }

        if (this.context != "general") {
            let blindsSelect = document.createElement('select');
            if (this.blindsCount > 1) {
                blindsSelect.innerHTML = `<option value=0>${lang == "en" ? "All blinds in this environment"
                    : "Todos os estores neste ambiente"}</option>`;
            }
            for (let i = 1; i <= this.blindsCount; i++) {
                let option = document.createElement('option');
                if (this.blindsCount == 1) {
                    option.value = 0;
                }
                else {
                    option.value = i;
                }
                option.text = lang == "en" ? `Blind ${i}` : `Estore ${i}`;
                blindsSelect.appendChild(option);
            }
            blindsSelect.addEventListener("change", () => {
                this.blindsSubmitButton.innerText = lang == "en" ? "Apply" : lang == "pt" ? "Aplicar" : null;
                this.blindsSubmitButton.disabled = false;
            });
            this.blindsWindow.appendChild(blindsSelect);
        }

        this.blindsRangeContainer = document.createElement("div");
        this.blindsRangeContainer.id = "blinds-range-container";

        this.blindsRangeContainer.innerHTML = `
        <div class="range-slider">
        <div id="slider_thumb" class="range-slider_thumb"></div>
        <div class="range-slider_line">
            <div id="slider_line" class="range-slider_line-fill"></div>
        </div>
        <input id="slider_input" class="range-slider_input" type="range" value="50" min="0" max="100">
        </div>
        `;
        this.slider_input = this.blindsRangeContainer.querySelector('#slider_input');
        this.slider_thumb = this.blindsRangeContainer.querySelector('#slider_thumb');
        this.slider_line = this.blindsRangeContainer.querySelector('#slider_line');
        this.blindsRangeContainer.querySelector('#slider_input').addEventListener('input', () => {
            this.showSliderValue();
            this.blindsSubmitButton.innerText = lang == "en" ? "Apply" : lang == "pt" ? "Aplicar" : null;
            this.blindsSubmitButton.disabled = false;
        });
        this.blindsWindow.appendChild(this.blindsRangeContainer);

        this.showSliderValue();
        window.addEventListener("resize", this.showSliderValue);

        this.blindsWindowDivisor2 = document.createElement("hr");
        this.blindsWindow.appendChild(this.blindsWindowDivisor2);

        this.blindsSubmitButton.innerText = lang == "en" ? "No changes to apply" : lang == "pt" ? "Nenhuma mudança a aplicar" : null;
        this.blindsSubmitButton.disabled = true;
        this.blindsSubmitButton.classList.add("blinds-submit-button");
        this.blindsWindow.appendChild(this.blindsSubmitButton);

        if (this.context == "general") {
            this.blindsSubmitButton.addEventListener("click", event => {
                event.preventDefault();
                showConfirmationDialog(lang == "en" ? "Are you sure you want to change the blinds settings?" :
                    lang == "pt" ? "Tem certeza que quer mudar as configurações das estores?" : null,
                    lang == "en" ? "Yes" : lang == "pt" ? "Sim" : null,
                    lang == "en" ? "No" : lang == "pt" ? "Não" : null,
                    "negative",
                    "general",
                    preferencesOuterWindow,
                    lang == "en" ? "The blinds settings were successfully changed" : lang == "pt" ?
                        "As configurações das estores foram alteradas com sucesso" : null, () => {
                            this.blindsSubmitButton.disabled = true;
                            this.blindsSubmitButton.innerText = lang == "en" ? "No changes to apply" : lang == "pt" ? "Nenhuma mudança a aplicar" : null;
                            if (this.environmentName === "All Environments") {

                                for (const option of Array.from(this.blindsEnvironmentsSelection.options)) {
                                    let environment = option.value;
                                    if (environment == "Todos os Ambientes") {
                                        environment = "All Environments";
                                    }
                                    localStorage.setItem(`blinds-${environment}`, this.slider_input.value);
                                }
                            }
                            else {
                                localStorage.setItem(`blinds-${this.environmentName}`, this.slider_input.value);
                            }
                        });
            });
        } else if (this.context == "environments") {
            this.blindsSubmitButton.addEventListener("click", event => {
                event.preventDefault();
                showConfirmationDialog(lang == "en" ? "Are you sure you want to change the blinds settings?" :
                    lang == "pt" ? "Tem certeza que quer mudar as configurações das estores?" : null,
                    lang == "en" ? "Yes" : lang == "pt" ? "Sim" : null,
                    lang == "en" ? "No" : lang == "pt" ? "Não" : null,
                    "negative",
                    "environments",
                    environmentsOuterWindow,
                    lang == "en" ? "The blinds settings were successfully changed" : lang == "pt" ?
                        "As configurações das estores foram alteradas com sucesso" : null, () => {
                            this.blindsSubmitButton.disabled = true;
                            this.blindsSubmitButton.innerText = lang == "en" ? "No changes to apply" : lang == "pt" ? "Nenhuma mudança a aplicar" : null;
                            localStorage.setItem(`blinds-${this.environmentName}`, this.slider_input.value);
                        });
            });
        }
    }

    /**
     * Show the current value of the slider.
     * If the slider container exists, it updates the slider thumb position, line width,
     * and displays the slider value.
     */
    showSliderValue() {
        if (this.slider_input && this.slider_thumb && this.slider_line) {
            if (this.slider_input.value === "0") {
                this.slider_thumb.innerHTML = `<span>${lang === "en" ? "closed" : "fechado"}</span>`;
            } else {
                this.slider_thumb.innerHTML = `${this.slider_input.value}%<span>${lang === "en" ? "open" : "aberto"}</span>`;
            }
            const bulletPosition = (this.slider_input.value / this.slider_input.max),
                space = this.slider_input.offsetWidth - this.slider_thumb.offsetWidth;

            this.slider_thumb.style.left = (bulletPosition * space) + 'px';
            this.slider_line.style.width = this.slider_input.value + '%';
        }
    }

    /**
     * Checks if the blinds-related values in localStorage are equal.
     * @returns {boolean} - Returns true if all blinds-related values are equal; otherwise, returns false.
     */
    isBlindsLocalStorageValuesEqual() {
        let firstValue = null;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("blinds")) {
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
     * Handles the event for the blinds button, updating preferences and UI accordingly.
     */
    blindsButtonEvent() {
        // Event listener for the blinds button
        if (this.context == "general") {
            this.blindsButton.addEventListener("click", () => {
                preferencesOuterWindow.style.animation = "blur-transition-out 0.15s";
                setTimeout(() => {
                    preferencesOuterWindow.style.animation = "blur-transition-in 0.15s";
                    setTimeout(() => {
                        preferencesOuterWindow.style.removeProperty("animation");
                    }, 150);
                    preferencesElements.forEach(element => {
                        element.style.display = "none";
                    });
                    preferencesWindow.appendChild(this.blindsWindow);
                    this.blindsWindow.querySelectorAll('select')[1].value = 0;
                    preferencesWindow.style.display = "flex";
                    preferencesReturnButton.style.removeProperty("display");

                    this.blindsSubmitButton.innerText = lang == "en" ? "No changes to apply" : lang == "pt" ? "Nenhuma mudança a aplicar" : null;
                    if (lang === 'en') {
                        preferencesText.innerHTML = "Blinds";
                    }
                    else if (lang === 'pt') {
                        preferencesText.innerHTML = "Estores";
                    }
                    preferencesText.style.marginLeft = "42px";
                    if (!this.isBlindsLocalStorageValuesEqual() && this.environmentName == "All Environments") {
                        this.blindsSubmitButton.innerText = lang == "en" ? "Apply" : lang == "pt" ? "Aplicar" : null;
                        this.blindsSubmitButton.disabled = false;
                    } else {
                        this.blindsSubmitButton.innerText = lang == "en" ? "No changes to apply" : lang == "pt" ? "Nenhuma mudança a aplicar" : null;
                        this.blindsSubmitButton.disabled = true;
                    }
                    this.showSliderValue();
                    if (localStorage.getItem(`blinds-${this.environmentName}`)) {
                        this.slider_input.value = localStorage.getItem(`blinds-${this.environmentName}`);
                        this.showSliderValue();
                        this.blindsSubmitButton.innerText = lang == "en" ? "Apply" : lang == "pt" ? "Aplicar" : null;
                        this.blindsSubmitButton.disabled = false;
                    }
                    else {
                        this.slider_input.value = 50;
                        this.showSliderValue();
                    }
                }, 150);
            });
        } else if (this.context == "environments") {
            this.blindsButton.addEventListener("click", () => {
                environmentsOuterWindow.style.animation = "blur-transition-out 0.15s";
                setTimeout(() => {
                    environmentsOuterWindow.style.animation = "blur-transition-in 0.15s";
                    setTimeout(() => {
                        environmentsOuterWindow.style.removeProperty("animation");
                    }, 150);
                    document.querySelectorAll(".environment-preference-button").forEach(element => {
                        element.style.display = "none";
                    });
                    environmentsWindow.appendChild(this.blindsWindow);
                    this.blindsWindow.querySelectorAll('select')[0].value = 0;
                    environmentsWindow.style.display = "flex";
                    environmentsReturnButton.style.removeProperty("display");

                    if (lang === 'en') {
                        environmentsText.innerHTML = `Blinds<p class='subp'>${this.environmentName}</p>`;
                    }
                    else if (lang === 'pt') {
                        environmentsText.innerHTML = `Estores<p class='subp'>${this.environmentName}</p>`;
                    }
                    environmentsText.style.marginLeft = "42px";
                    this.blindsSubmitButton.innerText = lang == "en" ? "No changes to apply" : lang == "pt" ? "Nenhuma mudança a aplicar" : null;
                    this.blindsSubmitButton.disabled = true;
                    this.showSliderValue();
                    if (localStorage.getItem(`blinds-${this.environmentName}`)) {
                        this.slider_input.value = localStorage.getItem(`blinds-${this.environmentName}`);
                        this.showSliderValue();
                        this.blindsSubmitButton.innerText = lang == "en" ? "Apply" : lang == "pt" ? "Aplicar" : null;
                        this.blindsSubmitButton.disabled = false;
                    }
                    else {
                        this.slider_input.value = 50;
                        this.showSliderValue();
                    }
                }, 150);
            });
        }
    }

}