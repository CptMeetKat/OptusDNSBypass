const { ArgumentParser:ArgParse } = require('argparse')

class ArgumentParser
{
   static parseArgs()
   {
      const parser = new ArgParse({ description: 'Use Optus Sagemcom 5393 API.' })
      parser.add_argument('-m', '--monitor', { dest: 'monitor', action: 'store_const',
                                       const: true, default: false,
                                       help: 'view devices on network' });
      
      parser.add_argument('-vd', '--viewDNS', { dest: 'viewDNS', action: 'store_const',
                                       const: true, default: false,
                                       help: 'view current DHCP/DNS Settings' });

      parser.add_argument('-v', '--verbose', { dest: 'verbose', action: 'store_const',
                                       const: true, default: false,
                                       help: 'Set to verbose mode' });
      
      
      let md_group = parser.add_argument_group('Modify DNS', 'Modify the current DNS');
      md_group.add_argument('-md', '--modifyDNS', {metavar: ['ip1','ip2'], type:'str', help:'DNS IP addresses', nargs:2});
      
      return parser.parse_args();
   }
}

module.exports = ArgumentParser;