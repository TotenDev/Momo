# Momo

Cronjob to web hooks.

[![NPM](https://nodei.co/npm/momo.png?compact=true)](https://nodei.co/npm/momo/)

[![Build Status](https://secure.travis-ci.org/TotenDev/Momo.png?branch=master)](http://travis-ci.org/TotenDev/Momo)
[![Dependency Status](https://gemnasium.com/TotenDev/Momo.svg)](https://gemnasium.com/TotenDev/Momo)


## About

Momo was designed to work as a worker (continuous process), and call it hooks when cron job should be executed.  
Also Momo **DOES NOT USE A DATABASE**, it uses remote **CSV** file to fetch it hook cron list.

obs.: All dates are forced to be on GMT.


## Requirements

- [node](https://github.com/joyent/node)
- [npm](https://github.com/isaacs/npm)
- [foreman](https://github.com/ddollar/foreman) (optional)

#### Modules

- [follow-redirects](https://www.npmjs.com/package/follow-redirects) following redirects in case of webhook link is a redirect
- [newrelic](https://www.npmjs.com/package/newrelic) for new relic analysis


## Configuration

All Configuration need to be done through ENV IVARS.

### Initialization config

- `CRONS_URL` - End point to fetch cronjob list. **REQUIRED**
- `CRON_FETCH_LOOP` - Time interval to Momo fetch `CRONS_URL` in milliseconds - **REQUIRED** normally it should be 3600000

### Overall Config

- `NEW_RELIC_APP_NAME` - New Relic application name. **REQUIRED**
- `NEW_RELIC_LICENSE_KEY` - New Relic license key. **REQUIRED**


## Installation

Start server
``` bash
$ 'node server.js' OR 'foreman start'
```


## CronJob Syntax 

Momo CronJob syntax is very near to the Unix cron syntax, BUT it'll not allow `?` character ,words and special keywords. (the last 2, are on roadmap.)

### Style

```
    *    *    *    *    *  url_to_be_called
    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │
    │    │    │    │    │
    │    │    │    │    └───── day of week (0 - 6) (0 is Sunday)
    │    │    │    └────────── month (1 - 12)
    │    │    └─────────────── day of month (1 - 31)
    │    └──────────────────── hour (0 - 23)
    └───────────────────────── min (0 - 59)    
```
[source Wikipedia - but modified](http://en.wikipedia.org/wiki/Cron)

### Special Keywords

Keyword  | Equivalent | Description 
------------- | ------------- | ------------- 
`@yearly` OR `@annually` | `0 0 1 1 *` | Run one time a year, on midnight, January 1.
`@monthly`  | `0 0 1 * *` | Run one time a month, on midnight, first day of month.
`@weekly`  | `0 0 * * 0` | Run once a week, on midnight, on Sunday.
`@daily`  | `0 0 * * *` | Run once a day, on midnight.
`@hourly`  | `0 * * * *` | Run once a hour, on initial minute of it.

### Syntax Rules

- `*` - Means deactivated OR if not alone, means anything.
- `1` (or any number) - Only this number will match.
- `1,9` OR `1,2,3` - Any of these will match.
- `1-3` - Range (same as `1,2,3`).
- `1,3-5` - Range and individual (same as `1,3,4,5`).

All these commands can be combined with two stage command using the character `/`. 

### Samples

- `* * * * * http://example.com` - Deactivated cronjob
- `@monthly http://example.com` - Will run each month.
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
