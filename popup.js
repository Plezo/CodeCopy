document.addEventListener("DOMContentLoaded", function () {
  var toggleButton = document.getElementById("toggleButton");

  function updateButtonState(enabled) {
    toggleButton.textContent = enabled ? "Disable" : "Enable";
  }

  chrome.runtime.sendMessage({ action: "getState" }, function (response) {
    updateButtonState(response.enabled);
  });

  toggleButton.addEventListener("click", function () {
    chrome.runtime.sendMessage({ action: "getState" }, function (response) {
      var newState = !response.enabled;
      chrome.runtime.sendMessage(
        { action: "setState", enabled: newState },
        function () {
          updateButtonState(newState);
        }
      );
    });
  });
});
