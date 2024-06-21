"use strict";

// Verify if there any climate products

let climateProducts;
if (localStorage.getItem('environments')) {
    climateProducts = JSON.parse(localStorage.getItem('environments'))
        .filter(environment => environment.products.some(product => product.includes("AC")) || environment.products.some(product => product.includes("Diffuser"))
            || environment.products.some(product => product.includes("AirPurifier")) ||
            environment.products.some(product => product.includes("Humidifier")) || environment.products.some(product => product.includes("Dehumidifier")))
}
if (climateProducts.length == 0) {
    document.getElementById("climate").parentElement.style.display = "none";
    document.getElementById("climate-stats").style.display = "none";
    document.getElementById("climate").parentElement.classList.add("product-not-available");
}
// Creating object instances for general section
let generalClimateInstance = new Climate(document.getElementById("climate"));

// Calculate the total number of lights in all environments
const calculateTotalLights = (environments) => {
    let totalLights = 0;

    environments.forEach((environment) => {
        const lightsKey = Object.keys(environment.productMultiples).find(key => key.includes("Lights"));

        if (environment.productMultiples[lightsKey]) {
            totalLights += environment.productMultiples[lightsKey];
        }
    });

    return totalLights;
};

const totalLights = calculateTotalLights(JSON.parse(localStorage.getItem('environments')));
if (totalLights == 0) {
    document.getElementById("lights").parentElement.style.display = "none";
    document.getElementById("lights").parentElement.classList.add("product-not-available");
}
let generalLightsInstance = new Lights(document.getElementById("lights"), totalLights);

// Calculate the total number of blinds in all environments
const calculateTotalBlinds = (environments) => {
    let totalBlinds = 0;

    environments.forEach((environment) => {
        // Assuming each environment has a property 'blinds' that represents the number of blinds
        const blindsKey = Object.keys(environment.productMultiples).find(key => key.includes("Blinds"));

        if (environment.productMultiples[blindsKey]) {
            totalBlinds += environment.productMultiples[blindsKey];
        }
    });

    return totalBlinds;
};
const totalBlinds = calculateTotalBlinds(JSON.parse(localStorage.getItem('environments')));
if (totalBlinds == 0) {
    document.getElementById("blinds-button").parentElement.style.display = "none";
    document.getElementById("blinds-button").parentElement.classList.add("product-not-available");
}
let generalBlindsInstance = new Blinds(document.getElementById("blinds-button"), totalBlinds);

let generalVacuumRobotInstance = new VacuumRobot();
