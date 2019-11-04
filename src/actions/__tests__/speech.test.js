import * as actions from '../speech';
import { Init } from '../init';

global.SpeechRecognition = true;

describe('speech actions', () => {
  test('onStart action', () => {
    const state = Init();
    const expected = {
      ...state,
      started: true,
      calc: true,
    };
    const startAction = jest.fn();

    expect(actions.onStart(state, startAction)).toEqual(expected);
    expect(startAction).toHaveBeenCalledTimes(1);
  });

  test('onStop action', () => {
    const state = Init();
    const expected = {
      ...state,
      started: false,
      calc: false,
      error: null,
    };
    const stopAction = jest.fn();

    expect(actions.onStop(state, stopAction)).toEqual(expected);
    expect(stopAction).toHaveBeenCalledTimes(1);
  });

  test('addTimelineItem', () => {
    const state = Init();
    const expected1 = {
      ...state,
      timeline: [
        {
          id: 'abc',
          type: 'speech',
          text: '',
          isFinal: false,
        },
      ],
    };
    expect(
      actions.addTimelineItem(state, {
        id: 'abc',
      })
    ).toEqual(expected1);

    const expected2 = {
      ...expected1,
      timeline: [
        ...expected1.timeline,
        {
          id: 'xyz',
          type: 'error',
          text: '',
          isFinal: false,
        },
      ],
    };
    expect(
      actions.addTimelineItem(expected1, { id: 'xyz', type: 'error' })
    ).toEqual(expected2);
  });

  test('updateTimelineItem', () => {
    const state = Init();
    const item = {
      type: 'speech',
      text: '',
      isFinal: false,
    };
    const expected1 = {
      ...state,
      timeline: [item],
    };
    const expected2 = {
      ...expected1,
      timeline: [
        {
          ...item,
          text: 'text',
          isFinal: true,
        },
      ],
    };
    expect(actions.updateTimelineItem(state, item)).toEqual(expected1);
    expect(
      actions.updateTimelineItem(expected1, { text: 'text', isFinal: true })
    ).toEqual(expected2);
  });

  test('updateStatus', () => {
    const state = { status: false };
    const status = true;
    const expected = { status: true };
    expect(actions.updateStatus(state, status)).toEqual(expected);
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
