"use strict";

/**
 * Represents a Bathroom environment with various products.
 * 
 * @see Environment
 */
class Bathroom extends Environment {

    /**
     * Creates a new Bathroom instance.
     * @param {String} name - The name of the bathroom.
     * @param {String[]} products - An array of products to enable in the bathroom, the elements that compose the array must 
     * be identical to the name of the id's of the add functionality buttons.
     * @param {Object} productMultiples - An object containing the count of items this bathroom can have multiples of.
     */
    constructor(name, products, productMultiples) {
        super(name, products, productMultiples, "bathroom")
        this._name = name;
        this._products = products;
        this._productMultiples = productMultiples;
        this.bathroomButtonEvent();
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
     * Handles the flush toilet feature.
     * @param {HTMLElement} element - The HTML element triggering the flush toilet feature.
     */
    flushToilet(element) {
        let isToiletSkibiding = false;
        let previousText = element.innerText;

        element.addEventListener("click", () => {
            if (!isToiletSkibiding) {
                isToiletSkibiding = true;
                document.body.style.pointerEvents = "none";
                element.style.filter = "drop-shadow(0 0 0.35rem blue)";
                let skibidiToilet = new Audio("./media/sounds/skibidi.mp3");
                skibidiToilet.volume = "0.09";
                skibidiToilet.play();
                element.innerText = "•";
                setTimeout(() => {
                    element.innerText = "• •";
                }, 500);
                setTimeout(() => {
                    element.innerText = "• • •";
                }, 1000);
                setTimeout(() => {
                    element.innerText = lang == "en" ? "Toilet Flushed!" : "Descarga feita!";
                    element.style.backgroundColor = "blue";
                    element.style.color = "white";

                    skibidiToilet.addEventListener('ended', () => {
                        isToiletSkibiding = false;
                        editEnvironmentButton.style.display = "flex";
                        document.body.style.removeProperty("pointer-events");
                        element.style.removeProperty("background-color");
                        element.style.removeProperty("filter");
                        element.style.removeProperty("color");
                        element.innerText = previousText;
                    });
                }, 1600);
            }
        });
    }

    /**
     * Handles the button event for the bathroom, creating and sorting environment preference buttons.
     */
    bathroomButtonEvent() {
        let climateControlsCreated = false;
        const sortedProducts = [];

        for (let product of bathroomProducts) {
            if (this.products.includes(product.id)) {
                let element;

                if (product.id == "addBathroomAirDiffuser" || product.id == "addBathroomDehumidifier") {
                    if (!climateControlsCreated) {
                        product = { id: "addBathroomClimate", en: "Climate", pt: "Climatização" };
                        element = document.createElement("button");
                        element.classList.add("environment-preference-button", "bathroomFunctionality");
                        element.innerText = lang === 'en' ? product.en : product.pt;
                        sortedProducts.push(element);
                        super.climate(element);
                        climateControlsCreated = true;
                    }
                } else {
                    element = document.createElement("button");
                    element.classList.add("environment-preference-button", "bathroomFunctionality");
                    element.innerText = lang === 'en' ? product.en : product.pt;
                    sortedProducts.push(element);
                }

                if (product.id == "addBathroomBlinds") {
                    let count = this.productMultiples[product.id];
                    super.blinds(element, count);
                }
                else if (product.id == "addBathroomFlushToilet") {
                    this.flushToilet(element);
                }
                else if (product.id == "addBathroomLights") {
                    let count = this.productMultiples[product.id];
                    super.lights(element, count);
                }
                else if (product.id == "addBathroomSpeakers") {
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
