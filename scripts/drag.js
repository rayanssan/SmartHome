"use strict";

// Make preferences draggable
const preferenceOptions = document.querySelectorAll('.preference');

let draggedItem = null;

preferenceOptions.forEach(preference => {

    preference.addEventListener('dragstart', (e) => {
        draggedItem = preference;
        draggedItem.style.opacity = "0.5";
        e.dataTransfer.setData('text/plain', preference.innerHTML);
    });

    preference.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    preference.addEventListener('dragend', (e) => {
        e.preventDefault();
        if (draggedItem !== null) {
            draggedItem.style.removeProperty("opacity");
        }
    });

    preference.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedItem !== null) {
            if (draggedItem !== preference) {
                // Swap the position of the dragged and drop target preferences
                const parent = preference.parentNode;
                const preferenceIndex1 = Array.from(parent.children).indexOf(draggedItem);
                const preferenceIndex2 = Array.from(parent.children).indexOf(preference);

                if (preferenceIndex1 < preferenceIndex2) {
                    parent.insertBefore(draggedItem, preference.nextSibling);
                } else {
                    parent.insertBefore(draggedItem, preference);
                }
            }
            draggedItem.style.removeProperty("opacity");
            draggedItem = null;
        }

        // Save state
        const childElements = Array.from(document.getElementById('general-home-preferences-selection').children);

        // Create an array to store the order based on innerText
        const savedOrder = childElements.map(element => {
            return { innerText: element.children[1].innerText };
        });

        // Store the order in local storage
        localStorage.setItem('preferencesOrder', JSON.stringify(savedOrder));
    });
});

// Save order of elements in localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedOrder = JSON.parse(localStorage.getItem('preferencesOrder'));

    if (savedOrder) {
        const orderedChildClasses = savedOrder.map(item => item.innerText);

        // Reorganize child elements based on the order in localStorage
        const childElements = Array.from(document.getElementById('general-home-preferences-selection').children);
        const sortedChildElements = [];

        orderedChildClasses.forEach(text => {
            const matchingElement = childElements.find(element => element.children[1].innerText === text);
            if (matchingElement) {
                sortedChildElements.push(matchingElement);
            }
        });

        // Append the sorted child elements back to the "environment-selection" element
        sortedChildElements.forEach(element => {
            document.getElementById('general-home-preferences-selection').appendChild(element);
        });
    }
});

// Make environments draggable
let draggedEnvironment = null;

document.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('environment')) {
        draggedEnvironment = e.target;
        e.dataTransfer.setData('text/plain', '');
        e.target.style.opacity = '0.5';
    }
});

document.addEventListener('dragover', (e) => {
    e.preventDefault();
});

document.addEventListener('dragend', (e) => {
    if (e.target.classList.contains('environment')) {
        e.target.style.removeProperty("opacity");
    }
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
    if (draggedEnvironment !== null) {
        const dropTarget = findDropTarget(e.target, draggedEnvironment);
        if (dropTarget) {
            // Check if the drop target has the id "add-environment-wrapper"
            if (dropTarget.id === 'add-environment-wrapper') {
                return; // Prevent the drop operation
            }

            const container = dropTarget.parentElement;
            const draggedIndex = Array.from(container.children).indexOf(draggedEnvironment);
            const dropIndex = Array.from(container.children).indexOf(dropTarget);

            container.insertBefore(draggedEnvironment, dropIndex < draggedIndex ? dropTarget : dropTarget.nextSibling);
        }

        draggedEnvironment = null;
    }

    // Save state
    const childElements = Array.from(document.getElementById('environment-selection').children);

    // Create an array to store the order based on innerText
    const savedOrder = childElements.map(element => {
        return { innerText: element.children[1].innerText };
    });

    // Store the order in local storage
    localStorage.setItem('environmentOrder', JSON.stringify(savedOrder));
});

// Function to find the drop target based on the cursor position
function findDropTarget(target, draggedElement) {
    while (target && !target.classList.contains('environment')) {
        target = target.parentElement;
    }
    if (target === draggedElement) {
        return null;
    }
    return target;
}

// Save order of elements in localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedOrder = JSON.parse(localStorage.getItem('environmentOrder'));

    if (savedOrder) {
        const orderedChildClasses = savedOrder.map(item => item.innerText);

        // Reorganize child elements based on the order in localStorage
        const childElements = Array.from(document.getElementById('environment-selection').children);
        const sortedChildElements = [];

        orderedChildClasses.forEach(text => {
            const matchingElement = childElements.find(element => element.children[1].innerText === text);
            if (matchingElement) {
                sortedChildElements.push(matchingElement);
            }
        });

        // Append the sorted child elements back to the "environment-selection" element
        sortedChildElements.forEach(element => {
            document.getElementById('environment-selection').appendChild(element);
        });
    }
});