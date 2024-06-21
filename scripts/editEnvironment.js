"use strict";

editEnvironmentButton.addEventListener("click", () => {
    // Transition animations
    environmentsOuterWindow.style.animation = "blur-transition-out 0.15s";
    setTimeout(() => {
        environmentsOuterWindow.style.animation = "blur-transition-in 0.15s";
        setTimeout(() => {
            environmentsOuterWindow.style.removeProperty("animation");
        }, 150);

        Array.from(document.getElementsByClassName("environment-preference-button")).forEach(element => {
            element.style.display = "none";
        });

        editEnvironmentButton.style.display = "none";
        environmentsOuterWindow.style.flexDirection = "column";

        environmentsText.innerHTML = lang == "en" ? `Editing "<span>${localStorage.getItem("chosenEnvironmentName")}</span>"` : 
        `Editando "<span>${localStorage.getItem("chosenEnvironmentName")}</span>"`;

        let editEnvironmentForm = document.createElement("form");
        editEnvironmentForm.id = "edit-environment-form";
        environmentsWindow.appendChild(editEnvironmentForm);

        const environments = JSON.parse(localStorage.getItem("environments"));
        const chosenEnvironmentName = localStorage.getItem("chosenEnvironmentName");

        editEnvironmentForm.innerHTML = `
        <div id="edit-environment-details-settings">
            <details>
                <summary>${lang == "en" ? "Rename Environment" : "Renomear ambiente"}</summary>
                <div class="form-group">
                    <input id="rename-environment-input" type="text" maxlength="50" placeholder=" ">
                    <label>${lang == "en" ? "Rename environment" : "Renomear ambiente"}</label>
                </div>
                <button type="button" id="edit-environment-rename-submit-button" disabled>${lang == "en" ? "No changes to apply" : "Nenhuma mudança a aplicar"}</button>
            </details>

            <details>
                <summary>${lang == "en" ? "Delete Environment" : "Excluir Ambiente"}</summary>
                <button type="button" id="delete-environment-button" style="color: white; background: red;">
                ${lang == "en" ? "Delete environment" : lang == "pt" ? "Excluir Ambiente" : null}
                </button>
            </details>
        </div>`;

        let renameEnvironmentWrapper = document.createElement("div");
        renameEnvironmentWrapper.classList.add
        renameEnvironmentWrapper.innerHTML = `
        
        `;
        editEnvironmentForm.appendChild(renameEnvironmentWrapper);

        document.getElementById("rename-environment-input").addEventListener("input", () => {
            if (document.getElementById("rename-environment-input").value.trim() == "") {
                document.getElementById("edit-environment-rename-submit-button").disabled = true;
                document.getElementById("edit-environment-rename-submit-button").innerText = lang == "en" ? "No changes to apply" : "Nenhuma mudança a aplicar";
            }
            else {
                document.getElementById("edit-environment-rename-submit-button").disabled = false;
                document.getElementById("edit-environment-rename-submit-button").innerText = lang == "en" ? "Confirm" : "Confirmar";
            }
        });
        document.getElementById("edit-environment-rename-submit-button").addEventListener("click", () => {
            showConfirmationDialog(lang == "en" ? 'Are you sure you want to rename this environment?' :
                lang == "pt" ? 'Tem certeza que quer renomear este ambiente?' : null,
                lang == "en" ? 'Yes' :
                    lang == "pt" ? 'Sim' : null, lang == "en" ? 'No' :
                lang == "pt" ? 'Não' : null, "negative", "environments",
                environmentsOuterWindow, lang == "en" ? "Environment successfully renamed" : "Ambiente renomeado com sucesso", () => {
                    setTimeout(() => {
                        // Get the current environments from local storage
                        const environments = JSON.parse(localStorage.getItem("environments"));

                        environments.find(environment => environment.name == chosenEnvironmentName).name = document.getElementById("rename-environment-input").value;

                        // Save the updated environments back to local storage
                        localStorage.setItem("environments", JSON.stringify(environments));

                        // Reload the page
                        location.reload();
                    }, 3000);
                });
        });

        editEnvironmentForm.querySelector("#delete-environment-button").addEventListener("click", () => {
            showConfirmationDialog(lang == "en" ? 'Are you sure you want to delete this environment? This action is irreversible!' :
                lang == "pt" ? 'Tem certeza que quer excluir este ambiente? Esta ação é irreversível!' : null,
                lang == "en" ? 'Yes' :
                    lang == "pt" ? 'Sim' : null, lang == "en" ? 'No' :
                lang == "pt" ? 'Não' : null, "negative", "environments",
                environmentsOuterWindow, lang == "en" ? "Environment deleted" : "Ambiente excluído", () => {
                    setTimeout(() => {
                        if (localStorage.getItem("routines")) {
                            const updatedRoutines = JSON.parse(localStorage.getItem("routines")).filter(routines => routines.rooms[0] !== chosenEnvironmentName);
                            localStorage.setItem("routines", JSON.stringify(updatedRoutines));
                        }
                        const updatedEnvironments = environments.filter(environment => environment.name !== chosenEnvironmentName);
                        localStorage.setItem("environments", JSON.stringify(updatedEnvironments));

                        location.reload();
                    }, 3000);
                })
        });
    }, 150);
});