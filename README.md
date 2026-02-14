# Focus Reminder Extension 🧠

A browser extension for Brave and Chrome that helps you stop doom-scrolling. It forces a "Focus Check" whenever you try to open distracting websites.

## 🚀 Features

- **Immediate Blocking:** Covers YouTube and Instagram immediately upon loading.
- **Focus Check:** Displays a large, editable list of tasks you need to complete.
- **Auto-Save:** Your tasks are saved to the browser, so they are there next time you open a tab.
- **Mandatory Timer:** Enforces an 11-second countdown before you can access the site, giving you time to reconsider.
- **Huge UI:** Large text and timer to grab your attention.

## 🛠️ Installation

Since this extension is in "Developer Mode," you need to install it manually:

1.  **Download** this repository (Click "Code" -> "Download ZIP") and unzip it.
2.  Open your browser (Brave or Chrome).
3.  In the address bar, type: `brave://extensions` (or `chrome://extensions`).
4.  Toggle **Developer mode** to **ON** (top right corner).
5.  Click the **Load unpacked** button (top left).
6.  Select the folder containing these files.

## ⚙️ How to Customize

Want to change the timer or blocked sites? It's easy!

### Changing the Timer Duration

Open `content.js` and find the `startTimer` function. Change the `11` to whatever number of seconds you want:

```javascript
let timeLeft = 11; // Change this number
```

### Changing Blocked Sites

Open `manifest.json` and add/remove URLs in the `matches` section:

```json
"matches": [
  "*://*[.youtube.com/](https://.youtube.com/)*",
  "*://*[.instagram.com/](https://.instagram.com/)*",
  "*://*[.twitter.com/](https://.twitter.com/)*" <--- Add this for Twitter!
]
```
