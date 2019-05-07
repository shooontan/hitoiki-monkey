import SpeechRecognition from '~/libs/SpeechRecognition';
import handler from '~/subscriptions/Handler';
import * as actions from '~/actions/speech';

const SpeechEffect = (props, dispatch) => {
  const speechstartHandle = handler.addListener(
    SpeechRecognition,
    'speechstart',
    () => {
      console.log('onspeechstart');
      dispatch(props.updateStatus, '認識開始');
    }
  );

  const resultHandle = handler.addListener(
    SpeechRecognition,
    'result',
    event => {
      console.log('onresult');
      const { results, resultIndex } = event;
      dispatch(props.updateStatus, '認識中');
      for (let index = resultIndex; index < results.length; index++) {
        if (results[index].isFinal) {
          dispatch(props.addTranscript, results[index][0].transcript);
          SpeechRecognition.stop();
        } else {
          dispatch(
            props.updateTranscript,
            `${results[index][0].transcript} ...`
          );
        }
      }
    }
  );

  const endHandle = handler.addListener(SpeechRecognition, 'end', () => {
    console.log('onend');
    dispatch(props.updateStatus, '認識完了');
    dispatch(props.updateTranscript, '');
    SpeechRecognition.start();
  });

  const errorHandle = handler.addListener(SpeechRecognition, 'error', error => {
    const status = `onerror: ${error.error}`;
    console.log(error);
    dispatch(props.updateStatus, status);
  });

  return () => {
    handler.removeListener(speechstartHandle);
    handler.removeListener(resultHandle);
    handler.removeListener(endHandle);
    handler.removeListener(errorHandle);

    dispatch(props.stopSpeechRecognition);
  };
};

const Speech = props => [SpeechEffect, props];

export const SpeechSub = Speech({
  ...actions,
});
