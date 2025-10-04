document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('dark-mode-toggle');

    // Load the saved state
    chrome.storage.sync.get('darkMode', (data) => {
        toggle.checked = data.darkMode;
    });

    // Save the state
    toggle.addEventListener('change', () => {
        const darkMode = toggle.checked;
        chrome.storage.sync.set({ darkMode });
    });
});
