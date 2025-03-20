document.addEventListener('DOMContentLoaded', async () => {
  const selectedTextArea = document.getElementById('selectedText');
  const questionInput = document.getElementById('question');
  const submitBtn = document.getElementById('submitBtn');
  const loading = document.getElementById('loading');
  const responseSection = document.getElementById('responseSection');
  const response = document.getElementById('response');
  const errorMessage = document.getElementById('errorMessage');

  loading.style.display = 'none';
  responseSection.style.display = 'none';
  errorMessage.style.display = 'none';

  // Get the selected text from background script
  chrome.runtime.sendMessage({ type: 'getSelectedText' }, (result) => {
    if (result && result.text) {
      selectedTextArea.value = result.text;
    }
  });

  // Get API key from storage
  async function getApiKey() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['geminiApiKey'], (result) => {
        resolve(result.geminiApiKey);
      });
    });
  }

  async function askGemini(selectedText, question) {
    const apiKey = await getApiKey();
    if (!apiKey) {
      throw new Error('Please set your Gemini API key in the extension options');
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Context: "${selectedText}"\n\nQuestion: ${question}`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get response from Gemini API');
    }

    const data = await response.json();
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    return data.candidates[0].content.parts[0].text;
  }

  submitBtn.addEventListener('click', async () => {
    const selectedText = selectedTextArea.value.trim();
    const question = questionInput.value.trim();

    if (!selectedText || !question) {
      showError('Please ensure both selected text and question are provided');
      return;
    }

    // Reset UI
    errorMessage.style.display = 'none';
    responseSection.style.display = 'none';
    loading.style.display = 'flex';
    submitBtn.disabled = true;

    try {
      const geminiResponse = await askGemini(selectedText, question);
      response.textContent = geminiResponse;
      responseSection.style.display = 'block';
    } catch (error) {
      showError(error.message);
    } finally {
      loading.style.display = 'none';
      submitBtn.disabled = false;
    }
  });

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
  }
}); 