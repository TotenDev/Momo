//
// Job.js — Momo
// today is 8/01/12, it is now 10:25 PM
// created by TotenDev
// see LICENSE for details.
//
	
var tap = require("tap"),
	MomoJob = require("./../../src/Momo-Job.js"),
	url = require('url');
//Auxs
var zero = new Array(); zero.push(0);
var one = new Array(); one.push(1);
//
tap.test("\nSpecial Keyword @yearly",function (t) {
	t.plan(7);
	t.doesNotThrow(function () {
		var Job = MomoJob("@yearly http://example.com");
		t.equal(Job.minutesValue[0],zero[0],"Minutes are ok");
		t.equal(Job.hoursValue[0],zero[0],"Hours are ok");
		t.equal(Job.monthDaysValue[0],one[0],"Months Days are ok");
		t.equal(Job.monthsValue[0],one[0],"Months are ok");
		t.equal(Job.daysOfWeekValue,"*","Days of Week are ok");
		t.equal(Job.executionURL()['host'],url.parse("http://example.com/")['host'],"Execution URL is ok");
	});
	t.end();
});
//
tap.test("\nSpecial Keyword @annually",function (t) {
	t.plan(7);
	t.doesNotThrow(function () {
		var Job = MomoJob("@annually http://example.com");
		t.equal(Job.minutesValue[0],zero[0],"Minutes are ok");
		t.equal(Job.hoursValue[0],zero[0],"Hours are ok");
		t.equal(Job.monthDaysValue[0],one[0],"Months Days are ok");
		t.equal(Job.monthsValue[0],one[0],"Months are ok");
		t.equal(Job.daysOfWeekValue,"*","Days of Week are ok");
		t.equal(Job.executionURL()['host'],url.parse("http://example.com/")['host'],"Execution URL is ok");
	});
	t.end();
});
//
tap.test("\nSpecial Keyword @monthly",function (t) {
	t.plan(7);
	t.doesNotThrow(function () {
		var Job = MomoJob("@monthly http://example.com");
		t.equal(Job.minutesValue[0],zero[0],"Minutes are ok");
		t.equal(Job.hoursValue[0],zero[0],"Hours are ok");
		t.equal(Job.monthDaysValue[0],one[0],"Months Days are ok");
		t.equal(Job.monthsValue,'*',"Months are ok");
		t.equal(Job.daysOfWeekValue,"*","Days of Week are ok");
		t.equal(Job.executionURL()['host'],url.parse("http://example.com/")['host'],"Execution URL is ok");
	});
	t.end();
});
//
tap.test("\nSpecial Keyword @weekly",function (t) {
	t.plan(7);
	t.doesNotThrow(function () {
		var Job = MomoJob("@weekly http://example.com");
		t.equal(Job.minutesValue[0],zero[0],"Minutes are ok");
		t.equal(Job.hoursValue[0],zero[0],"Hours are ok");
		t.equal(Job.monthDaysValue,'*',"Months Days are ok");
		t.equal(Job.monthsValue,'*',"Months are ok");
		t.equal(Job.daysOfWeekValue[0],zero[0],"Days of Week are ok");
		t.equal(Job.executionURL()['host'],url.parse("http://example.com/")['host'],"Execution URL is ok");
	});
	t.end();
});
//
tap.test("\nSpecial Keyword @daily",function (t) {
	t.plan(7);
	t.doesNotThrow(function () {
		var Job = MomoJob("@daily http://example.com");
		t.equal(Job.minutesValue[0],zero[0],"Minutes are ok");
		t.equal(Job.hoursValue[0],zero[0],"Hours are ok");
		t.equal(Job.monthDaysValue,'*',"Months Days are ok");
		t.equal(Job.monthsValue,'*',"Months are ok");
		t.equal(Job.daysOfWeekValue,'*',"Days of Week are ok");
		t.equal(Job.executionURL()['host'],url.parse("http://example.com/")['host'],"Execution URL is ok");
	});
	t.end();
});
//
tap.test("\nSpecial Keyword @hourly",function (t) {
	t.plan(7);
	t.doesNotThrow(function () {
		var Job = MomoJob("@hourly http://example.com");
		t.equal(Job.minutesValue[0],zero[0],"Minutes are ok");
		t.equal(Job.hoursValue,'*',"Hours are ok");
		t.equal(Job.monthDaysValue,'*',"Months Days are ok");
		t.equal(Job.monthsValue,'*',"Months are ok");
		t.equal(Job.daysOfWeekValue,'*',"Days of Week are ok");
		t.equal(Job.executionURL()['host'],url.parse("http://example.com/")['host'],"Execution URL is ok");
	});
	t.end();
});