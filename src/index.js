import { h, app } from 'hyperapp';
import * as actions from '~/actions';
import view from '~/view';
import subscriptions from '~/subscriptions';

import './style/style.scss';

app({
  init: actions.Init.Init,
  view: view,
  node: document.getElementById('app'),
  subscriptions,
});
