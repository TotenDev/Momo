# Momo

Cronjob to web hooks.

[![Build Status](https://secure.travis-ci.org/TotenDev/Momo.png?branch=master)](http://travis-ci.org/TotenDev/Momo)

## About

Momo was designed to work as a worker on [Heroku](https://heroku.com), and make some WebRequests when Cronjob should be executed.  
Also Momo **DOES NOT HAVE A DB**, and use remote **CSV** file to fetch it cron.

## Requirements

- [npm](https://github.com/isaacs/npm)
- [foreman](https://github.com/ddollar/foreman) (optional)

##Configuration

All Configuration can be done through `server.js` file in root directory.

#### Initialization config
- `option.cronURL` - End point to fetch cronjob list. **REQUIRED**
- `options.cronFetchLoop` - Time interval to Momo fetch `options.cronURL` in seconds - Default value is:3600000 milliseconds. **OPTIONAL**
- `options.momoFPS` - Momo Check Loop (aka.FPS) in milliseconds - Default value is:60000 milliseconds. **OPTIONAL**

## Installation

Start server
	
	$ 'node server.js' OR 'foreman start'
	
##CronJob Syntax 

Momo CronJob syntax is very near to the real Cron (on 'BSD'), BUT it'll not allow `?` character.

---
###Samples

######TO BE

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

[MIT](Momo/raw/master/LICENSE)