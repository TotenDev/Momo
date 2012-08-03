//
// Job.js — Momo
// today is 8/01/12, it is now 10:25 PM
// created by TotenDev
// see LICENSE for details.
//
	
var tap = require("tap");
var MomoJob = require("./../src/Momo-Job.js");

//
tap.test("\nSimple Job Parser",function (t) {
	t.plan(7);
	t.doesNotThrow(function () {
		var Job = MomoJob("* * * * * http://uol.com");
		t.equal(Job.minutesValue,"*","Minutes are ok");
		t.equal(Job.hoursValue,"*","Hours are ok");
		t.equal(Job.monthDaysValue,"*","Months Days are ok");
		t.equal(Job.monthsValue,"*","Months are ok");
		t.equal(Job.daysOfWeekValue,"*","Days of Week are ok");
		t.equal(Job.executionURL(),"http://uol.com","Execution URL are ok");
	});
	t.end();
});
//
tap.test("\nSimple Job Spaces One Parser",function (t) {
	t.plan(7);
	t.doesNotThrow(function () {
		var Job = MomoJob(" * * * * * http://uol.com");
		t.equal(Job.minutesValue,"*","Minutes are ok");
		t.equal(Job.hoursValue,"*","Hours are ok");
		t.equal(Job.monthDaysValue,"*","Months Days are ok");
		t.equal(Job.monthsValue,"*","Months are ok");
		t.equal(Job.daysOfWeekValue,"*","Days of Week are ok");
		t.equal(Job.executionURL(),"http://uol.com","Execution URL are ok");
	});
	t.end();
});
//
tap.test("\nSimple Job Spaces Two Parser",function (t) {
	t.plan(7);
	t.doesNotThrow(function () {
		var Job = MomoJob("* * * * * http://uol.com ");
		t.equal(Job.minutesValue,"*","Minutes are ok");
		t.equal(Job.hoursValue,"*","Hours are ok");
		t.equal(Job.monthDaysValue,"*","Months Days are ok");
		t.equal(Job.monthsValue,"*","Months are ok");
		t.equal(Job.daysOfWeekValue,"*","Days of Week are ok");
		t.equal(Job.executionURL(),"http://uol.com","Execution URL are ok");
	});
	t.end();
});
//
tap.test("\nSimple Job Spaces URL Parser",function (t) {
	t.plan(7);
	t.doesNotThrow(function () {
		var Job = MomoJob("* * * * * http://uol.com/cron%20job/ ");
		t.equal(Job.minutesValue,"*","Minutes are ok");
		t.equal(Job.hoursValue,"*","Hours are ok");
		t.equal(Job.monthDaysValue,"*","Months Days are ok");
		t.equal(Job.monthsValue,"*","Months are ok");
		t.equal(Job.daysOfWeekValue,"*","Days of Week are ok");
		t.equal(Job.executionURL(),"http://uol.com/cron%20job/","Execution URL are ok");
	});
	t.end();
});
//
tap.test("\nSimple Job Extra Command Parser",function (t) {
	t.plan(7);
	t.doesNotThrow(function () {
		var Job = MomoJob("* * * * * http://uol.com/cron%20job/index.io ioio");
		t.equal(Job.minutesValue,"*","Minutes are ok");
		t.equal(Job.hoursValue,"*","Hours are ok");
		t.equal(Job.monthDaysValue,"*","Months Days are ok");
		t.equal(Job.monthsValue,"*","Months are ok");
		t.equal(Job.daysOfWeekValue,"*","Days of Week are ok");
		t.equal(Job.executionURL(),"http://uol.com/cron%20job/index.io","Execution URL are ok");
	});
	t.end();
});
//
tap.test("\nSimple Job Comments Parser",function (t) {
	t.plan(8);
	t.doesNotThrow(function () {
		var Job = MomoJob("#iLikeComments#*#This_is_the_minute# #iLikeComments#* *#Months_but_just_days_of_it!# 2#Do_not_need_to_finish_with_#_see * http://uol.com/cron%20job/index.io ioio");
		t.equal(Job.minutesValue,"*","Minutes are ok");
		t.equal(Job.hoursValue,"*","Hours are ok");
		t.equal(Job.monthDaysValue,"*","Months Days are ok");
		var b = new Array();b.push(2);
		t.equal(Job.monthsValue[0],b[0],"Months are ok");
		t.equal(Job.monthsValue.length,b.length,"Months are same");
		t.equal(Job.daysOfWeekValue,"*","Days of Week are ok");
		t.equal(Job.executionURL(),"http://uol.com/cron%20job/index.io","Execution URL are ok");
	});
	t.end();
});