import { Speech, SpeechSub, isActiveSpeech } from '~/subscriptions/SpeechSub';
import { Time, interval, isActiveTime } from '~/subscriptions/TimeSub';

export default state => [
  isActiveSpeech(state) && SpeechSub,
  isActiveTime(state) &&
    interval({
      timeline: state.timeline,
      delay: 2000,
    }),
];
