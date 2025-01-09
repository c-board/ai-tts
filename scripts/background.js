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
    // Check if the content script is already injected
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => !!window.contentScriptInjected
      },
      (results) => {
        if (results[0].result) {
          // Send the selected text to the content script
          chrome.tabs.sendMessage(tab.id, { text: info.selectionText });
        } else {
          // Inject the content script to run in the context of the current tab
          chrome.scripting.executeScript(
            {
              target: { tabId: tab.id },
              files: ["scripts/content.js"] // Inject the content script
            },
            () => {
              // Mark the content script as injected
              chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                  window.contentScriptInjected = true;
                }
              });
              // Send the selected text to the content script
              chrome.tabs.sendMessage(tab.id, { text: info.selectionText });
            }
          );
        }
      }
    );
  }
});
