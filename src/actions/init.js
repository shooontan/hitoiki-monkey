export const Init = () => ({
  calc: false,
  enable: !!SpeechRecognition,
  dict: false,
  dictLoading: false,
  status: '',
  started: false,
  transcripts: [],
  errorType: '',
});
