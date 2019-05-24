import { h } from 'hyperapp';
import * as actions from '~/actions';

import Comment from '~/components/Comment';
import SpeakMonky from '~/components/SpeakMonkey';
import SpeedMeter from '~/components/SpeedMeter';
import Kuromoji from '~/components/Kuromoji';

const view = state => (
  <div>
    <Comment {...state} />
    <SpeakMonky
      {...state}
      onclick={state.started ? actions.Speech.onStop : actions.Speech.onStart}
    />
    <SpeedMeter {...state} />
    <Kuromoji {...state} />
  </div>
);

export default view;
