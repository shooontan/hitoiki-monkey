window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'ja';
recognition.interimResults = true;
recognition.continuous = true;

export default recognition;
