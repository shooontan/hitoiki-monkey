import nanoid from 'nanoid';
import SpeechRecognition from '~/libs/SpeechRecognition';
import handler from '~/subscriptions/Handler';
import * as actions from '~/actions/speech';
import * as ErrorType from '~/constants/error';

export const isActiveSpeech = state => {
  if (!state.enable) return;
  if (!state.started) return;
  if (state.error && state.error !== ErrorType.ERROR_NO_SPEECH) return;
  return true;
};

const SpeechEffect = (dispatch, props) => {
  // for infinite loop
  let loopKeeper = false;

  const startHandle = handler.addListener(SpeechRecognition, 'start', () => {
    console.log('onstart');
  });

  const soundstartHandler = handler.addListener(
    SpeechRecognition,
    'soundstart',
    () => {
      console.log('onsoundstart');
    }
  );

  const speechstartHandle = handler.addListener(
    SpeechRecognition,
    'speechstart',
    () => {
      console.log('onspeechstart');
      dispatch(props.addTimelineItem, {
        id: nanoid(10),
      });
    }
  );

  const resultHandle = handler.addListener(
    SpeechRecognition,
    'result',
    event => {
      console.log('onresult');
      const { results, resultIndex, timeStamp } = event;

      for (let index = resultIndex; index < results.length; index++) {
        const result = results[index];

        dispatch(props.updateTimelineItem, {
          text: result[0].transcript,
          isFinal: false,
        });

        if (result.isFinal) {
          // add stt result
          dispatch(props.updateTimelineItem, {
            text: result[0].transcript,
            isFinal: result.isFinal,
            ts: timeStamp,
          });
          SpeechRecognition.stop();
        }
      }
    }
  );

  const speechendHandle = handler.addListener(
    SpeechRecognition,
    'speechend',
    () => {
      console.log('onspeechend');
    }
  );

  const soundendHandler = handler.addListener(
    SpeechRecognition,
    'soundend',
    () => {
      console.log('onsoundend');
    }
  );

  const endHandle = handler.addListener(SpeechRecognition, 'end', () => {
    console.log('onend');
    // dispatch(props.updateStatus, '認識完了');
    SpeechRecognition.start();
  });

  const errorHandle = handler.addListener(SpeechRecognition, 'error', error => {
    const status = `onerror: ${error.error}`;
    console.log(error);

    // add error to timeline
    dispatch(props.updateTimeline, {
      type: 'error',
      text: status,
      isFinal: true,
    });

    dispatch(props.setError, error.error);
    dispatch(props.updateStatus, status);
  });

  return () => {
    handler.removeListener(startHandle);
    handler.removeListener(soundstartHandler);
    handler.removeListener(speechstartHandle);
    handler.removeListener(resultHandle);
    handler.removeListener(speechendHandle);
    handler.removeListener(soundendHandler);
    handler.removeListener(endHandle);
    handler.removeListener(errorHandle);

    // skip if dispatch had been done
    if (!loopKeeper) {
      loopKeeper = true;
      dispatch(props.updateTimelineItem, {
        isFinal: true,
      });
    }
  };
};

const Speech = props => [SpeechEffect, props];

export const SpeechSub = Speech({
  ...actions,
});
