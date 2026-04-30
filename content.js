const STORAGE_KEYS = {
  customCss: 'apps4labCustomCss',
  enabled: 'apps4labCustomCssEnabled'
};

const STATE = {
  styleElement: null,
  enabled: false,
  customCss: ''
};

function createStyleElement(id) {
  const style = document.createElement('style');
  style.id = id;
  document.head.appendChild(style);
  return style;
}

function applyCustomCss() {
  if (!STATE.styleElement) {
    STATE.styleElement = createStyleElement('apps4lab-custom-css');
  }

  if (STATE.enabled && STATE.customCss.trim()) {
    STATE.styleElement.textContent = STATE.customCss;
  } else {
    STATE.styleElement.textContent = '';
  }
}

function saveState() {
  const data = {
    [STORAGE_KEYS.customCss]: STATE.customCss,
    [STORAGE_KEYS.enabled]: STATE.enabled
  };
  chrome.storage.sync.set(data, () => {
    if (chrome.runtime.lastError) {
      console.warn('Apps4LAB custom CSS save error:', chrome.runtime.lastError);
    }
  });
}

function loadState(callback) {
  chrome.storage.sync.get([STORAGE_KEYS.customCss, STORAGE_KEYS.enabled], (items) => {
    if (chrome.runtime.lastError) {
      console.warn('Apps4LAB custom CSS load error:', chrome.runtime.lastError);
    }
    STATE.customCss = items[STORAGE_KEYS.customCss] || '';
    STATE.enabled = items[STORAGE_KEYS.enabled] !== false;
    callback();
  });
}

function createPanelUi() {
  const wrapper = document.createElement('div');
  wrapper.id = 'apps4lab-css-panel';
  wrapper.style.cssText = `
    position: fixed;
    right: 18px;
    bottom: 18px;
    width: 360px;
    max-height: 72vh;
    display: none;
    flex-direction: column;
    gap: 10px;
    padding: 14px;
    background: rgba(255,255,255,0.96);
    border: 1px solid rgba(15, 23, 42, 0.08);
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.14);
    border-radius: 18px;
    z-index: 999999;
    backdrop-filter: blur(10px);
    overflow: hidden;
  `;

  const header = document.createElement('div');
  header.style.cssText = 'display: flex; align-items: center; justify-content: space-between; gap: 10px;';

  const title = document.createElement('div');
  title.textContent = 'Custom CSS';
  title.style.cssText = 'font-weight: 700; font-size: 14px; color: #111827;';

  const closeButton = document.createElement('button');
  closeButton.textContent = '×';
  closeButton.style.cssText = `
    border: none;
    background: transparent;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    color: #374151;
  `;
  closeButton.addEventListener('click', () => {
    wrapper.style.display = 'none';
  });

  header.appendChild(title);
  header.appendChild(closeButton);

  const checkboxRow = document.createElement('label');
  checkboxRow.style.cssText = 'display: flex; align-items: center; gap: 8px; font-size: 13px; color: #374151;';

  const enabledCheckbox = document.createElement('input');
  enabledCheckbox.type = 'checkbox';
  enabledCheckbox.checked = STATE.enabled;
  enabledCheckbox.style.cssText = 'width: 16px; height: 16px; cursor: pointer;';
  enabledCheckbox.addEventListener('change', () => {
    STATE.enabled = enabledCheckbox.checked;
    applyCustomCss();
    saveState();
  });

  const checkboxLabel = document.createElement('span');
  checkboxLabel.textContent = 'Enabled';

  checkboxRow.appendChild(enabledCheckbox);
  checkboxRow.appendChild(checkboxLabel);

  const textarea = document.createElement('textarea');
  textarea.id = 'apps4lab-css-input';
  textarea.placeholder = 'Enter custom CSS here...';
  textarea.value = STATE.customCss;
  textarea.style.cssText = `
    width: 100%;
    min-height: 240px;
    resize: vertical;
    padding: 10px;
    border: 1px solid rgba(15, 23, 42, 0.12);
    border-radius: 12px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 13px;
    color: #111827;
    background: #f8fafc;
  `;
  textarea.addEventListener('input', () => {
    STATE.customCss = textarea.value;
  });

  const buttonRow = document.createElement('div');
  buttonRow.style.cssText = 'display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap;';

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.style.cssText = `
    padding: 10px 14px;
    border-radius: 10px;
    border: none;
    font-size: 13px;
    cursor: pointer;
    color: white;
    background: #2563eb;
  `;
  saveButton.addEventListener('click', () => {
    STATE.customCss = textarea.value;
    saveState();
    applyCustomCss();
    saveButton.textContent = 'Saved';
    setTimeout(() => {
      saveButton.textContent = 'Save';
    }, 1200);
  });

  const clearButton = document.createElement('button');
  clearButton.textContent = 'Clear';
  clearButton.style.cssText = `
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid #d1d5db;
    font-size: 13px;
    cursor: pointer;
    color: #111827;
    background: white;
  `;
  clearButton.addEventListener('click', () => {
    textarea.value = '';
    STATE.customCss = '';
    applyCustomCss();
    saveState();
  });

  buttonRow.appendChild(clearButton);
  buttonRow.appendChild(saveButton);

  wrapper.appendChild(header);
  wrapper.appendChild(checkboxRow);
  wrapper.appendChild(textarea);
  wrapper.appendChild(buttonRow);

  document.body.appendChild(wrapper);
}

function createToggleButton() {
  const button = document.createElement('button');
  button.id = 'apps4lab-css-toggle';
  button.type = 'button';
  button.title = 'Open custom CSS editor';
  button.textContent = '+';
  button.style.cssText = `
    position: fixed;
    right: 18px;
    bottom: 18px;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: none;
    background: #2563eb;
    color: white;
    font-size: 28px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 20px 60px rgba(37, 99, 235, 0.22);
    z-index: 999999;
    display: grid;
    place-items: center;
  `;
  button.addEventListener('click', () => {
    const panel = document.getElementById('apps4lab-css-panel');
    if (panel) {
      panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
    }
  });

  document.body.appendChild(button);
}

function initialize() {
  if (!document.body) {
    return;
  }

  createToggleButton();
  createPanelUi();
  applyCustomCss();
}

loadState(initialize);
