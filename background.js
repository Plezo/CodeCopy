chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ enabled: true }, () => {
        console.log("Code Copy extension is enabled by default")
    });
});