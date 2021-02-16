import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export const createRotateFile = (logLevel, filename = logLevel) =>
    new DailyRotateFile({
        dirname: 'logs',
        filename: `${filename}-%DATE%.log`,
        datePattern: 'MM-DD',
        maxFiles: '5d',
        level: logLevel
    });

const messageFormat = (info) => {
    const dateFormat = () => new Date(Date.now()).toUTCString();
    const message = `${dateFormat()} | ${info.level} | ${info.message} `;
    return info.meta && info.meta.message ? `${message}\n${info.meta.message}` : message;
};

const devConfig = {
    level: 'debug',
    format: format.combine(format.colorize(), format.splat(), format.printf(messageFormat)),
    transports: [new transports.Console()]
};

const prodConfig = {
    level: 'http',
    format: format.combine(format.timestamp(), format.splat(), format.json()),
    transports: [createRotateFile('error'), createRotateFile('http', 'all')]
};

let logger;

if (process.env.NODE_ENV === 'production') {
    logger = createLogger(prodConfig);
} else {
    logger = createLogger(devConfig);
}

process
    .on('unhandledRejection', (err) => {
        logger.error('Unhandled Rejection:', err);
    })
    .on('uncaughtException', (err) => {
        logger.error('Uncaught Exception thrown:', err);
        process.exit(1);
    });

export default logger;
