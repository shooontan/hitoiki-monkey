import { Speech, SpeechSub, isActiveSpeech } from '~/subscriptions/SpeechSub';
import { Time, interval } from '~/subscriptions/TimeSub';

export default state => [isActiveSpeech(state) && SpeechSub];
