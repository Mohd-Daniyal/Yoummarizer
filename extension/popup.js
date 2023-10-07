const btn = document.getElementById("summarise");
btn.addEventListener("click", function() {
    btn.disabled = true;
    btn.innerHTML = "Summarizing...";
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        // Ensure that there's an active tab and that it's a YouTube video page
        if (tabs[0] && tabs[0].url.includes('youtube.com') && tabs[0].url.includes('/watch')) {
            const videoUrl = new URL(tabs[0].url);
            const vId = videoUrl.searchParams.get('v');
            if (vId) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "http://127.0.0.1:5000/summary?id=" + vId, true);
                xhr.onload = function() {
                    var text = xhr.responseText;
                    const p = document.getElementById("output");
                    p.innerHTML = text;
                    btn.disabled = false;
                    btn.innerHTML = "Summarize";
                }
                xhr.send();
            } else {
                // Handle the case where the video ID is missing or undefined
                console.error("Video ID is missing or undefined.");
                btn.disabled = false;
                btn.innerHTML = "Summarize";
            }
        } else {
            // Handle the case where the current tab is not a YouTube video page
            console.error("Not a YouTube video page.");
            btn.disabled = false;
            btn.innerHTML = "Summarize";
        }
    });
});
