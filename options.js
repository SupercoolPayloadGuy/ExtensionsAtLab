const customCssInput = document.getElementById('customCss');
const enabledCheckbox = document.getElementById('enabledCheckbox');
const saveButton = document.getElementById('saveButton');
const statusLabel = document.getElementById('status');

const STORAGE_KEYS = {
  customCss: 'apps4labCustomCss',
  enabled: 'apps4labCustomCssEnabled'
};

function showStatus(message, isError = false) {
  statusLabel.textContent = message;
  statusLabel.style.color = isError ? '#c92a2a' : '#2563eb';
}

function saveCustomCss() {
  const data = {
    [STORAGE_KEYS.customCss]: customCssInput.value,
    [STORAGE_KEYS.enabled]: enabledCheckbox.checked
  };
  chrome.storage.sync.set(data, () => {
    if (chrome.runtime.lastError) {
      showStatus('Unable to save custom CSS.', true);
      return;
    }
    showStatus('Saved successfully.');
  });
}

function loadCustomCss() {
  chrome.storage.sync.get([STORAGE_KEYS.customCss, STORAGE_KEYS.enabled], (items) => {
    if (chrome.runtime.lastError) {
      showStatus('Unable to load custom CSS.', true);
      return;
    }
    customCssInput.value = items[STORAGE_KEYS.customCss] || '';
    enabledCheckbox.checked = items[STORAGE_KEYS.enabled] !== false;
  });
}

saveButton.addEventListener('click', saveCustomCss);
loadCustomCss();
