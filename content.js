// 1. Get the saved tasks from storage immediately
chrome.storage.sync.get(['tasks'], function(result) {
    const savedTasks = result.tasks || "1. List your tasks here...\n2. Delete this text and type yours.";
    createOverlay(savedTasks);
});

function createOverlay(initialText) {
    const overlay = document.createElement('div');
    overlay.id = 'focus-reminder-overlay';

    const box = document.createElement('div');
    box.id = 'focus-reminder-box';

    const title = document.createElement('h2');
    title.innerText = "Focus Check";

    // CHANGED: Instead of a div, we use a Text Area
    const textArea = document.createElement('textarea');
    textArea.id = 'focus-tasks-input';
    textArea.value = initialText; // Fill it with saved text
    textArea.placeholder = "Type your tasks here...";

    const btn = document.createElement('button');
    btn.id = 'focus-acknowledge-btn';
    btn.innerText = "Save & Start Timer";

    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'focus-timer';
    timerDisplay.innerText = "7";

    box.appendChild(title);
    box.appendChild(textArea); // Add the text area
    box.appendChild(btn);
    box.appendChild(timerDisplay);
    overlay.appendChild(box);

    document.body.appendChild(overlay);

    // 2. Button Logic: Save first, then Timer
    btn.addEventListener('click', () => {
        const currentText = textArea.value;
        
        // Save to Chrome Storage
        chrome.storage.sync.set({ tasks: currentText }, function() {
            // Only start timer after saving is done
            startTimer(btn, timerDisplay, overlay, textArea);
        });
    });
}

function startTimer(btn, timerDisplay, overlay, textArea) {
    btn.style.display = 'none';
    textArea.style.display = 'none'; // Hide the text area so it looks cleaner
    timerDisplay.style.display = 'block';

    let timeLeft = 7;
    
    const countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            overlay.remove(); 
        }
    }, 1000); 
}