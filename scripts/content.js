chrome.runtime.onMessage.addListener(async (message) => {
  if (message.text) {
    try {
      // Send the text to the backend
      const response = await fetch("http://localhost:3000/generate-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message.text })
      });

      if (!response.ok) {
        console.error("Failed to generate AI speech.");
        return;
      }

      const { audioUrl } = await response.json();

      // Play the audio in the browser
      const audio = new Audio(`http://localhost:3000${audioUrl}`);
      audio.play();
    } catch (error) {
      console.error("Error fetching AI speech:", error);
    }
  } else {
    console.error("No text received for speech synthesis.");
  }
});
