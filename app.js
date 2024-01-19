
const DNSBypass =  require('./DNSBypass/DNSBypass');
const ConfigManager = require('./ConfigManager.js');
const NetworkMonitor = require('./NetworkMonitor/NetworkMonitor.js');

async function run()
{
   let config = ConfigManager.getConfig("./settings.conf");

   const args = process.argv.slice(2);
   if(args[0] == "dnsBypass")
   {
      let dnsBypass = new DNSBypass(config);
      dnsBypass.run();
   }
   else if(args[0] == "view-network")
   {
      let networkMonitor = new NetworkMonitor(config);
      networkMonitor.run();
   }
   else 
   {
      console.log("**No action specified**");
   }
}


run();


