import kuromoji from '~/libs/kuromoji';

export const onStart = (state, startAction = () => {}) => {
  try {
    startAction();
  } catch (__) {
    // TODO: error handle
  }
  return { ...state, started: true, calc: true };
};

export const onStop = (state, stopAction = () => {}) => {
  stopAction();
  return { ...state, started: false, calc: false };
};

// TODO: test
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

export const calcSpeed = state => {
  const isEmptyTs = state.transcripts[state.transcripts.length - 1]
    ? typeof state.transcripts[state.transcripts.length - 1].ts === 'undefined'
    : true;

  if (isEmptyTs) {
    return {
      ...state,
      speed: 0,
    };
  }

  // 300 letter per 1 minute
  const perLength = 300;

  let latestTs = 0;
  for (let index = state.transcripts.length; index > 0; index--) {
    const item = state.transcripts[index - 1];
    if (item && typeof item.ts === 'number') {
      latestTs = item.ts;
    }
    if (latestTs > 0) {
      break;
    }
  }

  const targetTranscripts = [...state.transcripts].reverse().filter(trans => {
    if (typeof trans.ts === 'undefined') {
      return false;
    }
    return parseInt(latestTs - trans.ts, 10) < 1 * 60 * 1000;
  });

  const speed = targetTranscripts.reduce((pre, now) => {
    return pre + (now.reading || 0);
  }, 0);

  return {
    ...state,
    speed: speed / perLength,
  };
};
