import logger from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
const log = logger.getLogger('CM.07.08.ca');
prefix.apply(log);
export default log;
