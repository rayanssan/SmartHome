"use strict";

// Function to retrieve the content from localStorage and update the h1 element 
if (localStorage.getItem("houseName")) {
    const savedContent = localStorage.getItem("houseName");
    if (savedContent && (savedContent.trim() == "My Home" || savedContent.trim() == "Minha Casa")) {
        languageSelect.value === 'en' ?
            document.getElementById("house-name").innerText = 'My Home' :
            languageSelect.value === 'pt' ?
                document.getElementById("house-name").innerText = 'Minha Casa' :
                null;
    }
    else if (savedContent) {
        document.getElementById("house-name").textContent = savedContent;
    }
}
else {
    languageSelect.value === 'en' ?
        document.getElementById("house-name").innerText = 'My Home' :
        languageSelect.value === 'pt' ?
            document.getElementById("house-name").innerText = 'Minha Casa' :
            null;
}

const houseName = document.getElementById("house-name");
// Add an event listener to save content to localStorage when the content changes
houseName.addEventListener("input", () => {
    // Limit house name to 50 characters
    const maxLength = 50;
    if (houseName.textContent.length > maxLength) {
        houseName.textContent = houseName.textContent.substring(0, 50);
        houseName.blur(); // Remove focus to prevent further input
    }

    localStorage.setItem("houseName", houseName.textContent.trim());
});

houseName.addEventListener("focusout", () => {
    houseName.textContent.length == 0 ?
        (languageSelect.value === 'en' ?
            document.getElementById("house-name").innerText = 'My Home' :
            languageSelect.value === 'pt' ?
                document.getElementById("house-name").innerText = 'Minha Casa' :
                null) : null;
    houseName.textContent = houseName.textContent.trim();
});

/**
 * Calculates and returns a contrasting text color based on the provided background color.
 * The function determines the brightness of the background color and suggests 'black' or 'white' as the text color
 * to ensure sufficient contrast for readability.
 *
 * @param {String} backgroundColor - The background color in CSS format (e.g., 'rgb(255, 255, 255)' or '#FFFFFF').
 * @returns {String} - The suggested contrasting text color ('black' or 'white').
 */
function calculateContrastColor(backgroundColor) {
    const rgb = backgroundColor.match(/\d+/g);
    if (rgb) {
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
        return brightness >= 128 ? 'black' : 'white';
    }
    return 'white';
}

if (localStorage.getItem("houseNameBackgroundColor")) {
    document.getElementById("house-name").style.backgroundColor = localStorage.getItem("houseNameBackgroundColor");
    const textColor = calculateContrastColor(document.getElementById("house-name").style.backgroundColor);
    document.getElementById("house-name").style.color = textColor;
}