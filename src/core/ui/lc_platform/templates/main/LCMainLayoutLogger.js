import logger from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
const log = logger.getLogger('KTMainLayout');
prefix.apply(log);
export default log;
