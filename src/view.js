import { h } from 'hyperapp';
import * as actions from '~/actions';
import SpeechRecognition from '~/libs/SpeechRecognition';
import Comment from '~/components/Comment';
import SpeakMonky from '~/components/SpeakMonkey';
import SpeedMeter from '~/components/SpeedMeter';

const view = state => {
  const stop = SpeechRecognition
    ? SpeechRecognition.stop.bind(SpeechRecognition)
    : undefined;
  const start = SpeechRecognition
    ? SpeechRecognition.start.bind(SpeechRecognition)
    : undefined;

  const onClickAction = state.started
    ? [actions.Speech.onStop, stop]
    : [actions.Speech.onStart, start];

  return (
    <div>
      <Comment {...state} />
      <SpeakMonky {...state} onclick={onClickAction} />
      <SpeedMeter {...state} />
    </div>
  );
};

export default view;
