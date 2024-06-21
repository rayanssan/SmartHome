"use strict";

/**
 * Represents a Kitchen environment with various products.
 * 
 * @see Environment
 */
class Kitchen extends Environment {

    /**
     * Creates a new Kitchen instance.
     * @param {String} name - The name of the kitchen.
     * @param {String[]} products - An array of products to enable in the kitchen, the elements that compose the array must 
     * be identical to the name of the id's of the add functionality buttons.
     * @param {Object} productMultiples - An object containing the count of items this bedroom can have multiples of.
     */
    constructor(name, products, productMultiples) {
        super(name, products, productMultiples, "kitchen");
        this._name = name;
        this._productMultiples = productMultiples;
        this._products = products;

        this.kitchenButtonEvent();
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
     * Handles the creation of the UI of the Smart Pantry products:
     * Cabinets, Fridge, and Pantry
     * @param {HTMLElement} element - The HTML element triggering the Smart Pantry functionality.
     * @param {String} productId - The ID of the product associated with the Smart Pantry, must include
     * either the susbtrings "Fridge", "Cabinets", or "Pantry".
     */
    smartPantry(element, productId) {
        // Kitchen Smart Pantry
        let smartPantryFunctionalityWrapper = document.createElement("div");
        smartPantryFunctionalityWrapper.id = "smart-pantry-functionality-wrapper";

        let groceriesButton = document.createElement("button");
        groceriesButton.innerHTML += `<span style="position: absolute;
        right: 60px;">
            ${lang == "en" ? "SmartHome Groceries" : lang == "pt" ? "Mercearia SmartHome" : null}</span>`;
        groceriesButton.classList.add("kitchen-groceries-button");

        groceriesButton.addEventListener("click", () => {
            location.href = 'SmartHomeGroceries.html';
        });

        let kitchenGroceriesSuggestions = document.createElement('details');
        kitchenGroceriesSuggestions.id = "kitchen-groceries-suggestions";
        kitchenGroceriesSuggestions.innerHTML = `<summary>${lang == "en" ? "Product Suggestions" :
            "Sugestões de Produtos"}</summary>
        <div id="kitchen-groceries-suggestions">

            <div class="kitchen-smart-pantry-product">
                <div class="kitchen-smart-pantry-product-front">
                    <img src="./media/images/stores/bakery/chocolate-chip-cookies.png">
                    <p style="text-align: left; font-size: 13px">Artisanal Bakery Experience</p>
                    <p class="grocery-product-name">
                        ${lang == "en" ? "Chocolate Chip Cookies" : lang == "pt" ? "Cookies de Chocolate" : null}
                        <button class="kitchen-suggestions-shop-button" 
                        onclick="location.href='SmartHomeGroceries.html'"></button>
                    </p>
                </div>
            </div>

            <div class="kitchen-smart-pantry-product">
                <div class="kitchen-smart-pantry-product-front">
                    <img src="./media/images/stores/bakery/chocolate-donuts.png">
                    <p style="text-align: left; font-size: 13px">Artisanal Bakery Experience</p>
                    <p class="grocery-product-name">
                        ${lang == "en" ? "Chocolate Donuts" : lang == "pt" ? "Donuts de Chocolate" : null}
                        <button class="kitchen-suggestions-shop-button" onclick="location.href='SmartHomeGroceries.html'"></button>
                    </p>
                </div>
            </div>

            <div class="kitchen-smart-pantry-product">
                <div class="kitchen-smart-pantry-product-front">
                    <img src="./media/images/stores/pangaea/yummy-bread.png">
                    <p style="text-align: left; font-size: 13px">Pangaea</p>
                    <p class="grocery-product-name">
                        ${lang == "en" ? "Yummy Whole Wheat Bread" : lang == "pt" ? "Pão Integral Yummy" : null}
                        <button class="kitchen-suggestions-shop-button" onclick="location.href='SmartHomeGroceries.html'"></button>
                    </p>
                </div>
            </div>

            <div class="kitchen-smart-pantry-product">
                <div class="kitchen-smart-pantry-product-front">
                    <img src="./media/images/stores/lidil/lettuce.png">
                    <p style="text-align: left; font-size: 13px">Lidil</p>
                    <p class="grocery-product-name">
                        ${lang == "en" ? "Lettuce" : lang == "pt" ? "Alface" : null}
                        <button class="kitchen-suggestions-shop-button" onclick="location.href='SmartHomeGroceries.html'"></button>
                    </p>
                </div>
            </div>

        </div>  
        `;
        smartPantryFunctionalityWrapper.appendChild(kitchenGroceriesSuggestions);

        let divisor = document.createElement('hr');
        smartPantryFunctionalityWrapper.appendChild(divisor);

        // Sections for Pantry, Cabinets, and Fridge
        const sections = {
            pantry: document.createElement("div"),
            cabinets: document.createElement("div"),
            fridge: document.createElement("div"),
        };

        let sectionType = sections[productId.includes("Pantry") ? "pantry" :
            productId.includes("Fridge") ? "fridge" :
                productId.includes("Cabinets") ? "cabinets" : null];

        sectionType.classList.add("pantry-products-display");

        smartPantryFunctionalityWrapper.appendChild(sectionType);

        let products = this.updatePantrySection(sections, productId);
        for (let product of products) {
            let productWrapper = document.createElement("div")
            productWrapper.innerHTML = product;

            if (productWrapper.querySelector('.return-button')) {
                productWrapper.querySelector('.return-button').innerHTML = `<svg class="svg-icon" 
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
            }

            // Add the kitchen-smart-pantry-product class to the productWrapper
            productWrapper.classList.add("kitchen-smart-pantry-product");

            // Front and Back elements
            const frontElement = productWrapper.querySelector(".kitchen-smart-pantry-product-front");
            const backElement = productWrapper.querySelector(".kitchen-smart-pantry-product-back");

            // Click event for switching to the back
            productWrapper.querySelector(".grocery-product-info").addEventListener("click", () => {
                frontElement.style.transform = "rotateY(-180deg)";
                backElement.style.transform = "rotateY(0deg)";
                setTimeout(() => {
                    frontElement.style.display = "none"
                    backElement.style.display = "flex";
                }, 200);
            });

            // Click event for switching back to the front
            if (productWrapper.querySelector(".return-button")) {
                productWrapper.querySelector(".return-button").addEventListener("click", () => {
                    frontElement.style.transform = "rotateY(0deg)";
                    backElement.style.transform = "rotateY(180deg)";
                    setTimeout(() => {
                        frontElement.style.display = "block"
                        backElement.style.display = "none";
                    }, 200);
                });
            }

            productWrapper.classList.add("kitchen-smart-pantry-product");
        }

        element.addEventListener("click", () => {
            // Transition animations
            environmentsOuterWindow.style.animation = "blur-transition-out 0.15s";
            setTimeout(() => {
                environmentsOuterWindow.style.animation = "blur-transition-in 0.15s";
                setTimeout(() => {
                    environmentsOuterWindow.style.removeProperty("animation");
                }, 150);
                environmentsWindow.querySelectorAll(".kitchenFunctionality").forEach(button => {
                    button.style.display = "none";
                });
                environmentsWindow.style.flexDirection = "column";
                environmentsWindow.style.alignItems = "center";
                environmentsWindow.style.alignContent = "center";
                if (lang === 'en') {
                    environmentsText.innerHTML = `${productId.includes("Cabinets") ?
                        "Cabinets" : productId.includes("Fridge") ? "Fridge" :
                            productId.includes("Pantry") ? "Pantry" : null}<p class='subp'>${this.environmentName}</p>`;
                }
                else if (lang === 'pt') {
                    environmentsText.innerHTML = `${productId.includes("Cabinets") ?
                        "Armários" : productId.includes("Fridge") ? "Frigorífico" :
                            productId.includes("Pantry") ? "Dispensa" : null}<p class='subp'>${this.environmentName}</p>`;
                }
                environmentsWindow.appendChild(groceriesButton);
                environmentsWindow.appendChild(smartPantryFunctionalityWrapper);

                sectionType.innerHTML = "";

                let products = this.updatePantrySection(sections, productId);
                this.makeProducts(products, productId, sections);

                if (!sectionType.parentElement.querySelector("select")) {
                    sectionType.parentElement.insertBefore(Object.assign(document.createElement("p"), {
                        innerHTML: lang == "en" ? "Your Products <select style='margin-left: 0;'>\
                        <option selected disabled>Filter</option>\
                        <option value='ne' selected>Newest First</option>\
                        <option value='sed'>Soonest Expiration Date</option>\
                        <option value='ao'>Alphabetical Order</option>\
                    </select>" :
                            "Seus Produtos <select style='margin-left: 0;'>\
                        <option selected disabled>Filtrar</option>\
                        <option value='ne' selected>Mais novos primeiro</option>\
                        <option value='sed'>Data de Vencimento Mais Próxima</option>\
                        <option value='ao'>Ordem Alfabética</option>\
                    </select>" }, {
                        style: "height: fit-content;\
                    width: 100%;\
                    font-size: larger;\
                    display: flex;\
                    flex-wrap: wrap;\
                    align-items: center;\
                    justify-content: space-between;"}), sectionType);

                    sectionType.parentElement.querySelector("select").addEventListener("change", () => {
                        const selectedValue = sectionType.parentElement.querySelector("select").value;

                        if (selectedValue == "ne") {
                            sectionType.innerHTML = "";
                            products = this.updatePantrySection(sections, productId, "ne");
                            this.makeProducts(products, productId, sections);
                        } else if (selectedValue == "sed") {
                            sectionType.innerHTML = "";
                            products = this.updatePantrySection(sections, productId, "sed");
                            this.makeProducts(products, productId, sections);
                        } else if (selectedValue == "ao") {
                            sectionType.innerHTML = "";
                            products = this.updatePantrySection(sections, productId, "ao");
                            this.makeProducts(products, productId, sections);
                        }
                    });
                }

            }, 150);
        })
    }

    /**
     * Updates the displayed section in the Smart Pantry based on the selected product.
     * @param {Object} sections - The sections for Pantry, Cabinets, and Fridge.
     * @param {String} productId - The ID of the selected product.
     * @param {String} sortParam - Sorting parameter ("ne" for Newest First, "sed" for 
     * Soonest Expiry Date, "ao" for Alphabetically).
     * @returns {Array} - An array of products to be displayed in the selected section.
     */
    updatePantrySection(sections, productId, sortParam = "ne") {
        let products;

        // Show the section based on the selected product
        if (productId.includes("Pantry")) {
            sections.pantry.style.display = "flex";
            products = pantryProducts;
        } else if (productId.includes("Cabinets")) {
            sections.cabinets.style.display = "flex";
            products = cabinetsProducts;
        } else if (productId.includes("Fridge")) {
            sections.fridge.style.display = "flex";
            products = fridgeProducts;
        }

        let defProductsOrder = [...products]; // Make a copy to preserve the original order

        if (sortParam == "ne") { // Newest First
            products = defProductsOrder;
        } else if (sortParam == "sed") { // Soonest Expiry Date
            const extractExpiryDate = (product) => {
                const doc = new DOMParser().parseFromString(product, 'text/html');
                const expiryDateElements = doc.querySelectorAll('.grocery-product-description p');
                for (const element of expiryDateElements) {
                    const textContent = element.textContent.trim();
                    if (textContent.startsWith("Expires in")) {
                        const dateMatch = textContent.match(/(\d{2})\/(\d{2})\/(\d{4})/);
                        if (dateMatch) {
                            // Note: months are 0-indexed in JavaScript Dates, so subtract 1 from the month
                            return new Date(dateMatch[3], dateMatch[2] - 1, dateMatch[1]);
                        }
                    }
                }
                return null;
            };
        
            // Extract and cache expiry dates before sorting
            const productsWithExpiry = products.map(product => ({ product, expiryDate: extractExpiryDate(product) }));
            productsWithExpiry.sort((a, b) => a.expiryDate - b.expiryDate);
            products = productsWithExpiry.map(entry => entry.product);
        } else if (sortParam == "ao") { // Alphabetically
            const extractProductName = (htmlString) => {
                const doc = new DOMParser().parseFromString(htmlString, 'text/html');
                const productNameElement = doc.querySelector('.grocery-product-name');
                return productNameElement ? productNameElement.firstChild.nodeValue.trim() : '';
            };

            // Extract and cache product names before sorting
            const productsWithNames = products.map(product => ({ product, name: extractProductName(product) }));
            productsWithNames.sort((a, b) => a.name.localeCompare(b.name));
            products = productsWithNames.map(entry => entry.product);
        }

        return products;
    }

    /**
     * Renders and appends product elements to the specified section based on the product type.
     *
     * @param {Array} products - An array of HTML strings representing products.
     * @param {String} productId - The ID of the selected product (e.g., "Pantry", "Cabinets", "Fridge").
     * @param {Object} sections - The sections for Pantry, Cabinets, and Fridge.
     */
    makeProducts(products, productId, sections) {
        for (let product of products) {
            let productWrapper = document.createElement("div");

            productWrapper.innerHTML = product;

            if (productWrapper.querySelector('.return-button')) {
                productWrapper.querySelector('.return-button').innerHTML = `<svg class="svg-icon" 
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
            }

            // Add the kitchen-smart-pantry-product class to the productWrapper
            productWrapper.classList.add("kitchen-smart-pantry-product");

            // Front and Back elements
            const frontElement = productWrapper.querySelector(".kitchen-smart-pantry-product-front");
            const backElement = productWrapper.querySelector(".kitchen-smart-pantry-product-back");

            // Click event for switching to the back
            productWrapper.querySelector(".grocery-product-info").addEventListener("click", () => {
                frontElement.style.transform = "rotateY(-180deg)";
                backElement.style.transform = "rotateY(0deg)";
                setTimeout(() => {
                    frontElement.style.display = "none"
                    backElement.style.display = "flex";
                }, 200);
            });

            // Click event for switching back to the front
            if (productWrapper.querySelector(".return-button")) {
                productWrapper.querySelector(".return-button").addEventListener("click", () => {
                    frontElement.style.transform = "rotateY(0deg)";
                    backElement.style.transform = "rotateY(180deg)";
                    setTimeout(() => {
                        frontElement.style.display = "block"
                        backElement.style.display = "none";
                    }, 200);
                });
            }

            if (productId.includes("Cabinets")) {
                sections.cabinets.appendChild(productWrapper);
            } else if (productId.includes("Fridge")) {
                sections.fridge.appendChild(productWrapper);
            } else if (productId.includes("Pantry")) {
                sections.pantry.appendChild(productWrapper);
            }
        }
    }

    /**
     * Handles the button event for the kitchen, creating and sorting environment preference buttons.
     */
    kitchenButtonEvent() {
        let climateControlsCreated = false;
        const sortedProducts = [];

        for (let product of kitchenProducts) {
            if (this.products.includes(product.id)) {
                let element;

                if (product.id == "addKitchenAC" || product.id == "addKitchenAirPurifier" ||
                    product.id == "addKitchenAirDiffuser" ||
                    product.id == "addKitchenDehumidifier" || product.id == "addKitchenHumidifier") {
                    if (!climateControlsCreated) {
                        product = { id: "addKitchenClimate", en: "Climate", pt: "Climatização" };
                        element = document.createElement("button");
                        element.classList.add("environment-preference-button", "kitchenFunctionality");
                        element.innerText = lang === 'en' ? product.en : product.pt;
                        sortedProducts.push(element);
                        super.climate(element);
                        climateControlsCreated = true;
                    }
                } else {
                    element = document.createElement("button");
                    element.classList.add("environment-preference-button", "kitchenFunctionality");
                    element.innerText = lang === 'en' ? product.en : product.pt;
                    sortedProducts.push(element); // Push elements to the array
                }

                if (product.id == "addKitchenBlinds") {
                    let count = this.productMultiples[product.id];
                    super.blinds(element, count);
                }
                else if (product.id == "addKitchenTV") {
                    let count = this.productMultiples[product.id];
                    super.TV(element);
                }
                else if (product.id == "addKitchenLights") {
                    let count = this.productMultiples[product.id];
                    super.lights(element, count);
                }
                else if (product.id == "addKitchenPantry") {
                    this.smartPantry(element, product.id);
                }
                else if (product.id == "addKitchenFridge") {
                    this.smartPantry(element, product.id);
                }
                else if (product.id == "addKitchenCabinets") {
                    this.smartPantry(element, product.id);
                }
                else if (product.id == "addKitchenSpeakers") {
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