import logger from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
const log = logger.getLogger('A11Verify');
prefix.apply(log);
export default log;
