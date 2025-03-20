// Create context menu item when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'askGemini',
    title: 'Ask Gemini about "%s"',
    contexts: ['selection']
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'askGemini') {
    // Store the selected text temporarily
    chrome.storage.local.set({ 'selectedText': info.selectionText }, () => {
      // Open the popup
      chrome.action.openPopup();
    });
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getSelectedText') {
    chrome.storage.local.get(['selectedText'], (result) => {
      sendResponse({ text: result.selectedText || '' });
      // Clear the stored text after sending
      chrome.storage.local.remove('selectedText');
    });
    return true; // Required for async response
  }
}); 