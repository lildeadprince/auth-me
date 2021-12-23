/// <reference types="node" />

declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DEBUG: string;

    SESSION_REDIS_USE_HTTPS: string;
    SESSION_REDIS_USER: string;
    SESSION_REDIS_PASS: string;
    SESSION_REDIS_HOST: string;
    SESSION_REDIS_PORT: string;
  }
}
