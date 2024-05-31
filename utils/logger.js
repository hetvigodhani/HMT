const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        customFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log' })
    ]
});

module.exports = logger;
