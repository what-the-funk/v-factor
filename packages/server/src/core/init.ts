import { isProdMode } from '../config';
// import logger from './logger';

export default (): void => {
  // Print to console the full config in dev/test mode
  if (!isProdMode()) {
    // logger.info('Loaded configuration:');
    // logger.info(config);
  }
};
