document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const showKeyBtn = document.getElementById('showKey');
  const saveBtn = document.getElementById('saveBtn');
  const status = document.getElementById('status');

  // Load saved API key
  chrome.storage.sync.get(['geminiApiKey'], (result) => {
    if (result.geminiApiKey) {
      apiKeyInput.value = result.geminiApiKey;
    }
  });

  // Toggle API key visibility
  showKeyBtn.addEventListener('click', () => {
    if (apiKeyInput.type === 'password') {
      apiKeyInput.type = 'text';
      showKeyBtn.textContent = 'Hide';
    } else {
      apiKeyInput.type = 'password';
      showKeyBtn.textContent = 'Show';
    }
  });

  // Save API key
  saveBtn.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    
    if (!apiKey) {
      showStatus('Please enter an API key', 'error');
      return;
    }

    chrome.storage.sync.set({ geminiApiKey: apiKey }, () => {
      showStatus('Settings saved successfully!', 'success');
    });
  });

  function showStatus(message, type) {
    status.textContent = message;
    status.className = `status-message ${type}`;
    status.style.display = 'block';
    
    setTimeout(() => {
      status.style.display = 'none';
    }, 3000);
  }
}); 