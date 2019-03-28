
const { EventEmitter } = require('events');

export const mongoDBEventEmitter = new EventEmitter();
export const redisEventEmitter = new EventEmitter();