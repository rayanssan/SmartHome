"use strict";

/**
 * Represents a Bedroom environment with various products.
 * 
 * @see Environment
 */
class Bedroom extends Environment {

    /**
     * Creates a new Bedroom instance.
     * @param {String} name - The name of the bedroom.
     * @param {String[]} products - An array of products to enable in the bedroom, the elements that compose the array must 
     * be identical to the name of the id's of the add functionality buttons.
     * @param {Object} productMultiples - An object containing the count of items this bedroom can have multiples of.
     */
    constructor(name, products, productMultiples) {
        super(name, products, productMultiples, "bedroom");
        this._name = name;
        this._products = products;
        this._productMultiples = productMultiples;
        this.bedroomButtonEvent();
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
     * Handles creation of the Smart Closet functionality UI.
     */
    smartCloset(element) {
        let closetWindow = document.createElement('div');
        closetWindow.classList.add('closet-window');

        let clothes = [
            { path: './media/images/closet/armaniblazer.png', nameEn: 'Armani Blazer', namePt: 'Blazer Armani', type: "top" },
            { path: './media/images/closet/diorshorts.png', nameEn: 'Dior Shorts', namePt: 'Shorts Dior', type: "bottom" },
            { path: './media/images/closet/louboutinsneakers.png', nameEn: 'Louboutin Sneakers', namePt: 'Sapatilhas Louboutin', type: "shoes" },
            { path: './media/images/closet/armanipants.png', nameEn: 'Giorgio Armani Pants', namePt: 'Calças Giorgio Armani', type: "bottom" },
            { path: './media/images/closet/diorsneakers.png', nameEn: 'Dior Sneakers', namePt: 'Sapatilhas Dior', type: "shoes" },
            { path: './media/images/closet/lvboots.png', nameEn: 'Louis Vuitton Boots', namePt: 'Botas Louis Vuitton', type: "shoes" },
            { path: './media/images/closet/balenciagaadidas.png', nameEn: 'Balenciaga X Adidas Hoodie', namePt: 'Hoodie Balenciaga X Adidas', type: "top" },
            { path: './media/images/closet/docmartens.png', nameEn: 'Dr. Martens 1460 Boots', namePt: 'Botas Dr. Martens 1460', type: "shoes" },
            { path: './media/images/closet/pradajacket.png', nameEn: 'Prada Jacket', namePt: 'Casaco Prada', type: "top" },
            { path: './media/images/closet/balenciagatee.png', nameEn: 'Balenciaga T-Shirt', namePt: 'T-Shirt Balenciaga', type: "top" },
            { path: './media/images/closet/givenchyblazer.png', nameEn: 'Givenchy Blazer', namePt: 'Blazer Givenchy', type: "top" },
            { path: './media/images/closet/supremetee.png', nameEn: 'Supreme X Louis Vuitton T-Shirt', namePt: 'T-Shirt Supreme X Louis Vuitton', type: "top" },
            { path: './media/images/closet/balenciagatriples.png', nameEn: 'Balenciaga Triple S', namePt: 'Balenciaga Triple S', type: "shoes" },
            { path: './media/images/closet/givenchypants.png', nameEn: 'Givenchy White Trousers', namePt: 'Calças Brancas Givenchy', type: "bottom" },
            { path: './media/images/closet/vans.png', nameEn: 'Vans Checkerboard Sneakers', namePt: 'Sapatilhas Checkerboard Vans', type: "shoes" },
            { path: './media/images/closet/burberryblazer.png', nameEn: 'Burberry Blazer', namePt: 'Blazer Burberry', type: "top" },
            { path: './media/images/closet/guccijacket.png', nameEn: 'Gucci Jacket', namePt: 'Casaco Gucci', type: "top" },
            { path: './media/images/closet/versacepants.png', nameEn: 'Versace Pants', namePt: 'Calças Versace', type: "bottom" },
            { path: './media/images/closet/burberrypants.png', nameEn: 'Burberry Pants', namePt: 'Calças Burberry', type: "bottom" },
            { path: './media/images/closet/gucciloafers.png', nameEn: 'Gucci Loafers', namePt: 'Mocassins Gucci', type: "shoes" },
            { path: './media/images/closet/versaceshirt.png', nameEn: 'Versace Shirt', namePt: 'Camisa Versace', type: "top" },
            { path: './media/images/closet/burberrytrench.png', nameEn: 'Burberry Trench', namePt: 'Gabardine Burberry', type: "top" },
            { path: './media/images/closet/levisjacket.png', nameEn: 'Levi\'s Jacket', namePt: 'Casaco Levi\'s', type: "top" },
            { path: './media/images/closet/yslcoat.png', nameEn: 'Saint Laurent Fur Coat', namePt: 'Casaco de Pele Saint Laurent', type: "top" },
            { path: './media/images/closet/diorshirt.png', nameEn: 'Dior Shirt', namePt: 'Camisa Dior', type: "top" },
            { path: './media/images/closet/levisjeans.png', nameEn: 'Levi\'s 501 Jeans', namePt: 'Calças Jeans Levi\'s 501', type: "bottom" },
            { path: './media/images/closet/ysljacket.png', nameEn: 'Saint Laurent Biker Jacket', namePt: 'Casaco de Couro Saint Laurent', type: "top" },
        ];

        // Separate clothes by type
        const tops = clothes.filter(item => item.type === 'top');
        const bottoms = clothes.filter(item => item.type === 'bottom');
        const shoes = clothes.filter(item => item.type === 'shoes');

        const getCurrentSlide = (slides) => {
            // Find the index of the currently active slide
            for (let i = 0; i < slides.length; i++) {
                if (slides[i].classList.contains('active')) {
                    return i;
                }
            }
            return 0;
        }

        const showPreviousSlide = (slideshowContainer) => {
            const slides = slideshowContainer.querySelectorAll('.slide');
            const currentSlide = getCurrentSlide(slides);
    
            if (currentSlide > 0) {
                slides[currentSlide].classList.remove('active');
                slides[currentSlide - 1].classList.add('active');
            } else {
                slides[currentSlide].classList.remove('active');
                slides[slides.length - 1].classList.add('active');
            }
        }
    
        const showNextSlide = (slideshowContainer) => {
            const slides = slideshowContainer.querySelectorAll('.slide');
            const currentSlide = getCurrentSlide(slides);
    
            if (currentSlide < slides.length - 1) {
                slides[currentSlide].classList.remove('active');
                slides[currentSlide + 1].classList.add('active');
            } else {
                // Wrap around to the first slide if on the last slide
                slides[currentSlide].classList.remove('active');
                slides[0].classList.add('active');
            }
        }

        const createSlideshow = (items) => {
            // Create slideshow container
            const slideshowContainer = document.createElement('div');
            slideshowContainer.classList.add('slideshow-container');
    
            // Iterate through items and create slides
            items.forEach(item => {
                const slide = document.createElement('div');
                slide.classList.add('slide');
    
                // Create image container
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');
    
                // Create image element
                const clotheImage = document.createElement('img');
                clotheImage.src = item.path;
                clotheImage.alt = item.nameEn;
                clotheImage.draggable = false;
    
                const clothesName = document.createElement('p');
                clothesName.innerText = lang == "en" ? item.nameEn : item.namePt;
    
                // Append clothe image to the image container
                imageContainer.appendChild(clotheImage);
    
                // Append clothe name to the image container
                imageContainer.appendChild(clothesName);
    
                // Append image container to the slide
                slide.appendChild(imageContainer);
    
                // Append slide to the slideshow container
                slideshowContainer.appendChild(slide);
            });
    
            // Create left and right buttons for slideshow control
            const leftButton = document.createElement('button');
            leftButton.classList.add('closet-control-button', 'closet-left-button');
            leftButton.textContent = '❮';
    
            const rightButton = document.createElement('button');
            rightButton.classList.add('closet-control-button', 'closet-right-button');
            rightButton.textContent = '❯';
    
            // Add event listeners for left and right buttons
            leftButton.addEventListener('click', () => showPreviousSlide(slideshowContainer));
            rightButton.addEventListener('click', () => showNextSlide(slideshowContainer));
    
            // Append left and right buttons to the slideshow container
            slideshowContainer.appendChild(leftButton);
            slideshowContainer.appendChild(rightButton);
    
            leftButton.click();
            rightButton.click();
            return slideshowContainer;
        }

        // Create slideshow containers
        const topsSlideshow = createSlideshow(tops);
        const bottomsSlideshow = createSlideshow(bottoms);
        const shoesSlideshow = createSlideshow(shoes);

        // Append slideshows to the closet window
        closetWindow.appendChild(topsSlideshow);
        closetWindow.appendChild(bottomsSlideshow);
        closetWindow.appendChild(shoesSlideshow);

        closetWindow.appendChild(document.createElement("hr"));

        closetWindow.appendChild(Object.assign(document.createElement("p"), {innerText: lang == "en" ? "Generate a look:" : 
        "Gerar um look:"}, {style: "margin-bottom: 10px; margin-top: 10px;"}));

        let autoDressButton = document.createElement('button');
        autoDressButton.innerText = lang == "en" ? "Dress Me" : "Vista-me";
        closetWindow.appendChild(autoDressButton);

        autoDressButton.addEventListener("click", () => {
            autoDressButton.innerText = lang == "en" ? "Match!" : "Combina!";
            autoDressButton.style.color = "white";
            autoDressButton.style.pointerEvents = "none";
            autoDressButton.style.backgroundColor = "green";
            let randomValue = Math.floor(Math.random() * (Math.floor(10) - Math.ceil(1)) + Math.ceil(1));
            for (let i = 0; i < randomValue; i++) {
                document.querySelectorAll(".slideshow-container")[0].querySelector(".closet-control-button").click();
                document.querySelectorAll(".slideshow-container")[1].querySelector(".closet-control-button").click();
                document.querySelectorAll(".slideshow-container")[2].querySelector(".closet-control-button").click();
            }
            setTimeout(() => {
                autoDressButton.innerText = lang == "en" ? "Dress Me" : "Vista-me";
                autoDressButton.style.removeProperty("color");
                autoDressButton.style.removeProperty("pointer-events");
                autoDressButton.style.removeProperty("background-color");
            }, 3000);
        });

        element.addEventListener("click", () => {
            environmentsOuterWindow.style.animation = "blur-transition-out 0.15s";
            setTimeout(() => {
                environmentsOuterWindow.style.animation = "blur-transition-in 0.15s";
                setTimeout(() => {
                    environmentsOuterWindow.style.removeProperty("animation");
                }, 150);
                document.querySelectorAll(".environment-preference-button").forEach(element => {
                    element.style.display = "none";
                });
                environmentsWindow.appendChild(closetWindow);
                environmentsWindow.style.display = "flex";
                environmentsReturnButton.style.removeProperty("display");
                environmentsText.innerHTML = lang == "en" ? `Smart Closet<p class='subp'>${this.environmentName}</p>` :
                    `Closet Inteligente<p class='subp'>${this.environmentName}</p>`;
            }, 150);
        });
    }

    /**
     * Handles the button event for the bedroom, creating and sorting environment preference buttons.
     */
    bedroomButtonEvent() {
        let climateControlsCreated = false;
        const sortedProducts = [];

        for (let product of bedroomProducts) {
            if (this.products.includes(product.id)) {
                let element;

                if (product.id == "addBedroomAC" || product.id == "addBedroomAirPurifier" || product.id == "addBedroomAirDiffuser" ||
                    product.id == "addBedroomDehumidifier" || product.id == "addBedroomHumidifier") {
                    if (!climateControlsCreated) {
                        product = { id: "addBedroomClimate", en: "Climate", pt: "Climatização" };
                        element = document.createElement("button");
                        element.classList.add("environment-preference-button", "bedroomFunctionality");
                        element.innerText = lang === 'en' ? product.en : product.pt;
                        sortedProducts.push(element);
                        super.climate(element);
                        climateControlsCreated = true;
                    }
                }
                else {
                    element = document.createElement("button");
                    element.classList.add("environment-preference-button", "bedroomFunctionality");
                    element.innerText = lang === 'en' ? product.en : product.pt;
                    sortedProducts.push(element); // Push elements to the array
                }

                if (product.id == "addBedroomBlinds") {
                    let count = this.productMultiples[product.id];
                    super.blinds(element, count);
                }
                else if (product.id == "addBedroomTV") {
                    let count = this.productMultiples[product.id];
                    super.TV(element);
                }
                else if (product.id == "addBedroomFireplace") {
                    super.fireplace(element);
                }
                else if (product.id == "addBedroomLights") {
                    let count = this.productMultiples[product.id];
                    super.lights(element, count);
                }
                else if (product.id == "addBedroomSmartCloset") {
                    this.smartCloset(element);
                }
                else if (product.id == "addBedroomSpeakers") {
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