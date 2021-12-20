import { createCtxWithControl } from '../../../utils';
import { useSessionValue } from './use-session';

export const [SessionProvider, useSession, useSessionControl] = createCtxWithControl('Session', useSessionValue);
