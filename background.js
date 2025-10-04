chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.darkMode !== undefined) {
        // Forward the message to the active tab's content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    darkMode: request.darkMode,
                });
            }
        });
    }
});
