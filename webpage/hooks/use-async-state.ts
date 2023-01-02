import { DependencyList, useCallback, useEffect, useState } from 'react';
import useVisibility from './use-visibility';

const useAsyncState = <T>(asyncFn: () => Promise<T>, params?: DependencyList, initialLoad = true): ReturnType<T> => {
  const [shouldLoad, setShouldLoad] = useState(initialLoad);
  const [loading, start, stop] = useVisibility(true);
  const [state, setState] = useState<T>();

  const runAsync = useCallback(async () => {
    if (!loading) start();

    setState(await asyncFn());
    stop();
  }, [asyncFn, loading]);

  useEffect(() => {
    if (shouldLoad) runAsync();
    else {
      setShouldLoad(true);
      stop();
    }
  }, params);

  if (loading) return [undefined, loading, runAsync];
  return [state as T, loading, runAsync];
};

export default useAsyncState;

type ReturnType<T> = [T, false, () => Promise<void>] | [undefined, true, () => Promise<void>];
