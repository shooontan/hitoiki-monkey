import { SpeechSub } from '~/subscriptions/SpeechSub';
import { Time } from '~/subscriptions/TimeSub';
import { KuromojiSub } from '~/subscriptions/KuromojiSub';

export default state => [
  state.enable && state.dict && state.started && SpeechSub,
  state.enable && state.calc && Time,
  state.enable && state.started && KuromojiSub,
];
