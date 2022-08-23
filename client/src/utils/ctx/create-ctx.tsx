import React, { createContext, PropsWithChildren } from 'react';
import { useSafeCtx } from './use-safe-ctx';

type DefaultProps = Record<string, unknown>;

type CreateCtx<Value, Props = DefaultProps> = [
  React.ComponentType<PropsWithChildren<Props>>,
  () => Value,
  React.Context<Value | undefined>,
];

// Idempotent type casting, but it helps TS to digest {children, ...props} spread/destructuring
type ActuallyProviderPropsValue<Props> = Omit<PropsWithChildren<Props>, 'children'>;
export type UseCtxValue<Value, Props = DefaultProps> = (props: ActuallyProviderPropsValue<Props>) => Value;

export function createCtx<Value, Props = DefaultProps>(
  displayName: string,
  useContextValue: UseCtxValue<Value, Props>,
): Readonly<CreateCtx<Value, Props>> {
  const ContextObject = createContext<Value | undefined>(undefined);

  const ContextProvider: React.FC<PropsWithChildren<Props>> = ({ children, ...props }) => {
    const value = useContextValue(props);
    return <ContextObject.Provider value={value}>{children}</ContextObject.Provider>;
  };

  ContextObject.displayName = displayName;
  ContextProvider.displayName = `${displayName}Provider`;

  const useCtx = () => useSafeCtx(ContextObject);

  return [ContextProvider, useCtx, ContextObject] as const;
}
