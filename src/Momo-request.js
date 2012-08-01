//
// Momo-request.js — Momo
// today is 7/25/12, it is now 3:25 PM
// created by TotenDev
// see LICENSE for details.
//

var url = require('url');
/**
* Initialize FunctionQueue function
**/
module.exports = function () { return new MomoRequest(); }
function MomoRequest() {
	FunctionQueueObject = this;
	FunctionQueueObject.container = new Array();
};

/**
* Get Request
**/
MomoRequest.prototype.simpleRequest = function simpleRequest(theURL,methodType,callback) {
	//Get if is http or https
	var http = null;
	var requestURL = url.parse(theURL);
	if (requestURL.protocol == "https:") { http = require('https'); }
	else { http = require('http'); }
	//Make options from url
	var options = { host: requestURL['host'], port: 80, path:requestURL['path'], method: methodType }, responsed = false;
	var request = http.request(options,function (response) {
		var container = "";
		response.on('data',function (data) { container += data; });
		response.on('error',function () {
			if (responsed == false) {
				responsed = true;
			}				
		});
	});
	request.on('error',function () {
		if (responsed == false) {
			responsed = true;
		}
	});
	request.end();
};