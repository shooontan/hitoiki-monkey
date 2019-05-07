window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

const recognition = new webkitSpeechRecognition();
recognition.lang = 'ja';
recognition.interimResults = true;
recognition.continuous = true;

export default recognition;
