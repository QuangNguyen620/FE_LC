import logger from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
const log = logger.getLogger('CM.07-search-lc');
prefix.apply(log);
export default log;
