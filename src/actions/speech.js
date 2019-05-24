import SpeechRecognition from '~/libs/SpeechRecognition';
import kuromoji from '~/libs/kuromoji';

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

export const tokenizeUpdateTranscript = (state, transcript) => {
  const ipadics = kuromoji.tokenizer.tokenize(transcript.text || '');

  const readingLength = ipadics.reduce((pre, now) => {
    const nowLength = now.reading
      ? now.reading.length
      : now.surface_form.length;
    return pre + nowLength;
  }, 0);

  return updateTranscript(state, {
    ...transcript,
    reading: readingLength,
  });
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
