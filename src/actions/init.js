/**
 * timeline
 *  - type: 'speech' | 'error'
 *  - text: string
 *  - isFinal?: boolean
 *  - ts?: number
 *
 */
export const Init = () => ({
  calc: false,
  enable: !!SpeechRecognition,
  status: '',
  error: null,
  started: false,
  timeline: [],
});
