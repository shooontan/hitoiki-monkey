import SpeechRecognition from '~/libs/SpeechRecognition';

export const onStart = state => {
  SpeechRecognition.start();
  return { ...state, started: true };
};

export const onStop = state => {
  SpeechRecognition.stop();
  return { ...state, started: false };
};

export const updateTranscript = (state, transcript) => ({
  ...state,
  transcript,
});

export const addTranscript = (state, transcript) => ({
  ...state,
  transcripts: [...state.transcripts, transcript],
});

export const updateStatus = (state, status) => ({
  ...state,
  status,
});

export const stopSpeechRecognition = state => ({
  ...state,
  transcript: '',
  transcripts: [...state.transcripts, state.transcript],
});
