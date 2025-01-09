document.getElementById("test").addEventListener("click", () => {
  const speech = new SpeechSynthesisUtterance(
    "This is a test of the text-to-speech functionality."
  );
  window.speechSynthesis.speak(speech);
});
