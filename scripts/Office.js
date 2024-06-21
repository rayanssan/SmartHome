"use strict";

/**
 * Represents an Office environment with various products.
 * 
 * @see Environment
 */
class Office extends Environment {

    /**
     * Creates a new Office instance.
     * @param {String} name - The name of the Office.
     * @param {String[]} products - An array of products to enable in the Office, the elements that compose the array must 
     * be identical to the name of the id's of the add functionality buttons.
     * @param {Object} productMultiples - An object containing the count of items this bedroom can have multiples of.
     */
    constructor(name, products, productMultiples) {
        super(name, products, productMultiples, "office");
        this._name = name;
        this._productMultiples = productMultiples;
        this._products = products;
        this.officeButtonEvent();
    }

    /**
     * Gets the name of the environment.
     * @property {String} name
     */
    get name() {
        return this._name;
    }

    /**
     * Gets the array of products associated with the environment.
     * @property {Array} products
     */
    get products() {
        return this._products;
    }

    /**
     * Gets the object containing multiples of each product associated with the environment.
     * @property {Object} productMultiples
     */
    get productMultiples() {
        return this._productMultiples;
    }

    /**
     * Sets the name of the environment.
     * @param {String} name - The name of the environment.
     */
    set name(name) {
        this._name = name;
    }

    /**
     * Sets the array of products associated with the environment.
     * @param {Array} products - The array of products.
     */
    set products(products) {
        this._products = products;
    }

    /**
     * Sets the object containing multiples of each product associated with the environment.
     * @param {Object} productMultiples - The object containing product multiples.
     */
    set productMultiples(productMultiples) {
        this._productMultiples = productMultiples;
    }


    /**
     * Handles the button event for the office, creating and sorting environment preference buttons.
     */
    officeButtonEvent() {
        let climateControlsCreated = false;
        const sortedProducts = [];

        for (let product of officeProducts) {
            if (this.products.includes(product.id)) {
                let element;

                if (product.id == "addOfficeAC" || product.id == "addOfficeAirPurifier"
                    || product.id == "addOfficeAirDiffuser" ||
                    product.id == "addOfficeDehumidifier" ||
                    product.id == "addOfficeHumidifier") {
                    if (!climateControlsCreated) {
                        product = { id: "addOfficeClimate", en: "Climate", pt: "Climatização" };
                        element = document.createElement("button");
                        element.classList.add("environment-preference-button", "officeFunctionality");
                        element.innerText = lang === 'en' ? product.en : product.pt;
                        sortedProducts.push(element);
                        super.climate(element);
                        climateControlsCreated = true;
                    }
                }
                else {
                    element = document.createElement("button");
                    element.classList.add("environment-preference-button", "officeFunctionality");
                    element.innerText = lang === 'en' ? product.en : product.pt;
                    sortedProducts.push(element);
                }

                if (product.id == "addOfficeBlinds") {
                    let count = this.productMultiples[product.id];
                    super.blinds(element, count);
                }
                else if (product.id == "addOfficeTV") {
                    let count = this.productMultiples[product.id];
                    super.TV(element);
                }
                else if (product.id == "addOfficeFireplace") {
                    super.fireplace(element);
                }
                else if (product.id == "addOfficeLights") {
                    let count = this.productMultiples[product.id];
                    super.lights(element, count);
                }
                else if (product.id == "addOfficeSpeakers") {
                    let count = this.productMultiples[product.id];
                    super.speakers(element, count);
                }
            }
        }

        // Sort the products based on their innerText
        sortedProducts.sort((a, b) => {
            const textA = a.innerText.toLowerCase();
            const textB = b.innerText.toLowerCase();
            return textA.localeCompare(textB);
        });

        super.products = sortedProducts;
        super.createEnvironmentButton();
    }

}