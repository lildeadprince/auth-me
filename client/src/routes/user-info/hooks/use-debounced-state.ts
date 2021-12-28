import { useCallback, useEffect, useRef, useState } from 'react';

export function useDebouncedState<T>(debounceTimeMs: number, isTouched: boolean, storedSessionValue: T) {
  const timeout = useRef<number>();
  const [lastValue, setLastValue] = useState(storedSessionValue);
  const [committedValue, setCommittedValue] = useState(storedSessionValue);

  useEffect(() => {
    // when session value was updated
    if (!timeout.current) {
      // and there's not pending debounced changes in queue
      // then forcibly update state
      // use case: Update customData -> stored in DB, stored in server session -> REFRESH -> loading old value from
      // localStorage -> GET /user -> synchronize local session -> FORCIBLY UPDATE THE INPUT
      setLastValue(storedSessionValue);
      setCommittedValue(storedSessionValue);
    }
  }, [storedSessionValue]);

  useEffect(() => {
    if (isTouched) {
      timeout.current = window.setTimeout(() => {
        setCommittedValue(lastValue);
        timeout.current = undefined;
      }, debounceTimeMs);
    } // else no queueing until actually touched

    return () => clearTimeout(timeout.current);
  }, [lastValue, debounceTimeMs]);

  const forceCommit = useCallback(() => {
    clearTimeout(timeout.current);
    setCommittedValue(lastValue);
  }, [lastValue]);

  return [committedValue, setLastValue, forceCommit, lastValue] as const;
}
