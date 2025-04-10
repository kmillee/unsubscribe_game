const modal = document.getElementById("myModal");
const obviousOption = document.getElementById("obviousOption");
const hiddenOption = document.getElementById("hiddenOption");

function showMembershipInfo() {
    document.getElementById("membershipDetails").style.display = "block";
}

// Show Modal when clicking on the unsubscribe link
function showModal() {
    document.getElementById("myModal").style.display = "flex";
}


// show hidden option when the obvious option is hovered
obviousOption.addEventListener("mouseover", () => {
    hiddenOption.style.display = "inline-block";
});

obviousOption.addEventListener("mouseout", () => {
    hiddenOption.style.display = "none";
});

obviousOption.addEventListener("click", () => {
    modal.style.display = "none";
});

hiddenOption.addEventListener("mouseover", () => {
    hiddenOption.style.display = "inline-block";
});

// hide the hidden option when the mouse leaves the obvious option
hiddenOption.addEventListener("mouseout", () => {
    hiddenOption.style.display = "none";
});

// hiddenOption.addEventListener("click", () => {
//     modal.style.display = "none";
//     //redirect to the homepage
//     window.location.href = "lame.html";
// });


// Close the initial unsubscribe modal and show the feedback form
document.getElementById('hiddenOption').addEventListener('click', function() {
    // Close the first modal
    document.getElementById('myModal').style.display = 'none';
    
    // Open the feedback form modal
    document.getElementById('feedbackModal').style.display = 'flex';
});

// Handle the "Next" button
document.getElementById('nextBtn').addEventListener('click', function() {
    var subscribeAgain = document.getElementById('subscribeAgain').checked;

    if (subscribeAgain) {
        alert("Thank you so much for changing your mind!");
        window.location.href = "account.html"; // Redirect back to the account page
    } else {
        document.getElementById('feedbackModal').style.display = 'none';
        alert("Ok, you have to earn it.");
        startChallenge(); // Start the challenge (you can define the challenge in a later part)
    }
});
let challengeStarted = false;
let timer;
let timeLeft = 30; // 30 seconds for the challenge
let challengeBtn = document.getElementById("challengeBtn");
let timerDisplay = document.getElementById("timer");
let loadingPopup = document.getElementById("loadingPopup");
let longDelayPopup = document.getElementById("longDelayPopup");
let refreshBtn = document.getElementById("refreshBtn");

// Function to start the challenge
function startChallenge() {
    // Show the challenge overlay
    document.getElementById("challengeOverlay").style.display = "flex";
    
    // Set up the timer countdown
    challengeStarted = true;
    timeLeft = 30; // Reset timer to 30 seconds
    updateTimerDisplay();

    // Start the countdown
    timer = setInterval(function () {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer); // Stop the timer when it reaches zero
            alert("You took too long! Redirecting back to your account...");
            window.location.href = "account.html"; // Redirect back to account page
        }
    }, 1000); // Update the timer every second
}

// Function to update the timer display
function updateTimerDisplay() {
    timerDisplay.textContent = `Time left: ${timeLeft} seconds`;
}

// Function to handle the moving button
challengeBtn.addEventListener("mouseover", () => {
    if (challengeStarted) {
        setTimeout(() => {
            let newX = Math.random() * (window.innerWidth - challengeBtn.clientWidth);
            let newY = Math.random() * (window.innerHeight - challengeBtn.clientHeight);
            challengeBtn.style.left = `${newX}px`;
            challengeBtn.style.top = `${newY}px`;
        }, 200);
    }
});

// Function when user clicks the button
function clickUnsubscribeButton() {
    if (challengeStarted) {
        clearInterval(timer); // Stop the timer
        challengeStarted = false;
        challengeBtn.textContent = "Unsubscribing..."; // Change button text
        challengeBtn.style.backgroundColor = "#FF6347"; // Change button color to red (for unsubscribing)
        
        // Show the loading state
        loadingPopup.style.display = "block";
        
        // Wait 5 seconds before showing the long delay pop-up
        setTimeout(() => {
            loadingPopup.style.display = "none"; // Hide loading state
            longDelayPopup.style.display = "block"; // Show long delay pop-up
        }, 5000); // Show "long delay" message after 5 seconds
        
        // Wait 20 seconds before sending the user to the intended page
        setTimeout(() => {
            longDelayPopup.style.display = "none"; // Hide the long delay pop-up
            window.location.href = "lame.html"; // Redirect to lame.html
        }, 20000); // Redirect after 20 seconds if the user doesn't refresh
    }
}

// Function to refresh and redirect to account page
function refreshPage() {
    window.location.href = "account.html"; // Redirect back to account page
}
