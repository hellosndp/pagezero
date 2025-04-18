//Display of word count - 'wordCount' is the Id

function countWords(){
    let text = document.getElementById("textInput").value;
    let words = text.trim().split(/\s+/).filter(word => word.length > 0);
    document.getElementById("wordCount").textContent = words.length;
}
document.getElementById("textInput").addEventListener("input", countWords);

//local date
let today = new Date();
document.getElementById("localDate").innerHTML = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// let targetDate = new Date("2025-04-01");
// document.getElementById("daynumber").innerHTML = Math.floor((targetDate - today)/(1000*60*60*24));


// Adding timer to the page with Restart button
let timeLeft = 0; // Timer starts from 0 and counts up to 10
let countdown;
let isPaused = false;
let sessionCount = 0; // Tracks total completed sessions



//updating the timer
function updateTimer() {
    if (!isPaused) {
        document.getElementById("timer").innerText = timeLeft;

        if (timeLeft >= 300) {
            clearInterval(countdown);
            sessionCount++; // Increase session count when 10 seconds are up
            document.getElementById("sessionCount").innerText = sessionCount;
            document.getElementById("progress-bar").style.width = (timeLeft / 300) * 100 + "%";

            

            // Delay alert slightly so user sees "10"
            setTimeout(() => {
                setTimeout(() => {
                    showAlertPopup(
                        "That's impressive!",
                        "https://i.etsystatic.com/21877275/r/il/a6f9ab/5793110811/il_1588xN.5793110811_ky13.jpg",
                        "🗓️ " + today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        + "\n⏰ " + (sessionCount * 5) + " min of writing"
                        + "\n✍️ " + document.getElementById("wordCount").textContent + " words"
                        +"\n🏃‍♀️ " + Math.floor((document.getElementById("wordCount").textContent)/(5 * sessionCount)) + " WPM",
                        "Your session summary"
                    );
                }, 100);
                
            }, 100);
            
        } else {
            timeLeft++;
            // Move progress bar update after incrementing timeLeft
            document.getElementById("progress-bar").style.width = (timeLeft / 300) * 100 + "%";

        }
    }
}

function startTimer() {
    clearInterval(countdown);
    timeLeft = 0;
    document.getElementById("timer").innerText = timeLeft;
    document.getElementById("progress-bar").style.width = "0%";
    updateTimer();
    countdown = setInterval(updateTimer, 1000);
}

document.getElementById("textInput").addEventListener("input", countWords);
document.getElementById("restartButton").addEventListener("click", startTimer);

document.addEventListener("visibilitychange", function () {
    isPaused = document.hidden;
});

startTimer();


// Copy to clipboard functionality
document.getElementById("copyButton").addEventListener("click", function() {
    let textArea = document.getElementById("textInput");
    navigator.clipboard.writeText(textArea.value).then(() => {
        let copyMessage = document.getElementById("copyMessage");
        copyMessage.classList.remove("hidden");
        copyMessage.style.display = "inline";
        setTimeout(() => {
            copyMessage.classList.add("hidden");
            copyMessage.style.display = "none";
        }, 1000);
    });
});


document.getElementById("textInput").focus();

// Warn user before leaving page
window.addEventListener("beforeunload", function (event) {
    event.preventDefault(); 
    event.returnValue = 'Are you sure you want to leave?'; // Custom message won't be shown in most browsers
});

//popup alert messages
function showAlertPopup(title,imageUrl,stats,message) {
    // Disable textarea
    let textArea = document.getElementById("textInput");
    if (textArea) {
        textArea.setAttribute("disabled", "true");
    }

    // Create dark overlay
    let overlay = document.createElement("div");
    overlay.id = "popupOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.5)"; // Dark overlay
    overlay.style.zIndex = "999";

    // Create pop-up box
    let alertBox = document.createElement("div");
    alertBox.style.position = "fixed";
    alertBox.style.top = "50%";
    alertBox.style.left = "50%";
    alertBox.style.transform = "translate(-50%, -50%)";
    alertBox.style.background = "white";
    alertBox.style.padding = "20px";
    alertBox.style.borderRadius = "10px";
    alertBox.style.display = "flex";
    alertBox.style.flexDirection = "column";
    alertBox.style.alignItems = "center";
    alertBox.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.2)";
    alertBox.style.textAlign = "center";
    alertBox.style.zIndex = "1000";
    alertBox.style.width = "400px";

    // Title
    let titleText = document.createElement("h2");
    titleText.innerText = title;
    titleText.style.marginBottom = "10px";
    titleText.style.color = "#555";
    titleText.style.fontSize = "24px";
    titleText.style.fontFamily = "monospace";
    titleText.style.fontWeight = 500;

    // Image
    let image = document.createElement("img");
    image.src = imageUrl;
    image.style.width = "200px";
    image.style.marginBottom = "5px";

    // stats
    let statsText = document.createElement("p");
    statsText.innerText = stats;
    statsText.style.fontFamily = "monospace";
    statsText.style.textAlign = "left";
    statsText.style.fontSize = "24px";
    statsText.style.color = "black";
    statsText.style.marginLeft = "30px";
    statsText.style.marginBottom = "50px";

    // Message
    let messageText = document.createElement("p");
    messageText.innerText = message;
    messageText.style.fontFamily = "monospace";
    messageText.style.textAlign = "center";
    messageText.style.fontSize = "14px";
    messageText.style.color = "#555";
    messageText.style.marginLeft = "15px";
    messageText.style.marginBottom = "5px";

    // Continue Button
    let btn_popup_continue = document.createElement("button");
    btn_popup_continue.innerText = "Continue";
    btn_popup_continue.style.fontFamily = "monospace";
    btn_popup_continue.style.fontSize = "18px";
    btn_popup_continue.style.margin = "5px";
    btn_popup_continue.style.padding = "15px";
    btn_popup_continue.style.border = "none";
    btn_popup_continue.style.borderRadius = "5px";
    btn_popup_continue.style.background = "rgb(255, 255, 255)";
    btn_popup_continue.style.color = "grey";
    btn_popup_continue.style.cursor = "pointer";
    btn_popup_continue.onclick = function() {
        document.body.removeChild(alertBox);
        document.body.removeChild(overlay);
        if (textArea) {
            textArea.removeAttribute("disabled"); // Enable textarea again
        }
        startTimer(); // Restart the timer
    };

    // OK Button
    // let btn_popup_close = document.createElement("button");
    // btn_popup_close.innerText = "Close";
    // btn_popup_close.style.fontFamily = "monospace";
    // btn_popup_close.style.margin = "5px";
    // btn_popup_close.style.padding = "15px";
    // btn_popup_close.style.border = "none";
    // btn_popup_close.style.marginLeft = "20px";
    // btn_popup_close.style.borderRadius = "5px";
    // btn_popup_close.style.background = "#ccc";
    // btn_popup_close.style.cursor = "pointer";
    // btn_popup_close.onclick = function() {
    //     document.body.removeChild(alertBox);
    //     document.body.removeChild(overlay);
    //     if (textArea) {
    //         textArea.removeAttribute("disabled"); // Enable textarea again
    //     }
    // };

    // // Donate Button
    // let donateBtn = document.createElement("button");
    // donateBtn.innerText = "Donate";
    // donateBtn.style.fontFamily = "monospace";
    // donateBtn.style.margin = "5px";
    // donateBtn.style.padding = "10px";
    // donateBtn.style.border = "none";
    // donateBtn.style.borderRadius = "5px";
    // donateBtn.style.background = "#ff5733";
    // donateBtn.style.color = "white";
    // donateBtn.style.cursor = "pointer";
    // donateBtn.onclick = function() {
    //     window.open("https://www.google.com", "_blank");
    // };

    // Share Button
    let btn_popup_share = document.createElement("button");
    btn_popup_share.innerText = "Challenge a Friend!";
    btn_popup_share.style.fontFamily = "monospace";
    btn_popup_share.style.margin = "20px";
    btn_popup_share.style.fontSize = "18px";
    btn_popup_share.style.padding = "15px";
    btn_popup_share.style.border = "none";
    btn_popup_share.style.borderRadius = "5px";
    btn_popup_share.style.background = "rgb(74, 75, 73)";
    btn_popup_share.style.color = "white";
    btn_popup_share.style.cursor = "pointer";
    btn_popup_share.onclick = function() {
        let shareText = "✍️ I just did a #5minWritingChallenge on https://PageZero.app"
        +"\n"
        + "\n🗓️ " +today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        + "\n⏰ " + sessionCount * 5+ " min of writing" // words
        + "\n✍️ " + document.getElementById("wordCount").textContent + " words" // words
        + "\n🏃‍♀️ " + Math.floor(document.getElementById("wordCount").textContent/(sessionCount * 5)) + " WPM"// WPM for 3 min
        +"\n🌎 https://PageZero.app" 
        + "\n \n "
        + "Think you can beat me?";;
        navigator.clipboard.writeText(shareText).then(() => {
            alert("Copied to clipboard!");
        });
    };

    // Append elements to alert box
    alertBox.appendChild(titleText);
    alertBox.appendChild(image);
    // alertBox.appendChild(messageText);
    alertBox.appendChild(statsText);
    
    
    alertBox.appendChild(btn_popup_share);
    alertBox.appendChild(btn_popup_continue);
    // alertBox.appendChild(btn_popup_close);
    // alertBox.appendChild(donateBtn);
    

    document.body.appendChild(overlay);
    document.body.appendChild(alertBox);
}

// google analytics tracking 

// Function to send event to GA4
    function trackEvent(eventName, eventCategory = 'User Interaction') {
        gtag('event', eventName, {
            'event_category': eventCategory
        });
        console.log(`GA Event Tracked: ${eventName}`); // Optional: for debugging

    }

// // Tracking button clicks
    document.getElementById("copyButton")?.addEventListener("click", () => trackEvent('copyButton'));
    document.getElementById("btn_feedback")?.addEventListener("click", () => trackEvent('btn_feedback'));
    document.getElementById("restartButton")?.addEventListener("click", () => trackEvent('restartButton'));

    document.addEventListener("click", function (e) {
        const text = e.target?.textContent?.trim().toLowerCase();//converting everything into lowercase
    
        if (!text) return;
    
        if (text === "continue") {
            trackEvent("popup_continue", "Popup Interaction");
        } else if (text === "close") {
            trackEvent("popup_close", "Popup Interaction");
        } else if (text === "donate") {
            trackEvent("popup_donate", "Popup Interaction");
        } else if (text === "challenge a friend!") { // the text should always be in lowercase
            trackEvent("popup_share", "Popup Interaction");
        }
    });
    




// // //key events - word counts
let wordCount = 0; // Assuming you have a way to track words

function updateWordCount(newCount) {
    wordCount = newCount;

    if (wordCount === 100) {
        trackEvent('event_100words', 'Milestone');
    } else if (wordCount === 500) {
        trackEvent('event_500words', 'Milestone');
    } else if (wordCount === 1667) {
        trackEvent('event_1667words', 'Milestone');
    }
}

// // Example: Call updateWordCount() whenever the user types
let trackedEvents = new Set(); // Keeps track of which events have been sent

document.getElementById("textInput")?.addEventListener("input", function() {
    let words = this.value.trim().split(/\s+/).length;
    updateWordCount(words);

    // Define milestones with specific names
    let milestones = {
        100: "100words",
        500: "500words",
        1000: "1000words",
        1667: "1667words"
    };

//     // Check if the user reaches a milestone
    for (let milestone in milestones) {
        if (words >= milestone && !trackedEvents.has(milestone)) {
            trackedEvents.add(milestone); // Mark as sent

            // Send the event to Google Analytics
            gtag('event', milestones[milestone], {
                event_category: 'Writing Milestone',
                event_label: `Reached ${milestones[milestone]}`
            });

            console.log(`GA Event Sent: ${milestones[milestone]}`); // Debugging log
        }
    }
});

//auto-typing effect
const text = `
Welcome to PageZero 👋

    Simple. Write for 5 minutes. No login. No pressure.

    Here’s how it works:
    ✍️ Write for 5 minutes straight
    ⚔️ Challenge a friend to do the same

    Stuck? Try this prompt:
    “Every time you forget something, someone else seems to remember it for you.”
    
    Ready? Let’s go →`;

let index = 0;
function typeText() {
    if (index < text.length) {
        let textarea = document.getElementById("textInput");
        textarea.value += text.charAt(index);
        index++;

        updateWordCount(); // Update word count after every character
        setTimeout(typeText, 50); // Adjust speed (50ms per character)
    }
}
function updateWordCount() {
    let text = document.getElementById("textInput").value;
    let words = text.trim().split(/\s+/).filter(word => word.length > 0);
    document.getElementById("wordCount").innerText = words.length;
}

document.getElementById("textInput").addEventListener("input", updateWordCount);

window.onload = typeText;

window.onload = typeText; // Start typing when page loads

