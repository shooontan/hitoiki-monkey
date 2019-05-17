import SpeechRecognition from '~/libs/SpeechRecognition';

export const onStart = state => {
  try {
    SpeechRecognition.start();
  } catch (__) {
    // TODO: error handle
  }
  return { ...state, started: true };
};

export const onStop = state => {
  SpeechRecognition.stop();
  return { ...state, started: false };
};

export const updateTranscript = (state, transcript) => {
  const cloneTranscripts = [...state.transcripts];
  const lastTranscript = cloneTranscripts.pop();

  return {
    ...state,
    transcripts: [...cloneTranscripts, transcript],
  };
};

export const addTranscript = (state, transcript) => ({
  ...state,
  transcripts: [...state.transcripts, transcript],
});

export const updateStatus = (state, status) => ({
  ...state,
  status,
});

export const stopSpeechRecognition = state => {
  const cloneTranscripts = [...state.transcripts];
  const lastTranscript = cloneTranscripts.pop();
  const nextTranscripts = [
    ...cloneTranscripts,
    {
      ...lastTranscript,
      isFinal: true,
    },
  ];

  return {
    ...state,
    transcripts: nextTranscripts,
  };
};
