import { useEffect, useState } from 'react';

export function useLocalPersistence(key: string, value: unknown) {
  useEffect(() => {
    try {
      localStorage[key] = typeof value === 'string' ? value : JSON.stringify(value);
    } catch (e) {
      console.error('Failed to serialize value for local storage', key, value, e);
    }
  }, [key, value]);
}

export function useStateFromLocal<S>(key: string, deserialise: (value: string) => S | undefined, defaultValue: S) {
  return useState(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue !== null) {
      try {
        return deserialise(storedValue) ?? defaultValue;
      } catch (e) {
        console.error('Failed to deserialize value from local storage', key, localStorage.getItem(key), e);
      }
    } else {
      return defaultValue;
    }
  });
}

// todo export function useTwoWayBoundLocalState
