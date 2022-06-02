import logger from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
const log = logger.getLogger('Common');
prefix.apply(log);
export default log;
