let enabled = false;

chrome.storage.sync.get("enabled", function (data) {
  enabled = data.enabled;
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleState") {
    enabled = request.enabled;
  }
});

document.addEventListener("click", function (e) {
  if (!enabled) return;

  // click on codeblock text, or whitespace within code block
  let codeElement =
    e.target.closest("code") || e.target.closest("pre")?.querySelector("code");

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
