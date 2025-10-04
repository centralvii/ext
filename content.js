function applyDarkMode() {
    document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
    const media = document.querySelectorAll('img, video');
    media.forEach((el) => {
        el.style.filter = 'invert(1) hue-rotate(180deg)';
    });
}

function removeDarkMode() {
    document.documentElement.style.filter = '';
    const media = document.querySelectorAll('img, video');
    media.forEach((el) => {
        el.style.filter = '';
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.darkMode) {
        applyDarkMode();
    } else {
        removeDarkMode();
    }
});

// Apply on initial load
chrome.storage.sync.get('darkMode', (data) => {
    if (data.darkMode) {
        applyDarkMode();
    }
});
