import { h } from 'hyperapp';

import DotDot from '~/components/DotDot';

export default function Comment(props) {
  const { status, transcript, transcripts } = props;

  // TODO
  const listElm = document.getElementById('comment-list');
  if (listElm) {
    listElm.scrollTop = listElm.scrollHeight;
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
