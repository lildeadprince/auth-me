import React, { createContext, PropsWithChildren } from 'react';
import { useSafeCtx } from './use-safe-ctx';

type DefaultProps = Record<string, unknown>;

type CtxWithControl<Value, Control, Props = DefaultProps> = [
  React.ComponentType<PropsWithChildren<Props>>,
  () => Value,
  () => Control,
  React.Context<Value | undefined>,
  React.Context<Control | undefined>,
];

// Idempotent type casting, but it helps TS to digest {children, ...props} spread/destructuring
type ActuallyProviderPropsValue<Props> = Omit<PropsWithChildren<Props>, 'children'>;
export type UseCtxWithControlValue<Value, Control, Props = DefaultProps> = (
  props: ActuallyProviderPropsValue<Props>,
) => [Value, Control];

export function createCtxWithControl<Value, Control, Props = DefaultProps>(
  displayName: string,
  useContextValue: UseCtxWithControlValue<Value, Control, Props>,
): Readonly<CtxWithControl<Value, Control, Props>> {
  const ContextObject = createContext<Value | undefined>(undefined);
  const ContextControlObject = createContext<Control | undefined>(undefined);

  const ContextWithControlProvider: React.FC<PropsWithChildren<Props>> = ({ children, ...props }) => {
    const [value, controlValue] = useContextValue(props);

    return (
      <ContextObject.Provider value={value}>
        <ContextControlObject.Provider value={controlValue}>{children}</ContextControlObject.Provider>
      </ContextObject.Provider>
    );
  };

  ContextObject.displayName = displayName;
  ContextControlObject.displayName = `${displayName}Control`;
  ContextWithControlProvider.displayName = `${displayName}WithControlProvider`;

  const useCtx = () => useSafeCtx(ContextObject);
  const useControlCtx = () => useSafeCtx(ContextControlObject);

  return [ContextWithControlProvider, useCtx, useControlCtx, ContextObject, ContextControlObject] as const;
}
