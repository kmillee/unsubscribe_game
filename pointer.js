const lockButton = document.getElementById("lock-button");
const slowArea = document.querySelector(".slow-area");
const container = document.querySelector(".container");

let isLocked = false;
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
const slowFactor = 0.3; // Adjust this value to control the slowdown

// Function to request pointer lock
lockButton.addEventListener("click", () => {
    container.requestPointerLock();
});

// Pointer lock change event
document.addEventListener("pointerlockchange", () => {
    if (document.pointerLockElement === container) {
        isLocked = true;
        console.log("Pointer locked!");
    } else {
        isLocked = false;
        console.log("Pointer unlocked!");
    }
});

// Track mouse movement
document.addEventListener("mousemove", (e) => {
    if (isLocked) {
        // Get raw mouse movement deltas
        const deltaX = e.movementX;
        const deltaY = e.movementY;

        // Update cursor position
        cursorX += deltaX;
        cursorY += deltaY;

        // Constrain cursor position to the window bounds
        cursorX = Math.max(0, Math.min(window.innerWidth, cursorX));
        cursorY = Math.max(0, Math.min(window.innerHeight, cursorY));

        // Check if the cursor is inside the slow area
        const rect = slowArea.getBoundingClientRect();
        const isInSlowArea =
            cursorX >= rect.left &&
            cursorX <= rect.right &&
            cursorY >= rect.top &&
            cursorY <= rect.bottom;

        // Apply slowdown effect
        if (isInSlowArea) {
            slowArea.style.backgroundColor = "blue";
            slowArea.style.opacity = 0.5;
            cursorX += deltaX * slowFactor;
            cursorY += deltaY * slowFactor;
        }
        else{
            slowArea.style.backgroundColor = "transparent";
        }

        // Move a custom cursor (optional)
        moveCustomCursor(cursorX, cursorY);
    }
});

// Function to move a custom cursor (optional)
function moveCustomCursor(x, y) {
    let customCursor = document.getElementById("custom-cursor");
    if (!customCursor) {
        // Create a custom cursor if it doesn't exist
        customCursor = document.createElement("div");
        customCursor.id = "custom-cursor";
        customCursor.style.position = "fixed";
        customCursor.style.width = "20px";
        customCursor.style.height = "20px";
        customCursor.style.backgroundColor = "red";
        customCursor.style.borderRadius = "50%";
        customCursor.style.pointerEvents = "none"; // Ensure it doesn't interfere with clicks
        document.body.appendChild(customCursor);
    }
    customCursor.style.left = `${x}px`;
    customCursor.style.top = `${y}px`;
}