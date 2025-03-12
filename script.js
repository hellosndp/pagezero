        document.getElementById("page").focus();
        function wordCount(){
            let words = document.getElementById("page").value;
            let wordCount = words.trim().split(/\s+/).length;
            document.getElementById("noOfWords").innerHTML = wordCount;
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