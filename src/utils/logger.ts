import pino from 'pino';
import { getConfig } from '../config/config';

const logLevel = getConfig().logLevel;
const logger = pino();

const log = logger.child({
  name: 'commercetools-production-staging-sync-lambda',
  options: {
    level: logLevel,
  },
});

export { log };
