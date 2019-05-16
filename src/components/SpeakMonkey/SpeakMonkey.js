import { h } from 'hyperapp';

export default function SpeakMonky({ started, onclick }) {
  return (
    <div class="speak-monkey">
      <button class="speak-monkey-btn" onclick={onclick}>
        {started ? <span>🐵</span> : <span>🙊</span>}
      </button>
    </div>
  );
}
