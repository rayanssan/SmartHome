"use strict";

/**
 * Represents a Living Room environment with various products.
 * 
 * @see Environment
 */
class LivingRoom extends Environment {

    /**
     * Creates a new LivingRoom instance.
     * @param {String} name - The name of the living room.
     * @param {String[]} products - An array of products to enable in the living room, the elements that compose the array must 
     * be identical to the name of the id's of the add functionality buttons.
     * @param {Object} productMultiples - An object containing the count of items this bedroom can have multiples of.
     */
    constructor(name, products, productMultiples) {
        super(name, products, productMultiples, "living-room");
        this._name = name;
        this._productMultiples = productMultiples;
        this._products = products;
        this.livingRoomButtonEvent();
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
     * Handles the button event for the living room, creating and sorting environment preference buttons.
     */
    livingRoomButtonEvent() {
        let climateControlsCreated = false;
        const sortedProducts = [];

        for (let product of livingRoomProducts) {
            if (this.products.includes(product.id)) {
                let element;

                if (product.id == "addLivingRoomAC" || product.id == "addLivingRoomAirPurifier"
                    || product.id == "addLivingRoomAirDiffuser" ||
                    product.id == "addLivingRoomDehumidifier" ||
                    product.id == "addLivingRoomHumidifier") {
                    if (!climateControlsCreated) {
                        product = { id: "addLivingRoomClimate", en: "Climate", pt: "Climatização" };
                        element = document.createElement("button");
                        element.classList.add("environment-preference-button", "livingRoomFunctionality");
                        element.innerText = lang === 'en' ? product.en : product.pt;
                        sortedProducts.push(element);
                        super.climate(element);
                        climateControlsCreated = true;
                    }
                }
                else {
                    element = document.createElement("button");
                    element.classList.add("environment-preference-button", "livingRoomFunctionality");
                    element.innerText = lang === 'en' ? product.en : product.pt;
                    sortedProducts.push(element);
                }

                if (product.id == "addLivingRoomBlinds") {
                    let count = this.productMultiples[product.id];
                    super.blinds(element, count);
                }
                else if (product.id == "addLivingRoomTV") {
                    let count = this.productMultiples[product.id];
                    super.TV(element);
                }
                else if (product.id == "addLivingRoomFireplace") {
                    super.fireplace(element);
                }
                else if (product.id == "addLivingRoomLights") {
                    let count = this.productMultiples[product.id];
                    super.lights(element, count);
                }
                else if (product.id == "addLivingRoomSpeakers") {
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