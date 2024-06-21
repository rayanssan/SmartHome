"use strict";

let chatGPTButton = document.getElementById("chatGPT");
let chatGPTIframe = document.createElement("iframe");
chatGPTIframe.id="ICG-iframe" ;
chatGPTIframe.setAttribute("allow", "clipboard-write");
chatGPTIframe.src="https://bot.insertchatgpt.com/embed/32acc5fb-84f6-4528-a1e8-fa838cd20a77?focus=true";

// Event listener for the chatGPT button
chatGPTButton.addEventListener("click", () => {
    preferencesOuterWindow.style.animation = "blur-transition-out 0.15s";
    setTimeout(() => {
        preferencesOuterWindow.style.animation = "blur-transition-in 0.15s";
        setTimeout(() => {
            preferencesOuterWindow.style.removeProperty("animation");
        }, 150);
        preferencesElements.forEach(element => {
            element.style.display = "none";
        });

        preferencesWindow.appendChild(chatGPTIframe);
        if (!navigator.onLine) {
            // No internet connection
            let noInternetMessage = document.createElement('p');
            noInternetMessage.id = "no-internet-message";
            noInternetMessage.innerHTML = "Feature unavailable: there is no internet connection.";
            preferencesWindow.replaceChild(noInternetMessage, chatGPTIframe);
        }
        preferencesReturnButton.style.removeProperty("display");
        preferencesWindow.style.display = "flex";
        preferencesOuterWindow.style.justifyContent = "space-between";
        if (lang === 'en') {
            preferencesText.innerText = "SmartHome Assistant";
        }
        else if (lang === 'pt') {
            preferencesText.innerHTML = "Assistente SmartHome<p class='subp'>Apenas disponível em inglês.</p>";
        }
        preferencesText.style.marginLeft = "42px";
    }, 150);
})