
import chalk from 'chalk';


const loggerMiddleware = (err, req, res, next) => {
    console.log(chalk.red(`[logger-middleware] Error logged: ${req.method} ${req.url} : body => ${JSON.stringify(req.body || {})}, error => ${JSON.stringify(err)}, stack trace: ${console.trace()}`));
    next(err);
};


export default loggerMiddleware;