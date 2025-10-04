document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('dark-mode-toggle');

    // Load the saved state
    chrome.storage.sync.get('darkMode', (data) => {
        toggle.checked = data.darkMode;
    });

    // Save the state and send a message to the content script
    toggle.addEventListener('change', () => {
        const darkMode = toggle.checked;
        chrome.storage.sync.set({ darkMode });

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { darkMode });
        });
    });
});
