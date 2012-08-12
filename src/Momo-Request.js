//
// Momo-request.js — Momo
// today is 08/01/12, it is now 9:25 PM
// created by TotenDev
// see LICENSE for details.
//

var assert = require("assert");
/**
* Initialize MomoRequest function
* @param string(url) url - Url to be requested - REQUIRED
* @param function callback - End point to fecth cronjob list - REQUIRED
* @param-cb bool callback.status - If request has finished with success or not - OPTIONAL
* @param-cb string callback.response - Response (errored or not) - OPTIONAL
* @param string method - Method to be used on http request - Default: GET - OPTIONAL
**/
module.exports = function (url,callback,method) { return new MomoRequest(url,callback,method); }
function MomoRequest(url,callback,method) {
	assert.ok(url,"No 'url' specified on MomoRequest initialization, this is a **REQUIRED** value");
	assert.ok(callback,"No 'callback' specified on MomoRequest initialization, this is a **REQUIRED** value");
	//
	MomoRequest.simpleRequest(url,(method ? method : "GET"),callback);
};

/**
* Get Request
* @param string(url) requestURL - Url to be requested - REQUIRED
* @param string methodType - Method to be used on http request - REQUIRED
* @param function callback - End point to fecth cronjob list - REQUIRED
* @param-cb bool callback.status - If request has finished with success or not - OPTIONAL
* @param-cb string callback.response - Response (errored or not) - OPTIONAL
**/
MomoRequest.simpleRequest = function simpleRequest(requestURL,methodType,callback) {
	assert.ok(requestURL,"No 'url' specified on MomoRequest 'simpleRequest()' function, this is a **REQUIRED** value");
	assert.ok(methodType,"No 'methodType' specified on MomoRequest 'simpleRequest()' function, this is a **REQUIRED** value");
	assert.ok(callback,"No 'callback' specified on MomoRequest 'simpleRequest()' function, this is a **REQUIRED** value");
	//Get if is http or https
	var http = null, port = 80;
	if (requestURL['protocol'] == "https:") { http = require('https'); port = 443; }
	else { http = require('http'); }
	//Make options from url
	var responsed = false;
	var containerData = "";
	var options = requestURL; options['port'] = port; options['method'] = methodType;
	var request = http.request(options,function (response) {
		response.on('data',function (data) { containerData+=data; });
		response.on('error',function (err) {
			if (responsed == false) { responsed = true; callback(false,err,response.statusCode,requestURL['host']+requestURL['path']); }
		});
		response.on('end',function () {
			if (responsed == false) { responsed = true; callback(true,containerData,response.statusCode,requestURL['host']+requestURL['path']); }
		});
	});
	request.on('error',function (err) {
		if (responsed == false) { responsed = true; callback(false,err,0,requestURL['host']+requestURL['path']); }
	});
	request.setTimeout(30000,function () {
		if (responsed == false) { responsed = true; callback(false,'Timed out',0,requestURL['host']+requestURL['path']); }
	});
	request.end();
};