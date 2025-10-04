let isDarkMode = {};

chrome.action.onClicked.addListener((tab) => {
    isDarkMode[tab.id] = !isDarkMode[tab.id];
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: toggleDarkMode,
        args: [isDarkMode[tab.id]],
    });
});

function toggleDarkMode(isDark) {
    if (isDark) {
        document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
        const media = document.querySelectorAll('img, video');
        media.forEach((el) => {
            el.style.filter = 'invert(1) hue-rotate(180deg)';
        });
    } else {
        document.documentElement.style.filter = '';
        const media = document.querySelectorAll('img, video');
        media.forEach((el) => {
            el.style.filter = '';
        });
    }
}
