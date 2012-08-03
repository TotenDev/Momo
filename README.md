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
    *    *    *    *    *  url_to_be_called
    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │
    │    │    │    │    │
    │    │    │    │    └───── day of week (0 - 6) (0 is Sunday)
    │    │    │    └────────── month (1 - 12)
    │    │    └─────────────── day of month (1 - 31)
    │    └──────────────────── hour (0 - 23)
    └───────────────────────── min (0 - 59)    
    
[source Wikipedia - but modified](http://en.wikipedia.org/wiki/Cron)

---
###Syntax Rules

- `*` - Means deactivated OR if not alone, means anything.
- `1` (or any number) - Only this number will match.
- `1,9` OR `1,2,3` - Any of these will match.
- `1-3` - Range (same as `1,2,3`).
- `1,3-5` - Range and individual (same as `1,3,4,5`).

All these commands can be combined with two stage command using the character `/`. 

---
###Samples

- `* * * * * http://example.com` - Deactivated cronjob

- `*/* * * * * http://example.com` - Will run each 1 minute.

- `* */* * * * http://example.com` - Will run each 1 minute.

- `2/* * * * * http://example.com` - Will run every 2 minutes ,checking each minute.

- `6/2 * * * * http://example.com` - Will run every 12 minutes in one hour.

- `6,2/2 * * * * http://example.com` - Will run every 12 and 4 minutes.

- `2-4/* * * * * http://example.com` - Will run every 2,3,4 minutes. (Will not call two times if have an collision, as this sample)

- `*/5 * * * * http://example.com` - Will run on any minute divisible 5.

- `*/7,9 * * * * http://example.com` - Will run each on minutes `0`,`7`,`9`,`14`,`18` and any others divisible by 7 or 9 until 59, that is the minutes limit.

- `*/7-9 * * * * http://example.com` - Will run each on minutes `0`,`7`,`8`,`9` and any others divisible by 7,8, or 9 until 59, that is the minutes limit.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

[MIT](Momo/raw/master/LICENSE)