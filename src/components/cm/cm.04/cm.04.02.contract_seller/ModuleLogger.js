import logger from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
const log = logger.getLogger('CM.04.02');
prefix.apply(log);
export default log;
