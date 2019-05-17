import * as Speech from '~/actions/speech';

export { Speech };

export const Init = () => ({
  status: '',
  started: false,
  transcripts: [],
});
