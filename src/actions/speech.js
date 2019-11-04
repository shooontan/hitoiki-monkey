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
  return { ...state, started: false, calc: false, error: null };
};

export const addTimelineItem = (state, { id = '', type = 'speech' }) => ({
  ...state,
  timeline: [
    ...state.timeline,
    {
      id,
      type: type,
      text: '',
      isFinal: false,
    },
  ],
});

export const updateTimelineItem = (state, item) => {
  const lastItem = state.timeline.pop() || {};
  return {
    ...state,
    timeline: [...state.timeline, { ...lastItem, ...item }],
  };
};

export const setTextCount = (state, { id, count }) => {
  const nextTimeline = [...state.timeline];

  for (let index = 0; index < nextTimeline.length; index++) {
    const item = nextTimeline[index];
    if (item.id !== id) {
      continue;
    }

    item['count'] = count;
    nextTimeline[index] = item;
    break;
  }

  return {
    ...state,
    timeline: nextTimeline,
  };
};

export const updateTimeline = (state, text) => ({
  ...state,
  timeline: [...state.timeline, text],
});

export const updateStatus = (state, status) => ({
  ...state,
  status,
});

export const setError = (state, errorStatus) => ({
  ...state,
  error: errorStatus,
});

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
