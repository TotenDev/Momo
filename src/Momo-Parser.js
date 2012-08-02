//
// Momo.js — Momo
// today is 7/25/12, it is now 3:25 PM
// created by TotenDev
// see LICENSE for details.
//
	
var url = require('url');
/**
* Initialize Momo Parser function
**/
module.exports = function () { return new MomoParser(); }
function MomoParser() {
	MomoParserInstance = this ;
};

//
MomoParser.prototype.isCommandValid = function isCommandValid(command) {
	//Check if valid and `parsable`
	if (MomoParserInstance.commandAllowedValues(command,2500) == false) {
		return false;
	}return true;
};
/**
* Initialize Parse Command
* @param string command - Command to be parsed - REQUIRED
* @param integer maxValue - Max value to be looped, ex: if command is a minute param, it should be 60  - REQUIRED
**/
MomoParser.prototype.commandAllowedValues = function commandAllowedValues(command,maxValue) {
	if (!maxValue) { maxValue = 0; }
	//Check if valid and `parsable`
	var matches = command.match(/([0-9\/\/,*-])+/);
	if (matches && matches.length > 0) {
		//Get only first match
		var theCMD = matches[0];
		//
		if (theCMD == '*') { /*Deactivated Command*/ return "*";
		}else if (theCMD.split("/").length > 1) { /*Multi Stage*/
			var parts = theCMD.split("/");
			if (parts.length == 2) {
				//Check first stage
				var firstStage = MomoParserInstance.parseCommandValue(parts[0]);
				var secondStage = MomoParserInstance.parseCommandValue(parts[1]);
				//Check for not allowed types //HERE WE ARE NOT ALLOWING MULTIPLE NUMBERS ON SECONDS STAGE IF FIRST STAGE IS NUMBER
				if (typeof secondStage != 'string' && typeof firstStage != 'string' && secondStage.length > 1) {
					console.log("Command ("+theCMD+"), doesn't seems to be right, Momo does not allow multi numbers on both command stages.");
					return false;
				}else if (typeof secondStage == 'string' && typeof firstStage == 'string') {
					return "*";
				}else {
					//Let's computate
					if (firstStage == '*') { /*DIVISIBLE*/
						var retValue = new Array();
						for (var i = 0; i < secondStage.length; i++) {
							for (var o = 0; o <= maxValue; o++) { if (o%secondStage[i]===0 && retValue.indexOf(o) == -1) { retValue.push(o); } }
						}
						retValue.sort(function sortfunction(a, b){ return (a - b );});
						return retValue;
					}else { /*ROUTINE*/
						var retValue = new Array();
						var maxStep = (secondStage == "*" ? 1 : secondStage[0]);
						var step = 1;
						for (var i = 0; i <= maxValue; i++) {
							step--;
							if (step == 0) {
								step = maxStep;
								for (var o = 0; o < firstStage.length; o++) {
									if (firstStage[o] == i && retValue.indexOf(firstStage[o]) == -1) { retValue.push(firstStage[o]); }
								}
							}
							//Finish after loop into values, because max has reached
							if (i == maxValue) { 
								retValue.sort(function sortfunction(a, b){ return (a - b );});
								return retValue; 
							}
						}
						retValue.sort(function sortfunction(a, b){ return (a - b );});
						return retValue;
					}
				}
			} else {
				console.log("Command have more than 2 stages. This is not allowed.");
				return false;
			}
		}else { /*Single Stage*/ return MomoParserInstance.parseCommandValue(theCMD); }
	}else { return false; }
};

/**
* Initialize Parse Command Stage
* @param string commandPart - Command stage to be parsed - REQUIRED
**/
MomoParser.prototype.parseCommandValue = function parseCommandValue(commandPart) {
	//Check if is whitecard
	if (commandPart == "*") { return "*"; }
	//Auxs
	var tmpData = "", tmpData2 = "", state = 0, container = new Array();
	//for each char parse it
	for (var i = 0; i <= commandPart.length; i++) {
		var isNum = (commandPart[i] && commandPart[i].match(/[0-9]/) && commandPart[i].match(/[0-9]/).length > 0);
		switch (state) {
			case 0: { /*Searching*/
				//Check is number
				if (isNum) {
					tmpData += commandPart[i];
				}else if (commandPart[i] === undefined || commandPart[i] == ",") {
					if (tmpData && tmpData.length > 0) {
						container.push(parseInt(tmpData));
						tmpData = "";	
					}
				}else if (commandPart[i] == "-") { state = 1; }
			}break;
			case 1: { /*Until character*/
				//Check is number
				if (isNum) {
					tmpData2 += commandPart[i];
				}else if (commandPart[i] == "," || commandPart[i] == "-" || commandPart[i] === undefined) {
					//Calculate
					var u = (parseInt(tmpData) > parseInt(tmpData2) ? parseInt(tmpData2) : parseInt(tmpData))
					var bigger = (parseInt(tmpData) > parseInt(tmpData2) ? parseInt(tmpData) : parseInt(tmpData2));
					for (;u <= bigger; u++) { container.push(parseInt(u)); }
					//Set
					state = 0 ;
					tmpData2 = "";
					tmpData = "";
				}
			}break;
			default: break;
		}
	}
	return container ;
};