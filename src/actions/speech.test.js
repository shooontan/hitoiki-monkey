import * as actions from './speech';

describe('speech actions', () => {
  test('onStart action', () => {
    const state = {
      started: false,
      calc: false,
    };
    const expected = {
      started: true,
      calc: true,
    };
    const startAction = jest.fn();

    expect(actions.onStart(state, startAction)).toEqual(expected);
    expect(startAction).toHaveBeenCalledTimes(1);
  });

  test('onStop action', () => {
    const state = {
      started: false,
      calc: false,
    };
    const expected = {
      started: false,
      calc: false,
    };
    const stopAction = jest.fn();

    expect(actions.onStop(state, stopAction)).toEqual(expected);
    expect(stopAction).toHaveBeenCalledTimes(1);
  });

  test('updateTranscript action', () => {
    const state = {
      transcripts: [{ text: 'first', reading: 4 }, { text: 'second' }],
    };
    const transcript = { text: 'third', reading: 8 };
    const expected = {
      transcripts: [{ text: 'first', reading: 4 }, { ...transcript }],
    };

    expect(actions.updateTranscript(state, transcript)).toEqual(expected);
  });

  test('addTranscript', () => {
    const state = {
      transcripts: [
        { text: 'first', reading: 4 },
        { text: 'second', reading: 1 },
      ],
    };
    const transcript = { text: 'third', reading: 8 };
    const expected = {
      transcripts: [
        { text: 'first', reading: 4 },
        { text: 'second', reading: 1 },
        { ...transcript },
      ],
    };

    expect(actions.addTranscript(state, transcript)).toEqual(expected);
  });

  test('updateStatus', () => {
    const state = { status: false };
    const status = true;
    const expected = { status: true };
    expect(actions.updateStatus(state, status)).toEqual(expected);
  });

  test('stopSpeechRecognition', () => {
    const state = {
      transcripts: [{ text: 'first', isFinal: true }, { text: 'second' }],
    };
    const expected = {
      transcripts: [
        { text: 'first', isFinal: true },
        { text: 'second', isFinal: true },
      ],
    };

    expect(actions.stopSpeechRecognition(state)).toEqual(expected);
  });

  test('calcSpeed with empty timestamp', () => {
    let state = {
      speed: 11111,
      transcripts: [{ text: 'first', isFinal: true }],
    };
    let expected = {
      speed: 0,
      transcripts: [{ text: 'first', isFinal: true }],
    };

    expect(actions.calcSpeed(state)).toEqual(expected);
  });

  test('calcSpeed with latest empty transcript', () => {
    const state = {
      transcripts: [],
    };
    const expected = {
      speed: 0,
      transcripts: [],
    };

    expect(actions.calcSpeed(state)).toEqual(expected);
  });

  test('calcSpeed', () => {
    const perLength = 300;
    const state = {
      transcripts: [{ reading: 1111, ts: 40000 }, { reading: 2222, ts: 10000 }],
    };
    const expected = {
      speed: (1111 + 2222) / perLength,
      transcripts: [{ reading: 1111, ts: 40000 }, { reading: 2222, ts: 10000 }],
    };

    expect(actions.calcSpeed(state)).toEqual(expected);
  });

  test('calcSpeed with empty ts', () => {
    const perLength = 300;
    const state = {
      transcripts: [{ reading: 1111 }, { reading: 2222, ts: 10000 }],
    };
    const expected = {
      speed: 2222 / perLength,
      transcripts: [{ reading: 1111 }, { reading: 2222, ts: 10000 }],
    };

    expect(actions.calcSpeed(state)).toEqual(expected);
  });

  test('calcSpeed over 1 mins', () => {
    const perLength = 300;
    const state = {
      transcripts: [{ reading: 1111, ts: 1000 }, { reading: 2222, ts: 70000 }],
    };
    const expected = {
      speed: 2222 / perLength,
      transcripts: [{ reading: 1111, ts: 1000 }, { reading: 2222, ts: 70000 }],
    };

    expect(actions.calcSpeed(state)).toEqual(expected);
  });
});
