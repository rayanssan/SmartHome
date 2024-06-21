"use strict";

let storesOuterWindow = document.getElementById("stores");
let storesWindow = document.getElementById("stores-selection");
let storesText = document.getElementById("stores-text");
let cart = document.getElementById("cart");

// Creating return button for stores
let storesReturnButton = document.createElement("button");
storesReturnButton.innerHTML = `<svg class="svg-icon" 
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

storesReturnButton.addEventListener("click", () => {
    storesOuterWindow.style.animation = "blur-transition-out 0.15s";
    setTimeout(() => {
        storesOuterWindow.style.animation = "blur-transition-in 0.15s";
        setTimeout(() => {
            storesOuterWindow.style.removeProperty("animation");
        }, 150);
        if (document.getElementById("grocery-product-description")) {
            document.getElementById("grocery-product-description").remove();
            document.querySelectorAll(".groceries-store-product").forEach(child => {
                if (!child.classList.contains("product-out-of-store-search-result")) {
                    child.style.removeProperty("display");
                }
            });
            Array.from(document.getElementById("stores-selection").getElementsByTagName("input")).forEach(input => {
                input.value = 1;
            })
            document.querySelector('.store-banner').style.display = "block";
        }
        else {
            Array.from(document.getElementsByClassName("store")).forEach(store => {
                store.style.removeProperty("display");
            });
            Array.from(document.getElementsByClassName("groceries-store-product")).forEach(store => {
                if (!store.classList.contains("product-out-of-store-search-result")) {
                    store.remove();
                }
            });
            document.querySelector('.store-banner').remove();
            noResultsMessage.style.display = "none";
            storesReturnButton.style.display = "none";
            storesWindow.style.removeProperty("display");
            storesText.innerText = lang == "en" ? "Stores nearby" : "Lojas próximas";
            storesText.style.removeProperty("margin-left")
            storesReturnButton.style.removeProperty("margin-top");
            document.getElementById("search-products-bar").querySelector("span").innerText = lang == "en" ? "Search Products" : "Procurar Produtos";
        }
    })
});

storesReturnButton.classList.add("return-button");
// Appending button to the website
storesOuterWindow.appendChild(storesReturnButton);
storesReturnButton.style.display = "none";

const backgrounds = [
    "url('./media/images/groceries-background-1.jpg')",
    "url('./media/images/groceries-background-2.jpg')",
    "url('./media/images/groceries-background-3.jpg')",
];

// Generate a random index to select a background image
const randomIndex = Math.floor(Math.random() * backgrounds.length);

// Apply the selected background to the container
document.body.style.setProperty("background-image", backgrounds[randomIndex]);

const stores = [
    {
        primaryKey: "store-0", name: "Artisanal Bakery Experience", logo: "url('./media/images/stores/bakery-logo.png')",
        distance: "2km", priceRange: "€€€€", products: bakeryProducts
    },
    {
        primaryKey: "store-1", name: "Lidil", logo: "url('./media/images/stores/lidil-logo.png')", distance: "4km",
        priceRange: "€", products: lidilProducts
    },
    {
        primaryKey: "store-2", name: "O Silo", logo: "url('./media/images/stores/osilo-logo.png')", distance: "5km",
        priceRange: "€€€", products: oSiloProducts
    },
    {
        primaryKey: "store-3", name: "Pingo Salgado", logo: "url('./media/images/stores/pingosalgado-logo.png')", distance: "6km",
        priceRange: "€€", products: pingoSalgadoProducts
    },
    {
        primaryKey: "store-4", name: "Pangaea", logo: "url('./media/images/stores/pangaea-logo.png')", distance: "8km",
        priceRange: "€€", products: pangaeaProducts
    },
    {
        primaryKey: "store-5", name: "Maxipreço", logo: "url('./media/images/stores/maxipreco-logo.png')", distance: "10km",
        priceRange: "€€€€€", products: maxiprecoProducts
    },
];

const searchInput = document.getElementById("search-products-input");
searchInput.focus();
const storeElements = [];

for (let store of stores) {
    const storeWrapper = document.createElement("div");
    storeWrapper.classList.add("store");
    storeWrapper.id = store.primaryKey;

    const storeElement = document.createElement("div");
    storeElement.style.setProperty("background-image", store.logo);

    const storeNameText = document.createElement("p");
    storeNameText.innerText = store.name;

    const storeDescription = document.createElement("p");
    storeDescription.classList.add("subp");
    storeDescription.innerText = `${store.distance}, ${store.priceRange}`;

    storeWrapper.appendChild(storeElement);
    storeWrapper.appendChild(storeNameText);
    storeWrapper.appendChild(storeDescription);

    storeElements.push({ storeWrapper, name: store.name.toLowerCase() });
    storesWindow.appendChild(storeWrapper);

    for (let product of store.products) {
        let productWrapper = document.createElement('div');
        productWrapper.classList.add("groceries-store-product", store.primaryKey, "product-out-of-store-search-result");
        productWrapper.innerHTML = product;
        productWrapper.querySelector(".grocery-product-info").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" 
        width="16" height="16" fill="currentColor" class="bi bi-search" style='scale: 3.5;' viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 
        1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>`
        productWrapper.querySelector(".grocery-product-info").style.fontSize = "small";
        productWrapper.style.display = "none";
        storesWindow.appendChild(productWrapper);

        productWrapper.querySelector(".grocery-product-info").addEventListener("click", () => {
            document.getElementById('search-products-input').value = '';
            document.getElementById('search-products-input').dispatchEvent(new Event('input'));
            document.getElementById(store.primaryKey).querySelector("div").click();
        });
    }

    document.getElementById(store.primaryKey).firstChild.addEventListener("click", () => {
        if (document.querySelector('.store-banner')) {
            document.querySelector('.store-banner').remove();
        }
        createProducts(store.primaryKey, store.name, store.distance, store.priceRange, store.products, store.logo);
        document.getElementById("search-products-bar").querySelector("span").innerText = lang == "en" ? `Search ${store.name} Products` :
            `Procurar Produtos de ${store.name}`;
    });
}

const noResultsMessage = document.createElement("p");
noResultsMessage.id = "no-search-results-found-message";
noResultsMessage.innerText = lang == "en" ? "No matches found for the search..." : "Nenhum resultado encontrado para a pesquisa...";
noResultsMessage.style.display = "none";
storesWindow.appendChild(noResultsMessage);

/**
 * Searches for products across the store arrays based on the search query.
 */
function search() {
    if (!document.querySelector('.search-results-text')) {
        let resultsText = document.createElement('p');
        resultsText.classList.add('search-results-text');
        resultsText.innerText = lang == "en" ? "Seach Results" : "Resultados da Pesquisa";
        storesText.prepend(resultsText);
    }
    const searchQuery = searchInput.value.trim().toLowerCase();

    // Hide all stores initially
    document.querySelectorAll(".store").forEach(store => {
        store.style.display = "none";
    });

    // Arrays of products from different stores
    const allProducts = Array.from(document.querySelectorAll(".groceries-store-product"));

    // Filter products based on the search query
    const searchResults = allProducts.filter(product => {
        const productNameElement = product.querySelector(".grocery-product-name");
        if (productNameElement) {
            const productName = productNameElement.textContent.trim().toLowerCase();
            return productName.includes(searchQuery);
        }
        return false;
    });

    // Show or hide products based on search results
    allProducts.forEach(productElement => {
        const isProductOutOfStoreSearchResult = productElement.classList.contains("product-out-of-store-search-result");

        if (!searchQuery) {
            // Show all products if no search query 
            productElement.style.display = isProductOutOfStoreSearchResult ? "none" : "flex";
            if (document.querySelector('.search-results-text')) {
                document.querySelector('.search-results-text').remove();
            }
        } else if (searchResults.includes(productElement)) {
            // Show matching search results
            productElement.style.display = "flex";
            if ((document.querySelector("label[for=search-products-input]").querySelector("span").innerText == "Search Products" ||
                document.querySelector("label[for=search-products-input]").querySelector("span").innerText == "Procurar Produtos") && isProductOutOfStoreSearchResult) {
                productElement.style.display = "flex";
            }
            else if (isProductOutOfStoreSearchResult) {
                productElement.style.display = "none";
            }
        } else {
            // Hide non-matching search results
            productElement.style.display = "none";
        }
    });

    // Show or hide stores based on search results
    if (!searchQuery) {
        if (document.querySelector("label[for=search-products-input]").querySelector("span").innerText == "Search Products" ||
            document.querySelector("label[for=search-products-input]").querySelector("span").innerText == "Procurar Produtos") {
            // Show all stores if no search query and in a store page
            document.querySelectorAll(".store").forEach(store => {
                store.style.display = "flex";
            });
        }
        if (document.querySelector('.search-results-text')) {
            document.querySelector('.search-results-text').remove();
        }
    } else if (searchResults.length > 0) {
        // Hide all stores if there are search results
        document.querySelectorAll(".store").forEach(store => {
            store.style.display = "none";
        });
    }

    // Show or hide the message based on results
    let foundResults;
    if (document.querySelector("label[for=search-products-input]").querySelector("span").innerText == "Search Products" ||
        document.querySelector("label[for=search-products-input]").querySelector("span").innerText == "Procurar Produtos") {
        foundResults = searchResults.length > 0;
    }
    else {
        foundResults = searchResults.length > 0 && !searchResults.every(productElement => productElement.style.display == 'none');
    }
    noResultsMessage.style.display = foundResults ? "none" : "flex";

    // Show stores if not in a store page and no products were found
    if ((document.querySelector("label[for=search-products-input]").querySelector("span").innerText == "Search Products" ||
        document.querySelector("label[for=search-products-input]").querySelector("span").innerText == "Procurar Produtos")) {
        if (searchQuery.startsWith("artisanal")) {
            document.getElementById("store-0").style.removeProperty("display");
            noResultsMessage.style.display = "none";
        }
        else if (searchQuery == "lidil") {
            document.getElementById("store-1").style.removeProperty("display");
            noResultsMessage.style.display = "none";
        }
        else if (searchQuery == "o silo" || searchQuery == "silo") {
            document.getElementById("store-2").style.removeProperty("display");
            noResultsMessage.style.display = "none";
        }
        else if (searchQuery.startsWith("pingo")) {
            document.getElementById("store-3").style.removeProperty("display");
            noResultsMessage.style.display = "none";
        }
        else if (searchQuery.startsWith("pangaea")) {
            document.getElementById("store-4").style.removeProperty("display");
            noResultsMessage.style.display = "none";
        }
        else if (searchQuery.startsWith("maxipreco")) {
            document.getElementById("store-5").style.removeProperty("display");
            noResultsMessage.style.display = "none";
        }
    }
}


searchInput.addEventListener("input", search);

let cartView = document.getElementById("cart-view");

let cartListWrapper = document.createElement('div');
cartListWrapper.style = "display: flex;\
flex-direction: column;\
padding-top: 15px;\
min-width: 30vw;";
cartView.appendChild(cartListWrapper);

let cartListText = document.createElement("h2");
cartListText.style = "display: flex;\
justify-content: space-between;\
gap: 20px;\
align-items: center;"
if (lang == "en") {
    cartListText.innerText = "My cart";
}
else if (lang == "pt") {
    cartListText.innerText = "Meu carrinho";
}
cartListText.innerHTML += `<button id="remove-all-cart-items-button" style="
background: red;
color: white;
" disabled>${lang == "en" ? "Remove All" : lang == "pt" ? "Remover Tudo" : null}
</button>`
cartListWrapper.appendChild(cartListText)

let cartList = document.createElement('ul');
cartList.id = "cart-list";
cartListWrapper.appendChild(cartList)

let totalPriceWrapper = document.createElement('div');
totalPriceWrapper.innerHTML = `
<p>${lang == "en" ? "Total price:" :
        lang == "pt" ? "Preço total:" : null}</p>
<p style="display:flex;">€<span id = "cart-price">0.00</span></p>
`;
Array.from(totalPriceWrapper.children).forEach(child => { child.style.color = "white" });
totalPriceWrapper.style = "display: flex; margin-bottom: 5px; justify-content: space-between;";
cartListWrapper.appendChild(totalPriceWrapper);

let creditCardForm = document.createElement('form');
creditCardForm.id = "credit-card-form"
creditCardForm.innerHTML = `
<h2 style="margin-bottom: 10px;
align-self: flex-start;">${lang == "en" ? "Card Payment" : lang == "pt" ? "Pagamento com Cartão" : null}</h2>
<div class="form-group">
    <input type="text" id="card-number" name="CardNumber" maxlength="19" placeholder=" " required>
    <label for="card-number">${lang == "en" ? 'Card number:' : lang == "pt" ? 'Número do nartão:' : null}</label>
</div>
<br>
<div class="month-input-wrapper">
    <label for="card-expiry-date" style="margin-top: 10px;
    margin-left: 10px;" for="expiryDate">${lang == "en" ? 'Expiry date (MM/YYYY):' : lang == "pt" ? 'Data de validade (MM/YYYY):' : null}</label>
    <input onfocus="this.showPicker()" style="box-shadow: unset;" type="month" id="card-expiry-date" name="ExpiryDate" placeholder=" " required>
</div>
<br>
<div class="form-group">
    <input type="text" id="card-cvv" name="CVV" placeholder=" " required>
    <label for="card-cvv">CVV</label>
</div>`;

// Add event listener to format and validate the card number input
const cardNumberInput = creditCardForm.querySelector('#card-number');
cardNumberInput.addEventListener('input', function () {
    // Remove non-numeric characters
    let cardNumber = this.value.replace(/\D/g, '');

    // Add hyphen bars for better formatting
    if (cardNumber.length > 4) {
        cardNumber = cardNumber.match(/.{1,4}/g).join('-');
    }

    // Limit to 16 characters
    cardNumber = cardNumber.slice(0, 19);

    this.value = cardNumber;
});

// Set the minimum allowed date for the expiry date input
const expiryDateInput = creditCardForm.querySelector('#card-expiry-date');
let cardMonth;
String(new Date().getMonth()).length == 1 ?
    cardMonth = String(new Date().getMonth() + 1).padStart(2, "0") : cardMonth = String(new Date().getMonth() + 1);
expiryDateInput.setAttribute('min', `${new Date().getFullYear()}-${cardMonth}`);
expiryDateInput.setAttribute('max', `${new Date().getFullYear() + 30}-${cardMonth}`);

// Add event listener to format the CVV and validate input
const cvvInput = creditCardForm.querySelector('#card-cvv');
cvvInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, ''); // Remove non-numeric characters
    // Maximum amount of digits is 4
    if (this.value.length > 4) {
        this.value = this.value.slice(0, 4);
    }
});

cardNumberInput.addEventListener("input", function () {
    if (this.value.length >= 18 && expiryDateInput.value != '' && cvvInput.value.length >= 3) {
        document.getElementById("payment-button").disabled = false;
    }
    else {
        document.getElementById("payment-button").disabled = true;
    }
})

expiryDateInput.addEventListener("input", function () {
    if (this.value != '') {
        this.parentNode.querySelector("label").style.color = "navy";
        if (cardNumberInput.value.length >= 18 && cvvInput.value.length >= 3) {
            document.getElementById("payment-button").disabled = false;
        }
        else {
            document.getElementById("payment-button").disabled = true;
        }
    }
    else {
        document.getElementById("payment-button").disabled = true;
        this.parentNode.querySelector("label").style.removeProperty("color");
    }
});

cvvInput.addEventListener("input", function () {
    if (cardNumberInput.value.length >= 18 && expiryDateInput.value != '' && this.value.length >= 3) {
        document.getElementById("payment-button").disabled = false;
    }
    else {
        document.getElementById("payment-button").disabled = true;
    }
});

let cashPaymentMessage = document.createElement('p');
cashPaymentMessage.id = "cash-payment-message";
cashPaymentMessage.style = "color: white;\
margin-top: 10px;\
margin-bottom: 15px;\
max-width: 240px;\
text-align: center;";
cashPaymentMessage.innerText = lang == "en" ? "You must pay for this purchase on arrival." :
    "Deverás pagar por esta compra quando for entregue.";

let paymentMethodChoice = document.createElement('div');
paymentMethodChoice.id = 'payment-method-choice';
paymentMethodChoice.innerHTML = `
<h2>${lang == "en" ? "Payment Method" : "Modo de Pagamento"}</h2>
<button id="card-method-choice-button">${lang == "en" ? "Card" : "Cartão"}</button>
<button id="cash-method-choice-button">${lang == "en" ? "Cash" : "Dinheiro"}</button>
<button form="credit-card-form" id="payment-button" disabled>${lang == "en" ?
        `Pay €<span id="payment-button-price">${document.getElementById("cart-price").innerText}</span>` :
        lang == "pt" ? `Pagar €<span id="payment-button-price">${document.getElementById("cart-price").innerText}</span>` : null}</button>`;
cartView.appendChild(paymentMethodChoice);

function handlePaymentMethodSelection(buttonId, displayCreditCard, displayCashMessage, formNoValidate) {
    paymentMethodChoice.querySelectorAll("button").forEach(button => {
        button.style.removeProperty("outline");
        button.style.removeProperty("color");
    });

    const selectedButton = paymentMethodChoice.querySelector(`#${buttonId}`);
    selectedButton.style.outline = "green 3px solid";
    selectedButton.style.color = "green";

    creditCardForm.style.display = displayCreditCard ? "flex" : "none";
    cashPaymentMessage.style.display = displayCashMessage ? "flex" : "none";

    displayCreditCard ? document.getElementById("payment-button").disabled = true : document.getElementById("payment-button").disabled = false;
    document.getElementById("payment-button").formNoValidate = formNoValidate;
}

paymentMethodChoice.querySelector("#card-method-choice-button").addEventListener("click", () => {
    handlePaymentMethodSelection("card-method-choice-button", true, false, false);
});

paymentMethodChoice.querySelector("#cash-method-choice-button").addEventListener("click", () => {
    handlePaymentMethodSelection("cash-method-choice-button", false, true, true);
});
paymentMethodChoice.insertBefore(cashPaymentMessage, document.getElementById("payment-button"));
paymentMethodChoice.insertBefore(creditCardForm, document.getElementById("payment-button"));

paymentMethodChoice.querySelector("#card-method-choice-button").click();

cart.addEventListener("click", (event) => {
    event.stopPropagation();
    if (document.getElementById("user").style.outlineColor == "green") {
        document.getElementById("user").click();
    }
    if (document.getElementById("settings").style.outlineColor == "green") {
        document.getElementById("settings").click();
    }
    toggleCartView();
});

// Event listener for the body to hide the cart view when clicked outside
document.body.addEventListener("click", (event) => {
    const isCartClick = event.target === cart || cart.contains(event.target);
    const isCartViewClick = event.target === cartView || cartView.contains(event.target);

    // Check if the clicked element is a child of the cart view
    const isChildOfCartView = cartView.contains(event.target);

    if (!isCartClick && !isCartViewClick && !isChildOfCartView) {
        hideCartView();
    }
});

cartView.addEventListener("click", (event) => {
    event.stopPropagation();
});

function toggleCartView() {
    if (cartView.style.display === "flex") {
        hideCartView();
    } else {
        showCartView();
    }
}

function hideCartView() {
    cartView.style.removeProperty("display");
    cart.style.removeProperty("outline");
}

function showCartView() {
    cartView.style.display = "flex";
    cart.style.outline = "2px solid green";
}

cartList.innerHTML = `<p>${lang == "en" ? "Nothing in the cart yet..." : lang == "pt" ? "Nada no carrinho ainda..." : none}</p>`;

creditCardForm.addEventListener("submit", (event) => {
    event.preventDefault();
    cartView.style.width = "fit-content";
    cartView.style.color = "white";
    showConfirmationDialog(
        lang == "en" ? `Are you sure you want to make this purchase for €${document.getElementById("cart-price").innerText}?` : lang == "pt" ?
            `Tem certeza que quer pagar esta compra no valor de €${document.getElementById("cart-price").innerText}?` : null,
        lang == "en" ? "Yes" : lang == "pt" ? "Sim" : null,
        lang == "en" ? "No" : lang == "pt" ? "Não" : null,
        "positive",
        "groceries",
        cartView,
        `${lang == "en" ? "Payment Confirmed" : lang == "pt" ? "Pagamento Confirmado" : null}<p class='subp' style="font-size: 16px;">${lang == "en" ? "Your order is on its way!" :
            lang == "pt" ? "Sua compra está a caminho!" : null
        }<br>${lang == "en" ? "Order number:" : lang == "pt" ? "Número da compra:" : null} ${Math.random().toString().slice(2, 8)}</p>`,
        () => {
            cartView.style.removeProperty("width");
            cartView.style.removeProperty("color");
            cartList.innerHTML = `<p>${lang == "en" ? "Nothing in the cart yet..." : lang == "pt" ? "Nada no carrinho ainda..." : none}</p>`;
            document.getElementById("cart-price").innerText = "0.00";
            document.getElementById("cart-count").innerText = 0;
            document.getElementById("remove-all-cart-items-button").disabled = true;
        }
    )
});

function createProducts(primaryKey, storeName, distance, priceRange, productsArray, logo) {
    storesOuterWindow.style.animation = "blur-transition-out 0.15s";
    setTimeout(() => {
        storesOuterWindow.style.animation = "blur-transition-in 0.15s";
        setTimeout(() => {
            storesOuterWindow.style.removeProperty("animation");
        }, 150);
        Array.from(document.getElementsByClassName("store")).forEach(store => {
            store.style.display = "none";
        });
        storesText.innerHTML = `${storeName} <p class='subp'>${distance} ${lang == "en" ? "away, pricing" : lang == "pt" ?
            "de distância, preços" : null}: ${priceRange}</p>`;
        for (let product of productsArray) {
            let productWrapper = document.createElement('div');
            productWrapper.classList.add("groceries-store-product", primaryKey);
            productWrapper.innerHTML = product;

            productWrapper.innerHTML += `<div>
            <div class="number-input">
                <input type="number" min="1" max="100" value="1">
                    <div class="number-input-button-wrapper">
                        <button class="plus-button" onclick="this.parentNode.parentNode.querySelector('input[type=number]').stepUp()">+</button>
                        <button class="minus-button" onclick="this.parentNode.parentNode.querySelector('input[type=number]').stepDown()">-</button>
                    </div>
            </div>
            <button>${lang == "en" ? "Add to cart" : lang == "pt" ? "Adicionar ao carrinho" : null}</button></div>`;

            let cartItem = document.createElement('div');
            let cartCount = document.getElementById("cart-count");
            cartItem.classList.add("cart-item");
            let productCount = 0;

            creditCardForm.addEventListener("submit", () => {
                const confirmationButtonHandler = () => {
                    productCount = 0;
                };
                const confirmationButton = () => {
                    if (document.querySelector(".confirmation-box")) {
                        document.querySelector(".confirmation-box").querySelector("button").addEventListener("click", confirmationButtonHandler, { once: true });
                    }
                };
                // wait for the confirmation box
                const observer = new MutationObserver(() => {
                    confirmationButton();
                    observer.disconnect();
                });
                observer.observe(document.body, { childList: true, subtree: true });
            });

            productWrapper.querySelector(".number-input").addEventListener("input", (event) => {
                if (isNaN(event.target.value)) {
                    event.target.value = 1;
                }
                else if (event.target.value.length > 3) {
                    event.target.value = event.target.value.slice(0, 3); // Truncate the input to the first 3 characters
                }
            });

            productWrapper.querySelector(".number-input").addEventListener("focusout", (event) => {
                // Restrict input value to between 1 and 100
                if (event.target.value < 1) {
                    // If it is, set the value to 1
                    event.target.value = 1;
                }
                else if (event.target.value > 100) {
                    event.target.value = 100;
                }
                else {
                    event.target.value = parseInt(event.target.value);
                }
            });

            productWrapper.getElementsByTagName('button')[productWrapper.getElementsByTagName('button').length - 1].addEventListener("click", () => {
                let previousButtonText = productWrapper.getElementsByTagName('button')[productWrapper.getElementsByTagName('button').length - 1].innerText;
                let previousWidth = productWrapper.getElementsByTagName('button')[productWrapper.getElementsByTagName('button').length - 1].offsetWidth + 'px';
                productWrapper.getElementsByTagName('button')[productWrapper.getElementsByTagName('button').length - 1].innerText = lang == "en" ? "Added!" :
                "Adicionado!";
                productWrapper.getElementsByTagName('button')[productWrapper.getElementsByTagName('button').length - 1].style.backgroundImage =
                "linear-gradient(230deg, #d63784, #701616)";
                productWrapper.getElementsByTagName('button')[productWrapper.getElementsByTagName('button').length - 1].style.width = previousWidth;
                productWrapper.getElementsByTagName('button')[productWrapper.getElementsByTagName('button').length - 1].style.pointerEvents = "none";
                setTimeout(() => {
                    productWrapper.getElementsByTagName('button')[productWrapper.getElementsByTagName('button').length - 1].style.removeProperty('width');
                    productWrapper.getElementsByTagName('button')[productWrapper.getElementsByTagName('button').length - 1].style.removeProperty('pointer-events');
                    productWrapper.getElementsByTagName('button')[productWrapper.getElementsByTagName('button').length - 1].style.backgroundImage = "none";
                    productWrapper.getElementsByTagName('button')[productWrapper.getElementsByTagName('button').length - 1].innerText = previousButtonText;
                }, 1000)

                if (cartList.innerText == "Nothing in the cart yet..." || cartList.innerText == "Nada no carrinho ainda...") {
                    cartList.innerHTML = "";
                }
                document.getElementById("remove-all-cart-items-button").disabled = false;
                paymentMethodChoice.style.display = "flex";

                productCount = productCount + parseInt(productWrapper.getElementsByTagName('input')[0].value);
                cartItem.innerHTML = `<div>
                    <p>${productWrapper.querySelector('.grocery-product-name').innerText.trim().replace(/i\b/g, '')}</p>\
                    <p class="subp">${productWrapper.getElementsByTagName('p')[1].innerText}</p>
                </div>
                <p>
                    <button class="minus-button">-</button>
                    <input type="number" class="cart-item-count" value="${productCount}" min="1" max="100">
                    <button class="plus-button">+</button>
                    <button class="delete-cart-item-button">x</button>
                </p>`;
                cartList.appendChild(cartItem);
                cartCount.innerText = parseInt(cartCount.innerText) + parseInt(productWrapper.querySelector('input').value);

                cartItem.querySelector(".plus-button").addEventListener("click", () => {
                    cartItem.querySelector(".cart-item-count").stepUp();
                    var focusoutEvent = new Event('focusout', {
                        bubbles: false,
                        cancelable: false
                    });
                    cartItem.querySelector(".cart-item-count").dispatchEvent(focusoutEvent);
                });

                cartItem.querySelector(".minus-button").addEventListener("click", () => {
                    cartItem.querySelector(".cart-item-count").stepDown();
                    var focusoutEvent = new Event('focusout', {
                        bubbles: false,
                        cancelable: false,
                    });
                    cartItem.querySelector(".cart-item-count").dispatchEvent(focusoutEvent);
                });

                let cartPriceElement = document.getElementById("cart-price");
                let paymentButtonPriceElement = document.getElementById("payment-button-price");
                let productPriceElement = productWrapper.getElementsByClassName('price')[0];

                let cartPrice = parseFloat(cartPriceElement.innerText) + parseFloat(productPriceElement.innerText)
                    * parseInt(productWrapper.getElementsByTagName('input')[0].value);
                cartPriceElement.innerText = cartPrice.toFixed(2);

                paymentButtonPriceElement.innerText = cartPriceElement.innerText;

                // Change amount of items with number input
                cartItem.querySelector(".cart-item-count").addEventListener("input", (event) => {
                    if (isNaN(event.target.value)) {
                        event.target.value = 1;
                    }
                    else if (event.target.value.length > 3) {
                        event.target.value = event.target.value.slice(0, 3); // Truncate the input to the first 3 characters
                    }
                });
                cartItem.querySelector(".cart-item-count").addEventListener("focusout", (event) => {

                    // Restrict input value to between 1 and 100
                    if (event.target.value < 1 || isNaN(event.target.value)) {
                        // If it is, set the value to 1
                        event.target.value = 1;
                    }
                    else if (event.target.value > 100) {
                        event.target.value = 100;
                    }
                    else {
                        event.target.value = parseInt(event.target.value);
                    }

                    const newCount = parseInt(event.target.value);
                    const productPrice = parseFloat(productPriceElement.innerText);

                    // Calculate the difference between the new and previous counts
                    const countDifference = newCount - productCount;

                    // Update the cart price and count based on the count difference
                    const newCartPrice = parseFloat(cartPriceElement.innerText) + productPrice * countDifference;
                    cartPriceElement.innerText = newCartPrice.toFixed(2);
                    cartCount.innerText = parseInt(cartCount.innerText) + countDifference;

                    // Update the total payment button price
                    paymentButtonPriceElement.innerText = cartPriceElement.innerText;

                    // Update the previous count for the next input change
                    productCount = newCount;
                });

                cartItem.querySelector(".delete-cart-item-button").addEventListener("click", () => {
                    const productCountToRemove = parseFloat(cartItem.querySelector(".cart-item-count").value);
                    const productPriceToRemove = parseFloat(productPriceElement.innerText);
                    productCount = productCount - productCountToRemove;
                    if ((parseFloat(cartPriceElement.innerText) - productPriceToRemove *
                        parseFloat(cartItem.querySelector(".cart-item-count").value)).toFixed(2) == "-0.00" ||
                        parseFloat(cartPriceElement.innerText) - productPriceToRemove * parseFloat(cartItem.querySelector(".cart-item-count").value) < 0) {
                        paymentButtonPriceElement.innerText = cartPriceElement.innerText = "0.00"
                    }
                    else {
                        paymentButtonPriceElement.innerText = cartPriceElement.innerText =
                            (parseFloat(cartPriceElement.innerText) - productPriceToRemove *
                                parseFloat(cartItem.querySelector(".cart-item-count").value)).toFixed(2);
                    }

                    cartCount.innerText = parseInt(cartCount.innerText) - productCountToRemove;

                    cartItem.remove();

                    if (cartList.children.length == 0) {
                        cartList.innerHTML = lang == "en" ? "<p>Nothing in the cart yet...</p>" : lang == "pt" ? "<p>Nada no carrinho ainda...</p>" : null;
                        paymentMethodChoice.style.display = "none";
                        document.getElementById("remove-all-cart-items-button").disabled = true;
                    }
                });
            }
            );

            // Show product descriptions when clicking the info button
            productWrapper.querySelector(".grocery-product-info").addEventListener("click", function () {

                Array.from(storesWindow.children).forEach(child => {
                    child.style.display = "none";
                })

                let description = document.createElement('div');
                description.id = "grocery-product-description-wrapper";
                description.innerHTML = `
                        <p id="grocery-product-description"></p>`;
                storesOuterWindow.appendChild(description)

                let descriptionCartButton = document.createElement('span');
                descriptionCartButton.style = "display: flex;\
                flex-direction: row;\
                align-items: stretch;";
                descriptionCartButton.innerHTML = `
                <span class="number-input">
                    <input type="number" min="1" max="100" value="1">
                    <span class="number-input-button-wrapper">
                        <button class="plus-button" onclick="this.parentNode.parentNode.querySelector('input[type=number]').stepUp()">+</button>
                        <button class="minus-button" onclick="this.parentNode.parentNode.querySelector('input[type=number]').stepDown()">-</button>
                    </span>
                </span>
                <button class="description-add-to-cart-button" style="background-color: green; color: white; margin-top: 0; margin-bottom: 0;">
                    ${lang == "en" ? "Add to cart" : lang == "pt" ? "Adicionar ao carrinho" : null}
                </button>`;

                document.getElementById("grocery-product-description").innerHTML = productWrapper.querySelector(".hidden-grocery-product-description").innerHTML;

                let lastBrElement = document.getElementById("grocery-product-description").querySelectorAll("br:last-child");
                lastBrElement[lastBrElement.length - 1].insertAdjacentElement('afterend', descriptionCartButton);

                document.getElementById("grocery-product-description").
                    querySelector('.description-add-to-cart-button').addEventListener("click", () => {
                        productWrapper.querySelector('input').value = document.getElementById("grocery-product-description").querySelector('input').value;
                        productWrapper.getElementsByTagName('button')[productWrapper.getElementsByTagName('button').length - 1].click()
                    });

                document.getElementById("grocery-product-description").getElementsByTagName('input')[0].addEventListener("input", (event) => {
                    if (isNaN(event.target.value)) {
                        event.target.value = 1;
                    }
                    else if (event.target.value.length > 3) {
                        event.target.value = event.target.value.slice(0, 3); // Truncate the input to the first 3 characters
                    }
                });
                document.getElementById("grocery-product-description").getElementsByTagName('input')[0].addEventListener("focusout", (event) => {
                    // Restrict input value to between 1 and 100
                    if (event.target.value < 1) {
                        // If it is, set the value to 1
                        event.target.value = 1;
                    }
                    else if (event.target.value > 100) {
                        event.target.value = 100;
                    }
                    else {
                        event.target.value = parseInt(event.target.value);
                    }
                });
            });

            storesWindow.appendChild(productWrapper);
        }

        let storeBanner = document.createElement("div");

        storeBanner.innerHTML = `<img src=${logo.replace('logo', 'banner').replace('url(', "").replace(')', "")}>`;

        storeBanner.appendChild(document.createElement("hr"));

        storeBanner.appendChild(Object.assign(document.createElement("p"), {
            innerHTML: lang == "en" ? "Products <select style='margin-left: 0;'>\
            <option selected disabled>Filter</option>\
            <option value='ne' selected>Newest First</option>\
            <option value='leme'>Cheapest to Most Expensive</option>\
            <option value='mele'>Most Expensive to Cheapest</option>\
            <option value='ao'>Alphabetical Order</option>\
            </select>" :
                "Produtos <select style='margin-left: 0;'>\
            <option selected disabled>Filtrar</option>\
            <option value='ne' selected>Mais novos primeiro</option>\
            <option value='leme'>Mais Barato para o Mais Caro</option>\
            <option value='mele'>Mais Caro para o Mais Barato</option>\
            <option value='ao'>Ordem Alfabética</option>\
        </select>" }, {
            style: "height: fit-content;\
            width: 100%;\
            font-size: larger;\
            margin-bottom: 10px;\
            display: flex;\
            flex-wrap: wrap;\
            align-items: center;\
            justify-content: space-between;"}));

        // Convert NodeList to an array
        const storeProductsDefOrder = Array.from(document.querySelectorAll('.groceries-store-product'));
        let storeProducts = Array.from(document.querySelectorAll('.groceries-store-product'));

        // Add an event listener to the dynamically created <select> element
        const filterSelect = storeBanner.querySelector("select");
        filterSelect.addEventListener("change", filterItemsByOption);

        function filterItemsByOption() {
            const selectedOption = filterSelect.value;

            storeProducts.forEach(productElement => {
                productElement.remove();
            });

            switch (selectedOption) {
                case 'ne': // Newest First
                    storeProducts = storeProducts.sort((a, b) => {
                        const indexA = storeProductsDefOrder.indexOf(a);
                        const indexB = storeProductsDefOrder.indexOf(b);
                        return indexA - indexB;
                    });
                    break
                case "leme": // Least Expensive to Most Expensive
                    storeProducts.sort((a, b) => parseFloat(a.querySelector('.price').textContent) - parseFloat(b.querySelector('.price').textContent));
                    break;
                case "mele": // Most Expensive to Least Expensive
                    storeProducts.sort((a, b) => parseFloat(b.querySelector('.price').textContent) - parseFloat(a.querySelector('.price').textContent));
                    break;
                case "ao": // Alphabetical Order
                    storeProducts.sort((a, b) => {
                        const nameA = a.querySelector('.grocery-product-name').textContent.trim();
                        const nameB = b.querySelector('.grocery-product-name').textContent.trim();
                        return nameA.localeCompare(nameB);
                    });
                    break;
            }

            // Show only the filtered products
            storeProducts.forEach(productElement => {
                storesWindow.appendChild(productElement)
            });

        }
        storeBanner.classList.add('store-banner');
        storesWindow.prepend(storeBanner);

        storesReturnButton.style.removeProperty("display");
        storesWindow.style.display = "flex";
        storesText.style.marginLeft = "42px";
        storesReturnButton.style.marginTop = "7px";
    }, 150);
}

document.getElementById("remove-all-cart-items-button").addEventListener("click", () => {
    showConfirmationDialog(
        lang == "en" ? "Are you sure you want to remove all items from the cart?" :
            lang == "pt" ? "Tem certeza que quer remover todos os items do carrinho?" : null,
        lang == "en" ? "Yes" : lang == "pt" ? "Sim" : null,
        lang == "en" ? "No" : lang == "pt" ? "Não" : null,
        "negative",
        "groceries",
        cartView,
        null,
        () => {
            document.querySelectorAll(".delete-cart-item-button").forEach(button => { button.click() });
            document.getElementById("remove-all-cart-items-button").disabled = true;
            for (let child of Array.from(cartView.children)) {
                child.style.display = "flex";
            }

            paymentMethodChoice.style.display = "none";
            document.getElementById("remove-all-cart-items-button").disabled = true;
        }
    );
});