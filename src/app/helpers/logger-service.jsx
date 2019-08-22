import * as Config  from '../../Config';

export const isDebugMode = Config.environment.isDebugMode;
const noop = () => undefined;

const warn = (...args) => {
    if(isDebugMode){
        console.warn(...args)
    }       
}

const info = (...args) => {
    if(isDebugMode){
        console.info(...args)
    }    
}

const error = (...args) => {
    if(isDebugMode){
        console.error(...args)
    }
}

const log = (...args) => {
    if(isDebugMode){
        console.log(...args)
    }      
}

const trace = (...args) => {
    if(isDebugMode){
        console.trace(...args)
    }      
}

export const LoggerService  = {
    isDebugMode,
    warn,
    info,
    error,
    log,
    trace
}


 /*  export class LoggerService{

    info;
    warn;
    error;
    
    invokeConsoleMethod(type, ...args) {}  
  }  

export class ConsoleLoggerService extends LoggerService {

    get info() {
      if (isDebugMode) {
        return console.info.bind(console);
      } else {
        return noop;
      }
    }
  
    get warn() {
      if (isDebugMode) {
        return console.warn.bind(console);
      } else {
        return noop;
      }
    }
  
    get error() {
      if (isDebugMode) {
        return console.error.bind(console);
      } else {
        return noop;
      }
    }
    
    invokeConsoleMethod(type, ...args) {
      const logFn = (console)[type] || console.log || noop;
      logFn.apply(console, ...args);
    }
}
 */