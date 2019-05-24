import * as Speech from '~/actions/speech';
import * as Parser from '~/actions/parser';

export { Speech, Parser };

export const Init = () => ({
  calc: false,
  dict: false,
  dictLoading: false,
  status: '',
  started: false,
  transcripts: [],
});
