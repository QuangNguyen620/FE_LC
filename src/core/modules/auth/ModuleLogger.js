import logger from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
const log = logger.getLogger('Auth');
prefix.apply(log);
export default log;
