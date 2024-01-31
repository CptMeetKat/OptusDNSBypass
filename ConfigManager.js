const fs = require('fs');

class ConfigManager {

   static Logger = console;

   static getConfig(path)
   {
      try {
         const data = fs.readFileSync(path, 'utf8');
         let config = JSON.parse(data);	
         ConfigManager.Logger.debug("Reading config:");
         ConfigManager.Logger.debug(config);
         return config;

      } catch (err) {
         ConfigManager.Logger.error(err);
      }
      return {};
   }

}

module.exports = ConfigManager;