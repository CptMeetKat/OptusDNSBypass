const APISessionManager =  require('./RouterAPI/APISessionManager');
const DNSBypass =  require('./DNSBypass/DNSBypass');
const ConfigManager = require('./ConfigManager.js');


async function run()
{
   let config = ConfigManager.getConfig("./settings.conf");

   try
   {
      let session = new APISessionManager(config.host, config.username, config.password);
      let cookie = await session.connect();

      console.log("Current DHCP settings: ");
      await DNSBypass.displayDNS(config.host, cookie);
      if(config.modifyDNS)
         await DNSBypass.changeDNS(config.host, cookie, config.dns1, config.dns2);

   } catch (error) {
      console.error('Error:', error);
   }
}

run();


