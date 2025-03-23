        document.getElementById("page").focus();
        function wordCount(){
            let words = document.getElementById("page").value;
            let wordCount = words.trim().split(/\s+/).length;
            document.getElementById("displayofWords").innerHTML = wordCount;
            document.getElementById("progressBar").value = wordCount % 100;
            
            let progressBar = document.getElementById("progressBar");
            progressBar.value = progress;
            progressBar.max = 100; // Each milestone is 100 words
        }

        function displayLocalDate() {
            let now = new Date();
            let options = {month: 'short', day: 'numeric', weekday: 'short' };
            let formattedDate = now.toLocaleDateString(undefined, options);
            document.getElementById("localDate").innerText = formattedDate;
        }

        displayLocalDate();

        //hides the user to do right click
        document.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        }); 

        // Timer code form below
        
        let timerStarted = false;
        let startTime = null;
        let elapsedTime = 0;
        let maxTime = 600000; // 10 minutes in milliseconds
        let interval;
        let isTabActive = true;
        let shouldResume = false; // Prevents auto-resume when switching tabs

        function updateTimer() {
            if (!startTime || !isTabActive) return;

            let currentTime = Date.now();
            elapsedTime += (currentTime - startTime);
            startTime = currentTime;

            if (elapsedTime >= maxTime) {
                elapsedTime = maxTime;
                clearInterval(interval);
            }

            let minutes = Math.floor(elapsedTime / 60000);
            let seconds = Math.floor((elapsedTime % 60000) / 1000);
            seconds = seconds < 10 ? '0' + seconds : seconds;

            document.getElementById("timer").innerText = `${minutes}:${seconds}`;

            let progress = (elapsedTime / maxTime) * 100;
            document.getElementById("progressBar").style.width = progress + "%";
        }

        function startTimer() {
            startTime = Date.now();
            interval = setInterval(updateTimer, 1000);
        }

        document.getElementById("page").addEventListener("input", function() {
            if (!timerStarted) {
                timerStarted = true;
                startTimer();
            } else if (shouldResume) {
                shouldResume = false; // Only resume if the user types again after tab switch
                startTime = Date.now();
                interval = setInterval(updateTimer, 1000);
            }
        });

        // Pause timer when tab is inactive
        document.addEventListener("visibilitychange", function() {
            if (document.hidden) {
                isTabActive = false;
                shouldResume = true; // User must type again to resume
                clearInterval(interval);
            } else {
                isTabActive = true;
            }
        });

        function resetTimer() {
            startTime = null;
            document.getElementById("progress-bar").style.width = "0%";
            document.getElementById("timer-display").innerText = "0:00";
        }
        
        function showPopup() {
            setTimeout(() => {
                alert("🚀 Incredible! You smashed that session! Ready for another?");
            }, 500);
        }
        
        // Copy text functionality
        function copyText() {
            let textarea = document.getElementById("page");
            textarea.select();
            document.execCommand("copy");
        
            let copyMessage = document.getElementById("copyMessage");
            copyMessage.style.display = "inline"; // Show "Copied!" text
        
            setTimeout(() => {
                copyMessage.style.display = "none"; // Hide after 2 seconds
            }, 2000);
        }
        
