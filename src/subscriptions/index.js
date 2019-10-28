import { SpeechSub } from '~/subscriptions/SpeechSub';
import { Time } from '~/subscriptions/TimeSub';

export default state => [
  state.enable && state.dict && state.started && SpeechSub,
  state.enable && state.calc && Time,
];
