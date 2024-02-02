
const OptusAPI = require('../RouterAPI/OptusAPI');
const APISessionManager =  require('../RouterAPI/APISessionManager');

class DNSBypass {

   constructor(config) {
      this.config = config
   }

   async viewDNS()
   {
      try
      {
         let session = new APISessionManager(this.config.host, this.config.username, this.config.password);
         let cookie = await session.connect();

         console.info("Current DHCP settings: ");
         await DNSBypass.displayDNS(this.config.host, cookie);

      } catch (error) {
         console.error('Error:', error);
      }
   }

   async run()
   {
      try
      {
         let session = new APISessionManager(this.config.host, this.config.username, this.config.password);
         let cookie = await session.connect();

         console.info("Current DHCP settings: ");
         await DNSBypass.displayDNS(this.config.host, cookie);
         if(this.config.modifyDNS)
            await DNSBypass.changeDNS(this.config.host, cookie, this.config.dns1, this.config.dns2);

      } catch (error) {
         console.error('Error:', error);
      }
   }

   static async displayDNS(url, cookie) {
      let response = await OptusAPI.getDNS(url, cookie);
      console.log(response.data);
      return response;
   }

   static async changeDNS(url, cookie, dns1, dns2) {
      let response = await OptusAPI.putDNS(url, cookie, dns1, dns2);
      return response;
   }
}


module.exports = DNSBypass;