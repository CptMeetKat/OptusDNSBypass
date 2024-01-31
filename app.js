const { ArgumentParser } = require('argparse')

const DNSBypass =  require('./DNSBypass/DNSBypass');
const ConfigManager = require('./ConfigManager.js');
const NetworkMonitor = require('./NetworkMonitor/NetworkMonitor.js');
const Logger = require('./Services/Logger.js');
const APISessionManager = require('./RouterAPI/APISessionManager.js');


function parseArgs()
{
   const parser = new ArgumentParser({ description: 'Use Optus Sagemcom 5393 API.' })
   parser.add_argument('-m', '--monitor', { dest: 'monitor', action: 'store_const',
                                     const: true, default: false,
                                     help: 'view devices on network' });
   
   parser.add_argument('-vd', '--viewDNS', { dest: 'viewDNS', action: 'store_const',
                                     const: true, default: false,
                                     help: 'view current DHCP/DNS Settings' });

   parser.add_argument('-v', '--verbose', { dest: 'verbose', action: 'store_const',
                                     const: true, default: false,
                                     help: 'Set to verbose mode' });
   
   
   let md_group = parser.add_argument_group('Modify DNS', 'Modify the current DNS');
   md_group.add_argument('-md', '--modifyDNS', {metavar: ['ip1','ip2'], type:'str', help:'DNS IP addresses', nargs:2});
   
   return parser.parse_args();
}


async function run(args)
{
   let config = ConfigManager.getConfig("./settings.conf");
   if(args.viewDNS)
      await new DNSBypass(config).run();
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

function configureLogger(args)
{
   let logger = new Logger();
   if(args.verbose)
      logger.setLogLevel(5)

   ConfigManager.Logger = logger;
   NetworkMonitor.Logger = logger;
   APISessionManager.Logger = logger;
}

async function main()
{
   let args = parseArgs();
   configureLogger(args);
   await run(args);
}

main();