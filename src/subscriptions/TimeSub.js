import * as actions from '~/actions';
import * as parse from '~/api/parse';

export const isActiveTime = state => {
  return state.enable && state.calc;
};

export const IntervalEffect = (dispatch, props) => {
  const { timeline } = props;

  const lastItem = timeline && timeline[timeline.length - 1];
  if (!lastItem) {
    return () => {};
  }

  if (
    typeof lastItem.count === 'number' ||
    lastItem.type !== 'speech' ||
    !lastItem.isFinal
  ) {
    return () => {};
  }

  if (lastItem.text) {
    parse
      .post(lastItem.text)
      .then(res => {
        dispatch(actions.Speech.setTextCount, {
          id: lastItem.id,
          count: res.length || 0,
        });
      })
      .catch(__ => {});
  }

  return () => {};
};

export const interval = props => [IntervalEffect, props];

export const Time = interval({
  action: actions.Speech.calcSpeed,
  delay: 2000,
});
