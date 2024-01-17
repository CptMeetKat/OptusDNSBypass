const axios = require('axios');

class OptusAPI {
   constructor() {
   }

   static postLoginParam(url, username) {
      
      const postData = {
         login: username
       };
       
      const options = {
         url: url + '/api/v1/login-params',
         method: 'POST',
         headers: {
           'Accept-Language': 'en-GB',
           'Connection': 'keep-alive',
           'Content-Type': 'application/x-www-form-urlencoded'
         },
         data: postData
       };

       const response = axios(options)
       return response;
    }


    static postLogin(url, username, auth_key, cnonce, salt, nonce, conid) {

      const postData = {
         login: username,
         auth_key: auth_key,
         cnonce: cnonce
       };
       
      const options = {
         url: url + '/api/v1/login',
         method: 'POST',
         headers: {
           'Accept-Language': 'en-GB',
           'Connection': 'keep-alive',
           'Content-Type': 'application/x-www-form-urlencoded',
           'Cookie': "salt="+salt+"; nonce=" + nonce+"; conid="+conid
         },
         data: postData
       };


       const response = axios(options)
       return response;
    }

    static getDNS(url, cookie) {
      const options = {
         url: url + '/api/v1/dhcp',
         method: 'GET',
         headers: {
           'Accept-Language': 'en-GB',
           'Connection': 'keep-alive',
           'Cookie': "salt="+cookie.salt+"; nonce=" + cookie.nonce+"; conid="+cookie.conid,
         }
       };


       const response = axios(options)
       return response;
    }



    static putDNS(url, cookie, dns1, dns2) {

      const data = {
        dnsservers: dns1 + "," + dns2
      };
       
      const options = {
         url: url + '/api/v1/dhcp',
         method: 'PUT',
         headers: {
           'Accept-Language': 'en-GB',
           'Connection': 'keep-alive',
           'Content-Type': 'application/x-www-form-urlencoded',
           'Cookie': "salt="+cookie.salt+"; nonce=" + cookie.nonce+"; conid="+cookie.conid
         },
         data: data
      };

      const response = axios(options)
      return response;
    }


    static getAuthenticated(url, cookie) 
    {
      const options = {
        url: url + '/api/v1/authenticated',
        method: 'GET',
        headers: {
          'Accept':'application/json',
          'Accept-Language': 'en-GB',
          'Connection': 'keep-alive',
          'Cookie': "salt="+cookie.salt+"; nonce=" + cookie.nonce+"; conid="+cookie.conid
        },
     };

     const response = axios(options)
     return response;
    }
}
 


module.exports = OptusAPI;