document.addEventListener("DOMContentLoaded", function () {
  var toggleButton = document.getElementById("toggleButton");

  chrome.storage.sync.get("enabled", function (data) {
    toggleButton.textContent = data.enabled ? "Disable" : "Enable";
  });

  toggleButton.addEventListener("click", function () {
    chrome.storage.sync.get("enabled", function (data) {
      var newState = !data.enabled;
      chrome.storage.sync.set({ enabled: newState }, function () {
        toggleButton.textContent = newState ? "Disable" : "Enable";
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "toggleState",
              enabled: newState,
            });
          }
        );
      });
    });
  });
});
