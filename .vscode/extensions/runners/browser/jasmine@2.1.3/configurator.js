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
!function(n){var i=n.$_$tracer,e=n.setTimeout,l=jasmineRequire&&jasmineRequire.version&&"function"==typeof jasmineRequire.version&&"string"==typeof jasmineRequire.version()&&2<parseInt(jasmineRequire.version().split(".")[0],10),r=(jasmineRequire.ExceptionFormatter=function(){return function(){this.message=function(n){return n?n.name&&n.message?n.name+": "+n.message:n.toString():"empty error"},this.stack=function(n){return n?n.stack:null}}},jasmineRequire.GlobalErrors=function(n){return function(t){function e(n,t,e,r,i){var o=u[u.length-1];i&&i instanceof Error?o.call(null,i):(n=n&&n.toString()||"",t=t&&t.toString()||"",e=e&&e.toString()||"",o.call(null,{message:n,stack:n+"\nat "+t+":"+e,toString:function(){return n}}))}var u=[];t=t||n.getGlobal(),this.uninstall=function(){},this.install=function(){var n=t.onerror;t.onerror=e,this.uninstall=function(){t.onerror=n}},this.pushListener=function(n){u.push(n)},this.popListener=function(){u.pop()}}},jasmineRequire.SpyStrategy=function(){return function(n){var t,e=(n=n||{}).name||"unknown",r=n.fn||function(){},i=n.getSpy||function(){},o=function(){},u=o,s=n.customStrategies||{};for(t in s)Object.prototype.hasOwnProperty.call(s,t)&&!this[t]&&(this[t]=function(n){return function(){return o=n.apply(null,arguments),i()}}(s[t]));function c(n){var t=a();if(t)return t;throw new Error(n+" requires global Promise, or `Promise` configured with `jasmine.getEnv().configure()`")}var a="function"==typeof n.getPromise?n.getPromise:function(){};this.resolveTo=function(n){var t=c("resolveTo");return o=function(){return t.resolve(n)},i()},this.rejectWith=function(n){var t=c("rejectWith");return o=function(){return t.reject(n)},i()},this.identity=function(){return e},this.exec=function(n,t){return l?o.apply(n,t):o.apply(this,arguments)},this.callThrough=function(){return o=r,i()},this.returnValue=function(n){return o=function(){return n},i()},this.returnValues=function(){var n=Array.prototype.slice.call(arguments);return o=function(){return n.shift()},i()},this.throwError=function(n){return o=function(){throw n instanceof Error?n:new Error(n)},i()},this.callFake=function(n){return o=n,i()},this.stub=function(n){return o=function(){},i()},this.isConfigured=function(){return o!==u}}},jasmineRequire.QueueRunner),t=(jasmineRequire.QueueRunner=function(){function n(n){n.clearStack=function(n){e(n,0)},t.apply(this,arguments)}var t=r.apply(this,arguments);return n.prototype=t.prototype,n},n.jasmine=jasmineRequire.core(jasmineRequire),(n.wallaby.testFramework=jasmine).getEnv({suppressLoadErrors:!0}));var o,u=jasmineRequire.interface(n.jasmine,t),s=n,c=u;for(o in c)s[o]=c[o];function a(r){return function(){var n,t,e=arguments[1];if("encountered a declaration exception"!==arguments[0])return e?(e.length?arguments[1]=function(n){i.specSyncStart();try{var t=Function.prototype.apply.call(e,this,arguments)}finally{i.specSyncEnd()}return t}:arguments[1]=function(){i.specSyncStart();try{var n=Function.prototype.apply.call(e,this,arguments)}finally{i.specSyncEnd()}return n},(n=Function.prototype.apply.call(r,this,arguments)).result._testFile=i.entryFile(),(t=f.slice()).push(n.description),n.disabled||(n.disabled=i.hasSpecFilter()&&!i.specFilter(t),n.disabled&&(n.markedPending=!0,n.result._disabled=!0))):(n=Function.prototype.apply.call(y,this,arguments)).result._testFile=i.entryFile(),n;try{e()}catch(n){i.reportDeclarationError(n)}}}var f=[],p=t.describe,h=(t.describe=function(){f.push(arguments[0]);var n=Function.prototype.apply.call(p,this,arguments);return f.pop(),n},t.fdescribe),y=(t.fdescribe=function(){f.push(arguments[0]);var n=Function.prototype.apply.call(h,this,arguments);return f.pop(),n},t.it),n=t.fit,m=(t.it=a(y),t.fit=a(n),t.afterEach);t.afterEach=function(){var t;return i.needToNotifySingleTestRun()&&((t=arguments[0]).length?arguments[0]=function(n){i.notifySingleTestAfterEach(function(){t(n)})}:arguments[0]=function(n){i.notifySingleTestAfterEach(function(){try{t()}finally{n()}})}),Function.prototype.apply.call(m,this,arguments)}}(window);