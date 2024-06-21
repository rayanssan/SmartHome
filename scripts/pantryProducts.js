"use strict"

let cabinetsProducts = [
    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/sugar.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Sweet Sugar" : lang == "pt" ? "Açúcar Sweet" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Sweet Sugar</p>
            <hr><p>Expires in: 02/02/2026</p><hr><p>Ingredients: 100% Refined White Sugar.</p>` :
        lang == "pt" ? `<p>Açúcar Sweet</p>
            <hr><p>Data de validade: 02/02/2026</p><hr><p>Ingredientes: 100% Açúcar Branco Refinado.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/sugar.png">
    <p class="grocery-product-name">
        ${lang == "en" ? "Sweet Sugar" : lang == "pt" ? "Açúcar Sweet" : null}
        <button class="grocery-product-info">i</button>
    </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Sweet Sugar</p>
            <hr><p>Expires in: 02/02/2026</p><hr><p>Ingredients: 100% Refined White Sugar.</p>` :
        lang == "pt" ? `<p>Açúcar Sweet</p>
            <hr><p>Data de validade: 02/02/2026</p><hr><p>Ingredientes: 100% Açúcar Branco Refinado.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/sugar.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Sweet Sugar" : lang == "pt" ? "Açúcar Sweet" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Sweet Sugar</p>
            <hr><p>Expires in: 02/02/2026</p><hr><p>Ingredients: 100% Refined White Sugar.</p>` :
        lang == "pt" ? `<p>Açúcar Sweet</p>
            <hr><p>Data de validade: 02/02/2026</p><hr><p>Ingredientes: 100% Açúcar Branco Refinado.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/flouwre-organic-flour.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Flouwre Gluten-Free Wheat Flour" : lang == "pt" ? "Farinha de Trigo Sem Glúten Flouwre" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Flouwre Gluten-Free Wheat Flour</p>
            <hr><p>Expires in: 01/01/2025</p><hr><p>Ingredients: 100% Gluten-Free Flour.</p>` :
        lang == "pt" ? `<p>Farinha de Trigo Sem Glúten Flouwre</p>
            <hr><p>Data de validade: 01/01/2025</p><hr><p>Ingredientes: 100% Farinha de Trigo Sem Glúten.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/cocoa-crazy-powder.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Cocoa Crazy Cocoa Powder" : lang == "pt" ? "Cacau em pó Cocoa Crazy" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Cocoa Crazy Cocoa Powder</p>
            <hr><p>Expires in: 02/02/2026</p><hr><p>Ingredients: 100% Cocoa powder.</p>` :
        lang == "pt" ? `<p>Cacau em pó Cocoa Crazy</p>
            <hr><p>Data de validade: 02/02/2026</p><hr><p>Ingredientes: 100% Cacau em pó.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/frot-lopps.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Frot Lopps Cereal" : lang == "pt" ? "Cereal Frot Lopps" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Frot Lopps Cereal</p>
            <hr><p>Expires in: 02/02/2026</p><hr><p>Ingredients: Corn flour blend (whole grain yellow corn flour, degerminated yellow corn flour), 
            sugar, marshmallows (sugar, corn syrup, dextrose, natural flavor, 
                gelatin, yellow 5, red 40, yellow 6, blue 1), wheat flour, 
                whole grain oat flour, modified food starch, contains 2% or less of vegetable oil 
                (hydrogenated coconut, soybean and/or cottonseed oil), oat fiber, 
                maltodextrin, salt, soluble corn fiber, natural flavor, red 40, 
                yellow 5, blue 1, yellow 6, BHT for freshness. Vitamins and Minerals: 
                Vitamin C (ascorbic acid), reduced iron, niacinamide, vitamin B6 (pyridoxine hydrochloride), 
                vitamin B2 (riboflavin), vitamin B1 (thiamin hydrochloride), folic acid, vitamin D3, vitamin B12.</p>` :
        lang == "pt" ? `<p>Cereal Frot Lopps</p>
            <hr><p>Data de validade: 02/02/2026</p><hr><p>Ingredientes: Mistura de farinha de milho 
            (farinha de milho amarela integral, farinha de milho amarela degerminada), 
            açúcar, marshmallows (açúcar, xarope de milho, dextrose, sabor natural, gelatina, amarelo 5, vermelho 40, amarelo 6, azul 1), 
            farinha de trigo, grão integral farinha de aveia, amido alimentar modificado, contém 2% ou menos de óleo vegetal 
            (coco hidrogenado, soja e/ou óleo de semente de algodão), fibra de aveia, maltodextrina, sal, fibra de milho solúvel, 
            sabor natural, vermelho 40, amarelo 5, azul 1, amarelo 6, BHT para frescor. Vitaminas e Minerais: Vitamina C (ácido ascórbico), 
            ferro reduzido, niacinamida, vitamina B6 (cloridrato de piridoxina), 
            vitamina B2 (riboflavina), vitamina B1 (cloridrato de tiamina), ácido fólico, vitamina D3, vitamina B12.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/frot-lopps.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Frot Lopps Cereal" : lang == "pt" ? "Cereal Frot Lopps" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Frot Lopps Cereal</p>
            <hr><p>Expires in: 02/02/2026</p><hr><p>Ingredients: Corn flour blend (whole grain yellow corn flour, degerminated yellow corn flour), 
            sugar, marshmallows (sugar, corn syrup, dextrose, natural flavor, 
                gelatin, yellow 5, red 40, yellow 6, blue 1), wheat flour, 
                whole grain oat flour, modified food starch, contains 2% or less of vegetable oil 
                (hydrogenated coconut, soybean and/or cottonseed oil), oat fiber, 
                maltodextrin, salt, soluble corn fiber, natural flavor, red 40, 
                yellow 5, blue 1, yellow 6, BHT for freshness. Vitamins and Minerals: 
                Vitamin C (ascorbic acid), reduced iron, niacinamide, vitamin B6 (pyridoxine hydrochloride), 
                vitamin B2 (riboflavin), vitamin B1 (thiamin hydrochloride), folic acid, vitamin D3, vitamin B12.</p>` :
        lang == "pt" ? `<p>Cereal Frot Lopps</p>
            <hr><p>Data de validade: 02/02/2026</p><hr><p>Ingredientes: Mistura de farinha de milho 
            (farinha de milho amarela integral, farinha de milho amarela degerminada), 
            açúcar, marshmallows (açúcar, xarope de milho, dextrose, sabor natural, gelatina, amarelo 5, vermelho 40, amarelo 6, azul 1), 
            farinha de trigo, grão integral farinha de aveia, amido alimentar modificado, contém 2% ou menos de óleo vegetal 
            (coco hidrogenado, soja e/ou óleo de semente de algodão), fibra de aveia, maltodextrina, sal, fibra de milho solúvel, 
            sabor natural, vermelho 40, amarelo 5, azul 1, amarelo 6, BHT para frescor. Vitaminas e Minerais: Vitamina C (ácido ascórbico), 
            ferro reduzido, niacinamida, vitamina B6 (cloridrato de piridoxina), 
            vitamina B2 (riboflavina), vitamina B1 (cloridrato de tiamina), ácido fólico, vitamina D3, vitamina B12.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/frot-lopps.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Frot Lopps Cereal" : lang == "pt" ? "Cereal Frot Lopps" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Frot Lopps Cereal</p>
            <hr><p>Expires in: 02/02/2026</p><hr><p>Ingredients: Corn flour blend (whole grain yellow corn flour, degerminated yellow corn flour), 
            sugar, marshmallows (sugar, corn syrup, dextrose, natural flavor, 
                gelatin, yellow 5, red 40, yellow 6, blue 1), wheat flour, 
                whole grain oat flour, modified food starch, contains 2% or less of vegetable oil 
                (hydrogenated coconut, soybean and/or cottonseed oil), oat fiber, 
                maltodextrin, salt, soluble corn fiber, natural flavor, red 40, 
                yellow 5, blue 1, yellow 6, BHT for freshness. Vitamins and Minerals: 
                Vitamin C (ascorbic acid), reduced iron, niacinamide, vitamin B6 (pyridoxine hydrochloride), 
                vitamin B2 (riboflavin), vitamin B1 (thiamin hydrochloride), folic acid, vitamin D3, vitamin B12.</p>` :
        lang == "pt" ? `<p>Cereal Frot Lopps</p>
            <hr><p>Data de validade: 02/02/2026</p><hr><p>Ingredientes: Mistura de farinha de milho 
            (farinha de milho amarela integral, farinha de milho amarela degerminada), 
            açúcar, marshmallows (açúcar, xarope de milho, dextrose, sabor natural, gelatina, amarelo 5, vermelho 40, amarelo 6, azul 1), 
            farinha de trigo, grão integral farinha de aveia, amido alimentar modificado, contém 2% ou menos de óleo vegetal 
            (coco hidrogenado, soja e/ou óleo de semente de algodão), fibra de aveia, maltodextrina, sal, fibra de milho solúvel, 
            sabor natural, vermelho 40, amarelo 5, azul 1, amarelo 6, BHT para frescor. Vitaminas e Minerais: Vitamina C (ácido ascórbico), 
            ferro reduzido, niacinamida, vitamina B6 (cloridrato de piridoxina), 
            vitamina B2 (riboflavina), vitamina B1 (cloridrato de tiamina), ácido fólico, vitamina D3, vitamina B12.</p>` : null}
        </div>
    </div>`,
];

let pantryProducts = [
    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/yummy-bread.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Yummy whole wheat bread" : lang == "pt" ? "Pão integral Yummy" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Yummy whole wheat bread</p>
            <hr><p>Expires in: 04/04/2024</p><hr><p>Ingredients: Whole Wheat Flour, Water, Sugar, Oil, Salt, Improvers.</p>` :
        lang == "pt" ? `<p>Pão integral Yummy</p>
            <hr><p>Data de validade: 02/02/2024</p><hr><p>Ingredientes: Farinha de Trigo Integral, Água, Açúcar, Óleo, Sal, Melhoradores.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/yummy-bread.png">
    <p class="grocery-product-name">
        ${lang == "en" ? "Yummy whole wheat bread" : lang == "pt" ? "Pão integral Yummy" : null}
        <button class="grocery-product-info">i</button>
    </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Yummy whole wheat bread</p>
            <hr><p>Expires in: 04/04/2024</p><hr><p>Ingredients: Whole Wheat Flour, Water, Sugar, Oil, Salt, Improvers.</p>` :
        lang == "pt" ? `<p>Pão integral Yummy</p>
            <hr><p>Data de validade: 02/02/2024</p><hr><p>Ingredientes: Farinha de Trigo Integral, Água, Açúcar, Óleo, Sal, Melhoradores.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/yummy-bread.png">
    <p class="grocery-product-name">
        ${lang == "en" ? "Yummy whole wheat bread" : lang == "pt" ? "Pão integral Yummy" : null}
        <button class="grocery-product-info">i</button>
    </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Yummy whole wheat bread</p>
            <hr><p>Expires in: 05/05/2024</p><hr><p>Ingredients: Whole Wheat Flour, Water, Sugar, Oil, Salt, Improvers.</p>` :
        lang == "pt" ? `<p>Pão integral Yummy</p>
            <hr><p>Data de validade: 02/02/2024</p><hr><p>Ingredientes: Farinha de Trigo Integral, Água, Açúcar, Óleo, Sal, Melhoradores.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/yummy-bread.png">
    <p class="grocery-product-name">
        ${lang == "en" ? "Yummy whole wheat bread" : lang == "pt" ? "Pão integral Yummy" : null}
        <button class="grocery-product-info">i</button>
    </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Yummy whole wheat bread</p>
            <hr><p>Expires in: 05/05/2024</p><hr><p>Ingredients: Whole Wheat Flour, Water, Sugar, Oil, Salt, Improvers.</p>` :
        lang == "pt" ? `<p>Pão integral Yummy</p>
            <hr><p>Data de validade: 02/02/2024</p><hr><p>Ingredientes: Farinha de Trigo Integral, Água, Açúcar, Óleo, Sal, Melhoradores.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/uwu-marshmallows.png">
    <p class="grocery-product-name">
        ${lang == "en" ? "Uwu Marshmallows" : lang == "pt" ? "Marshmallows Uwu" : null}
        <button class="grocery-product-info">i</button>
    </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Uwu Marshmallows</p>
            <hr><p>Expires in: 02/02/2025</p><hr><p>Ingredients: Glucose and fructose syrup, sugar, gelatine, water, humectant: e420, flavourings, starch, colours.</p>` :
        lang == "pt" ? `<p>Marshmallows Uwu</p>
            <hr><p>Data de validade: 02/02/2025</p><hr><p>Ingredientes: 
            Xarope de glicose e frutose, açúcar, gelatina, água, umectante: e420, aromatizantes, amido, corantes.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/uwu-marshmallows.png">
    <p class="grocery-product-name">
        ${lang == "en" ? "Uwu Marshmallows" : lang == "pt" ? "Marshmallows Uwu" : null}
        <button class="grocery-product-info">i</button>
    </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Uwu Marshmallows</p>
            <hr><p>Expires in: 02/02/2025</p><hr><p>Ingredients: Glucose and fructose syrup, sugar, gelatine, water, humectant: e420, flavourings, starch, colours.</p>` :
        lang == "pt" ? `<p>Marshmallows Uwu</p>
            <hr><p>Data de validade: 02/02/2025</p><hr><p>Ingredientes: 
            Xarope de glicose e frutose, açúcar, gelatina, água, umectante: e420, aromatizantes, amido, corantes.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/uwu-marshmallows.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Uwu Marshmallows" : lang == "pt" ? "Marshmallows Uwu" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Uwu Marshmallows</p>
            <hr><p>Expires in: 02/02/2025</p><hr><p>Ingredients: Glucose and fructose syrup, sugar, gelatine, water, humectant: e420, flavourings, starch, colours.</p>` :
        lang == "pt" ? `<p>Marshmallows Uwu</p>
            <hr><p>Data de validade: 02/02/2025</p><hr><p>Ingredientes: 
            Xarope de glicose e frutose, açúcar, gelatina, água, umectante: e420, aromatizantes, amido, corantes.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/oreus-cookies.png">
    <p class="grocery-product-name">
        ${lang == "en" ? "Oreus Cookies" : lang == "pt" ? "Bolachas Oreus" : null}
        <button class="grocery-product-info">i</button>
    </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Oreus Cookies</p>
            <hr><p>Expires in: 08/08/2024</p><hr><p>Ingredients: Unbleached enriched flour (wheat flour, niacin, reduced iron, 
                thiamine mononitrate {Vitamin B1}, riboflavin {Vitamin B2}, folic acid), sugar, palm oil, 
                soybean and/or canola oil, cocoa (processed with alkali), high fructose corn syrup, 
                leavening (baking soda and/or calcium phosphate), salt, soy lecithin, chocolate, artificial flavor. Contains: wheat, soy.</p>` :
        lang == "pt" ? `<p>Bolachas Oreus</p>
            <hr><p>Data de validade: 08/08/2024</p><hr><p>Ingredientes: Farinha não branqueada enriquecida (farinha de trigo, niacina, ferro reduzido, mononitrato de tiamina 
                {Vitamina B1}, riboflavina {Vitamina B2}, ácido fólico), açúcar, óleo de palma, óleo de soja e/ou canola, 
                cacau (processado com álcali), alto frutose xarope de milho, fermento (fermento de soda e/ou fosfato de cálcio), 
                sal, lecitina de soja, chocolate, sabor artificial. Contém: trigo, soja.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/oreus-cookies.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Oreus Cookies" : lang == "pt" ? "Bolachas Oreus" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Oreus Cookies</p>
            <hr><p>Expires in: 08/08/2024</p><hr><p>Ingredients: Unbleached enriched flour (wheat flour, niacin, reduced iron, 
                thiamine mononitrate {Vitamin B1}, riboflavin {Vitamin B2}, folic acid), sugar, palm oil, 
                soybean and/or canola oil, cocoa (processed with alkali), high fructose corn syrup, 
                leavening (baking soda and/or calcium phosphate), salt, soy lecithin, chocolate, artificial flavor. Contains: wheat, soy.</p>` :
        lang == "pt" ? `<p>Bolachas Oreus</p>
            <hr><p>Data de validade: 08/08/2024</p><hr><p>Ingredientes: Farinha não branqueada enriquecida (farinha de trigo, niacina, ferro reduzido, mononitrato de tiamina 
                {Vitamina B1}, riboflavina {Vitamina B2}, ácido fólico), açúcar, óleo de palma, óleo de soja e/ou canola, 
                cacau (processado com álcali), alto frutose xarope de milho, fermento (fermento de soda e/ou fosfato de cálcio), 
                sal, lecitina de soja, chocolate, sabor artificial. Contém: trigo, soja.</p>` : null}
        </div>
    </div>`,
];

let fridgeProducts = [
    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/almond-milk.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "That's Nuts Almond Milk 500ML" : lang == "pt" ? "Leite de Amêndoas That's Nuts 500ML" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>That's Nuts Almond Milk 500ML</p>
            <hr><p>Expires in: 02/02/2024</p><hr><p>Ingredients: Water, Almond (2.3%), Sugar, Calcium (Tri-calcium phosphate), 
            Sea salt, Stabilisers (Locust bean gum, Gellan gum), 
            Emulsifier (Lecithins (Sunflower)), Natural flavouring, Vitamins (B2, B12, E, D2).</p>` :
        lang == "pt" ? `<p>Leite de Amêndoas That's Nuts 500ML</p>
            <hr><p>Data de validade: 02/02/2024</p><hr><p>Ingredientes: Água, amêndoa (2,3%), açúcar, 
            cálcio (fosfato tricálcico), sal marinho, estabilizantes (goma de alfarroba, goma gelana), 
            emulsionante (lecitinas (girassol)), aroma natural, vitaminas (B2, B12, E, D2).</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/almond-milk.png">
    <p class="grocery-product-name">
        ${lang == "en" ? "That's Nuts Almond Milk 500ML" : lang == "pt" ? "Leite de Amêndoas That's Nuts 500ML" : null}
        <button class="grocery-product-info">i</button>
    </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>That's Nuts Almond Milk 500ML</p>
            <hr><p>Expires in: 02/02/2024</p><hr><p>Ingredients: Water, Almond (2.3%), Sugar, Calcium (Tri-calcium phosphate), 
            Sea salt, Stabilisers (Locust bean gum, Gellan gum), 
            Emulsifier (Lecithins (Sunflower)), Natural flavouring, Vitamins (B2, B12, E, D2).</p>` :
        lang == "pt" ? `<p>Leite de Amêndoas That's Nuts 500ML</p>
            <hr><p>Data de validade: 02/02/2024</p><hr><p>Ingredientes: Água, amêndoa (2,3%), açúcar, 
            cálcio (fosfato tricálcico), sal marinho, estabilizantes (goma de alfarroba, goma gelana), 
            emulsionante (lecitinas (girassol)), aroma natural, vitaminas (B2, B12, E, D2).</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/almond-milk.png">
    <p class="grocery-product-name">
        ${lang == "en" ? "That's Nuts Almond Milk 500ML" : lang == "pt" ? "Leite de Amêndoas That's Nuts 500ML" : null}
        <button class="grocery-product-info">i</button>
    </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>That's Nuts Almond Milk 500ML</p>
            <hr><p>Expires in: 02/02/2024</p><hr><p>Ingredients: Water, Almond (2.3%), Sugar, Calcium (Tri-calcium phosphate), 
            Sea salt, Stabilisers (Locust bean gum, Gellan gum), 
            Emulsifier (Lecithins (Sunflower)), Natural flavouring, Vitamins (B2, B12, E, D2).</p>` :
        lang == "pt" ? `<p>Leite de Amêndoas That's Nuts 500ML</p>
            <hr><p>Data de validade: 02/02/2024</p><hr><p>Ingredientes: Água, amêndoa (2,3%), açúcar, 
            cálcio (fosfato tricálcico), sal marinho, estabilizantes (goma de alfarroba, goma gelana), 
            emulsionante (lecitinas (girassol)), aroma natural, vitaminas (B2, B12, E, D2).</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/beetroot.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Beetroot" : lang == "pt" ? "Beterraba" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Beetroot</p>
            <hr><p>Expires in: 25/01/2024</p><hr><p>Ingredients: 100% Beetroot.</p>` :
        lang == "pt" ? `<p>Beterraba</p>
            <hr><p>Data de validade: 01/01/2024</p><hr><p>Ingredientes: 100% Betteraba.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/beetroot.png">
    <p class="grocery-product-name">
        ${lang == "en" ? "Beetroot" : lang == "pt" ? "Beterraba" : null}
        <button class="grocery-product-info">i</button>
    </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Beetroot</p>
            <hr><p>Expires in: 01/01/2024</p><hr><p>Ingredients: 100% Beetroot.</p>` :
        lang == "pt" ? `<p>Beterraba</p>
            <hr><p>Data de validade: 01/01/2024</p><hr><p>Ingredientes: 100% Betteraba.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/beetroot.png">
    <p class="grocery-product-name">
        ${lang == "en" ? "Beetroot" : lang == "pt" ? "Beterraba" : null}
        <button class="grocery-product-info">i</button>
    </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Beetroot</p>
            <hr><p>Expires in: 01/01/2024</p><hr><p>Ingredients: 100% Beetroot.</p>` :
        lang == "pt" ? `<p>Beterraba</p>
            <hr><p>Data de validade: 01/01/2024</p><hr><p>Ingredientes: 100% Betteraba.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/lettuce.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Lettuce" : lang == "pt" ? "Alface" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Lettuce</p>
            <hr><p>Expires in: 01/01/2024</p><hr><p>Ingredients: 100% Lettuce.</p>` :
        lang == "pt" ? `<p>Alface</p>
            <hr><p>Data de validade: 01/01/2024</p><hr><p>Ingredientes: 100% Alface.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/lettuce.png">
    <p class="grocery-product-name">
        ${lang == "en" ? "Lettuce" : lang == "pt" ? "Alface" : null}
        <button class="grocery-product-info">i</button>
    </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Lettuce</p>
            <hr><p>Expires in: 01/01/2024</p><hr><p>Ingredients: 100% Lettuce.</p>` :
            lang == "pt" ? `<p>Alface</p>
            <hr><p>Data de validade: 01/01/2024</p><hr><p>Ingredientes: 100% Alface.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/lettuce.png">
    <p class="grocery-product-name">
        ${lang == "en" ? "Lettuce" : lang == "pt" ? "Alface" : null}
        <button class="grocery-product-info">i</button>
    </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Lettuce</p>
            <hr><p>Expires in: 01/01/2024</p><hr><p>Ingredients: 100% Lettuce.</p>` : 
            lang == "pt" ? `<p>Alface</p>
            <hr><p>Data de validade: 01/01/2024</p><hr><p>Ingredientes: 100% Alface.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/lettuce.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Lettuce" : lang == "pt" ? "Alface" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Lettuce</p>
            <hr><p>Expires in: 01/01/2024</p><hr><p>Ingredients: 100% Lettuce.</p>` :
                lang == "pt" ? `<p>Alface</p>
            <hr><p>Data de validade: 01/01/2024</p><hr><p>Ingredientes: 100% Alface.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front">
        <img draggable="false" src="./media/images/pantry/packaged-baby-tomatoes.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Japanese cherry tomatoes" : lang == "pt" ? "Tomates cherry japoneses" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Japanese Cherry Tomatoes</p>
            <hr><p>Expires in: 01/01/2024</p><hr><p>Ingredients: 100% Cherry tomatoes from Hokkaido, Japan.</p>` :
        lang == "pt" ? `<p>Tomates Cherry Japoneses</p>
            <hr><p>Data de validade: 01/01/2024</p><hr><p>Ingredientes: 100% Tomates cherry de Hokkaido, Japão.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front">
    <img draggable="false" src="./media/images/pantry/packaged-baby-tomatoes.png">
    <p class="grocery-product-name">
        ${lang == "en" ? "Japanese cherry tomatoes" : lang == "pt" ? "Tomates cherry japoneses" : null}
        <button class="grocery-product-info">i</button>
    </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Japanese Cherry Tomatoes</p>
            <hr><p>Expires in: 01/01/2024</p><hr><p>Ingredients: 100% Cherry tomatoes from Hokkaido, Japan.</p>` :
        lang == "pt" ? `<p>Tomates Cherry Japoneses</p>
            <hr><p>Data de validade: 01/01/2024</p><hr><p>Ingredientes: 100% Tomates cherry de Hokkaido, Japão.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front">
        <img draggable="false" src="./media/images/pantry/vasso-water.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "VASSO Water 1L" : lang == "pt" ? "Água VASSO 1L" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>VASSO Water</p>
            <hr><p>Expires in: 01/01/2026</p><hr><p>Ingredients: 100% Artesian Water from Norway.</p>` :
        lang == "pt" ? `<p>Água VASSO</p>
            <hr><p>Data de validade: 01/01/2030</p><hr><p>Ingredientes: 100% Água artesanal da Noruega.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front">
        <img draggable="false" src="./media/images/pantry/avocado.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Avocado" : lang == "pt" ? "Abacate" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Avocado</p>
            <hr><p>Expires in: 10/05/2024</p><hr><p>Ingredients: 100% Avocado from Acapulco, Mexico.</p>` :
        lang == "pt" ? `<p>Abacate</p>
            <hr><p>Data de validade: 01/01/2030</p><hr><p>Ingredientes: 100% Abacate de Acapulco, México.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front">
        <img draggable="false" src="./media/images/pantry/avocado.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Avocado" : lang == "pt" ? "Abacate" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Avocado</p>
            <hr><p>Expires in: 01/01/2024</p><hr><p>Ingredients: 100% Avocado from Acapulco, Mexico.</p>` :
        lang == "pt" ? `<p>Abacate</p>
            <hr><p>Data de validade: 01/01/2030</p><hr><p>Ingredientes: 100% Abacate de Acapulco, México.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front">
        <img draggable="false" src="./media/images/pantry/jen&jerns.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Jen&Jern's Vanilla Chocolate and Strawberry Mix Ice Cream" :
        lang == "pt" ? "Gelado Jen&Jern's Mix Baunilha, Chocolate e Morango" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Jen&Jern's Vanilla Chocolate and Strawberry Mix Ice Cream</p>
            <hr><p>Expires in: 01/01/2024</p><hr><p>Ingredients: Cream, Chocolate, Strawberries, Concentrated skim milk, Sugar, Frozen egg yolk, 
            Guar gum, Vanilla extract, Vanilla bean specks, Carrageenan.</p>` :
        lang == "pt" ? `<p>Jen&Jern's Vanilla Chocolate and Strawberry Mix Ice Cream</p>
            <hr><p>Data de validade: 01/01/2024</p><hr><p>Ingredientes: Creme, Chocolate, Morangos, Leite desnatado concentrado, Açúcar, Gema de ovo congelada,
            Goma guar, extrato de baunilha, grãos de baunilha, carragenina.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front">
        <img draggable="false" src="./media/images/pantry/jen&jerns.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Jen&Jern's Vanilla Chocolate and Strawberry Mix Ice Cream" :
        lang == "pt" ? "Gelado Jen&Jern's Mix Baunilha, Chocolate e Morango" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Jen&Jern's Vanilla Chocolate and Strawberry Mix Ice Cream</p>
            <hr><p>Expires in: 02/02/2024</p><hr><p>Ingredients: Cream, Chocolate, Strawberries, Concentrated skim milk, Sugar, Frozen egg yolk, 
            Guar gum, Vanilla extract, Vanilla bean specks, Carrageenan.</p>` :
        lang == "pt" ? `<p>Jen&Jern's Vanilla Chocolate and Strawberry Mix Ice Cream</p>
            <hr><p>Data de validade: 01/01/2024</p><hr><p>Ingredientes: Creme, Chocolate, Morangos, Leite desnatado concentrado, Açúcar, Gema de ovo congelada,
            Goma guar, extrato de baunilha, grãos de baunilha, carragenina.</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/buttery-butter.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "Buttery Butter" : lang == "pt" ? "Manteiga Buttery" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Buttery Butter</p>
            <hr><p>Expires in: 03/03/2024</p><hr><p>Ingredients: Plant-Based oil Blend From Canola, Coconut and Sunflower Oils, Water, Salt, Sunflower Lecithin, 
            Faba Bean Protein, Citric Acid, Natural Flavor, Glucose, Beta Carotene (Color).</p>` :
        lang == "pt" ? `<p>Manteiga Buttery/p>
            <hr><p>Data de validade: 03/03/2024</p><hr><p>Ingredientes: Mistura de óleos vegetais de canola, óleos de coco e girassol, água, sal, 
            lecitina de girassol, proteína de fava, ácido cítrico, sabor natural, glicose, beta-caroteno (cor).</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/buttery-butter.png">
    <p class="grocery-product-name">
        ${lang == "en" ? "Buttery Butter" : lang == "pt" ? "Manteiga Buttery" : null}
        <button class="grocery-product-info">i</button>
    </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>Buttery Butter</p>
            <hr><p>Expires in: 03/03/2024</p><hr><p>Ingredients: Plant-Based oil Blend From Canola, Coconut and Sunflower Oils, Water, Salt, Sunflower Lecithin, 
            Faba Bean Protein, Citric Acid, Natural Flavor, Glucose, Beta Carotene (Color).</p>` :
        lang == "pt" ? `<p>Manteiga Buttery/p>
            <hr><p>Data de validade: 03/03/2024</p><hr><p>Ingredientes: Mistura de óleos vegetais de canola, óleos de coco e girassol, água, sal, 
            lecitina de girassol, proteína de fava, ácido cítrico, sabor natural, glicose, beta-caroteno (cor).</p>` : null}
        </div>
    </div>`,

    `<div class="kitchen-smart-pantry-product-front"><img draggable="false" src="./media/images/pantry/box-water.png">
        <p class="grocery-product-name">
            ${lang == "en" ? "They Put Water In a Box Mineral Water 1L" :
        lang == "pt" ? "Água Mineral They Put Water In a Box 1L" : null}
            <button class="grocery-product-info">i</button>
        </p>
    </div>
    <div class="grocery-product-description kitchen-smart-pantry-product-back">
        <button class="return-button">
        </button>
        <div>
            ${lang == "en" ? `<p>They Put Water In a Box Mineral Water 1L</p>
            <hr><p>Expires in: 01/01/2030</p><hr><p>Ingredients 100% Water, Origin: Coimbra, Portugal.</p>` :
        lang == "pt" ? `<p>Água Mineral They Put Water In a Box 1L</p>
            <hr><p>Data de validade: 01/01/2030</p><hr><p>Ingredientes: 100% Água, Origem: Coimbra, Portugal.</p>` : null}
        </div>
    </div>`,
];