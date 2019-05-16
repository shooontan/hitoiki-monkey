import { h } from 'hyperapp';

export default function Comment(props) {
  const { status, transcript, transcripts } = props;
  return (
    <div class="comment">
      <p>{status}</p>
      <p>{transcript}</p>
      <ul>
        {transcripts.map(_transcript => (
          <li>{_transcript}</li>
        ))}
      </ul>
    </div>
  );
}
