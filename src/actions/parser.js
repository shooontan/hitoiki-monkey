export const fetchDict = (state, status) => ({
  ...state,
  dict: status,
});

export const loadingDict = (state, dictLoading) => ({
  ...state,
  dictLoading,
});
