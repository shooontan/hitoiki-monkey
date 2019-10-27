import * as actions from '~/actions';

export const IntervalEffect = (dispatch, props) => {
  const id = setInterval(() => {
    dispatch(props.action);
  }, props.delay);

  return () => {
    clearInterval(id);
  };
};

export const interval = props => [IntervalEffect, props];

export const Time = interval({
  action: actions.Speech.calcSpeed,
  delay: 2000,
});
