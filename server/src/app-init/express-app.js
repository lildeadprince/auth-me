import express from 'express';
import morgan from 'morgan';

export function baseSetupMiddleware() {
  return [morgan('dev'), express.json(), express.urlencoded({ extended: true })];
}
