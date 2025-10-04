chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.darkMode !== undefined) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    darkMode: request.darkMode,
                });
            }
        });
    }
});
