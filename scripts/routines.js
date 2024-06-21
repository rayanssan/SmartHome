"use strict";

var openslider;
var tempoutput;
var tempValue;
let routinesDOM;
const elementsToHide = ['AC', 'TV', 'Lights', 'Blinds'];
document.getElementById('set-routine-button-main').addEventListener("click", () => {
    document.querySelector("#content-windows").style.display = "none";

    routinesDOM = document.createElement("div");
    routinesDOM.innerHTML = `
    <div id="routinesWindow" style="display: flex; flex-direction: column;
    align-items: center;">
        <div id="listbox">
            <ul id="routineList"></ul>
        </div>
        <div id="activitybox">
            <button class="return-button">
                <svg class="svg-icon" 
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
                </svg>
            </button>
            <p id="set-activity-text" >${lang == "en" ? "Set Activity" : "Adicionar Atividade"}</p>
            <form id="routineForm">

                <div id="task_forms">
                    <div name="TV">
                        <details>
                            <summary> TV </summary>
                            <input type="checkbox" id="tv-on" name="tv-rt" value="On">
                            <label for="tv-on">On</label><br>
                            <input type="checkbox" id="tv-off" name="tv-rt" value="Off">
                            <label for="tv-off">Off</label><br>
                            <label for="tvTime">Time:</label>
                            <input onfocus="this.showPicker()" type="time" id="tvTime" name="tvTime" required>
                        </details>
                    </div>
                    <div name="Lights">
                        <details>
                            <summary> Lights </summary>
                            <input type="checkbox" id="Lights-on" name="Lights-rt" value="On">
                            <label for="Lights-on">On</label><br>
                            <input type="checkbox" id="Lights-off" name="Lights-rt" value="Off">
                            <label for="Lights-off">Off</label><br>
                            <label for="lighTime">Time:</label>
                            <input onfocus="this.showPicker()" type="time" id="lighTime" name="lighTime" required>
                        </details>
                    </div>

                    <div name="Vacuum Robot">
                        <details>
                            <summary> Vacuum Robot </summary>
                            <input type="checkbox" id="vacc-on" name="vacc-rt" value="On" checked style="display:none;">
                            <label for="vacTime">Time:</label>
                            <input onfocus="this.showPicker()" type="time" id="vacTime" name="vacTime" required>
                        </details>
                    </div>

                    <div name="Blinds">
                        <details>
                            <summary> Blinds </summary>
                            <input type="range" id="openrange" min="0" max="100" value="50">
                            <p>Open: <span id="opendemo"></span> %</p>
                            <label for="windTime"> Time:</label>
                            <input onfocus="this.showPicker()" type="time" id="windTime" name="windowTime" required>
                        </details>
                    </div>

                    <div name="AC">
                        <details>
                            <summary> AC </summary>
                            <input type="checkbox" id="ac-on" name="ac-rt" value="On">
                            <label for="ac-on">On</label><br>
                            <input type="checkbox" id="ac-off" name="ac-rt" value="Off">
                            <label for="ac-off">Off</label><br>
                            
                            <div style= "display: flex;
                            align-items: center;
                            justify-content: center;
                            align-content: space-around;
                            flex-direction: row;
                            margin-top: 8px;" id="tempbuts">
                                <button id="temp-minus" type = "button" style= "height: 30px; width:30px;"
                                onclick="this.parentNode.querySelector('input[type=number]').stepDown()">-</button>
                                <input id="tempdemo" type="number" class="AC-temp-display" value="16" min="16" max="30"><span>ºC</span>
                                <button id="temp-plus"type = "button" style= "height: 30px;"
                                onclick="this.parentNode.querySelector('input[type=number]').stepUp()">+</button>
                            </div>

                            <label for="acTime"> Time:</label>
                            <input onfocus="this.showPicker()" type="time" id="acTime" name="acTime" required>
                        </details>
                    </div>
                </div>

                <div id="activity-fieldsets">
                    <fieldset id="weekdays">
                        <legend>Weekdays:</legend>
                        <input type="checkbox" id="monday" name="weekday" value="monday">
                        <label for="monday">Monday</label><br>

                        <input type="checkbox" id="tuesday" name="weekday" value="tuesday">
                        <label for="tuesday">Tuesday</label><br>

                        <input type="checkbox" id="wednesday" name="weekday" value="wednesday">
                        <label for="wednesday">Wednesday</label><br>

                        <input type="checkbox" id="thursday" name="weekday" value="thursday">
                        <label for="thursday">Thursday</label><br>

                        <input type="checkbox" id="friday" name="weekday" value="friday">
                        <label for="friday">Friday</label><br>

                        <input type="checkbox" id="saturday" name="weekday" value="saturday">
                        <label for="saturday">Saturday</label><br>

                        <input type="checkbox" id="sunday" name="weekday" value="sunday">
                        <label for="sunday">Sunday</label><br>
                    </fieldset>
    
                    <fieldset class="location-options" id="locationOptions">
                        <legend>${lang == "en" ? "In" : "Em"}:</legend>
                        <input type="radio" id="routineEnvironmentOption-All Environments" name="room" value="All Environments" checked>
                        <label for="routineEnvironmentOption-All Environments">${lang == "en" ? "All Environments" : "Todos os Ambientes"}</label><br>
                        ${environments.map(environment => `
                        <input type="radio" id="routineEnvironmentOption-${environment.name}" name="room" value="${environment.name}">
                        <label for="routineEnvironmentOption-${environment.name}">${environment.name}</label><br>`).join('')}
                    </fieldset>
                </div>

                <button type="button" id="set-routine-button" onclick="validateForm()">${lang == "en" ? "Add to Routine" : "Adicionar à rotina"}</button>
            </form>

            <hr>

            <button id="clearLocalStorageBtn" style="width: 75%; max-width: 370.11px; margin-right: auto; margin-left: auto;">
            ${lang == "en" ? "Delete All Routines" : "Deletar todas as rotinas"}</button>

        </div>
    </div>`;

    initialize();

    document.querySelector("main").appendChild(routinesDOM);

    var openslider = document.getElementById('openrange');
    document.getElementById('opendemo').innerHTML = openslider.value;

    // Event listener for radio buttons
    routinesDOM.querySelectorAll('#locationOptions input[type=radio]').forEach(radio => {
        radio.addEventListener("input", () => {
            if (radio.value == "All Environments") {
                elementsToHide.forEach(element => {
                    const elementDiv = routinesDOM.querySelector(`#task_forms div[name=${element}]`);
                    elementDiv.style.display = "block";

                    // Clear inputs inside the displayed element
                    elementDiv.querySelectorAll('input[type=time]').forEach(input => {
                        input.value = '';
                    });
                });
            } else {
                const selectedEnvironment = JSON.parse(localStorage.getItem('environments')).find(environment => environment.name === radio.value);

                elementsToHide.forEach(element => {
                    const elementDiv = routinesDOM.querySelector(`#task_forms div[name=${element}]`);
                    const shouldDisplay = selectedEnvironment.products.some(product => product.includes(element));
                    elementDiv.style.display = shouldDisplay ? "block" : "none";

                    // Clear inputs inside the displayed or hidden element
                    elementDiv.querySelectorAll('input[type=time]').forEach(input => {
                        input.value = '';
                    });
                });
            }
        });
    });


    openslider.oninput = function () {
        if (this.value == 0) {
            routinesDOM.querySelector("#openrange + p").innerHTML = lang == "en" ? "closed" : "fechado";
        }
        else {
            if (routinesDOM.querySelector("#openrange + p").innerHTML == lang == "en" ? "closed" : "fechado") {
                routinesDOM.querySelector("#openrange + p").innerHTML = `<p>Open: <span id="opendemo"></span> %</p>`;
                document.getElementById('opendemo').innerHTML = this.value;
            }
        }
    }

    routinesDOM.querySelector("#tempdemo").addEventListener("input", (event) => {
        if (isNaN(event.target.value)) {
            event.target.value = 1;
        }
        else if (event.target.value.length > 2) {
            event.target.value = event.target.value.slice(0, 2); // Truncate the input to the first 2 characters
        }
    });
    routinesDOM.querySelector("#tempdemo").addEventListener("focusout", (event) => {
        // Restrict input value to between 16 and 30
        if (event.target.value < 16 || isNaN(event.target.value)) {
            event.target.value = 16;
        }
        else if (event.target.value > 30) {
            event.target.value = 30;
        }
        else {
            event.target.value = parseInt(event.target.value);
        }
    });

    function clearLocalStorage() {
        showConfirmationDialog(lang == "en" ? 'Are you sure you want to delete all routines?<br>This action is irreversible!' :
            lang == "pt" ? 'Tem certeza que quer deletar todas as rotinas<br>Esta ação é irreversível!' : null,
            lang == "en" ? 'Yes' : lang == "pt" ? 'Sim' : null, lang == "en" ? 'No' :
            lang == "pt" ? 'Não' : null, "negative", "routine", document.getElementById("activitybox"),
            lang == "en" ? "All routines were deleted" : lang == "pt" ? 'Todas as rotinas foram deletadas' : null, () => {
                localStorage.removeItem("routines");
                document.body.style.cursor = "wait";
                setTimeout(() => {
                    location.reload();
                }, 1500);
            }
        );
        return;
    }

    // Attach the function to the button click event
    document.getElementById("clearLocalStorageBtn").addEventListener("click", clearLocalStorage);

    displayRoutines();

    routinesDOM.querySelector(".return-button").addEventListener("click", event => {
        event.preventDefault();

        showConfirmationDialog(
            lang == "en" ? "Are you sure you want to return without creating this activity?" : "Tem certeza que quer voltar sem criar esta atividade?",
            lang == "en" ? "Yes" : "Sim",
            lang == "en" ? "No" : "Não",
            "negative",
            "routine",
            document.getElementById("activitybox"),
            null,
            () => {
                document.querySelector("#content-windows").style.removeProperty("display");
                routinesDOM.remove();
                displayRoutines(true);
            }
        );
    });
})

const routine = {};

function saveRoutine() {

    const weekdays = Array.from(document.getElementById("routinesWindow").querySelectorAll('[name="weekday"]'))
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    const rooms = Array.from(document.getElementById("routinesWindow").querySelectorAll('[name="room"]'))
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    const tasks = saveTasks();

    if (tasks.length > 0 && rooms.length > 0 && weekdays.length > 0) {
        const routine = {
            tasks: tasks,
            rooms: rooms,
            weekdays: weekdays,
        };
        localStorage.setItem('routines', JSON.stringify([...JSON.parse(localStorage.getItem('routines')) || [], routine]));

        displayRoutines();

        // Reset form elements
        resetForm();
    } else {
    }
}

function initialize() {
    function updateButtonStatus() {
        const button = routinesDOM.querySelector("#set-routine-button");
        const routinesWindow = routinesDOM.querySelector("#routinesWindow");

        if (!routinesWindow) {
            console.error("Element with ID 'routinesWindow' not found.");
            return;
        }

        const weekdays = Array.from(routinesWindow.querySelectorAll('[name="weekday"]'))
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const rooms = Array.from(routinesWindow.querySelectorAll('[name="room"]'))
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const tasks = saveTasks(routinesWindow);

        button.disabled = !(tasks.length > 0 && rooms.length > 0 && weekdays.length > 0);

        if (button.disabled) {
            button.style.backgroundColor = "gray";
            button.style.cursor = "not-allowed";
        } else {
            button.style.backgroundColor = "";
            button.style.cursor = "";
        }
    }
    updateButtonStatus();

    setInterval(updateButtonStatus, 1000);
}

function saveTasks(routinesWindow = document.getElementById("routinesWindow")) {
    const tasks = [];
    let taskElements;
    if (routinesWindow) {
        taskElements = routinesWindow.querySelectorAll('#task_forms [name]');

        taskElements.forEach(taskElement => {
            const taskName = taskElement.getAttribute('name');
            const stateElement = taskElement.querySelector('input[type="checkbox"]:checked');
            const timeElement = taskElement.querySelector('input[type="time"]');
            const rangeElement = taskElement.querySelector('input[type="range"]');
            const ACElement = taskElement.querySelector('input[type="number"]');

            if (((stateElement !== null && stateElement.value !== null) ||
                (rangeElement !== null && rangeElement.value !== null)) &&
                (timeElement !== null && timeElement.value !== null && timeElement.value.trim() !== '')) {
                const task = {
                    taskname: taskName,
                    state: stateElement ? stateElement.value : null,
                    time: timeElement ? timeElement.value : null,
                    range: rangeElement ? rangeElement.value : null,
                    ACElement: ACElement ? ACElement.value + "ºC" : null
                };

                tasks.push(task);
            }
        });
    }
    return tasks;
}

function resetForm() {
    // Reset form elements by type
    ['checkbox', 'checkbox', 'select-one', 'text'].forEach(type => {
        document.getElementById("routinesWindow").querySelectorAll(`input[type="${type}"], select[type="${type}"]`).forEach(element => {
            if (type === 'select-one') {
                element.selectedIndex = 0;
            } else if (type === 'text') {
                element.value = '';
            } else {
                element.checked = false;
            }
        });
    });


    const form = document.getElementById("routinesWindow").querySelector('form');
    if (form) {
        form.reset();
    }
}

function displayRoutines(displayMain = false) {
    let routineList;
    if (displayMain) {
        routineList = document.getElementById('routine');
    }
    else {
        routineList = document.getElementById('routineList');
    }

    if (Object.keys(JSON.parse(localStorage.getItem('routines')) || []).length === 0) {
        routineList.innerHTML = lang == "en" ? "No Activities Yet..." : lang == "pt" ? "Nenhuma Atividade Definida Ainda..." : null;
    }
    else if (routineList.innerHTML.includes("No Activities Yet...") || routineList.innerHTML.includes("Nenhuma Atividade Definida Ainda...")) {
        routineList.innerHTML = "";
    }
    else {
        routineList.innerHTML = "";
    }

    const routines = JSON.parse(localStorage.getItem('routines')) || [];

    routines.forEach((routine, index) => {
        const listItem = document.createElement('li'); // Move this line here

        let buttonsWrapper = document.createElement('div');
        buttonsWrapper.classList.add("routine-list-buttons-wrapper");
        listItem.appendChild(buttonsWrapper);

        const editButton = document.createElement('button');
        editButton.style = "background-color: rgba(255, 255, 255, 0.7);\
        color: black;";
        editButton.innerHTML = `<svg fill="none" height="24" stroke="currentColor" 
        stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" viewBox="0 0 24 24" 
        width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`;
        editButton.addEventListener('click', function () {
            editRoutine(index);
            routinesDOM.querySelector('#routineList').querySelectorAll("button").forEach(button => {
                if (button.style.backgroundColor == "orange") {
                    button.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
                }
            });
            this.style.backgroundColor = "orange";

            let checkedRadio = routinesDOM.querySelector('#locationOptions input[type=radio]:checked');
            routinesDOM.querySelector(`#task_forms div`).style.display = "none";
            if (checkedRadio.value == "All Environments") {
                elementsToHide.forEach(element => {
                    const elementDiv = routinesDOM.querySelector(`#task_forms div[name=${element}]`);
                    elementDiv.style.display = "block";
                });
            } else {
                const selectedEnvironment = JSON.parse(localStorage.getItem('environments')).find(environment => environment.name === checkedRadio.value);

                elementsToHide.forEach(element => {
                    const elementDiv = routinesDOM.querySelector(`#task_forms div[name=${element}]`);
                    const shouldDisplay = selectedEnvironment.products.some(product => product.includes(element));
                    elementDiv.style.display = shouldDisplay ? "block" : "none";
                });
            }
        });
        buttonsWrapper.appendChild(editButton);

        // Remove Button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.addEventListener('click', function () {
            showConfirmationDialog(
                lang == "en" ? "Are you sure you want to remove this activity from your routine?<br>This action is irreversible!" :
                    "Tem certeza que quer remover esta atividade da sua rotina?<br>Esta ação é irreversível!",
                lang == "en" ? "Yes" : "Sim",
                lang == "en" ? "No" : "Não",
                "negative",
                "routineList",
                document.getElementById("listbox"),
                lang == "en" ? "Routine deleted" : "Rotina deletada",
                () => {
                    removeRoutine(index);
                });
        });
        buttonsWrapper.appendChild(removeButton);

        const routineDetails = document.createElement('p');
        const tdeets = [];
        routine.tasks.forEach(task => {
            const taskDetails = ` ${task.taskname} - ${task.state !== null ? task.state + ' ' : ''} ${task.range !== null && task.range > 0 ? `${lang == "en" ? "Open" : "Aberto"} ${task.range}%` : task.range !== null & task.range == 0 ? lang == "en" ? 'Closed' : "Fechado" : ''}\
            ${task.ACElement !== null ? task.ACElement + ' ' : ''}${lang == "en" ? "at" : "as"}: ${task.time},`;
            tdeets.push(taskDetails);
        });

        let translatedRooms = [];
        if (lang == "pt") {
            for (let environment of routine.rooms) {
                if (environment == "Bathroom") {
                    translatedRooms.push("Casa de Banho");
                }
                else if (environment == "Bedroom") {
                    translatedRooms.push("Quarto");
                }
                else if (environment == "Office") {
                    translatedRooms.push("Escritório");
                }
                else if (environment == "Living Room") {
                    translatedRooms.push("Sala de Estar");
                }
                else if (environment == "Kitchen") {
                    translatedRooms.push("Cozinha");
                }
                else if (environment == "All Environments") {
                    translatedRooms.push("Todos os Ambientes");
                }
                else {
                    translatedRooms.push(environment);
                }
            }
        }

        routineDetails.textContent = `${tdeets} ${lang == "en" ? "in" : "em"}: ${lang == "en" ? routine.rooms.join(', ') : translatedRooms.join(', ')}, \
        ${lang == "en" ? "on" : "na/no"}: ${routine.weekdays.join(', ')}`.replace(',,', ',');
        listItem.prepend(routineDetails);

        routineList.appendChild(listItem);
    });
}

function editRoutine(index) {

    const routines = JSON.parse(localStorage.getItem('routines')) || [];
    const routine = routines[index];
    document.getElementById("set-activity-text").innerHTML = lang == "en" ? "Editing Activity:" : "Editando Atividade:";

    if (!routinesDOM.querySelector(".cancel-editing-button")) {
        const cancelButton = document.createElement("button");
        cancelButton.classList.add("cancel-editing-button");
        cancelButton.style = "width: 75%;\
    margin-top: 20px;\
    margin-bottom: -10px";
        cancelButton.innerText = lang === "en" ? "Cancel Editing" : "Cancelar edição";
        const setRoutineButtonParent = routinesDOM.querySelector('#set-routine-button').parentNode;
        setRoutineButtonParent.insertBefore(cancelButton, routinesDOM.querySelector('#set-routine-button'));
        cancelButton.addEventListener("click", () => {
            resetForm();
            cancelButton.remove();
            document.getElementById("set-activity-text").innerHTML = lang == "en" ? "Set Activity:" : "Adicionar Atividade:";
            routinesDOM.querySelector('#routineList').querySelectorAll("button").forEach(button => {
                if (button.style.backgroundColor == "orange") {
                    button.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
                }
            });
        })
    }

    // Clear existing selections
    resetForm();

    // Populate weekdays
    routine.weekdays.forEach(day => {
        const weekdayCheckbox = document.getElementById(day.toLowerCase());
        if (weekdayCheckbox) {
            weekdayCheckbox.checked = true;
        }
    });

    // Populate rooms
    routine.rooms.forEach(room => {
        const roomCheckbox = document.getElementById(`routineEnvironmentOption-${room}`);
        if (roomCheckbox) {
            roomCheckbox.checked = true;
        }
    });

    // Populate tasks
    routine.tasks.forEach(task => {
        const taskElement = document.querySelector(`#task_forms [name="${task.taskname}"]`);

        if (taskElement) {
            const statecheckbox = taskElement.querySelector(`input[value="${task.state}"]`);
            const rangeInput = taskElement.querySelector('input[type="range"]');
            const timeInput = taskElement.querySelector('input[type="time"]');
            const ACInput = taskElement.querySelector('input[type="number"]');

            if (statecheckbox) {
                statecheckbox.checked = true;
            }

            if (rangeInput) {
                rangeInput.value = task.range;
            }

            if (timeInput) {
                timeInput.value = task.time;
            }

            if (ACInput) {
                ACInput.value = parseInt(task.ACElement); // Assuming ACElement is a number
            }
        }
    });

    // Change the "Add to Routine" button to "Save Changes"
    document.getElementById("set-routine-button").textContent = lang == "en" ? "Save Changes" : "Salvar Alterações";

    // Attach a new event listener to the button for saving changes
    document.getElementById("set-routine-button").onclick = function () {
        showConfirmationDialog(
            lang == "en" ? "Are you sure you want to edit this routine?" :
                "Tem certeza que quer editar esta rotina?",
            lang == "en" ? "Yes" : "Sim",
            lang == "en" ? "No" : "Não",
            "negative",
            "routine",
            document.getElementById("activitybox"),
            lang == "en" ? "Activity edited with success" : "Atividade editada com sucesso",
            () => {
                document.getElementById("set-activity-text").innerHTML = lang == "en" ? "Set Routine:" : "Adicionar Atividade:";
                saveChanges(index);
                routinesDOM.querySelector('#routineList').querySelectorAll("button").forEach(button => {
                    if (button.style.backgroundColor == "orange") {
                        button.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
                    }
                });
            }
        )
    };
}


function saveChanges(index) {
    const weekdays = Array.from(document.getElementById("routinesWindow").querySelectorAll('input[name="weekday"]:checked')).map(checkbox => checkbox.value);
    const rooms = Array.from(document.getElementById("routinesWindow").querySelectorAll('input[name="room"]:checked')).map(checkbox => checkbox.value);

    const tasks = saveTasks();

    if (tasks.length > 0 && rooms.length > 0 && weekdays.length > 0) {
        const updatedRoutine = {
            tasks: tasks,
            rooms: rooms,
            weekdays: weekdays,
        };

        const routines = JSON.parse(localStorage.getItem('routines')) || [];
        routines[index] = updatedRoutine;

        localStorage.setItem('routines', JSON.stringify(routines));

        displayRoutines();

        // Reset form elements
        resetForm();

        // Change the button back to "Add to Routine"
        document.getElementById("set-routine-button").textContent = lang == "en" ? "Add to Routine" : "Adicionar à rotina";

        // Attach the original event listener for adding routines
        document.getElementById("set-routine-button").onclick = validateForm;
    } else {
        // Handle validation error (e.g., display an alert)
        alert(lang == "en" ? "Please select at least one weekday and one room." : lang == "pt" ? "Selecione pelo menos um dia da semana e um ambiente." : null);
    }
}


function removeRoutine(index) {
    // Retrieve the routines from localStorage
    const routines = JSON.parse(localStorage.getItem('routines')) || [];

    // Ensure that routines is an array
    if (!Array.isArray(routines)) {
        return;
    }

    // Ensure that the index is within the valid range
    if (index < 0 || index >= routines.length) {
        return;
    }

    // Remove the routine at the specified index
    routines.splice(index, 1);

    // Update the localStorage with the modified routines
    localStorage.setItem('routines', JSON.stringify(routines));

    // Update the displayed routines
    displayRoutines();
}

function validateForm() {

    const weekdays = document.getElementById("routinesWindow").querySelectorAll('input[name="weekday"]:checked');
    const rooms = document.getElementById("routinesWindow").querySelectorAll('input[name="room"]:checked');

    if (weekdays.length === 0 || rooms.length === 0) {
        alert(lang == "en" ? "Please select at least one weekday and one room." : lang == "pt" ? "Selecione pelo menos um dia da semana e um ambiente." : null);
        return false;
    }

    showConfirmationDialog(
        lang == "en" ? "Are you sure you want to add this activity to your routine?" : "Tem certeza que quer adicionar esta atividade a sua rotina?",
        lang == "en" ? "Yes" : "Sim",
        lang == "en" ? "No" : "Não",
        "positive",
        "routine",
        document.getElementById("activitybox"),
        lang == "en" ? "Activity successfully created" : "Atividade criada com sucesso",
        () => {
            saveRoutine();
            return true;
        }
    );
}

function getValueById(id) {
    return document.getElementById("routinesWindow").querySelector(`#${id}`).value;
}

displayRoutines(true);