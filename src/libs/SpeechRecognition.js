window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = undefined;

try {
  recognition = new SpeechRecognition();
  recognition.lang = 'ja';
  recognition.interimResults = true;
  recognition.continuous = true;
} catch (__) {}

export default recognition;
