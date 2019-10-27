import * as actions from '~/actions';
import kuromoji from '~/libs/kuromoji';

export const KuromojiEffect = (dispatch, props) => {
  kuromoji.init().then(res => {
    dispatch(props.actions.fetchDict, true);
  });

  return () => {};
};

const Kuromoji = props => [KuromojiEffect, props];

export const KuromojiSub = Kuromoji({
  actions: {
    ...actions.Parser,
  },
});
