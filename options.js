const customCssInput = document.getElementById('customCss');
const saveButton = document.getElementById('saveButton');
const statusLabel = document.getElementById('status');

function showStatus(message, isError = false) {
  statusLabel.textContent = message;
  statusLabel.style.color = isError ? '#c92a2a' : '#2563eb';
}

function saveCustomCss() {
  const customCss = customCssInput.value;
  chrome.storage.sync.set({ customCss }, () => {
    if (chrome.runtime.lastError) {
      showStatus('Unable to save custom CSS.', true);
      return;
    }
    showStatus('Custom CSS saved successfully.');
  });
}

function loadCustomCss() {
  chrome.storage.sync.get('customCss', (items) => {
    if (chrome.runtime.lastError) {
      showStatus('Unable to load custom CSS.', true);
      return;
    }
    customCssInput.value = items.customCss || '';
  });
}

saveButton.addEventListener('click', saveCustomCss);
loadCustomCss();
