import React, { useContext } from 'react';

export function useSafeCtx<T>(context: React.Context<T | undefined>): T {
  const contextValue = useContext(context);

  if (contextValue) {
    return contextValue;
  }
  throw new Error(`Context <${context.displayName || 'UNTITLED'}> is not provided`);
}
