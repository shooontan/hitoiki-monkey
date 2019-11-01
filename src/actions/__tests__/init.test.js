import { Init } from '../init';

global.SpeechRecognition = true;

test('Init action', () => {
  const state = Init();
  expect(state).toMatchSnapshot();
});
