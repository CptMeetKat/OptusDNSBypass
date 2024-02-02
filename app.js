
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
      await new DNSBypass(config).viewDNS();
   }
   else if(args.modifyDNS)
   {
      console.log("ModifyingDNS");
      config.dns1 = args.modifyDNS[0]; //need to validate IPs?
      config.dns2 = args.modifyDNS[1];
      config.modifyDNS = true; //these need to be removed from the config, restructure DNSBypass object?
      await new DNSBypass(config).run();
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