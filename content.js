// Listen for messages from the background script
chrome.runtime.onMessage.addListener(async (message) => {
  if (message.text) {
    const speech = new SpeechSynthesisUtterance(message.text);
    window.speechSynthesis.speak(speech);
  } else {
    console.error("No text received for speech synthesis.");
  }
});

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.contextMenus.create({
//     id: "textToSpeech",
//     title: "Read Text Aloud",
//     contexts: ["selection"]
//   });
// });

// chrome.contextMenus.onClicked.addListener(async (info, tab) => {
//   if (info.menuItemId === "textToSpeech" && info.selectionText) {
//     const response = await fetch(
//       "https://api.openai.com/v1/engines/davinci-codex/completions",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer process.env.OPENAI_API_KEY`
//         },
//         body: JSON.stringify({
//           model: "text-davinci",
//           prompt: info.selectionText,
//           max_tokens: 250
//         })
//       }
//     );

//     const result = await response.json();
//     const speech = new SpeechSynthesisUtterance(result.choices[0].text);
//     window.speechSynthesis.speak(speech);
//   }
// });
