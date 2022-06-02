import logger from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
const log = logger.getLogger('AM.01.05.01');
prefix.apply(log);
export default log;
