// Create the context menu on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "textToSpeech",
    title: "Read Text Aloud",
    contexts: ["selection"] // Show the menu only when text is selected
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "textToSpeech" && info.selectionText) {
    // Inject the content script to run in the context of the current tab
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ["content.js"] // Inject the content script
      },
      () => {
        // Send the selected text to the content script
        chrome.tabs.sendMessage(tab.id, { text: info.selectionText });
      }
    );
  }
});
