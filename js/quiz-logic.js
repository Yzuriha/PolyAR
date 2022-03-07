const SCENE = document.getElementById("scene");
const CUBES = document.querySelectorAll("[id^='cube']");
const CUBES_AMOUNT = CUBES.length;
const CUBOIDS = document.querySelectorAll("[id^='cuboid']");
const CUBOIDS_AMOUNT = CUBOIDS.length;
const INFORMATION_TEXT = document.querySelector(".information__text");
const INSTRUCTION_TEXT = document.querySelector(".instruction__text");
const INSTRUCTION_COUNTER = document.querySelector(".instruction__counter");
const INSTRUCTION_PROGRESS = document.querySelector(".instruction__progress");
const INTERACTION_SCAN_MARKER = document.querySelector(".interaction__scan-marker");
const INTERACTION_CONFIRM = document.querySelector(".interaction__confirm");

let polyhedrons = [{
    id: "cube",
    displayName: "W Ü R F E L",
    normalizedName: "Würfel"
}, {
    id: "cuboid",
    displayName: "Q U A D E R",
    normalizedName: "Quader"
}];

// The name of the Polyhedron that currently has to be searched
let currentQuizTarget = "";
let currentQuizTargetAmount = 0;

// foundNets includes all Nets, even the wrong ones. Used to detect whether a Marker has been scanned twice
let foundNets = [];
let foundValidNets = [];
// The whole Marker Entity that is currently found/displayed
let activeMarker;
// The colour of the Scan Marker. Can be either Green (Success), Red (Wrong), Blue (Informational)
let markerColor = "";
/*
 When a Marker has been found, just display it, but dont do anything else. The check whether the right/wrong one has
 been found will be done when the user presses the confirm button
 */
SCENE.addEventListener("markerFound", (e) => {
    console.log(e);
    activeMarker = e.target;
    INTERACTION_CONFIRM.classList.remove("hidden");
});

SCENE.addEventListener("markerLost", (e) => {
    INTERACTION_CONFIRM.classList.add("hidden");
    if (markerColor) {
        INTERACTION_SCAN_MARKER.classList.remove(markerColor);
    }
});

INTERACTION_CONFIRM.addEventListener("click", () => {
    handleFoundMarker();
});

/**
 * Checks if the user found the right/wrong marker after pressing the confirm button
 */
function handleFoundMarker() {

    // Reset the text because it might not be up-to-date anymore
    fadeInformationText("", false);

    if (foundNets.includes(activeMarker.id)) {
        displayInformationText("Du hast das schonmal gefunden");
        markerColor = "interaction__scan-marker--info";
        addMarkerColor();
        return;
    } else {
        foundNets.push(activeMarker.id);
    }


    if (activeMarker.dataset.type === currentQuizTarget) {
        foundValidNets.push(activeMarker.id);
        markerColor = "interaction__scan-marker--success";
        INSTRUCTION_COUNTER.innerText = `${foundValidNets.length} / ${currentQuizTargetAmount}`;
        INSTRUCTION_PROGRESS.style.width = `${(foundValidNets.length / currentQuizTargetAmount) * 100}%`;
    } else {
        markerColor = "interaction__scan-marker--error";
        displayInformationText(`Das ist ein ${polyhedrons.find(e => e.id === activeMarker.dataset.type).normalizedName}`);
    }

    addMarkerColor();

    autoFold();


    if (foundValidNets.length === currentQuizTargetAmount) {
        displayInformationText(`Du hast alle alle gefunden! Das nächste Quiz beginnt gleich.`);
        // after 3 seconds (default duration of the information text display) loud the new quiz target
        setTimeout(() => {
            getPolyhedron();
        }, 3000);
    }
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 *
 * https://stackoverflow.com/a/6274381
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function addMarkerColor() {
    INTERACTION_SCAN_MARKER.classList.add(markerColor);
    setTimeout(() => {
        INTERACTION_SCAN_MARKER.classList.remove(markerColor);
        markerColor = "";
    }, 3000);
}

/**
 * Get a Polyhedron to start a new Quiz. The taken Polyhedron will be removed from the available Array for future Quizzes
 * @returns {*}
 */
function getPolyhedron() {

    if (!polyhedrons.length) {
        displayInformationText("Es gibt keine weiteren Quizzes, du hast alle gelöst!", 10000);
        return;
    }

    // Reset everything when a new Quiz starts
    foundNets = [];
    foundValidNets = [];

    // Take a random Polyhedron for the Quit
    let polyhedron = shuffle(polyhedrons).pop();

    // Display the respective Polyhedron name to search for
    INSTRUCTION_TEXT.innerText = polyhedron.displayName;
    currentQuizTarget = polyhedron.id;

    // Get the right amount of targets to search for
    if (currentQuizTarget === "cube") {
        currentQuizTargetAmount = CUBES_AMOUNT;
    } else if (currentQuizTarget === "cuboid") {
        currentQuizTargetAmount = CUBOIDS_AMOUNT;
    }

    INSTRUCTION_COUNTER.innerText = `0 / ${currentQuizTargetAmount}`;
    displayInformationText(`Suche nach allen ${currentQuizTargetAmount} ${polyhedron.normalizedName}-Netze`);

    return polyhedron;
}

/**
 * Changes the Information text to a given value. After a certain duration, the text will be reset
 * @param text
 * @param duration
 */
function displayInformationText(text, duration = 3000) {
    fadeInformationText(text);
    setTimeout(() => {
        fadeInformationText("", false);
    }, duration);
}

function fadeInformationText(text, fadeIn = true) {
    if (fadeIn) {
        INFORMATION_TEXT.innerText = text;
        INFORMATION_TEXT.classList.remove("no-opacity");
    } else {
        // INFORMATION_TEXT.innerText = ""
        INFORMATION_TEXT.classList.add("no-opacity");
    }
}

// Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise(res => setTimeout(res, ms));

async function autoFold() {
    let foldingElements = document.querySelectorAll(`[data-tag=${activeMarker.id}]`);
    for (let i = 0; i < foldingElements.length; i++) {
        foldingElements[i].click();
        console.log("NEXT");
        await timer(500);
    }
}

getPolyhedron();