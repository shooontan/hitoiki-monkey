import { h } from 'hyperapp';
import kuromoji from '~/libs/kuromoji';

export default function Kuromoji(state) {
  if (state.started) {
    kuromoji.init();
  }
  return null;
}
