"use strict"

/**
 * Generates an HTML structure of a grocery product.
 *
 * @param {String} image - The URL of the product image.
 * @param {String} nameEn - The product name in English.
 * @param {String} namePt - The product name in Portuguese.
 * @param {String} descriptionEn - The product description in English.
 * @param {String} descriptionPt - The product description in Portuguese.
 * @param {String} price - The price of the product.
 * @param {Number} units - The number of units in the product.
 * @returns {String} - HTML representation of the product.
 */
function product(image, nameEn, namePt, descriptionEn, descriptionPt, price, units) {
    return `<img src="${image}">
    <p>
        <span class="grocery-product-name">
            ${lang == "en" ? nameEn : lang == "pt" ? namePt : null}
            <button class="grocery-product-info">i</button>
        </span>
        <span class="hidden-grocery-product-description">
        <img src="${image}">
            <span>
                ${lang == "en" ? descriptionEn : lang == "pt" ? descriptionPt : null}
                <br>
                <br>
            </span>
        </span>
    </p>
    <p>€<span class="price">${price}</span> ${units > 1 ? `/ ${units} units` : "unit"}</p>`;
}

const bakeryProducts = [
    product("./media/images/stores/bakery/chocolate-chip-cookies.png",
        "Chocolate Chip Cookies",
        "Cookies de Chocolate",
        "Indulge in the deliciousness of our Chocolate Chip Cookies made with premium, organic, and vegan ingredients.\
    <br>\
    <br>\
    Ingredients: Almond Flour, Light Brown Sugar, \
    Vegan Chocolate Chips, Vegan Butter, \
    Vanilla Extract, Almond Milk, Salt, Baking Soda\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €0.80 per unit (Sale!)",
        "Delicie-se com a deliciosidade dos nossos Cookies de Chocolate feitos com ingredientes premium, orgânicos e veganos.\
    <br>\
    <br>\
    Ingredientes: Farinha de Amêndoa, Açúcar Mascavo Claro, \
    Lascas de Chocolate Vegano, Manteiga Vegana, \
    Extrato de Baunilha, Leite de Amêndoa, Sal, Bicarbonato de sódio\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €0.80 por unidade (Promoção!)", "0.80", 1),

    product("./media/images/stores/bakery/sorted-bagels.png",
        "Sorted Bagels",
        "Bagels Sortidos",
        "Sorted Bagels are a delightful assortment of bagels made with high-quality ingredients.\
    <br>\
    <br>\
    Ingredients: Almond Flour, Water, Yeast, Salt, Assorted Toppings\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €4.40 per unit",
        "Bagels Sortidos são uma variedade encantadora de bagels feitos com ingredientes de alta qualidade.\
    <br>\
    <br>\
    Ingredientes: Farinha de amêndoa, Água, Fermento, Sal, Coberturas sortidas\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €4.40 por unidade", "4.40", 4),

    product("./media/images/stores/bakery/red-velvet-cake.png",
        "Red Velvet Cake",
        "Bolo Red Velvet",
        "Indulge in the rich and velvety goodness of our Red Velvet Cake. Perfect for celebrations and special occasions.\
    <br>\
    <br>\
    Ingredients: Gluten-Free Wheat Flour, Straberry Coloring, Organic Sugar, Vegan Cream Cheese Frosting, Cocoa Powder, Vegan Butter, Salt\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €45 per unit",
        "Delicie-se com a riqueza e suavidade do nosso Bolo Red Velvet. Perfeito para celebrações e ocasiões especiais.\
    <br>\
    <br>\
    Ingredientes: Farinha de trigo sem glúten, Corante de morango, Açúcar orgânico, Cobertura de cream cheese, Cacau em pó, Manteiga begana, Sal\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €45 por unidade", "45", 1),

    product("./media/images/stores/bakery/cherry-pie.png",
        "Cherry Pie",
        "Tarte de Cereja",
        "Enjoy the sweet and tart flavors of our Cherry Pie. Made with freshly picked cherries and a flaky crust.\
    <br>\
    <br>\
    Ingredients: Fresh Cherries, Organic Sugar, Gluten-Free Wheat Flour, Vegan Butter, Salt\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €47 per unit",
        "Delicie-se com os sabores doces e azedos da nossa Tarte de Cereja. Feita com cerejas frescas e uma crosta crocante.\
    <br>\
    <br>\
    Ingredientes: Cerejas Frescas, Açúcar orgânico, Farinha de trigo sem glúten, Manteiga Vegana, Sal\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €47 por unidade", "47", 1),

    product("./media/images/stores/bakery/croissants.png",
        "Croissants",
        "Croissants",
        "Savor the flaky layers of our freshly baked Croissants. Perfect for breakfast or as a delightful snack.\
    <br>\
    <br>\
    Ingredients: Gluten-Free Wheat Flour, Vegan Butter, Soy Milk, Organic Sugar, Salt, Yeast\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €2 per unit",
        "Aprecie as camadas crocantes dos nossos Croissants recém-assados. Perfeito para o café da manhã ou como um lanche delicioso.\
    <br>\
    <br>\
    Ingredientes: Farinha de trigo sem glúten, Manteiga Vegana, Leite de Soja, Açúcar orgânico, Sal, Fermento\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €2 por unidade", "2", 1),

    product("./media/images/stores/bakery/apple-pie.png",
        "Apple Pie",
        "Tarte de Maçã",
        "Indulge in the wholesome goodness of our Apple Pie made with organic and vegan ingredients.\
    <br>\
    <br>\
    Ingredients: Organic Apples, Organic Flour, Vegan Butter, Cane Sugar, Cinnamon, Salt\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €47 per unit",
        "Delicie-se com a bondade saudável da nossa Tarte de Maçã feita com ingredientes orgânicos e veganos.\
    <br>\
    <br>\
    Ingredientes: Maçãs Orgânicas, Farinha Orgânica, Manteiga Vegana, Açúcar de Cana, Canela, Sal\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €47 por unidade", "47", 1),

    product("./media/images/stores/bakery/vanilla-cake.png",
        "Vanilla Cake",
        "Bolo de Baunilha",
        "Savor the sweetness of our Vanilla Cake, crafted with care using organic and vegan ingredients.\
    <br>\
    <br>\
    Ingredients: Organic Flour, Vegan Butter, Almond Milk, Cane Sugar, Vanilla Extract, Baking Powder\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €29.99 per unit",
        "Aprecie a doçura do nosso Bolo de Baunilha, feito com cuidado usando ingredientes orgânicos e veganos.\
    <br>\
    <br>\
    Ingredientes: Farinha Orgânica, Manteiga Vegana, Leite de Amêndoa, Açúcar de Cana, Extrato de Baunilha, Fermento em Pó\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €29.99 por unidade", "29.99", 1),

    product("./media/images/stores/bakery/garlic-bread.png",
        "Garlic Bread",
        "Pão de Alho",
        "Savor the aromatic delight of our Garlic Bread, made with organic and vegan ingredients.\
    <br>\
    <br>\
    Ingredients: Organic Wheat Bread, Vegan Garlic Butter, Fresh Garlic, Parsley, Olive Oil, Sea Salt\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €2 per unit",
        "Aprecie a delícia aromática do nosso Pão de Alho, feito com ingredientes orgânicos e veganos.\
    <br>\
    <br>\
    Ingredientes: Pão de Trigo Orgânico, Manteiga de Alho Vegana, Alho Fresco, Salsinha, Azeite de Oliva, Sal Marinho\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €2 por unidade", "2", 1),

    product("./media/images/stores/bakery/the-cake-is-a-lie.png",
        "Chocolate Cake",
        "Bolo de Chocolate",
        "Indulge in the rich and decadent flavor of our Chocolate Cake, made with premium organic cocoa and vegan ingredients.\
    <br>\
    <br>\
    Ingredients: Organic Flour, Organic Sugar, Vegan Chocolate, Almond Milk, Organic Cocoa Powder, Baking Powder\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €33.99 per unit",
        "Delicie-se com o sabor rico e decadente do nosso Bolo de Chocolate, feito com cacau orgânico premium e ingredientes veganos.\
    <br>\
    <br>\
    Ingredientes: Farinha Orgânica, Açúcar Orgânico, Chocolate Vegano, Leite de Amêndoa, Cacau em Pó Orgânico, Fermento em Pó\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €33.99 por unidade", "33.99", 1),

    product("./media/images/stores/bakery/rustic-baguette.png",
        "Rustic Baguette",
        "Baguete Rústica",
        "Savor the crusty exterior and soft interior of our Rustic Baguette, made with organic and vegan ingredients.\
    <br>\
    <br>\
    Ingredients: Organic Flour, Water, Yeast, Salt\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €1.50 per unit",
        "Aprecie a crosta crocante e o interior macio da nossa Baguete Rústica, feita com ingredientes orgânicos e veganos.\
    <br>\
    <br>\
    Ingredientes: Farinha Orgânica, Água, Fermento, Sal\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €1.50 por unidade", "1.50", 1),

    product("./media/images/stores/bakery/oat-cookies.png",
        "Oat Cookies",
        "Cookies de Aveia",
        "Enjoy the wholesome goodness of our Oat Cookies, made with organic oats and vegan-friendly ingredients.\
    <br>\
    <br>\
    Ingredients: Organic Rolled Oats, Organic Flour, Vegan Butter, Cane Sugar, Vanilla Extract, Baking Soda, Salt\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €1.00 per unit",
        "Delicie-se com a bondade saudável dos nossos Cookies de Aveia, feitos com aveia orgânica e ingredientes veganos.\
    <br>\
    <br>\
    Ingredientes: Aveia Orgânica em Flocos, Farinha Orgânica, Manteiga Vegana, Açúcar de Cana, Extrato de Baunilha, Bicarbonato de Sódio, Sal\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €1.00 por unidade", "1.00", 1),

    product("./media/images/stores/bakery/carrot-cake.png",
        "Carrot Cake",
        "Bolo de Cenoura",
        "Indulge in the delightful flavor of our Carrot Cake, made with organic carrots and vegan ingredients.\
    <br>\
    <br>\
    Ingredients: Organic Carrots, Organic Flour, Vegan Butter, Cane Sugar, Walnuts, Cinnamon, Baking Powder\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €35 per unit",
        "Delicie-se com o sabor delicioso do nosso Bolo de Cenoura, feito com cenouras orgânicas e ingredientes veganos.\
    <br>\
    <br>\
    Ingredientes: Cenouras Orgânicas, Farinha Orgânica, Manteiga Vegana, Açúcar de Cana, Nozes, Canela, Fermento em Pó\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €35 por unidade", "35", 1),

    product("./media/images/stores/bakery/pao-de-queijo.png",
        "Brazilian Cheese Bread",
        "Pão de Queijo",
        "Experience the authentic taste of our Brazilian Cheese Bread, made with organic tapioca flour and vegan cheese.\
    <br>\
    <br>\
    Ingredients: Organic Tapioca Flour, Vegan Cheese, Olive Oil, Water\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €7.80 per unit",
        "Experimente o sabor autêntico do nosso Pão de Queijo, feito com farinha de tapioca orgânica e queijo vegano.\
    <br>\
    <br>\
    Ingredientes: Farinha de Tapioca Orgânica, Queijo Vegano, Azeite de Oliva, Água\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €7.80 por unidade", "7.80", 5),

    product("./media/images/stores/bakery/fruit-cake.png",
        "Fruit Cake",
        "Bolo de Frutas",
        "Delight in the medley of flavors with our Fruit Cake, crafted with a variety of organic fruits and vegan ingredients.\
    <br>\
    <br>\
    Ingredients: Organic Mixed Fruits, Organic Flour, Vegan Butter, Cane Sugar, Almonds, Baking Powder\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €50 per unit",
        "Delicie-se com a mistura de sabores do nosso Bolo de Frutas, feito com uma variedade de frutas orgânicas e ingredientes veganos.\
    <br>\
    <br>\
    Ingredientes: Frutas Orgânicas Variadas, Farinha Orgânica, Manteiga Vegana, Açúcar de Cana, Amêndoas, Fermento em Pó\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €50 por unidade", "50", 1),

    product("./media/images/stores/bakery/sourdough-bread.png",
        "Sourdough Bread",
        "Pão de Massa Fermentada",
        "Savor the traditional taste of our Sourdough Bread, made with organic sourdough starter and high-quality flour.\
    <br>\
    <br>\
    Ingredients: Organic Sourdough Starter, Organic Flour, Water, Salt\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €7 per unit",
        "Aprecie o sabor tradicional do nosso Pão de Massa Fermentada, feito com fermento natural orgânico e farinha de alta qualidade.\
    <br>\
    <br>\
    Ingredientes: Fermento Natural Orgânico, Farinha Orgânica, Água, Sal\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €7 por unidade", "7", 1),

    product("./media/images/stores/bakery/toasted-bread.png",
        "Toasts",
        "Tostas",
        "Enjoy the crispiness of our Toasts, made with organic bread and vegan-friendly toppings. Perfect for any occasion.\
    <br>\
    <br>\
    Ingredients: Organic Bread, Olive Oil, Sea Salt\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €1.30 per unit",
        "Aprecie a crocância das nossas Tostas, feitas com pão orgânico e coberturas amigáveis ao veganismo. Perfeitas para qualquer ocasião.\
    <br>\
    <br>\
    Ingredientes: Pão Orgânico, Azeite de Oliva, Sal Marinho\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €1.30 por unidade", "1.30", 5),

    product("./media/images/stores/bakery/vanilla-donuts.png",
        "Vanilla Donuts",
        "Donuts de Baunilha",
        "Indulge in the classic flavor of our Vanilla Donuts, made with organic ingredients and a touch of sweetness.\
    <br>\
    <br>\
    Ingredients: Organic Flour, Almond Milk, Vegan Sugar, Vanilla Extract, Baking Powder, Salt\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €4 per unit",
        "Delicie-se com o sabor clássico dos nossos Donuts de Baunilha, feitos com ingredientes orgânicos e um toque de doçura.\
    <br>\
    <br>\
    Ingredientes: Farinha Orgânica, Leite de Amêndoa, Açúcar Vegano, Extrato de Baunilha, Fermento em Pó, Sal\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €4 por unidade", "4", 1),

    product("./media/images/stores/bakery/chocolate-donuts.png",
        "Chocolate Donuts",
        "Donuts de Chocolate",
        "Indulge in the irresistible flavor of our Chocolate Donuts, made with premium organic cocoa and vegan ingredients.\
    <br>\
    <br>\
    Ingredients: Organic Flour, Almond Milk, Vegan Chocolate, Vegan Sugar, Vanilla Extract, Baking Powder, Salt\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €4.30 per unit",
        "Delicie-se com o sabor irresistível dos nossos Donuts de Chocolate, feitos com cacau orgânico premium e ingredientes veganos.\
    <br>\
    <br>\
    Ingredientes: Farinha Orgânica, Leite de Amêndoa, Chocolate Vegano, Açúcar Vegano, Extrato de Baunilha, Fermento em Pó, Sal\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €4.30 por unidade", "4.30", 1),

    product("./media/images/stores/bakery/tomato-crackers.png",
        "Tomato Crackers",
        "Marinheiras de Tomate",
        "Experience the savory goodness of our Tomato Crackers, made with organic tomatoes and gluten-free ingredients.\
    <br>\
    <br>\
    Ingredients: Organic Tomatoes, Gluten-Free Flour, Olive Oil, Sea Salt\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €2.20 per unit",
        "Experimente a bondade salgada das nossas Marinheiras de Tomate, feitas com tomates orgânicos e ingredientes sem glúten.\
    <br>\
    <br>\
    Ingredientes: Tomates Orgânicos, Farinha Sem Glúten, Azeite de Oliva, Sal Marinho\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €2.20 por unidade", "2.20", 10),

    product("./media/images/stores/bakery/organic-flour.png",
        "Organic Gluten-Free Almond Flour",
        "Farinha de Amêndoa Orgânica Sem Glúten",
        "Choose our Organic Gluten-Free Almond Flour for your baking needs, made with high-quality organic almonds.\
    <br>\
    <br>\
    Ingredients: Organic Almonds\
    <br><br>\
    Expiration date: 01/01/2024\
    <br><br>\
    Price: €7 per unit",
        "Escolha a nossa Farinha de Amêndoa Orgânica Sem Glúten para suas necessidades de panificação, feita com amêndoas orgânicas de alta qualidade.\
    <br>\
    <br>\
    Ingredientes: Amêndoas Orgânicas\
    <br><br>\
    Prazo de validade: 01/01/2024\
    <br><br>\
    Preço: €7 por unidade", "7", 1),

];

const lidilProducts = [
    product("./media/images/stores/lidil/uwu-marshmallows.png",
        "Uwu Marshmallows",
        "Marshmallows Uwu",
        "Experience the soft and fluffy delight of Uwu Marshmallows. Perfect for toasting, baking, or adding a sweet touch to your favorite hot beverages.\
    <br>\
    <br>\
    Usage: Ideal for hot chocolate, s'mores, or as a topping for desserts.\
    <br><br>\
    Expiration date: 01/25/2024\
    <br><br>\
    Price: €0.99 per unit",
        "Experimente a delícia macia e fofa dos Marshmallows Uwu. Perfeitos para tostar, assar ou adicionar um toque doce às suas bebidas quentes favoritas.\
    <br>\
    <br>\
    Uso: Ideal para chocolate quente, s'mores ou como cobertura para sobremesas.\
    <br><br>\
    Prazo de validade: 01/25/2024\
    <br><br>\
    Preço: €0.99 por unidade", "0.99", 1),

    product("./media/images/stores/lidil/lettuce.png",
        "Lettuce",
        "Alface",
        "Add a crisp and refreshing element to your salads with fresh Lettuce. Packed with nutrients and perfect for a healthy meal.\
    <br>\
    <br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €0.69 per unit",
        "Adicione um elemento crocante e refrescante às suas saladas com alface fresca. Rico em nutrientes e perfeito para uma refeição saudável.\
    <br>\
    <br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €0.69 por unidade", "0.69", 1),

    product("./media/images/stores/lidil/beetroot.png",
        "Beetroot",
        "Beterraba",
        "Incorporate the earthy sweetness of Beetroot into your dishes. Whether roasted, boiled, or grated, it adds vibrant color and flavor.\
    <br>\
    <br>\
    Usage: Ideal for salads, soups, or as a side dish.\
    <br><br>\
    Expiration date: 01/22/2024\
    <br><br>\
    Price: €0.99 per unit",
        "Incorpore a doçura terrosa da Beterraba em seus pratos. Seja assada, cozida ou ralada, ela adiciona cor e sabor vibrantes.\
    <br>\
    <br>\
    Uso: Ideal para saladas, sopas ou como acompanhamento.\
    <br><br>\
    Prazo de validade: 01/22/2024\
    <br><br>\
    Preço: €0.99 por unidade", "0.99", 3),

    product("./media/images/stores/lidil/baby-tomatoes.png",
        "Japanese Cherry Tomatoes",
        "Tomates Cherry Japoneses",
        "Savor the sweetness of Japanese Cherry Tomatoes. These bite-sized delights are perfect for snacking, salads, or garnishing your favorite dishes.\
    <br>\
    <br>\
    Expiration date: 01/24/2024\
    <br><br>\
    Price: €1.99 per unit",
        "Saboreie a doçura dos Tomates Cherry Japoneses. Essas delícias em tamanho de mordida são perfeitas para petiscar, saladas ou enfeitar seus pratos favoritos.\
    <br>\
    <br>\
    Prazo de validade: 01/24/2024\
    <br><br>\
    Preço: €1.99 por unidade", "1.99", 1),

    product("./media/images/stores/lidil/sugar.png",
        "Sweet White Sugar",
        "Açúcar Branco Sweet",
        "Add a touch of sweetness to your recipes with Sweet White Sugar. A versatile ingredient for baking, cooking, or sweetening your beverages.\
    <br>\
    <br>\
    Expiration date: 01/18/2024\
    <br><br>\
    Price: €0.99 per unit",
        "Adicione um toque de doçura às suas receitas com Açúcar Branco Sweet. Um ingrediente versátil para assar, cozinhar ou adoçar suas bebidas.\
    <br>\
    <br>\
    Prazo de validade: 01/18/2024\
    <br><br>\
    Preço: €0.99 por unidade", "0.99", 1),

    product("./media/images/stores/lidil/apple.jpg",
        "Apple",
        "Maçã",
        "Enjoy the crisp and juicy goodness of fresh Apples. An ideal snack for a quick energy boost or a healthy addition to your lunchbox.\
    <br>\
    <br>\
    Expiration date: 01/15/2024\
    <br><br>\
    Price: €0.99 per unit",
        "Aproveite a bondade crocante e suculenta das maçãs frescas. Um lanche ideal para um impulso rápido de energia ou uma adição saudável à sua lancheira.\
    <br>\
    <br>\
    Prazo de validade: 01/15/2024\
    <br><br>\
    Preço: €0.99 por unidade", "0.99", 1),

    product("./media/images/stores/lidil/lemons.jpg",
        "Lemon",
        "Limão",
        "Experience the zesty and refreshing flavor of fresh Lemons. Perfect for adding a citrusy kick to your beverages, recipes, or as a garnish.\
    <br>\
    <br>\
    Usage: Ideal for lemonade, salad dressings, or as a flavor enhancer.\
    <br><br>\
    Expiration date: 01/23/2024\
    <br><br>\
    Price: €0.99 per unit",
        "Experimente o sabor picante e refrescante dos limões frescos. Perfeito para adicionar um toque cítrico às suas bebidas, receitas ou como enfeite.\
    <br>\
    <br>\
    Uso: Ideal para limonada, molhos de salada ou como realçador de sabor.\
    <br><br>\
    Prazo de validade: 01/23/2024\
    <br><br>\
    Preço: €0.99 por unidade", "0.99", 1),

    product("./media/images/stores/lidil/grapes.jpg",
        "Grapes",
        "Uvas",
        "Indulge in the sweetness of fresh Grapes. A delightful and healthy snack that can also be used in salads, desserts, or enjoyed on its own.\
    <br>\
    <br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €0.99 per unit",
        "Delicie-se com a doçura das uvas frescas. Um lanche delicioso e saudável que também pode ser usado em saladas, sobremesas ou apreciado sozinho.\
    <br>\
    <br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €0.99 por unidade", "0.99", 1),
];

const oSiloProducts = [
    product("./media/images/stores/osilo/box-water.png",
        "They Put Water In A Box Mineral Water 1L",
        "Água Mineral They Put Water In A Box 1L",
        "Experience the freshness of They Put Water In A Box Mineral Water. Sourced from natural springs and conveniently packaged in an eco-friendly box.\
    <br>\
    <br>\
    Source: Natural springs\
    <br><br>\
    Expiration date: 01/18/2024\
    <br><br>\
    Price: €4.99 per unit",
        "Experimente a frescura da Água Mineral They Put Water In A Box. Proveniente de fontes naturais e convenientemente embalada em uma caixa ecológica.\
    <br>\
    <br>\
    Origem: Fontes naturais\
    <br><br>\
    Prazo de validade: 01/18/2024\
    <br><br>\
    Preço: €4.99 por unidade", "4.99", 1),

    product("./media/images/stores/osilo/buttery-butter.png",
        "Buttery Butter",
        "Manteiga Buttery",
        "Indulge in the rich and creamy flavor of Buttery Butter. Perfect for spreading on toast, baking, or enhancing your favorite recipes.\
    <br>\
    <br>\
    Ingredients: Cream, salt\
    <br><br>\
    Expiration date: 01/22/2024\
    <br><br>\
    Price: €5.99 per unit",
        "Delicie-se com o sabor rico e cremoso da Manteiga Buttery. Perfeita para passar no pão, assar ou realçar suas receitas favoritas.\
    <br>\
    <br>\
    Ingredientes: Creme, sal\
    <br><br>\
    Prazo de validade: 01/22/2024\
    <br><br>\
    Preço: €5.99 por unidade", "5.99", 1),

    product("./media/images/stores/osilo/flouwre-organic-flour.png",
        "Flouwre Gluten-Free Wheat Flour",
        "Farinha de Trigo Sem Glúten Flouwre",
        "Bake with the goodness of Flouwre Gluten-Free Wheat Flour. A versatile and organic choice for your baking needs.\
    <br>\
    <br>\
    Ingredients: Organic wheat\
    <br><br>\
    Expiration date: 01/25/2024\
    <br><br>\
    Price: €6.99 per unit",
        "Asse com a bondade da Farinha de Trigo Sem Glúten Flouwre. Uma escolha versátil e orgânica para suas necessidades de panificação.\
    <br>\
    <br>\
    Ingredientes: Trigo orgânico\
    <br><br>\
    Prazo de validade: 01/25/2024\
    <br><br>\
    Preço: €6.99 por unidade", "6.99", 1),

    product("./media/images/stores/osilo/banana.jpeg",
        "Banana",
        "Banana",
        "Enjoy the natural sweetness of fresh Bananas. A convenient and healthy snack for any time of the day.\
    <br>\
    <br>\
    Expiration date: 01/15/2024\
    <br><br>\
    Price: €1.50 per unit",
        "Aproveite a doçura natural das bananas frescas. Um lanche conveniente e saudável para qualquer momento do dia.\
    <br>\
    <br>\
    Prazo de validade: 01/15/2024\
    <br><br>\
    Preço: €1.50 por unidade", "1.50", 1),

    product("./media/images/stores/osilo/cauliflower.jpeg",
        "Cauliflower",
        "Couve-flor",
        "Incorporate the versatility of Cauliflower into your culinary creations. Whether roasted, mashed, or in a stir-fry, it adds a unique touch to your dishes.\
    <br>\
    <br>\
    Usage: Ideal for roasting, mashing, or adding to stir-fries.\
    <br><br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €1.50 per unit",
        "Incorpore a versatilidade da Couve-flor em suas criações culinárias. Seja assada, amassada ou em um stir-fry, ela adiciona um toque único aos seus pratos.\
    <br>\
    <br>\
    Uso: Ideal para assar, amassar ou adicionar a stir-fries.\
    <br><br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €1.50 por unidade", "1.50", 1),

    product("./media/images/stores/osilo/oat.jpg",
        "Oats",
        "Aveia",
        "Start your day with the nourishing goodness of Oats. A wholesome and fiber-rich option for a healthy breakfast.\
    <br>\
    <br>\
    Usage: Perfect for oatmeal, smoothies, or baking.\
    <br><br>\
    Expiration date: 01/15/2024\
    <br><br>\
    Price: €1.50 per unit",
        "Comece o seu dia com a bondade nutritiva da Aveia. Uma opção saudável e rica em fibras para um café da manhã nutritivo.\
    <br>\
    <br>\
    Uso: Perfeito para mingau, smoothies ou assar.\
    <br><br>\
    Prazo de validade: 01/15/2024\
    <br><br>\
    Preço: €1.50 por unidade", "1.50", 1),

    product("./media/images/stores/osilo/dates.jpg",
    "Dates",
    "Tâmaras",
    "Indulge in the natural sweetness of Dates. These nutritious and energy-packed fruits are perfect for snacking, baking, or adding to your morning oats.\
    <br>\
    <br>\
    Usage: Enjoy as a snack, add to desserts, or use in energy bars.\
    <br><br>\
    Expiration date: 01/25/2024\
    <br><br>\
    Price: €5.00 per unit",
    "Delicie-se com a doçura natural das Tâmaras. Estas frutas nutritivas e ricas em energia são perfeitas para petiscar, assar ou adicionar ao seu mingau matinal.\
    <br>\
    <br>\
    Uso: Desfrute como um lanche, adicione a sobremesas ou use em barras de energia.\
    <br><br>\
    Prazo de validade: 01/25/2024\
    <br><br>\
    Preço: €5.00 por unidade", "5.00", 1),

product("./media/images/stores/osilo/blueberry.jpg",
    "Blueberries",
    "Mirtilos",
    "Savor the burst of flavor with fresh Blueberries. Packed with antioxidants, these berries are perfect for topping your yogurt, adding to smoothies, or enjoying on their own.\
    <br>\
    <br>\
    Usage: Ideal for snacking, adding to cereals, or incorporating into desserts.\
    <br><br>\
    Expiration date: 01/22/2024\
    <br><br>\
    Price: €5.00 per unit",
    "Saboreie a explosão de sabor com mirtilos frescos. Ricos em antioxidantes, essas frutas são perfeitas para cobrir seu iogurte, adicionar a smoothies ou aproveitar sozinhos.\
    <br>\
    <br>\
    Uso: Ideal para petiscar, adicionar a cereais ou incorporar em sobremesas.\
    <br><br>\
    Prazo de validade: 01/22/2024\
    <br><br>\
    Preço: €5.00 por unidade", "5.00", 1),
];

const pingoSalgadoProducts = [

    product("./media/images/stores/pingosalgado/oreus-cookies.png",
        "Oreus Cookies",
        "Bolachas Oreus",
        "Get ready to embark on a flavor-filled space journey with our very sussy Oreus Cookies. These cookies are so sus, they might not be cookies!\
    <br>\
    <br>\
    Ingredients: enriched flour, sugar, cocoa, vegetable oil, and a dash of salt, or is that so?\
    <br><br>\
    Expiration date: 01/01/2025\
    <br><br>\
    Price: €1.99 per unit",
        "Prepare-se para embarcar em uma viagem espacial cheia de sabor com nossos deliciosos biscoitos Oreus. Esses cookies são tão suspeitos que talvez não sejam cookies!\
    <br>\
    <br>\
    Ingredientes: farinha enriquecida, açúcar, cacau, óleo vegetal e uma pitada de sal, ou será que é isto?\
    <br><br>\
    Prazo de validade: 01/01/2025\
    <br><br>\
    Preço: €1.99 por unidade", "1.99", 1),

    product("./media/images/stores/pingosalgado/almond-milk.png",
        "That's Nuts Almond Milk 500ML",
        "Leite de Amêndoas That's Nuts 500ML",
        "Experience the richness of That's Nuts Almond Milk. Made from premium almonds, it's a dairy-free delight.\
    <br>\
    <br>\
    Ingredients: Almonds, water, sweetener\
    <br><br>\
    Expiration date: 05/05/2024\
    <br><br>\
    Price: €1.99 per unit",
        "Experimente a riqueza do Leite de Amêndoas That's Nuts. Feito com amêndoas premium, é uma delícia sem laticínios.\
    <br>\
    <br>\
    Ingredientes: Amêndoas, água, adoçante\
    <br><br>\
    Prazo de validade: 05/05/2024\
    <br><br>\
    Preço: €1.99 por unidade", "1.99", 1),

    product("./media/images/stores/pingosalgado/chips.jpeg",
        "Lay's Chips",
        "Batatas Fritas Lay's",
        "Crunch into the goodness of Lay's Chips. Thinly sliced and perfectly seasoned for your snacking pleasure.\
    <br><br>\
    Expiration date: 01/05/2024\
    <br><br>\
    Ingredients: Potatoes, vegetable oil, salt\
    <br><br>\
    Price: €2.49 per unit",
        "Morda a delícia das Batatas Fritas Lay's. Finamente fatiadas e perfeitamente temperadas para o seu prazer de petiscar.\
    <br><br>\
    Prazo de validade: 01/05/2024\
    <br><br>\
    Ingredientes: Batatas, óleo vegetal, sal\
    <br><br>\
    Preço: €2.49 por unidade", "2.49", 1),

    product("./media/images/stores/pingosalgado/citric-acid.jpg",
        "Citric Acid",
        "Ácido Cítrico",
        "Enhance your culinary creations with pure Citric Acid. A versatile ingredient for adding a tangy kick to your dishes.\
    <br><br>\
    Usage: Add a pinch to beverages or desserts for a citrusy flavor.\
    <br><br>\
    Expiration date: 01/12/2024\
    <br><br>\
    Price: €3.99 per unit",
        "Aprimore suas criações culinárias com Ácido Cítrico puro. Um ingrediente versátil para adicionar um toque azedo aos seus pratos.\
    <br>\
    <br>\
    Uso: Adicione uma pitada a bebidas ou sobremesas para um sabor cítrico.\
    <br><br>\
    Prazo de validade: 01/12/2024\
    <br><br>\
    Preço: €3.99 por unidade", "3.99", 1),

    product("./media/images/stores/pingosalgado/yogurt.jpg",
        "Alpro Yogurt",
        "Iogurte Alpro",
        "Indulge in the creamy goodness of Alpro Yogurt. A dairy-free alternative with a rich and smooth texture.\
    <br>\
    <br>\
    Ingredients: Soy milk, cultures\
    <br><br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €2.99 per unit",
        "Delicie-se com a cremosidade do Iogurte Alpro. Uma alternativa sem laticínios com uma textura rica e suave.\
    <br>\
    <br>\
    Ingredientes: Leite de soja, culturas\
    <br><br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €2.99 por unidade", "2.99", 1),

    product("./media/images/stores/pingosalgado/hershey-kisses.jpg",
        "Hershey's Kisses",
        "Beijinhos da Hershey's",
        "Savor the sweetness of Hershey's Kisses. Perfect bite-sized treats for chocolate lovers.\
    <br>\
    <br>\
    Ingredients: Milk chocolate, sugar, milk, cocoa butter\
    <br><br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €4.49 per unit",
        "Saboreie a doçura dos Beijinhos da Hershey's. Petiscos perfeitos em tamanho para os amantes de chocolate.\
    <br>\
    <br>\
    Ingredientes: Chocolate ao leite, açúcar, leite, manteiga de cacau\
    <br><br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €4.49 por unidade", "4.49", 1),

    product("./media/images/stores/pingosalgado/red_jelly.jpg",
        "Red Jelly",
        "Geléia Vermelha",
        "Add a burst of flavor with our Red Jelly. Perfect for spreading on toast or adding to your favorite desserts.\
    <br>\
    <br>\
    Ingredients: Berries, sugar, pectin\
    <br><br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €2.99 per unit",
        "Adicione uma explosão de sabor com a nossa Geléia Vermelha. Perfeita para passar no pão ou adicionar às suas sobremesas favoritas.\
    <br>\
    <br>\
    Ingredientes: Frutas vermelhas, açúcar, pectina\
    <br><br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €2.99 por unidade", "2.99", 1),

    product("./media/images/stores/pingosalgado/velveeta-cheese.jpg",
        "Velveeta Cheese",
        "Queijo Velveeta",
        "Experience the creaminess of Velveeta Cheese. Perfect for melting into your favorite recipes or enjoying with crackers.\
    <br>\
    <br>\
    Ingredients: Milk, water, whey protein concentrate\
    <br><br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €6.99 per unit",
        "Experimente a cremosidade do Queijo Velveeta. Perfeito para derreter em suas receitas favoritas ou desfrutar com biscoitos.\
    <br>\
    <br>\
    Ingredientes: Leite, água, concentrado de proteína de soro de leite\
    <br><br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €6.99 por unidade", "6.99", 1),

    product("./media/images/stores/pingosalgado/red-label.jpeg",
        "Red Label Tea",
        "Chá Red Label",
        "Savor the rich and aromatic Red Label Tea. A blend of fine tea leaves for a delightful and soothing beverage.\
    <br>\
    <br>\
    Ingredients: Black tea leaves\
    <br><br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €3.49 per unit",
        "Saboreie o Chá Red Label rico e aromático. Uma mistura de folhas de chá finas para uma bebida deliciosa e reconfortante.\
    <br>\
    <br>\
    Ingredientes: Folhas de chá preto\
    <br><br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €3.49 por unidade", "3.49", 1),

    product("./media/images/stores/pingosalgado/salty-eggs.jpeg",
        "Salty Eggs",
        "Ovos Salgados",
        "Indulge in the savory delight of our Salty Eggs. A perfect snack with a unique twist of saltiness.\
    <br>\
    <br>\
    Ingredients: Hard-boiled eggs, salt\
    <br><br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €2.99 per unit",
        "Delicie-se com a delícia salgada dos nossos Ovos Salgados. Um lanche perfeito com um toque único de salinidade.\
    <br>\
    <br>\
    Ingredientes: Ovos cozidos, sal\
    <br><br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €2.99 por unidade", "2.99", 1),

    product("./media/images/stores/pingosalgado/salty-milk.jpeg",
        "Salty Milk",
        "Leite Salgado",
        "Experience the unique flavor of Salty Milk. A surprising twist on traditional milk for those who crave a hint of saltiness.\
    <br>\
    <br>\
    Ingredients: Milk, salt\
    <br><br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €1.79 per unit",
        "Experimente o sabor único do Leite Salgado. Uma reviravolta surpreendente no leite tradicional para quem deseja um toque de salinidade.\
    <br>\
    <br>\
    Ingredientes: Leite, sal\
    <br><br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €1.79 por unidade", "1.79", 1),

    product("./media/images/stores/pingosalgado/salty-bread.jpeg",
        "Salty Bread",
        "Pão Salgado",
        "Enjoy the perfect blend of salty and savory with our Salty Bread. Ideal for sandwiches or as a flavorful side.\
    <br>\
    <br>\
    Ingredients: Wheat flour, salt, yeast\
    <br><br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €3.29 per unit",
        "Aproveite a mistura perfeita de salgado e saboroso com o nosso Pão Salgado. Ideal para sanduíches ou como acompanhamento saboroso.\
    <br>\
    <br>\
    Ingredientes: Farinha de trigo, sal, fermento\
    <br><br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €3.29 por unidade", "3.29", 1),

    product("./media/images/stores/pingosalgado/butter_icecream.png",
        "Butter Ice Cream",
        "Sorvete de Manteiga",
        "Indulge in the rich and creamy goodness of Butter Ice Cream. A luscious treat for butter lovers.\
    <br>\
    <br>\
    Ingredients: Cream, sugar, butter\
    <br><br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €4.99 per unit",
        "Delicie-se com a riqueza e cremosidade do Sorvete de Manteiga. Um deleite delicioso para os amantes de manteiga.\
    <br>\
    <br>\
    Ingredientes: Creme, açúcar, manteiga\
    <br><br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €4.99 por unidade", "4.99", 1),

    product("./media/images/stores/pingosalgado/katsup.jpeg",
        "Ketchup",
        "Molho Ketchup",
        "Enhance your meals with the tangy goodness of our Ketchup. Perfect for dipping, spreading, or topping your favorite dishes.\
    <br>\
    <br>\
    Ingredients: Tomatoes, sugar, vinegar\
    <br><br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €2.29 per unit",
        "Aprimore suas refeições com a delícia azedinha do nosso Molho Ketchup. Perfeito para mergulhar, espalhar ou cobrir seus pratos favoritos.\
    <br>\
    <br>\
    Ingredientes: Tomates, açúcar, vinagre\
    <br><br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €2.29 por unidade", "2.29", 1),

    product("./media/images/stores/pingosalgado/peanut_slab.jpeg",
        "Peanut Slab",
        "Tablete de Amendoim",
        "Indulge in the satisfying crunch of our Peanut Slab. A perfect blend of roasted peanuts in a chocolatey delight.\
    <br>\
    <br>\
    Ingredients: Roasted peanuts, chocolate\
    <br><br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €3.69 per unit",
        "Delicie-se com a crocância satisfatória do nosso Tablete de Amendoim. Uma mistura perfeita de amendoins torrados em uma delícia chocolatuda.\
    <br>\
    <br>\
    Ingredientes: Amendoins torrados, chocolate\
    <br><br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €3.69 por unidade", "3.69", 1),

    product("./media/images/stores/pingosalgado/pineapple-juice.jpeg",
        "Pineapple Juice",
        "Sumo de Abacaxi",
        "Quench your thirst with the tropical goodness of Pineapple Juice. A refreshing beverage for a taste of the islands.\
    <br>\
    <br>\
    Ingredients: Pineapple juice, water, sugar\
    <br><br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €1.99 per unit",
        "Mata a sua sede com a delícia tropical do Sumo de Abacaxi. Uma bebida refrescante para um sabor das ilhas.\
    <br>\
    <br>\
    Ingredientes: Sumo de abacaxi, água, açúcar\
    <br><br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €1.99 por unidade", "1.99", 1),

    product("./media/images/stores/pingosalgado/proud-source-spring-water.jpg",
        "Proud Source Spring Water",
        "Água de Fonte Proud Source",
        "Stay refreshed with the pure taste of Proud Source Spring Water. Sourced from natural springs for a crisp and clean experience.\
    <br>\
    <br>\
    Source: Natural springs\
    <br><br>\
    Expiration date: 01/20/2030\
    <br><br>\
    Price: €0.99 per unit",
        "Mantenha-se refrescado com o sabor puro da Água de Fonte Proud Source. Proveniente de fontes naturais para uma experiência nítida e limpa.\
    <br>\
    <br>\
    Origem: Fontes naturais\
    <br><br>\
    Prazo de validade: 01/20/2030\
    <br><br>\
    Preço: €0.99 por unidade", "0.99", 1),

    product("./media/images/stores/pingosalgado/shampoo.jpeg",
        "Heads & Shoulders Shampoo",
        "Shampoo Heads & Shoulders",
        "Nourish your hair and scalp with Heads & Shoulders Shampoo. A trusted formula for a flake-free and healthy-looking hair.\
    <br>\
    <br>\
    Features: Anti-dandruff, nourishing\
    <br><br>\
    Expiration date: 01/01/2035\
    <br><br>\
    Price: €6.99 per unit",
        "Nutre seus cabelos e couro cabeludo com o Shampoo Heads & Shoulders. Uma fórmula confiável para cabelos livres de caspa e com aparência saudável.\
    <br>\
    <br>\
    Recursos: Anticaspa, nutritivo\
    <br><br>\
    Prazo de validade: 01/01/2035\
    <br><br>\
    Preço: €6.99 por unidade", "6.99", 1),

    product("./media/images/stores/pingosalgado/tahini.jpeg",
        "Tahini",
        "Tahini",
        "Enhance your dishes with the rich and nutty flavor of Tahini. A versatile ingredient for dressings, dips, and spreads.\
    <br>\
    <br>\
    Usage: Perfect for hummus, salad dressings, and sauces.\
    <br><br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €4.29 per unit",
        "Aprimore seus pratos com o sabor rico e amendoado do Tahini. Um ingrediente versátil para molhos, dips e spreads.\
    <br>\
    <br>\
    Uso: Perfeito para homus, molhos de salada e molhos.\
    <br><br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €4.29 por unidade", "4.29", 1),

    product("./media/images/stores/pingosalgado/tourtierre.jpeg",
        "Tourtière",
        "Tourtière",
        "Experience the savory delight of Tourtière. A traditional meat pie with a flavorful blend of spices and cruelty-free, lab-grown ground meat!\
    <br>\
    <br>\
    Ingredients: Lab-grown ground pork meat, Lab-grown beef, spices\
    <br><br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €7.99 per unit",
        "Delicie-se com a delícia salgada de uma Tourtière. Uma torta de carne tradicional com uma mistura saborosa de especiarias e carne livre de crueldade, feita em laboratório!\
    <br>\
    <br>\
    Ingredientes: Carne de porco moída feita em laboratório, Carne de boi feita em laboratório, especiarias\
    <br><br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €7.99 por unidade", "7.99", 1),
];

const pangaeaProducts = [
    product("./media/images/stores/pangaea/yummy-bread.png",
        "Yummy Whole Wheat Bread",
        "Pão Integral Yummy",
        "Indulge in the wholesome goodness of Yummy Whole Wheat Bread. Made with premium whole wheat for a hearty and nutritious slice.\
    <br>\
    <br>\
    Ingredients: Whole wheat flour, water, yeast, salt\
    <br><br>\
    Expiration date: 01/15/2025\
    <br><br>\
    Price: €1.99 per unit",
        "Delicie-se com a bondade saudável do Pão Integral Yummy. Feito com trigo integral premium para uma fatia robusta e nutritiva.\
    <br>\
    <br>\
    Ingredientes: Farinha de trigo integral, água, fermento, sal\
    <br><br>\
    Prazo de validade: 01/15/2025\
    <br><br>\
    Preço: €1.99 por unidade", "1.99", 1),

    product("./media/images/stores/pangaea/cocoa-crazy-powder.png",
        "Cocoa Crazy Powder",
        "Cacau em Pó Cocoa Crazy",
        "Add a burst of chocolaty goodness with Cocoa Crazy Powder. Perfect for baking, hot chocolate, or sprinkling over desserts.\
    <br>\
    <br>\
    Usage: Ideal for making chocolate-flavored treats.\
    <br><br>\
    Expiration date: 01/10/2024\
    <br><br>\
    Price: €0.99 per unit",
        "Adicione uma explosão de bondade chocolatuda com o Cacau em Pó Cocoa Crazy. Perfeito para assar, chocolate quente ou polvilhar sobre sobremesas.\
    <br>\
    <br>\
    Uso: Ideal para fazer delícias com sabor a chocolate.\
    <br><br>\
    Prazo de validade: 01/10/2024\
    <br><br>\
    Preço: €0.99 por unidade", "0.99", 1),

    product("./media/images/stores/pangaea/frot-lopps.png",
        "Frot Lopps Cereal",
        "Cereal Frot Lopps",
        "Start your day with the crunchiness of Frot Lopps Cereal. A delicious blend of whole grains for a wholesome breakfast.\
    <br>\
    <br>\
    Ingredients: Whole grains, sugar, oats\
    <br><br>\
    Expiration date: 01/05/2024\
    <br><br>\
    Price: €1.99 per unit",
        "Comece o seu dia com a crocância do Cereal Frot Lopps. Uma deliciosa mistura de grãos inteiros para um café da manhã saudável.\
    <br>\
    <br>\
    Ingredientes: Grãos inteiros, açúcar, aveia\
    <br><br>\
    Prazo de validade: 01/05/2024\
    <br><br>\
    Preço: €1.99 por unidade", "1.99", 1),

    product("./media/images/stores/pangaea/jen&jerns.png",
        "Jen&Jern's Vanilla Chocolate and Strawberry Mix Ice Cream",
        "Gelado Jen&Jern's Mix Baunilha, Chocolate e Morango",
        "Indulge in the delightful combination of vanilla, chocolate, and strawberry with Jen&Jern's Mix Ice Cream. A perfect treat for any occasion.\
    <br>\
    <br>\
    Ingredients: Milk, sugar, vanilla, chocolate, strawberry\
    <br><br>\
    Expiration date: 01/12/2024\
    <br><br>\
    Price: €5.99 per unit",
        "Delicie-se com a combinação deliciosa de baunilha, chocolate e morango com o Gelado Jen&Jern's Mix. Um mimo perfeito para qualquer ocasião.\
    <br>\
    <br>\
    Ingredientes: Leite, açúcar, baunilha, chocolate, morango\
    <br><br>\
    Prazo de validade: 01/12/2024\
    <br><br>\
    Preço: €5.99 por unidade", "5.99", 1),

    product("./media/images/stores/pangaea/vasso-water.png",
        "VASSO Water 1L",
        "Água VASSO 1L",
        "Stay hydrated with the pure goodness of VASSO Water. Sourced from natural springs for a crisp and refreshing taste.\
    <br>\
    <br>\
    Source: Natural springs\
    <br><br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €5.99 per unit",
        "Mantenha-se hidratado com a bondade pura da Água VASSO. Proveniente de fontes naturais para um sabor nítido e refrescante.\
    <br>\
    <br>\
    Origem: Fontes naturais\
    <br><br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €5.99 por unidade", "5.99", 1),

    product("./media/images/stores/pangaea/avocado.png",
        "Avocado",
        "Abacate",
        "Add a touch of creaminess to your dishes with fresh Avocado. A versatile fruit that elevates salads, sandwiches, and more.\
    <br>\
    <br>\
    Usage: Perfect for guacamole, salads, and toast toppings.\
    <br><br>\
    Expiration date: 01/25/2024\
    <br><br>\
    Price: €1.99 per unit",
        "Adicione um toque de cremosidade aos seus pratos com Abacate fresco. Uma fruta versátil que eleva saladas, sanduíches e muito mais.\
    <br>\
    <br>\
    Uso: Perfeito para guacamole, saladas e coberturas de torradas.\
    <br><br>\
    Prazo de validade: 01/25/2024\
    <br><br>\
    Preço: €1.99 por unidade", "1.99", 1),

    product("./media/images/stores/pangaea/coffee.jpeg",
        "Coffee",
        "Café",
        "Awaken your senses with the rich aroma of our premium Coffee. Sourced from the finest beans for a delightful and energizing experience.\
    <br>\
    <br>\
    Roast level: Medium\
    <br><br>\
    Expiration date: 01/15/2024\
    <br><br>\
    Price: €1.50 per unit",
        "Desperte seus sentidos com o rico aroma do nosso Café premium. Proveniente dos melhores grãos para uma experiência deliciosa e energizante.\
    <br>\
    <br>\
    Nível de torra: Médio\
    <br><br>\
    Prazo de validade: 01/15/2024\
    <br><br>\
    Preço: €1.50 por unidade", "1.50", 1),

    product("./media/images/stores/pangaea/straw.jpeg",
        "Strawberry Jam",
        "Geleia de Morango",
        "Spread the sweetness with our luscious Strawberry Jam. Made from ripe strawberries for a burst of fruity flavor.\
    <br>\
    <br>\
    Usage: Perfect for spreading on toast, pancakes, or as a topping for desserts.\
    <br><br>\
    Expiration date: 01/20/2024\
    <br><br>\
    Price: €2.00 per unit",
        "Espalhe a doçura com nossa deliciosa Geleia de Morango. Feita com morangos maduros para um sabor frutado irresistível.\
    <br>\
    <br>\
    Uso: Perfeita para passar no pão, panquecas ou como cobertura para sobremesas.\
    <br><br>\
    Prazo de validade: 01/20/2024\
    <br><br>\
    Preço: €2.00 por unidade", "2.00", 1),

    product("./media/images/stores/pangaea/tomato.jpeg",
    "Tomato",
    "Tomate",
    "Add a burst of freshness to your meals with plump and juicy Tomatoes. Whether sliced for sandwiches, diced for salads, or cooked in sauces, they're a versatile kitchen staple.\
    <br>\
    <br>\
    Usage: Ideal for sandwiches, salads, pasta sauces, and more.\
    <br><br>\
    Expiration date: 01/18/2024\
    <br><br>\
    Price: €0.99 per unit",
    "Adicione uma explosão de frescor às suas refeições com tomates carnudos e suculentos. Seja fatiado para sanduíches, cortado para saladas ou cozido em molhos, eles são um item versátil na cozinha.\
    <br>\
    <br>\
    Uso: Ideal para sanduíches, saladas, molhos de massa e muito mais.\
    <br><br>\
    Prazo de validade: 01/18/2024\
    <br><br>\
    Preço: €0.99 por unidade", "0.99", 1),
];

const maxiprecoProducts = [
    //apple
    product("./media/images/stores/maxipreco/apple.jpeg",
        "Really prestigious apple",
        "Maçã de prestígio",
        "Really prestigious apple\
            <br>\
            <br>\
            Ingredients: 100% organic apple<br>from the royal garden\
            <br><br>\
            Expiration date: 01/01/2024\
            <br><br>\
            Price: €19.99 per 500g",
        "Maçã de prestígio\
            <br>\
            <br>\
            Ingredientes: 100% maçã orgánico<br>do jardim royal\
            <br><br>\
            Prazo de validade: 01/01/2024\
            <br><br>\
            Preço: €19.99 por 500g",
        "19.99", 1),

    //banana
    product("./media/images/stores/maxipreco/bananas.jpeg",
        "A bunch of precious bananas",
        "Um cacho de bananas preciosas",
        "A bunch of precious bananas\
            <br>\
            <br>\
            Ingredients: 100% gold foiled bananas\
            <br><br>\
            Expiration date: 11/01/2024\
            <br><br>\
            Price: €24.49 per 500g",
        "Um cacho de bananas preciosas\
            <br>\
            <br>\
            Ingredientes: 100% bananas folheadas a ouro\
            <br><br>\
            Prazo de validade: 11/01/2024\
            <br><br>\
            Preço: €24.49 por 500g",
        "24.49", 1),

    product("./media/images/stores/maxipreco/bread.jpeg",
        "Royal organic bread",
        "Pão biológico Royal",
        "Royal organic bread\
            <br>\
            <br>\
            Ingredients: flour, water, yeast,<br>sugar, salt\
            <br><br>\
            Expiration date: 10/12/2023\
            <br><br>\
            Price: €24.99 per unit",
        "Pão biológico Royal\
            <br>\
            <br>\
            Ingredientes: farinha, água, fermento,<br>açúcar, sal\
            <br><br>\
            Prazo de validade: 10/12/2023\
            <br><br>\
            Preço: €24.99 por unidade",
        "24.99", 1),

    product("./media/images/stores/maxipreco/butter.jpeg",
        "Immoderate fresh butter",
        "Manteiga fresca immoderada",
        "Immoderate fresh butter\
            <br>\
            <br>\
            Ingredients: milk fat, water, salt\
            <br><br>\
            Expiration date: 11/03/2024\
            <br><br>\
            Price: €32.75 per unit",
        "Manteiga fresca immoderada\
            <br>\
            <br>\
            Ingredientes: gordura do leite, água, sal\
            <br><br>\
            Prazo de validade: 11/03/2024\
            <br><br>\
            Preço: €32.75 por unidade",
        "32.75", 1),

    product("./media/images/stores/maxipreco/candies.jpeg",
        "Pricey delicious candies",
        "Doces caros e deliciosos",
        "Pricey delicious candies\
            <br>\
            <br>\
            Ingredients: milk, chocolate, sugar,<br>cocoa, milk fat, soy\
            <br><br>\
            Expiration date: 12/05/2024\
            <br><br>\
            Price: €39.79 per unit",
        "Doces caros e deliciosos\
            <br>\
            <br>\
            Ingredientes: leite, chocolate, açúcar,<br>cacau, gordura de leite, soja\
            <br><br>\
            Prazo de validade: 12/05/2024\
            <br><br>\
            Preço: €39.79 por unidade",
        "39.79", 1),

    product("./media/images/stores/maxipreco/chocolate.jpeg",
        "Magnificent €1000 chocolate",
        "Chocolate magnífico de 1000€",
        "Magnificent €1000 chocolate\
            <br>\
            <br>\
            Ingredients: milk, chocolate\
            <br><br>\
            Expiration date: 22/05/2025\
            <br><br>\
            Price: €1000 per unit",
        "Chocolate magnífico de 1000€\
            <br>\
            <br><br>\
            Ingredientes: leite, chocolate\
            <br><br>\
            Prazo de validade: 22/05/2025\
            <br>\
            Preço: €1000 por unidade",
        "1000", 1),

    product("./media/images/stores/maxipreco/coffee.jpeg",
        "Majestic coffee",
        "Café majestoso",
        "Majestic coffee\
            <br>\
            <br>\
            Ingredients: 100% coffee\
            <br><br>\
            Expiration date: 22/05/2026\
            <br><br>\
            Price: €84.99 per unit",
        "Café majestoso\
            <br>\
            <br>\
            Ingredientes: 100% café\
            <br><br>\
            Prazo de validade: 22/05/2026\
            <br><br>\
            Preço: €84.99 por unidade",
        "84.99", 1),

    product("./media/images/stores/maxipreco/cookies.jpeg",
        "Ecessive cookies",
        "Biscoitos ecessiosos",
        "Ecessive cookies\
            <br>\
            <br>\
            Ingredients: chocolate chips,<br>eggs, flour, sugar, butter\
            <br><br>\
            Expiration date: 22/05/2024\
            <br><br>\
            Price: €24.99 per unit",
        "Biscoitos ecessiosos\
            <br>\
            <br>\
            Ingredientes: pepitas de chocolate,<br>ovos, farinha, açúcar, manteiga\
            <br><br>\
            Prazo de validade: 22/05/2024\
            <br><br>\
            Preço: €24.99 por unidade",
        "24.99", 1),

    product("./media/images/stores/maxipreco/crisps.jpeg",
        "Luxury crisps",
        "Batatas fritas de luxo",
        "Luxury crisps\
            <br>\
            <br>\
            Ingredients: potato, vegetable oil,<br>salt, gold\
            <br><br>\
            Expiration date: 01/05/2024\
            <br><br>\
            Price: €32.75 per unit",
        "Batatas fritas de luxo\
            <br>\
            <br>\
            Ingredientes: batata, óleo vegetal,<br>sal, ouro\
            <br><br>\
            Prazo de validade: 01/05/2024\
            <br><br>\
            Preço: €32.75 por unidade",
        "32.75", 1),

    product("./media/images/stores/maxipreco/eggs.jpeg",
        "Kingly eggs",
        "Ovos de Rei",
        "Kingly eggs\
            <br>\
            <br>\
            Ingredients: eggs\
            <br><br>\
            Expiration date: 01/03/2024\
            <br><br>\
            Price: €44.75 per 6 units",
        "Ovos de Rei\
            <br>\
            <br>\
            Ingredientes: ovos\
            <br><br>\
            Prazo de validade: 01/03/2024\
            <br><br>\
            Preço: €44.75 por 6 unidades",
        "44.75", 1),

    product("./media/images/stores/maxipreco/french.jpeg",
        "Eminent french fries",
        "Batatas fritas eminentes",
        "Eminent french fries\
            <br>\
            <br>\
            Ingredients: potato, salt, vegetable oil\
            <br><br>\
            Expiration date: 14/03/2024\
            <br><br>\
            Price: €34.75 per 1kg",
        "Batatas fritas eminentes\
            <br>\
            <br>\
            Ingredientes: batata, sal, óleo vegetal\
            <br><br>\
            Prazo de validade: 14/03/2024\
            <br><br>\
            Preço: €34.75 por 1kg",
        "34.75", 1),

    product("./media/images/stores/maxipreco/ice_cream.jpeg",
        "Dignified ice cream",
        "Gelado digno",
        "Dignified ice cream\
            <br>\
            <br>\
            Ingredients: milk, sugar,<br>vanilla, heavy cream\
            <br><br>\
            Expiration date: 20/12/2024\
            <br><br>\
            Price: €52.45 per 500g",
        "Gelado digno\
            <br>\
            <br>\
            Ingredientes: leite, açúcar,<br>baunilha, natas\
            <br><br>\
            Prazo de validade: 20/12/2024\
            <br><br>\
            Preço: €52.45 por 500g",
        "52.45", 1),

    product("./media/images/stores/maxipreco/milk.jpeg",
        "Baronial milk",
        "Leite baronial",
        "Baronial milk\
            <br>\
            <br>\
            Ingredients: milk\
            <br><br>\
            Expiration date: 20/12/2023\
            <br><br>\
            Price: €19.99 per 1L",
        "Leite baronial\
            <br>\
            <br>\
            Ingredientes: leite\
            <br><br>\
            Prazo de validade: 20/12/2023\
            <br><br>\
            Preço: €19.99 por 1L",
        "19.99", 1),

    product("./media/images/stores/maxipreco/nuts.jpeg",
        "Exorbidant mixed nuts",
        "Mistura de frutos secos exorbidantes",
        "Exorbidant mixed nuts\
            <br>\
            <br>\
            Ingredients: nuts\
            <br><br>\
            Expiration date: 20/05/2026\
            <br><br>\
            Price: €22.75 per unit",
        "Mistura de frutos secos exorbidantes\
            <br>\
            <br>\
            Ingredientes: frutos secos\
            <br><br>\
            Prazo de validade: 20/05/2026\
            <br><br>\
            Preço: €22.75 por unidade",
        "22.75", 1),

    product("./media/images/stores/maxipreco/salt.jpeg",
        "Costly salt",
        "Sal caro",
        "Costly salt\
            <br>\
            <br>\
            Ingredients: sea salt\
            <br><br>\
            Expiration date: 12/05/2036\
            <br><br>\
            Price: €14.99 per 1kg",
        "Sal caro\
            <br>\
            <br>\
            Ingredientes: sal do mar\
            <br><br>\
            Prazo de validade: 12/05/2036\
            <br><br>\
            Preço: €14.99 por 1kg",
        "14.99", 1),

    product("./media/images/stores/maxipreco/strawberries.jpeg",
        "A bunch of fancy strawberries",
        "Um ramo de morangos de luxo",
        "A bunch of fancy strawberries\
            <br>\
            <br>\
            Ingredients: strawberries, diamonds\
            <br><br>\
            Expiration date: 12/12/2023\
            <br><br>\
            Price: €34.99 per 500g",
        "Um ramo de morangos de luxo\
            <br>\
            <br>\
            Ingredientes: morangos, diamantes\
            <br><br>\
            Prazo de validade: 12/12/2023\
            <br><br>\
            Preço: €34.99 por 500g",
        "34.99", 1),

    product("./media/images/stores/maxipreco/sugar.jpeg",
        "Superior sugar",
        "Açúcar superior",
        "Superior sugar\
            <br>\
            <br>\
            Ingredients: sugar\
            <br><br>\
            Expiration date: 03/12/2027\
            <br><br>\
            Price: €9.99 per 1kg",
        "Açúcar superior\
            <br>\
            <br>\
            Ingredientes: açúcar\
            <br><br>\
            Prazo de validade: 03/12/2027\
            <br><br>\
            Preço: €9.99 por 1kg",
        "9.99", 1),

    product("./media/images/stores/maxipreco/tea.jpeg",
        "Really royal tea",
        "Chá realmente Royal",
        "Really royal tea\
            <br>\
            <br>\
            Ingredients: royal tea\
            <br><br>\
            Expiration date: 06/11/2025\
            <br><br>\
            Price: €29.99 per unit",
        "Chá realmente Royal\
            <br>\
            <br>\
            Ingredientes: chá royal\
            <br><br>\
            Prazo de validade: 06/11/2025\
            <br><br>\
            Preço: €29.99 por unidade",
        "29.99", 1),

    product("./media/images/stores/maxipreco/vegetables.jpeg",
        "Fancy bag of exorbitant vegetables",
        "Saco de legumes exorbitantes",
        "Fancy bag of exorbitant vegetables\
            <br>\
            <br>\
            Ingredients: carrot, tomatoes, gabbage\
            <br><br>\
            Expiration date: 03/12/2023\
            <br><br>\
            Price: €39.99 per unit",
        "Saco de legumes exorbitantes\
            <br>\
            <br>\
            Ingredientes: cenoura, tomate, couve\
            <br><br>\
            Prazo de validade: 03/12/2023\
            <br><br>\
            Preço: €39.99 por unidade",
        "39.99", 1),

    product("./media/images/stores/maxipreco/water.jpeg",
        "Invaluable crystal bottle of mineral water",
        "Inestimável garrafa de cristal de água mineral",
        "Invaluable crystal bottle of mineral water\
            <br>\
            <br>\
            Ingredients: mineral water\
            <br><br>\
            Expiration date: 02/03/2024\
            <br><br>\
            Price: €29.99 per 500ml",
        "Inestimável garrafa de cristal de água mineral\
            <br>\
            <br>\
            Ingredientes: água mineral\
            <br><br>\
            Prazo de validade: 02/03/2024\
            <br><br>\
            Preço: €29.99 por 500ml",
        "29.99", 1),
];