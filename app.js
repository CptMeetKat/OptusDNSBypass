
const DNSBypass =  require('./DNSBypass/DNSBypass');
const ConfigManager = require('./ConfigManager.js');

async function run()
{
   let config = ConfigManager.getConfig("./settings.conf");

   let dnsBypass = new DNSBypass(config);
   dnsBypass.run();

}

run();


