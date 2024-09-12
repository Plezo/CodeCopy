let enabled = false;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getState") {
    sendResponse({ enabled: enabled });
  } else if (request.action === "setState") {
    enabled = request.enabled;
    sendResponse({ success: true });
    chrome.tabs.query({}, function (tabs) {
      for (let tab of tabs) {
        chrome.tabs.sendMessage(tab.id, {
          action: "stateChanged",
          enabled: enabled,
        });
      }
    });
  }
});
