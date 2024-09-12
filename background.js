chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ enabled: false }, function () {
    console.log("Code Copy is disabled by default");
  });
});
