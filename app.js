const { ArgumentParser } = require('argparse')

const DNSBypass =  require('./DNSBypass/DNSBypass');
const ConfigManager = require('./ConfigManager.js');
const NetworkMonitor = require('./NetworkMonitor/NetworkMonitor.js');


async function run()
{
   const parser = new ArgumentParser({ description: 'Use Optus Sagemcom 5393 API.' })
   parser.add_argument('-m', '--monitor', { dest: 'monitor', action: 'store_const',
                                     const: true, default: false,
                                     help: 'view devices on network' });
   
   parser.add_argument('-vd', '--viewDNS', { dest: 'viewDNS', action: 'store_const',
                                     const: true, default: false,
                                     help: 'view current DHCP/DNS Settings' });
   
   
   let md_group = parser.add_argument_group('Modify DNS', 'Modify the current DNS');
   md_group.add_argument('-md', '--modifyDNS', {metavar: ['ip1','ip2'], type:'str', help:'DNS IP addresses', nargs:2});
   
   let xargs = parser.parse_args()
   

   let config = ConfigManager.getConfig("./settings.conf");
   const args = process.argv.slice(2);
   if(xargs.viewDNS)
      new DNSBypass(config).run();
   else if(xargs.modifyDNS)
   {
      console.log("ModifyingDNS");
      config.dns1 = xargs.modifyDNS[0]; //need to validate IPs?
      config.dns2 = xargs.modifyDNS[1];
      config.modifyDNS = true; //these need to be removed from the config, restructure DNSBypass object?
      new DNSBypass(config).run();
   }
   else if(xargs.monitor)
      new NetworkMonitor(config).run();
   else 
      console.log("**No action specified**");
}

run();