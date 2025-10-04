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

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.darkMode) {
        if (changes.darkMode.newValue) {
            applyDarkMode();
        } else {
            removeDarkMode();
        }
    }
});

// Apply on initial load
chrome.storage.sync.get('darkMode', (data) => {
    if (data.darkMode) {
        applyDarkMode();
    }
});
