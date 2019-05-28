import { fetchDict, loadingDict } from './parser';

describe('parser actions', () => {
  test('fetchDict action', () => {
    const state = { dict: false, x: 'y' };
    let dict = true;
    expect(fetchDict(state, dict)).toEqual({ ...state, dict });

    dict = false;
    expect(fetchDict(state, dict)).toEqual({ ...state, dict });
  });

  test('loadingDict action', () => {
    const state = { dict: false, x: 'y', dictLoading: false };
    let dictLoading = true;
    expect(loadingDict(state, dictLoading)).toEqual({ ...state, dictLoading });

    dictLoading = false;
    expect(loadingDict(state, dictLoading)).toEqual({ ...state, dictLoading });
  });
});
