import { h } from 'hyperapp';

import DotDot from '~/components/DotDot';

export default function Comment(props) {
  const { started, enable, error, timeline } = props;

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

  const rTimeline = [...timeline].reverse();

  return (
    <div class="comment">
      <ul id="comment-list" class="comment-list">
        {rTimeline.map((tl, index) => (
          <li
            class={{
              'comment-list-item': true,
              none: !tl.text,
            }}
          >
            <div>
              <span>{tl.text}</span>
              {!tl.isFinal && <DotDot />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
