
class Logger
{

    constructor(verbosity = 2) {
        this.verbosity = verbosity;
    }

    setLogLevel(verbosity)
    {
        this.verbosity = verbosity;
    }

    log(...args) {
        console.log(...args);
    }

    trace(...args) {
        if(this.verbosity >= 5)
            console.trace(...args);
    }
    
    debug(...args) {
        if(this.verbosity >= 4)
            console.debug(...args);
    }

    info(...args) {
        if(this.verbosity >= 3)
            console.info(...args);
    }

    warn(...args) {
        if(this.verbosity >= 2)
            console.warn(...args);
    }

    error(...args) {
        if(this.verbosity >= 1)
            console.error(...args);
    }
}

module.exports = Logger;