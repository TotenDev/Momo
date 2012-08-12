//
// Job.js — Momo
// today is 8/01/12, it is now 10:25 PM
// created by TotenDev
// see LICENSE for details.
//
	
var tap = require("tap"),
	MomoJob = require("./../src/Momo-Job.js"),
	url = require('url');

//
tap.test("\nSimple Job Parser",function (t) {
	t.plan(7);
	t.doesNotThrow(function () {
		var Job = MomoJob("* * * * * http://example.com");
		t.equal(Job.minutesValue,"*","Minutes are ok");
		t.equal(Job.hoursValue,"*","Hours are ok");
		t.equal(Job.monthDaysValue,"*","Months Days are ok");
		t.equal(Job.monthsValue,"*","Months are ok");
		t.equal(Job.daysOfWeekValue,"*","Days of Week are ok");
		t.equal(Job.executionURL()['host'],url.parse("http://example.com")['host'],"Execution URL is ok");
	});
	t.end();
});
//
tap.test("\nSimple Job Spaces One Parser",function (t) {
	t.plan(7);
	t.doesNotThrow(function () {
		var Job = MomoJob(" * * * * * http://example.com");
		t.equal(Job.minutesValue,"*","Minutes are ok");
		t.equal(Job.hoursValue,"*","Hours are ok");
		t.equal(Job.monthDaysValue,"*","Months Days are ok");
		t.equal(Job.monthsValue,"*","Months are ok");
		t.equal(Job.daysOfWeekValue,"*","Days of Week are ok");
		t.equal(Job.executionURL()['host'],url.parse("http://example.com")['host'],"Execution URL is ok");
	});
	t.end();
});
//
tap.test("\nSimple Job Spaces Two Parser",function (t) {
	t.plan(7);
	t.doesNotThrow(function () {
		var Job = MomoJob("* * * * * http://example.com ");
		t.equal(Job.minutesValue,"*","Minutes are ok");
		t.equal(Job.hoursValue,"*","Hours are ok");
		t.equal(Job.monthDaysValue,"*","Months Days are ok");
		t.equal(Job.monthsValue,"*","Months are ok");
		t.equal(Job.daysOfWeekValue,"*","Days of Week are ok");
		t.equal(Job.executionURL()['host'],url.parse("http://example.com")['host'],"Execution URL is ok");
	});
	t.end();
});
//
tap.test("\nSimple Job Spaces URL Parser",function (t) {
	t.plan(8);
	t.doesNotThrow(function () {
		var Job = MomoJob("* * * * * http://example.com/cron%20job/ ");
		t.equal(Job.minutesValue,"*","Minutes are ok");
		t.equal(Job.hoursValue,"*","Hours are ok");
		t.equal(Job.monthDaysValue,"*","Months Days are ok");
		t.equal(Job.monthsValue,"*","Months are ok");
		t.equal(Job.daysOfWeekValue,"*","Days of Week are ok");
		t.equal(Job.executionURL()['host'],url.parse("http://example.com/cron%20job/")['host'],"Execution URL is ok");
		t.equal(Job.executionURL()['path'],url.parse("http://example.com/cron%20job/")['path'],"Execution URL path is ok");
	});
	t.end();
});
//
tap.test("\nSimple Job Extra Command Parser",function (t) {
	t.plan(8);
	t.doesNotThrow(function () {
		var Job = MomoJob("* * * * * http://example.com/cron%20job/index.io ioio");
		t.equal(Job.minutesValue,"*","Minutes are ok");
		t.equal(Job.hoursValue,"*","Hours are ok");
		t.equal(Job.monthDaysValue,"*","Months Days are ok");
		t.equal(Job.monthsValue,"*","Months are ok");
		t.equal(Job.daysOfWeekValue,"*","Days of Week are ok");
		t.equal(Job.executionURL()['host'],url.parse("http://example.com/cron%20job/index.io")['host'],"Execution URL is ok");
		t.equal(Job.executionURL()['path'],url.parse("http://example.com/cron%20job/index.io")['path'],"Execution URL path is ok");
	});
	t.end();
});
//
tap.test("\nSimple Job Comments Parser",function (t) {
	t.plan(9);
	t.doesNotThrow(function () {
		var Job = MomoJob("#iLikeComments#*#This_is_the_minute# #iLikeComments#* *#Months_but_just_days_of_it!# 2#Do_not_need_to_finish_with_#_see * http://example.com/cron%20job/index.io ioio");
		t.equal(Job.minutesValue,"*","Minutes are ok");
		t.equal(Job.hoursValue,"*","Hours are ok");
		t.equal(Job.monthDaysValue,"*","Months Days are ok");
		var b = new Array();b.push(2);
		t.equal(Job.monthsValue[0],b[0],"Months are ok");
		t.equal(Job.monthsValue.length,b.length,"Months are same");
		t.equal(Job.daysOfWeekValue,"*","Days of Week are ok");
		t.equal(Job.executionURL()['host'],url.parse("http://example.com/cron%20job/index.io")['host'],"Execution URL is ok");
		t.equal(Job.executionURL()['path'],url.parse("http://example.com/cron%20job/index.io")['path'],"Execution URL path is ok");
	});
	t.end();
});