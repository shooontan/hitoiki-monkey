import { h, app } from "hyperapp";
import * as actions from "./actions";
import subscriptions from "./subscriptions";

app({
  init: actions.Init,
  view: state => (
    <div>
      <button
        onclick={state.started ? actions.Speech.onStop : actions.Speech.onStart}
      >
        {state.started ? "ストップ" : "スタート"}
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
  container: document.getElementById("app"),
  subscriptions
});
