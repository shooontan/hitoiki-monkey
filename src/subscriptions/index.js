import { SpeechSub } from '~/subscriptions/SpeechSub';
import { Time } from '~/subscriptions/TimeSub';
import { KuromojiSub } from '~/subscriptions/KuromojiSub';

export default state => [
  state.dict && state.started && SpeechSub,
  state.calc && Time,
  state.started && KuromojiSub,
];
