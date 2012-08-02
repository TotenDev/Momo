//
// ParserCommand.js — Momo
// today is 8/01/12, it is now 10:25 PM
// created by TotenDev
// see LICENSE for details.
//
	
var tap = require("tap");
var MomoParser = require("./../src/Momo-Parser.js")();
//
tap.test("\nWhiteCard Parse Command Value",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push("*");
		t.plan(value.length+1);
		var testValue = MomoParser.parseCommandValue("*");
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nSingle Parse Command Value",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(999);
		t.plan(value.length+1);
		var testValue = MomoParser.parseCommandValue("999");
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nRange Parse Command Value",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(2,3,4,5,6,7,8,9,10,11);
		t.plan(value.length+1);
		var testValue = MomoParser.parseCommandValue("2-11");
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nInverted Range Parse Command Value",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(2,3,4,5,6,7,8,9,10,11);
		t.plan(value.length+1);
		var testValue = MomoParser.parseCommandValue("11-2");
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nIndividual Parse Command Value",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(2,3,4,5,6,8,7,9,10,11);
		t.plan(value.length+1);
		var testValue = MomoParser.parseCommandValue("2,3,4,5,6,8,7,9,10,11");
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nIndividual&Range Parse Command Value 1",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(2,4,18,19,20);
		t.plan(value.length+1);
		var testValue = MomoParser.parseCommandValue("2,4,18-20");
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nIndividual&Range Parse Command Value 2",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(2,4,18,19,20);
		t.plan(value.length+1);
		var testValue = MomoParser.parseCommandValue("2,4,18-20");
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nIndividual&Range Parse Command Value 3",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(20,90);
		t.plan(value.length+1);
		var testValue = MomoParser.parseCommandValue("20-20,90");
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});
tap.test("\nIndividual&Range Parse Command Value 4",function (t) {
	t.doesNotThrow(function () {
		var value = new Array();
		value.push(20,43,45,46,47,48);
		t.plan(value.length+1);
		var testValue = MomoParser.parseCommandValue("20-20,43,45-48");
		for (var i = 0; i < testValue.length; i++) {
			t.equal(testValue[i],value[i],"Not parsing properly value at index " + i);
		}
	});
	t.end();
});