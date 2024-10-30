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
!function(){var c,u=window.$_$tracer,o=u.initialSpecId();QUnit.begin(function(e){u.started({total:e.totalTests})}),QUnit.done(function(){u.complete()}),QUnit.testStart(function(e){var t=QUnit.config;if(u.hasSpecFilter()){var s,n=e.name,i=e.name.replace(/\s\s*$/,""),r=[i];if(n!==i&&(s=[n]),e.module&&(r.unshift(e.module),s)&&s.unshift(e.module),!(u.specFilter(r)||s&&u.specFilter(s))){for(;t.queue.length;){var a=t.queue.shift();if(a&&~a.toString().indexOf(".finish();"))return}return}}t.current.run=function(){var e;u.needToNotifySingleTestRun()&&t.queue.unshift(function(){u.notifySingleTestAfterEach(function(){t.current&&QUnit.start()}),QUnit.stop()}),t.current=this,delete t.current.stack,this.async&&QUnit.stop(),this.callbackStarted=(new Date).getTime();try{u.specSyncStart(),e=this.callback.call(this.testEnvironment,this.assert),this.resolvePromise(e)}catch(e){this.pushFailure(e.message,e.stack),t.blocking&&t.current&&QUnit.start()}finally{u.specSyncEnd()}},c={success:!0,errors:[],id:++o,start:(new u._Date).getTime()},u.specStart(c.id,e.name)}),QUnit.log(function(e){var t,s,n;!e.result&&(n="",t=e.expected,s=e.actual,e.message&&(n+=e.message),c.success=!1,e.showDiff=!0,n=u.setAssertionData(e,{message:n,stack:e.source}),delete e.showDiff,c.errors.push(n),!e.message||void 0!==e.expected&&n.expected)&&(n.message+=(e.message?"\n":"")+"Expected: "+u._inspect(t,3)+"\nActual: "+u._inspect(s,3))}),QUnit.testDone(function(e){var t=u.specEnd(),t={id:c.id,timeRange:t,name:e.name,suite:e.module?[e.module]:[],status:"executed",time:(new u._Date).getTime()-c.start,log:c.errors||[]};t.log.length||delete t.log,u.result(t)})}();