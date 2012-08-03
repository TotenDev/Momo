# Momo

Cronjob to web hooks.

[![Build Status](https://secure.travis-ci.org/TotenDev/Momo.png?branch=master)](http://travis-ci.org/TotenDev/Momo)

## About

Momo was designed to work as a worker (continuous process), and call it hooks when cron job should be executed.
Also Momo **DOES NOT USE A DATABASE**, it uses remote **CSV** file to fetch it hook cron list.

## Requirements

- [node](https://github.com/joyent/node)
- [npm](https://github.com/isaacs/npm)
- [foreman](https://github.com/ddollar/foreman) (optional)

##Configuration

All Configuration can be done through `server.js` file in root directory. (This file is just a sample of a simple server)

#### Initialization config
- `option.cronURL` - End point to fetch cronjob list. **REQUIRED**
- `options.cronFetchLoop` - Time interval to Momo fetch `options.cronURL` in seconds - Default value is:3600000 milliseconds. **OPTIONAL**
- `options.momoFPS` - Momo Check Loop (aka.FPS) in milliseconds - Default value is:60000 milliseconds. **OPTIONAL**

## Installation

Start server
	
	$ 'node server.js' OR 'foreman start'
	
##CronJob Syntax 

Momo CronJob syntax is very near to the Unix cron syntax, BUT it'll not allow `?` character ,words and special keywords. (the last 2, are on roadmap.)

---
###Style
    *    *    *    *    *  command to be executed
    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │
    │    │    │    │    │
    │    │    │    │    └───── day of week (0 - 6) (0 is Sunday, or use names)
    │    │    │    └────────── month (1 - 12)
    │    │    └─────────────── day of month (1 - 31)
    │    └──────────────────── hour (0 - 23)
    └───────────────────────── min (0 - 59)
---
###Samples

- `* * * * * http://example.com` - Deactivated cronjob
- `*/(

######TO BE

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

[MIT](Momo/raw/master/LICENSE)