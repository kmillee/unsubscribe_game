const button = document.getElementById("movingButton");
const container = document.querySelector(".container");
const modal = document.getElementById("myModal");
const obviousOption = document.getElementById("obviousOption");
const hiddenOption = document.getElementById("hiddenOption");

button.addEventListener("mouseover", () => {
    let newX = Math.random() * (window.innerWidth - button.clientWidth);
    let newY = Math.random() * (window.innerHeight - button.clientHeight);
    button.style.left = `${newX}px`;
    button.style.top = `${newY}px`;
});

// show modal when the button is clicked
button.addEventListener("click", () => {
    modal.style.display = "flex";
    button.style.backgroundColor = "red";
    button.style.color = "white";
    button.textContent = "wow you're fast";
    button.style.left = "50%";
});


obviousOption.addEventListener("click", () => {
    modal.style.display = "none";
    alert("Finally some good sense!");
});

// show hidden option when the obvious option is hovered
obviousOption.addEventListener("mouseover", () => {
    hiddenOption.style.display = "inline-block";
});

obviousOption.addEventListener("mouseout", () => {
    hiddenOption.style.display = "none";
});

hiddenOption.addEventListener("mouseover", () => {
    hiddenOption.style.display = "inline-block";
});

// hide the hidden option when the mouse leaves the obvious option
hiddenOption.addEventListener("mouseout", () => {
    hiddenOption.style.display = "none";
});

hiddenOption.addEventListener("click", () => {
    modal.style.display = "none";
    alert("hmm, sure? bye i guess");
});

////////////////////////// SLOW AREA //////////////////////////

const slowArea = document.querySelector(".slow-area");
const slowContainer = document.querySelector(".slow-container");

let isInSlowArea = false;
let cursorX = 0;
let cursorY = 0;
let targetX = 0;
let targetY = 0;
const slowFactor = 0.1; // 0.1 = very slow, 1 = normal

// track mouse movement
document.addEventListener("mousemove", (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;

    // is cursor inside (or around) the slow area
    const rect = slowArea.getBoundingClientRect();
    isInSlowArea =
        cursorX >= rect.left-100 &&
        cursorX <= rect.right+100 &&
        cursorY >= rect.top-100 &&
        cursorY <= rect.bottom+100;

    // update button position
    if (isInSlowArea) {
        targetX += (cursorX - targetX) * slowFactor;
        targetY += (cursorY - targetY) * slowFactor;
    } else {
        targetX = cursorX;
        targetY = cursorY;
    }

    moveCustomCursor(targetX, targetY);
});

function moveCustomCursor(x, y) {

    const customCursor = document.getElementById("custom-cursor");
    if (!customCursor) {
        // Create a custom cursor if it doesn't exist
        const cursor = document.createElement("div");
        cursor.id = "custom-cursor";
        cursor.style.position = "fixed";
        cursor.style.width = "20px";
        cursor.style.height = "20px";
        cursor.style.backgroundColor = "red";
        cursor.style.borderRadius = "50%";
        // cursor.style.pointerEvents = "none"; // Ensure it doesn't interfere with clicks
        document.body.appendChild(cursor);
    } else {
        customCursor.style.left = `${x}px`;
        customCursor.style.top = `${y}px`;
    }
}

// simulate clicks at the personalized cursor's position (to account for lagging in slow area)
document.addEventListener("click", (e) => {
    //get the element under the personalized cursor
    const elementUnderCursor = document.elementFromPoint(cursorX, cursorY);

    // trigger a click event on the element
    if (elementUnderCursor) {
        elementUnderCursor.click();
    }
});