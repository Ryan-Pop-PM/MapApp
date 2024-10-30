/*
 * wallaby-core - v1.0.1620
 * https://wallabyjs.com
 * Copyright (c) 2014-2024 Wallaby.js - All Rights Reserved.
 *
 * This source code file is a part of wallaby-core and is a proprietary (closed source) software.

 * IMPORTANT:
 * Wallaby.js is a tool made by software developers for software developers with passion and love for what we do.
 * Pirating the tool is not only illegal and just morally wrong,
 * it is also unfair to other fellow programmers who are using it legally,
 * and very harmful for the tool and its future.
 */
!function(t){var n=t.$_$tracer,a=(t.wallaby.testFramework=jasmine).Env.prototype.it,e=(jasmine.Env.prototype.it=function(){var e=arguments[1];if(e){if("encountered a declaration exception"===arguments[0])return e();arguments[1]=function(){n.specSyncStart();try{var t=Function.prototype.apply.call(e,this,arguments)}finally{n.specSyncEnd()}return t}}return Function.prototype.apply.call(a,this,arguments)},jasmine.Env.prototype.afterEach);jasmine.Env.prototype.afterEach=function(){var t;return n.needToNotifySingleTestRun()&&(t=arguments[0],arguments[0]=function(){runs(function(){n.notifySingleTestAfterEach()}),waitsFor(function(){return!n.paused()},"waiting wallaby response",1e3),runs(function(){t()})}),Function.prototype.apply.call(e,this,arguments)},jasmine.util.formatException=function(t){return t?t.name&&t.message?t.name+": "+t.message:t.toString():"empty error"},jasmine.ExpectationResult=function(t){if(this.type="expect",this.matcherName=t.matcherName,this.passed_=t.passed,this.expected=t.expected,this.actual=t.actual,this.message=this.passed_?"Passed.":t.message,this.passed_)this.trace="";else if(t.trace)this.trace=t.trace;else{var e;try{throw new Error(this.message)}catch(t){e=t}this.trace=e}},jasmine.ExpectationResult.prototype.toString=function(){return this.message},jasmine.ExpectationResult.prototype.passed=function(){return this.passed_}}(window);