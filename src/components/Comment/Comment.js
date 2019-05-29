import { h } from 'hyperapp';
import * as errorType from '~/constants/errorType';
import DotDot from '~/components/DotDot';

export default function Comment(props) {
  const {
    errorType,
    enable,
    dictLoading,
    status,
    transcript,
    transcripts,
  } = props;

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

  console.log('====================================');
  console.log(errorType);
  console.log('====================================');

  if (errorType === errorType.ERROR_NOT_ALLOWED) {
    return (
      <div class="comment">
        <div class="comment-not-support">
          <p>Your browser is not allowed SpeechRecognition API.</p>
          <p>Please change SpeechRecognition API permission.</p>
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
