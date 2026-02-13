// 1. Get the saved tasks from storage immediately
chrome.storage.sync.get(['tasks'], function(result) {
    const savedTasks = result.tasks || "1. List your tasks here...\n2. Delete this text and type yours.";
    createOverlay(savedTasks);
});

// ... keep the chrome.storage part at the top ...

function createOverlay(initialText) {
    const overlay = document.createElement('div');
    overlay.id = 'focus-reminder-overlay';

    // ... (keep all your box/title/textarea creation code exactly the same) ...
    // ... just copy-paste the middle part from your previous file ...
    
    const box = document.createElement('div');
    box.id = 'focus-reminder-box';
    
    // Title
    const title = document.createElement('h2');
    title.innerText = "Focus Check";

    // Text Area
    const textArea = document.createElement('textarea');
    textArea.id = 'focus-tasks-input';
    textArea.value = initialText; 
    textArea.placeholder = "Type your tasks here...";

    // Button
    const btn = document.createElement('button');
    btn.id = 'focus-acknowledge-btn';
    btn.innerText = "Save & Start Timer";

    // Timer
    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'focus-timer';
    timerDisplay.innerText = "60";

    box.appendChild(title);
    box.appendChild(textArea);
    box.appendChild(btn);
    box.appendChild(timerDisplay);
    overlay.appendChild(box);

    // --- THE FIX IS HERE ---
    // Instead of just document.body.appendChild(overlay);
    // We check if body exists. If not, use the root element (HTML tag).
    if (document.body) {
        document.body.appendChild(overlay);
    } else {
        document.documentElement.appendChild(overlay);
    }
    // -----------------------

    // Button Logic
    btn.addEventListener('click', () => {
        const currentText = textArea.value;
        chrome.storage.sync.set({ tasks: currentText }, function() {
            startTimer(btn, timerDisplay, overlay, textArea);
        });
    });
}

// ... keep startTimer function the same ...
function startTimer(btn, timerDisplay, overlay, textArea) {
    btn.style.display = 'none';
    textArea.style.display = 'none';
    timerDisplay.style.display = 'block';

    let timeLeft = 11;
    
    // We update the timer text immediately
    timerDisplay.innerText = timeLeft;

    const countdown = setInterval(() => {
        // --- STRICT MODE LOGIC ---
        // If the user switches tabs, document.hidden becomes true
        if (document.hidden) {
            // Pause the countdown!
            // We don't decrease timeLeft.
            // We can optionally change the tab title to yell at them
            document.title = "⚠️ Come back!";
            return; 
        }
        
        // Reset title if they are back
        document.title = "Focus Reminder";
        // -------------------------

        timeLeft--;
        timerDisplay.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            overlay.remove(); 
        }
    }, 1000); 
}