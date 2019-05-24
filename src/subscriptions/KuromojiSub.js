import * as actions from '~/actions';
import kuromoji from '~/libs/kuromoji';

export const KuromojiEffect = (props, dispatch) => {
  dispatch(props.actions.loadingDict, true);

  kuromoji.init().then(res => {
    dispatch(props.actions.fetchDict, true);
    dispatch(props.actions.loadingDict, false);
  });

  return () => {};
};

const Kuromoji = props => [KuromojiEffect, props];

export const KuromojiSub = Kuromoji({
  actions: {
    ...actions.Parser,
  },
});
