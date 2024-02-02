
const DNSBypass =  require('./DNSBypass/DNSBypass');
const ConfigManager = require('./Services/ConfigManager.js');
const NetworkMonitor = require('./NetworkMonitor/NetworkMonitor.js');
const Logger = require('./Services/Logger.js');
const APISessionManager = require('./RouterAPI/APISessionManager.js');
const ArgumentParser = require('./Services/ArgumentParser.js');

async function run(args)
{
   let config = ConfigManager.getConfig("./settings.conf");
   if(args.viewDNS)
   {
      let bypass = new DNSBypass(config.host, config.username, config.password);
      await bypass.viewDNS();
   }
   else if(args.modifyDNS)
   {
      console.log("ModifyingDNS");
      let bypass = new DNSBypass(config.host, config.username, config.password);
      await bypass.modifyDNS(args.modifyDNS[0], args.modifyDNS[1]);
   }
   else if(args.monitor)
      await new NetworkMonitor(config).run();
   else 
      console.log("**No action specified**");

}

function configureLoggers(logger)
{
   ConfigManager.Logger = logger;
   NetworkMonitor.Logger = logger;
   APISessionManager.Logger = logger;
}

function createLogger(isVerbose)
{
   let logger = new Logger();
   if(isVerbose)
      logger.setLogLevel(5);

   return logger;
}

async function main()
{
   let args = ArgumentParser.parseArgs();
   let logger = createLogger(args.verbose);
   configureLoggers(logger);
   await run(args);
}

main();