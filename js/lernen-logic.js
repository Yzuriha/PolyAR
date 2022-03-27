const SCENE = document.getElementById("scene");
const INFORMATION_TEXT = document.querySelector(".information__text");
const ONBOARDING_HAND = document.querySelector('.onboading__hand');
const ONBOARDNG_NET = document.querySelector('.onboading__net');
const ONBOARDNG_FINGER_SWIPE = document.querySelector('.onboading__finger-swipe');
const ONBOARDING_TIME = 30000;

// Disable Onboarding for Developement
ONBOARDING_HAND.style.display = "none";
ONBOARDNG_NET.style.display = "none";
ONBOARDNG_FINGER_SWIPE.style.display = "none";

let showCameraOnboardingAgain = setTimeout(showCameraOnboarding, 10000 + ONBOARDING_TIME);

window.addEventListener("arjs-video-loaded", () => {
    if (localStorage.getItem("showCameraOnboarding") !== "false") {
        showCameraOnboarding();
        localStorage.setItem("showCameraOnboarding", "false");
    }
});

ONBOARDING_HAND.addEventListener('animationend', () => {
    hideCameraOnboarding();
});

let lastActiveMarker = "";
let allClickableEntitiesLength = 0;
let currentFolded = 0;

SCENE.addEventListener("markerFound", (e) => {
    if (localStorage.getItem("showTapOnboarding") !== "false") {
        displayInformationText("Tippe die Seitenflächen an", 10000);
        localStorage.setItem("showTapOnboarding", "false");
    }

    if (e.target.id !== lastActiveMarker) {
        allClickableEntitiesLength = 0;
        currentFolded = 0;
    }

    lastActiveMarker = e.target.id;

    allClickableEntitiesLength = document.querySelectorAll(`[data-tag=${e.target.id}]`).length - 1;

    hideCameraOnboarding();
    clearTimeout(showCameraOnboardingAgain);
});


if (localStorage.getItem("showRotationOnboarding") !== "false") {
    SCENE.addEventListener("folded", (e) => {
        if (e.detail) {
            currentFolded++;
        } else {
            currentFolded--;
        }

        if (allClickableEntitiesLength === currentFolded) {
            showRotationOnboarding();
            localStorage.setItem("showRotationOnboarding", "false");
        }
    });
}

function showCameraOnboarding() {
    ONBOARDING_HAND.classList.remove("none");
    ONBOARDNG_NET.classList.remove("none");
}

function hideCameraOnboarding() {
    ONBOARDING_HAND.classList.add("none");
    ONBOARDNG_NET.classList.add("none");
}

function showRotationOnboarding() {
    displayInformationText("Wische mit dem Finger um den Körper zu drehen.", 5000);
    ONBOARDNG_FINGER_SWIPE.classList.remove("none");
    setTimeout(() => {
        ONBOARDNG_FINGER_SWIPE.classList.add("none");
    }, 5000);
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
        INFORMATION_TEXT.classList.add("no-opacity");
    }
}