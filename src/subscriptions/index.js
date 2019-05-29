import { SpeechSub } from '~/subscriptions/SpeechSub';
import { Time } from '~/subscriptions/TimeSub';
import { KuromojiSub } from '~/subscriptions/KuromojiSub';
import * as errorType from '~/constants/errorType';

export const isSpeechSub = state =>
  // state.errorType !== errorType.ERROR_NOT_ALLOWED &&
  state.enable && state.dict && state.started;

export const isTime = state => state.enable && state.calc;

export const isKuromojiSub = state => state.enable && state.started;

export default state => [
  console.log(state),
  isSpeechSub(state) && SpeechSub,
  isTime(state) && Time,
  isKuromojiSub(state) && KuromojiSub,
];
