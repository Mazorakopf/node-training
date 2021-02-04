import expressWinston from 'express-winston';

import logger from '../utils/logger';

export const logAllReq = expressWinston.logger({
    level: 'http',
    winstonInstance: logger,
    meta: true,
    requestWhitelist: ['url', 'headers', 'method', 'httpVersion', 'query'],
    headerBlacklist: ['accept-encoding', 'postman-token', 'connection']
});

const logFailedReq = expressWinston.errorLogger({
    winstonInstance: logger,
    meta: true,
    requestWhitelist: ['url', 'headers', 'method', 'httpVersion', 'query'],
    headerBlacklist: ['accept-encoding', 'postman-token', 'connection'],
    blacklistedMetaFields: ['date', 'process', 'exception', 'memoryUsage', 'os', 'level', 'stack']
});

export default [logAllReq, logFailedReq];
