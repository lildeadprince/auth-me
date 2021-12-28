import cors from 'cors';
import helmet from 'helmet';

export function securityMiddleware() {
  const { CORS_CLIENT_HOST, DEV_CLIENT_HOST } = process.env;
  const allowedOrigins = [];

  if (CORS_CLIENT_HOST) {
    allowedOrigins.push(CORS_CLIENT_HOST);
  }
  if (DEV_CLIENT_HOST) {
    allowedOrigins.push(DEV_CLIENT_HOST);
  }

  return [
    // never allow '*'
    cors({
      origin: allowedOrigins.length > 0 ? allowedOrigins : ['http://localhost:3000', 'http://localhost:5000'],
      // cross-origin http-only Express.js cookie-based session
      credentials: true,
    }),
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
      },
    }),
  ];
}
