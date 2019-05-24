import { h } from 'hyperapp';

export default function SpeakMonky({ enable, started, onclick }) {
  return (
    <div class="speak-monkey">
      <button class="speak-monkey-btn" onclick={onclick} disabled={!enable}>
        {started ? <span>🐵</span> : <span>🙊</span>}
      </button>
    </div>
  );
}
