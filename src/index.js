import { h, app } from 'hyperapp';
import * as actions from '~/actions';
import subscriptions from '~/subscriptions';

import './style/style.scss';

app({
  init: actions.Init,
  view: state => (
    <div>
      <button
        class="btn-start"
        onclick={state.started ? actions.Speech.onStop : actions.Speech.onStart}
      >
        {state.started ? 'ストップ' : 'スタート'}
      </button>
      <p>{state.status}</p>
      <p>{state.transcript}</p>
      <ul>
        {state.transcripts.map(_transcript => (
          <li>{_transcript}</li>
        ))}
      </ul>
    </div>
  ),
  node: document.getElementById('app'),
  subscriptions,
});
