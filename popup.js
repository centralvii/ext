document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('dark-mode-toggle');

    chrome.storage.sync.get('darkMode', function (data) {
        toggle.checked = !!data.darkMode;
    });

    toggle.addEventListener('change', function () {
        const darkMode = toggle.checked;
        chrome.storage.sync.set({ darkMode: darkMode }, function () {
            chrome.runtime.sendMessage({ darkMode: darkMode });
        });
    });
});
