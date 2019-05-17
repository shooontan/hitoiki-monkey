import { h } from 'hyperapp';

export default function Comment(props) {
  const { status, transcript, transcripts } = props;

  // TODO
  const listElm = document.getElementById('comment-list');
  if (listElm) {
    listElm.scrollTop = listElm.scrollHeight;
  }

  return (
    <div class="comment">
      <p>{status}</p>
      <p>{transcript}</p>
      <ul id="comment-list" class="comment-list">
        {transcripts.map(_transcript => (
          <li class="comment-list-item">
            <div>
              <span>{_transcript}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
