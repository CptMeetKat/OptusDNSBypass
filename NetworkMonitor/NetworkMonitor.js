const OptusAPI = require('../RouterAPI/OptusAPI');
const APISessionManager =  require('../RouterAPI/APISessionManager');
const fs = require('fs');

class NetworkMonitor {

   constructor(config) {
      this.config = config
   }

   static readCache(path)
   {
      try {
         const data = fs.readFileSync(path, 'utf8');
         let config = JSON.parse(data);	
         return config;

      } catch (err) {
         console.error(err);
      }
      return [];
   }
   
   async run() //REFACTOR
   {
      try
      {
         let session = new APISessionManager(this.config.host, this.config.username, this.config.password);
         let cookie = await session.connect();
   
         console.log("\n\nCurrent HOST settings:");
         let response = await NetworkMonitor.displayHosts(this.config.host, cookie);
         let devices = response.data[0].hosts.list;



         let cacheData = NetworkMonitor.readCache("./NetworkMonitor/device-cache.json"); 
         let cache = {};
         for(let c of cacheData)
            cache[c.macaddress] = c;


         //Print active devices
         const green = "\x1b[32m";
         const reset = "\x1b[0m";
         for(let d of devices)
         {
            if(d.active)
            {
               let nickname = "";
               if(   cache[d.macaddress] != undefined  )
                  nickname = cache[d.macaddress].nickname;

               console.log(green + nickname + " (" + d.hostname  + ") " + reset + "\n\t" + d.ipaddress + "\n\t" + d.macaddress);
            }   
            
            if(cache[d.macaddress] == undefined)
            {
               // console.log(d.macaddress);
               cache[d.macaddress] = {};
               cache[d.macaddress].nickname = "";
               cache[d.macaddress].hostname = d.hostname;
               cache[d.macaddress].macaddress = d.macaddress;
            }
         }


         let x1 = [];
         for(let w of Object.keys(cache))
         {
            x1.push(cache[w]);
         }

         NetworkMonitor.writeToFile(JSON.stringify(x1), "./NetworkMonitor/device-cache.json")


      } catch (error) {
         console.error('Error:', error);
      }
   }
   
   static writeToFile(content, filePath)
   {
      // Write to the file
      fs.writeFile(filePath, content, (err) => {
      if (err) {
         console.error('Error writing to file:', err);
      } else {
         console.log('Content has been written to the file successfully.');
      }
      });
   }
   
   static async displayHosts(url, cookie)
   {
      let response = await OptusAPI.getHosts(url, cookie); //CHECK DNS
      // console.log(JSON.stringify(response.data));
      return response;
   }
}

module.exports = NetworkMonitor;