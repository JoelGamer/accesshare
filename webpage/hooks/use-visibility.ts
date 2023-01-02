import { Reducer, useReducer } from 'react';

const useVisibility = (initial: boolean): ReturnType => {
  const [state, dispatch] = useReducer<Reducer<boolean, string>>(
    (_, action) => {
      if (action === 'hide') return false;
      return true;
    },
    initial,
  );

  return [state, () => dispatch('show'), () => dispatch('hide')];
};

export default useVisibility;

type ReturnType = [boolean, () => void, () => void];
