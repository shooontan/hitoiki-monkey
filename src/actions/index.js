import * as Speech from '~/actions/speech';
import * as Parser from '~/actions/parser';

import SpeechRecognition from '~/libs/SpeechRecognition';

export { Speech, Parser };

export const Init = () => ({
  calc: false,
  enable: !!SpeechRecognition,
  dict: false,
  dictLoading: false,
  status: '',
  started: false,
  transcripts: [],
});
