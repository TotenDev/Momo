//
// ParserCommand.js — Momo
// today is 8/01/12, it is now 10:25 PM
// created by TotenDev
// see LICENSE for details.
//
	
var tap = require("tap");
var MomoParser = require("./../src/Momo-Parser.js")();
//
tap.test("\nWhiteCard Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push("*");
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("*");
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nDual WhiteCard Parser",function (t) {
	t.doesNotThrow(function () {
		t.plan(21);
		var testValue = MomoParser.commandAllowedValues("*/*",20);
		for (var i = 0; i < testValue.length; i++) {
			t.ok(true,"Whitecard receiving...");
		}
	});
	t.end();
});
tap.test("\nSingle Value Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(1);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("1");
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nSingle Value Zero Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(0);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("0");
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nSingle Value DoubleZero Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(0);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("00");
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nSingle Range Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(1,2,3,4,5,6);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("1-6");
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nSingle Individual Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(1,2,5,6);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("1,2,5,6");
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nRoutine Simple Whitecard Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(2);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("2/*",100);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nRoutine Simple Fifteen Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(15);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("15/5",100);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nRoutine Simple No Value Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("3/2",100);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nRoutine Range Whitecard Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(1,2,3,4,5,6,7,8,9);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("1-9/*",100);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nRoutine Range One Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(1,2,3,4,5,6,7,8,9);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("1-9/1",100);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nRoutine Range Two Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(2,4,6,8);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("1-9/2",100);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nRoutine Range Three Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(3,6,9);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("1-9/3",100);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nRoutine Range Three with Limit Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(3,6);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("1-9/3",8);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nRoutine Range Limits Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(9);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("1-9/9",100);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nRoutine Range One Value Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(0);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("0-9/10",100);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nRoutine Individual Whitecard Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(1,9);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("1,9/*",100);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nRoutine Individual One Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(1,9);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("1,9/1",100);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nRoutine Individual No Value Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push();
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("1,9/2",100);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nRoutine Individual Three Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(2,4,8);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("2,4,8/2",100);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nRoutine Range/Individual One Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(2,4,8,10,12);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("2,4,8-12/2",100);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nRoutine Range/Individual Two Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(8,10,12,88,98);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("8-12,88,98,99/2",100);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nDivisible Simple One Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(0,10,20,30,40,50,60,70,80,90,100);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("*/10",100);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nDivisible Simple Two Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(0);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("*/7",6);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nDivisible Simple Three Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(0,7);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("*/7",7);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nDivisible Individual One Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(0,1,2,3,4,5,6,7);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("*/1,2",7);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nDivisible Individual Two Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(0);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("*/9,22",7);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nDivisible Individual Three Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(0,3,6);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("*/3",7);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nDivisible Range One Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(0,2,3,4,6);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("*/2-3",7);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nDivisible Range Two Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(0,5,6,7);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("*/5-7",7);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nDivisible Range/Individual One Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(0,5,6,7,9,10);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("*/5-7,9",10);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nDivisible Range/Individual Two Parser",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(0,5,7,8,9);
		t.plan(value.length+1);
		var testValue = MomoParser.commandAllowedValues("*/5,7-9",9);
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});