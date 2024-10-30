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
!function(){var c,o=window.$_$tracer,u=o.initialSpecId();QUnit.begin(function(e){o.started({total:e.totalTests})}),QUnit.done(function(){o.complete()}),QUnit.testStart(function(e){var t=QUnit.config;if(o.hasSpecFilter()){var s,i=e.name,n=e.name.replace(/\s\s*$/,""),a=[n];if(i!==n&&(s=[i]),e.module&&(a.unshift(e.module),s)&&s.unshift(e.module),!(o.specFilter(a)||s&&o.specFilter(s))){for(;t.queue.length;){var r=t.queue.shift();if(r&&~r.toString().indexOf(".finish();"))return}return}}t.current.run=function(){var e;t.current=this,delete t.current.stack,this.callbackStarted=(new Date).getTime();try{o.specSyncStart(),e=this.callback.call(this.testEnvironment,this.assert),this.resolvePromise(e),0===this.timeout&&0!==this.semaphore&&this.pushFailure("Test did not finish synchronously even though assert.timeout( 0 ) was used.")}catch(e){this.pushFailure(e.message,e.stack),t.blocking&&(this.semaphore=0,t.blocking=!1)}finally{o.specSyncEnd()}},c={success:!0,errors:[],id:++u,start:(new o._Date).getTime()},o.specStart(c.id,e.name)}),QUnit.log(function(e){var t,s,i;e.result||(i="",t=e.expected,s=e.actual,e.message&&(i+=e.message),c.success=!1,e.showDiff=!0,i=o.setAssertionData(e,{message:i,stack:e.source}),delete e.showDiff,c.errors.push(i),(!e.message||void 0!==e.expected&&i.expected)&&(t||s)&&(i.message+=(e.message?"\n":"")+"Expected: "+o._inspect(t,3)+"\nActual: "+o._inspect(s,3)))}),QUnit.testDone(function(e){var t=o.specEnd(),t={id:c.id,timeRange:t,name:e.name,suite:e.module?[e.module]:[],status:"executed",time:(new o._Date).getTime()-c.start,log:c.errors||[]};t.log.length||delete t.log,o.result(t)})}();