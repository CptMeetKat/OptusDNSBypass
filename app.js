
const OptusAPI = require('./OptusAPI');
const APISessionManager =  require('./APISessionManager');
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
      await displayDNS(config.host, cookie);
      if(config.modifyDNS)
         await changeDNS(config.host, cookie, config.dns1, config.dns2);

   } catch (error) {
      console.error('Error:', error);
   }
}

async function displayDNS(url, cookie)
{
   let response = await OptusAPI.getDNS(url, cookie); //CHECK DNS
   console.log(response.data);
   return response;
}

async function changeDNS(url, cookie, dns1, dns2)
{

   let response = await OptusAPI.putDNS(url, cookie, dns1, dns2); //SET DNS
   return response;
}

run();


