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
var JasmineReporter=function(o){var t=o.initialSpecId(),i=(this.reportRunnerStarting=function(e){o.started({total:e.specs().length})},this.reportRunnerResults=function(){o.complete()},this.reportSpecStarting=function(e){e.id=++t,o.specStart(e.id,e.description),e.results_.time=(new o._Date).getTime()},this.reportSpecResults=function(e){for(var t=o.specEnd(),s=0===e.results_.failedCount,i=e.results_.skipped,r={id:e.id,timeRange:t,name:e.description,suite:[],status:i?"disabled":"executed",time:i?0:(new o._Date).getTime()-e.results_.time,log:[]},n=e.suite;n;)r.suite.unshift(n.description),n=n.parentSuite;if(!s&&!i)for(var a=e.results_.items_,u=0;u<a.length;u++){var c=a[u];c.passed_||(c.showDiff=c.showDiff||"toEqual"===c.matcherName,r.log.push(o.setAssertionData(c,{message:c.message,stack:c.trace&&c.trace.stack?c.trace.stack:o._undefined})))}r.log.length||delete r.log,o.result(r)},jasmine.getEnv());this.specFilter=function(e){if(!(i.exclusive_<=e.exclusive_))return!1;if(!o.hasSpecFilter())return!0;for(var t=[e.description],s=e.suite;s;)t.unshift(s.description),s=s.parentSuite;return o.specFilter(t)}};