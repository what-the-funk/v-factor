// import config, { isProdMode } from '../config';
import { isProdMode } from '../config';

export default (): void => {
  // Print to console the full config in dev/test mode
  if (!isProdMode()) {
    // console.log('Loaded configuration:');
    // console.log(config);
  }
};
