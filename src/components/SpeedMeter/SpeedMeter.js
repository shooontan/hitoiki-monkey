import { h } from 'hyperapp';

const MeterItemCount = 20;

export default function SpeedMeter(props) {
  const { speed } = props;

  const MeterItems = [...new Array(MeterItemCount)].map(() => (
    <div class="speed-meter-item" />
  ));

  return (
    <div class="speed-meter">
      <div class="speed-meter-inner">
        {MeterItems}
        <div
          class="speed-meter-bar"
          style={{ height: `${props.speed * 100}%` }}
        />
      </div>
    </div>
  );
}
