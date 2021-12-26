import cors from 'cors';
import helmet from 'helmet';

const isProd = process.env.NODE_ENV === 'production';

export function securityMiddleware() {
  return [
    cors({ origin: isProd ? 'https://auth-me.alpenditrix.com' : 'http://localhost:3000' }),
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
      },
    }),
  ];
}
