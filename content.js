let enabled = false;

function updateState() {
  chrome.runtime.sendMessage({ action: "getState" }, function (response) {
    enabled = response.enabled;
  });
}

// Initialize the state
updateState();

// Listen for state changes
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "stateChanged") {
    enabled = request.enabled;
  }
});

document.addEventListener("click", function (e) {
  if (!enabled) return;

  let codeElement = e.target.closest("code");
  if (codeElement) {
    let codeText = codeElement.textContent;

    navigator.clipboard
      .writeText(codeText)
      .then(() => {
        showToast("Code copied to clipboard!");
      })
      .catch((err) => {
        showToast("Failed to copy code: " + err);
      });
  }
});

function showToast(message) {
  let toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.backgroundColor = "#333";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "5px";
  toast.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.1)";
  toast.style.zIndex = "9999";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.3s";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "1";
  }, 100);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 2000);
}
