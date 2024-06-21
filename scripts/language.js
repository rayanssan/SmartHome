"use strict";

let languageSelect = document.getElementById("language-select");

if (localStorage.getItem("language")) {
    languageSelect.value = localStorage.getItem("language");
}

languageSelect.addEventListener('change', () => {
    let dialog;
    let acceptDialog;
    let declineDialog;
    let confirmationMessage;
    if (lang == "en") {
        dialog = "Are you sure you want to change SmartHome's language to portuguese?";
        acceptDialog = "Yes";
        declineDialog = "No";
        confirmationMessage = "Idioma alterado com sucesso";
    }
    else if (lang == "pt") {
        dialog = "Tem certeza que quer mudar o idioma da SmartHome para inglês?";
        acceptDialog = "Sim";
        declineDialog = "Não";
        confirmationMessage = "Language altered successfully";
    }
    showConfirmationDialog(dialog, acceptDialog, declineDialog, "negative",
        "language", document.getElementsByTagName("footer")[0], confirmationMessage, () => {
            localStorage.setItem("language", languageSelect.value);
            localStorage.removeItem("environmentOrder");
            document.body.style.pointerEvents = "none";
            document.body.style.cursor = "wait";
            // Wait for confirmation message
            setTimeout(() => {
                location.reload();
            }, 3000);
        });
});

/**
 * Replaces all instances of a given string in the HTML document with the given replacement string.
 * Used for translating between english and portuguese.
 *
 * @param {string} targetString - The specific string to be replaced.
 * @param {string} replacementString - The string to replace the targetString with.
 */
function replaceString(targetString, replacementString) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const nodesToReplace = [];

    // Create a regular expression with word boundaries
    const regex = new RegExp(`\\b${targetString}\\b`, 'g');

    // Check if the current node value is one of these words, so they get replaced only if they are not part of larger string, 
    // ex: "Jorge's Bedroom", a name that was given, should not become "Jorge's Quarto", only "Bedroom" should become "Quarto".
    if (["Bedroom", "Office", "Kitchen", "Bathroom", "Living Room", "Casa de Banho", "Escritório", "Cozinha", "Sala de Estar", "Quarto"].includes(targetString)) {
        while (walker.nextNode()) {
            const currentNodeValue = walker.currentNode.nodeValue.trim();

            if (["Bedroom", "Office", "Kitchen", "Bathroom", "Living Room", "Casa de Banho", "Escritório", "Cozinha", "Sala de Estar", "Quarto"].includes(currentNodeValue)) {
                nodesToReplace.push(walker.currentNode);
            }
        }
    }
    else {
        while (walker.nextNode()) {
            if (regex.test(walker.currentNode.nodeValue)) {
                nodesToReplace.push(walker.currentNode);
            }
        }
    }

    nodesToReplace.forEach(node => {
        node.nodeValue = node.nodeValue.replace(regex, replacementString);
    });
}

if (document.body.id == "SmartHomePage") {
    if (languageSelect.value === 'en') {
        document.documentElement.lang = "en";
        document.getElementById("preferences-text").innerText = 'General';
        document.getElementById("profiles").children[0].innerText = 'Profiles';
        document.getElementById("routine-text").innerText = 'My Routine';
        document.getElementById("environments-text").innerText = 'Environments';
        document.getElementById("climate-button-text").innerText = "Climate";
        document.getElementById("lights-button-text").innerText = "Lights";
        document.getElementById("AI-button-text").innerText = "SmartHome Assistant";
        document.getElementById("blinds-button-text").innerText = "Blinds";
        document.getElementById("vacuum-robot-button-text").innerText = "Vacuum Robot";
        document.getElementById("groceries-button-text").innerText = "SmartHome Groceries";
        document.getElementById("set-routine-button-main").innerText = "Set Routine";
        if (document.getElementById("routine").innerText == "Nenhuma Atividade Definida Ainda...") {
            document.getElementById("routine").innerText = "No Activities Yet...";
        }
        document.getElementById("add-environment-button-text").innerText = "Add Environment";
        Array.from(document.getElementById("settings").children)[1].innerText = "Restore layout";

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    replaceString("Quarto", "Bedroom");
                    replaceString("Escritório", "Office");
                    replaceString("Sala de Estar", "Living Room");
                    replaceString("Casa de Banho", "Bathroom");
                    replaceString("Cozinha", "Kitchen");
                }
            });
        });
        const config = { childList: true, subtree: true };
        observer.observe(document, config);
    } else if (languageSelect.value === 'pt') {
        document.documentElement.lang = "pt";
        document.getElementById("preferences-text").innerText = 'Opções Gerais';
        document.getElementById("profiles").children[0].innerText = 'Perfis';
        document.getElementById("routine-text").innerText = 'Minha Rotina';
        document.getElementById('user-address').innerHTML = `Sua morada:
        <br>
        Rua Nicki,<br> 
        Nº 123,<br>
        Gag City,<br>
        Floptropica.`;
        document.getElementById("environments-text").innerText = 'Ambientes';
        document.getElementById("climate-button-text").innerText = "Climatização";
        document.getElementById("lights-button-text").innerText = "Luzes";
        document.getElementById("AI-button-text").innerText = "Assistente SmartHome";
        document.getElementById("blinds-button-text").innerText = "Estores";
        document.getElementById("vacuum-robot-button-text").innerText = "Robô Aspirador";
        document.getElementById("groceries-button-text").innerText = "Mercearia SmartHome";
        document.getElementById("set-routine-button-main").innerText = "Definir Rotina";
        if (document.getElementById("routine").innerText == "No Activities Yet...") {
            document.getElementById("routine").innerText = "Nenhuma Atividade Definida Ainda...";
        }
        document.getElementById("add-environment-button-text").innerText = "Adicionar Ambiente";
        Array.from(document.getElementById("settings").children)[1].innerText = "Restorar layout";

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    replaceString("Bedroom", "Quarto");
                    replaceString("Office", "Escritório");
                    replaceString("Living Room", "Sala de Estar");
                    replaceString("Bathroom", "Casa de Banho");
                    replaceString("Kitchen", "Cozinha");
                    // Routine elements
                    replaceString("Routines", "Rotinas");
                    replaceString("Activity", "Atividade");
                    replaceString("Lights", "Luzes");
                    replaceString("Vacuum Robot", "Robô Aspirador");
                    replaceString("Blinds", "Estores");
                    replaceString("Time", "Horário");
                    replaceString("Open", "Aberto");
                    replaceString("On", "Ligado");
                    replaceString("Off", "Desligado");
                    replaceString("Weekdays", "Dias");
                    replaceString("Monday", "Segunda-feira");
                    replaceString("Tuesday", "Terça-feira");
                    replaceString("Wednesday", "Quarta-feira");
                    replaceString("Thursday", "Quinta-feira");
                    replaceString("Friday", "Sexta-feira");
                    replaceString("Saturday", "Sábado");
                    replaceString("Sunday", "Domingo");
                    replaceString("Monday".toLowerCase(), "Segunda-feira".toLowerCase());
                    replaceString("Tuesday".toLowerCase(), "Terça-feira".toLowerCase());
                    replaceString("Wednesday".toLowerCase(), "Quarta-feira".toLowerCase());
                    replaceString("Thursday".toLowerCase(), "Quinta-feira".toLowerCase());
                    replaceString("Friday".toLowerCase(), "Sexta-feira".toLowerCase());
                    replaceString("Saturday".toLowerCase(), "Sábado".toLowerCase());
                    replaceString("Sunday".toLowerCase(), "Domingo".toLowerCase());
                    replaceString("Remove", "Remover");
                    replaceString("Delete this profile", "Deletar este perfil");
                }
            });
        });
        const config = { childList: true, subtree: true };
        observer.observe(document, config);
    }
}
else if (document.body.id == "SmartHomeGroceriesPage") {
    if (languageSelect.value === 'en') {
        document.documentElement.lang = "en";
        document.getElementById("logo").children[1].textContent = 'SmartHome Groceries';
        document.getElementById("stores-text").textContent = 'Stores nearby';
    }
    else if (languageSelect.value === 'pt') {
        document.documentElement.lang = "pt";
        document.title = "Mercearia SmartHome";
        document.getElementById('user-address').innerHTML = `Sua morada:
        <br>
        Rua Nicki,<br> 
        Nº 123,<br>
        Gag City,<br>
        Floptropica.`;
        document.getElementById("logo").children[1].textContent = 'Mercearia SmartHome';
        document.getElementById("stores-text").textContent = 'Lojas próximas';
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    replaceString("unit", "unidade");
                    replaceString("units", "unidades");
                    replaceString("Search Products", "Procurar Produtos");
                    replaceString("Welcome to", "Bem-vindo a");
                    replaceString("SmartHome Groceries", "Mercearia SmartHome");
                    replaceString("Delete this profile", "Deletar este perfil");
                }
            });
        });
        const config = { childList: true, subtree: true };
        observer.observe(document, config);
    }
}
else if (document.body.id == "SmartHomeAddUserPage") {
    if (languageSelect.value === 'pt') {
        document.documentElement.lang = "pt";
        document.title = "SmartHome | Criar Perfil";
        document.querySelector(".addUser-text").innerText = "Criar novo perfil";
        document.getElementById("formUser").children[1].innerText = "Nome do novo usuário";
        document.querySelector(".admin").childNodes[0].textContent = "Marque esta caixa se o novo usuário for um administrador";
        document.querySelector(".subp").innerText = "*para dar permissões clique no botão abaixo";
        document.getElementById("permissions").innerText = "Ver lista de permissões";
        document.getElementById("climatePermission").innerText = "Climatização";
        document.getElementById("vacuumPermission").innerText = "Robô Aspirador";
        document.getElementById("blindsPermission").innerText = "Estores";
        document.getElementById("lightsPermission").innerText = "Luzes";
        document.getElementById("smartClosetPermission").innerText = "Closet Inteligente";
        document.getElementById("fireplacePermission").innerText = "Lareira";
        document.getElementById("assistantPermission").innerText = "Assistente SmartHome";
        document.getElementById("groceriesPermission").innerText = "Mercearia SmartHome";
        document.getElementById("routinesPermission").innerText = "Rotinas SmartHome";
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    replaceString("Allowed environments", "Ambientes permitidos");
                    replaceString("All Environments", "Todos os Ambientes");
                    replaceString("Pick the permissions you want to give", "Escolha as permissões que deseja conceder");
                    replaceString("Bedroom", "Quarto");
                    replaceString("Office", "Escritório");
                    replaceString("Living Room", "Sala de Estar");
                    replaceString("Bathroom", "Casa de Banho");
                    replaceString("Kitchen", "Cozinha");
                    replaceString("Confirm", "Confirmar");
                    replaceString("Cancel", "Cancelar");
                    replaceString("Pick your avatar", "Escolha o seu avatar");
                    replaceString("See the list of avatars", "Ver lista de avatares");
                    replaceString("to choose your avatar click the button below", "para escolher seu avatar clique no botão abaixo");
                }
            });
        });
        const config = { childList: true, subtree: true };
        observer.observe(document, config);
    }
}
else if (document.body.id == "SmartHomeProfilesPage") {
    if (languageSelect.value === 'pt') {
        document.documentElement.lang = "pt";
        document.title = "SmartHome | Perfis";
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    replaceString("Profiles", "Perfis");
                    replaceString("Add Profile", "Adicionar Perfil");
                }
            });
        });
        const config = { childList: true, subtree: true };
        observer.observe(document, config);
    }
}
else if (document.body.id == "SmartHomeHelpPage") {
    if (languageSelect.value === 'pt') {
        document.documentElement.lang = "pt";
        document.title = "SmartHome | Ajuda";
        document.getElementById('user-address').innerHTML = `Sua morada:
        <br>
        Rua Nicki,<br> 
        Nº 123,<br>
        Gag City,<br>
        Floptropica.`;
        document.getElementById("helpText1").innerHTML = '1 - Como definir configurações de climatização';
        document.getElementById("helpText2").innerText = '2 - Como gerir sua dispensa e comprar produtos com a Mercearia SmartHome';
        document.getElementById("helpText3").innerText = '3 - Como adicionar um novo ambiente';
        document.getElementById("helpText4").innerText = '4 - Como adicionar um novo perfil com restrições';
        document.getElementById("helpText5").innerText = '5 - Como adicionar atividades a sua rotina';
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    replaceString("Help", "Ajuda");
                    replaceString("Profiles", "Perfis");
                    replaceString("Delete this profile", "Deletar este perfil");
                }
            });
        });
        const config = { childList: true, subtree: true };
        observer.observe(document, config);
    } else if (languageSelect.value === 'en'){
    document.getElementById("helpText1").innerHTML = '1 - How to set climate settings';
    document.getElementById("helpText2").innerText = '2 - How to manage your pantry and shop with SmartHome Groceries';
    document.getElementById("helpText3").innerText = '3 - How to add a new environment';
    document.getElementById("helpText4").innerText = '4 - How to add a new profile with restrictions'
    document.getElementById("helpText5").innerText = '5 - How to add activities to your routine';
    }
}

let lang = languageSelect.value;