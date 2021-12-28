/// <reference types="node" />

declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DEBUG: string;

    SESSION_REDIS_USE_HTTPS: 'true' | string;
    SESSION_REDIS_USER: string;
    SESSION_REDIS_PASS: string;
    SESSION_REDIS_HOST: string;
    SESSION_REDIS_PORT: string;

    CORS_CLIENT_HOST?: string;
    DEV_CLIENT_HOST?: 'https://localhost:3000' | string;
  }
}
