import { h } from 'hyperapp';

import DotDot from '~/components/DotDot';

export default function Comment(props) {
  const { enable, dictLoading, status, transcript, transcripts } = props;

  // TODO
  const listElm = document.getElementById('comment-list');
  if (listElm) {
    listElm.scrollTop = listElm.scrollHeight;
  }

  if (!enable) {
    return (
      <div class="comment">
        <div class="comment-not-support">
          <p>Your browser is not supported.</p>
          <p>Please use Chrome browser.</p>
        </div>
      </div>
    );
  }

  if (dictLoading) {
    return (
      <div class="comment">
        <div class="comment-loading">
          Now Loading
          <DotDot />
        </div>
      </div>
    );
  }

  return (
    <div class="comment">
      <ul id="comment-list" class="comment-list">
        {transcripts.map((transcript, index) => (
          <li
            class={{
              'comment-list-item': true,
              none: !transcript.text,
            }}
          >
            <div>
              <span>{transcript.text}</span>
              {!transcript.isFinal && <DotDot />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
