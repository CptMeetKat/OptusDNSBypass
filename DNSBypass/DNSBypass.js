
const OptusAPI = require('../RouterAPI/OptusAPI');

class DNSBypass {

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