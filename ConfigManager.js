const fs = require('fs');

class ConfigManager {

   static getConfig(path)
   {
      try {
         const data = fs.readFileSync(path, 'utf8');
         let config = JSON.parse(data);	
         console.info("Reading config:");
         console.info(config);
         return config;

      } catch (err) {
         console.error(err);
      }
      return {};
   }

}

module.exports = ConfigManager;