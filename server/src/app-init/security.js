import cors from 'cors';
import helmet from 'helmet';

export function securityMiddleware() {
  return [
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
      },
    }),
    cors(),
  ];
}
