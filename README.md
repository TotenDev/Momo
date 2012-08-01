# FunctionQueue

Simple queue to execute any function on FIFO order.

[![Build Status](https://secure.travis-ci.org/TotenDev/Function-Queue.png?branch=master)](http://travis-ci.org/TotenDev/Function-Queue)

## Requirements

- [npm](https://github.com/isaacs/npm)

## Installation

No installation is needed.

## Usage

    var FunctionQueue = require("function-queue")();
    FunctionQueue.push(function (callback) {
	    console.log("dede");
	    setTimeout(function () {
		    console.log("timeout");
		    //you must call callback to continue queue
		    callback()
	    },1000);
    })
    FunctionQueue.push(function (callback) {
	    console.log("dedeOut");
	    //you must call callback to continue queue
	    callback();
    })

More samples at `samples/` directory.

## Methods

#### Initialize Wrapper

Sample:

    var FunctionQueue = require("function-queue")();
---
#### Add Function into queue

Parameters:
- function - **Type:**function - **Description:**Function to be added on queue. - **REQUIRED**

Sample:

    FunctionQueue.push(function (callback) {
	    console.log("dedeOut");
	    //you must call callback to continue queue
	    callback();
    })
---
#### Remove all Object from queue !
Functions already started will not be canceled.

Sample:

    FunctionQueue.removeAllObjects();

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

[MIT](Function-Queue/raw/master/LICENSE)