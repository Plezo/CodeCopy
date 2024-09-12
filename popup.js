const toggleButton = document.getElementById('toggleButton');

chrome.storage.sync.get('enabled', (data) => {
    const isEnabled = data.enabled || false;
    toggleButton.textContent = isEnabled ? 'Disable Extension' : 'Enable Extension';
    console.log(`Extension is ${isEnabled ? 'on' : 'off'}`)
});

toggleButton.addEventListener('click', () => {
    chrome.storage.sync.get('enabled', (data) => {
        const isEnabled = data.enabled || false;
        chrome.storage.sync.set({ enabled: !isEnabled }, () => {
            toggleButton.textContent = !isEnabled ? 'Disable Extension' : 'Enable Extension';
            console.log(`Extension is now ${isEnabled ? 'on' : 'off'}`)
        });
    });
});