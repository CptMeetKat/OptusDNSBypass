
const APISessionManager =  require('./RouterAPI/APISessionManager');
const DNSBypass =  require('./DNSBypass/DNSBypass');

const fs = require('fs');


let config = {}
let configPath = "./settings.conf"

config = getConfig(configPath);
console.log("CONFIG:");
console.log(config);

function getConfig(path)
{
   try {
      const data = fs.readFileSync(path, 'utf8');
      let config = JSON.parse(data);			
      return config;

   } catch (err) {
      console.error(err);
   }
}

async function run()
{
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


