
const OptusAPI = require('./OptusAPI');
const crypto = require('crypto')
const OptusHelpers =  require('./OptusHelpers');


class APISessionManager {
   
   constructor(host, username, password) {
      this.url = host;
      this.credentials = {};
      this.credentials.username = username;
      this.credentials.password = password;
      this.cookie = {};
   }

   //Build this out if a session needs to be maintained over a period
   // async reconnect(url, cookie) {

   //    setTimeout(() => {
         
   //       //let response = await OptusAPI.getAuthenticated(url, cookie);
   //       if(response.authenticated == false)
   //       {
   //          await this.connect();
   //       }

   //     }, 30000); //30 seconds
   // }


   getCookie()
   {
      return this.cookie;
   }


   async connect() {
      let parameters = await this.getConnectionParameters();
      let initialCookie = parameters.cookie;
      let auth = parameters.auth;
      
      let loginResult = await this.login(initialCookie, auth);
      this.cookie = loginResult.cookie;

      return this.cookie;
   }

   async getConnectionParameters()
   {
      let response = await OptusAPI.postLoginParam(this.url, this.credentials.username); //LOGIN PARAM
      
      let nonce = response.headers['set-cookie'][0].split(";")[0].split("=")[1]; //Extract cookie values
      let conid = response.headers['set-cookie'][1].split(";")[0].split("=")[1];
      let salt = response.headers['set-cookie'][2].split(";")[0].split("=")[1];

      let saltedPassword = APISessionManager.saltPassword(salt, this.credentials.password);
      let cnonce = APISessionManager.generateCNonce();
      let hashedCredentials = APISessionManager.sha512(this.credentials.username + ":" + nonce + ":" + saltedPassword.substring(3)); 

      let auth_key = APISessionManager.generateAuthKey(hashedCredentials, cnonce)
      
      console.log("***Initial Connection: " + response.status);

      return {"cookie": {"nonce":nonce, "conid":conid, "salt":salt},
               "auth" :{"auth_key": auth_key, "cnonce": cnonce}
             };
   }

   static saltPassword(salt, password)
   {
      return OptusHelpers.hash_function(password, salt);  //SALT+HASH
   }

   static generateCNonce()
   {
      const RESTGUI_LOGIN_MAX_CNONCE = 10000000000000000000;
      return OptusHelpers.lpad(Math.random() * RESTGUI_LOGIN_MAX_CNONCE, "0", 19)
   }

   static generateAuthKey(hashedCredentials, cnonce)
   {
      return APISessionManager.sha512(hashedCredentials + ":0:" + cnonce);
   }

   static sha512(input)
   {
      let hash = crypto.createHash('sha512');
      hash.update(input)
      return hash.digest('hex');
   }

   async login(cookie, auth)
   {  
      let response = await OptusAPI.postLogin(this.url, this.credentials.username, auth.auth_key, auth.cnonce, cookie.salt, cookie.nonce, cookie.conid); 
      let conid = response.headers['set-cookie'][1].split(";")[0].split("=")[1]
      let loginCookie = {...cookie};

      loginCookie.conid = conid;
      console.log("***Login: " + response.status);

      return {"cookie": loginCookie, "response" : response};
   }
}

module.exports = APISessionManager;