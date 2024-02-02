
const OptusAPI = require('../RouterAPI/OptusAPI');
const APISessionManager =  require('../RouterAPI/APISessionManager');

class DNSBypass {

   constructor(config) {
      this.host = config.host;
      this.username = config.username;
      this.password = config.password;
   }

   async viewDNS()
   {
      try
      {
         let session = new APISessionManager(this.host, this.username, this.password);
         let cookie = await session.connect();

         console.info("Current DHCP settings: ");
         await DNSBypass.displayDNS(this.host, cookie);

      } catch (error) {
         console.error('Error:', error);
      }
   }

   async modifyDNS(dns1, dns2)
   {
      try
      {
         let session = new APISessionManager(this.host, this.username, this.password);
         let cookie = await session.connect();

         console.info("Current DHCP settings: ");
         await DNSBypass.displayDNS(this.host, cookie);
         await DNSBypass.changeDNS(this.host, cookie, dns1, dns2);

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