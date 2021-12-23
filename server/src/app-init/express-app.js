import express from 'express';
import morgan from 'morgan';
import compression from 'compression-with-brotli';

export function baseSetupMiddleware() {
  return [
    morgan('dev'),
    compression({ prioritizeClient: false }),
    express.json(),
    express.urlencoded({ extended: true }),
  ];
}
