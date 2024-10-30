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
var Jasmine,jasmine,jasmineCore,allSpecs,jasmineConfigurator,JasmineReporter,path=require("path"),tracer=global.$_$tracer,jasmineInstalled=!1,jasmineVersionGreaterThan2=!1;const tracerUtils=tracer._utils;tracerUtils.patchModulesCode([{files:["jasmine-core/lib/jasmine-core/jasmine.js"],replacements:[{from:"function handleError(error) {",to:"function handleError(error) { onException(error); next(error); return;",optional:!0},{from:"function handleError(error, event) {",to:"function handleError(error, event) { onException(errorOrMsgForGlobalError(error, event)); next(error); return;",optional:!0}]},{files:["jasmine-core/lib/jasmine-core.js"],replacements:[{from:"let jasmine, jasmineInterface;",to:"let jasmine, jasmineInterface, wallabyContext;",optional:!0},{from:"if (!jasmineInterface) {",to:"if (wallabyContext !== global.$_$wallabyJasmineContext) { wallabyContext = global.$_$wallabyJasmineContext;",optional:!0}]}]);try{(Jasmine=require(global.wallaby._testFrameworkPath||"jasmine")).prototype&&Jasmine.prototype.flushOutput&&(Jasmine.prototype.flushOutput=function(){});try{jasmineCore=require(global.wallaby._testFrameworkPath?path.join(path.dirname(global.wallaby._testFrameworkPath),"jasmine-core"):"jasmine-core")}catch(e){jasmineCore=require(global.wallaby._testFrameworkPath?path.join(global.wallaby._testFrameworkPath,"node_modules/jasmine-core"):"jasmine/node_modules/jasmine-core")}jasmineVersionGreaterThan2=jasmineCore&&jasmineCore.version&&"function"==typeof jasmineCore.version&&"string"==typeof jasmineCore.version()&&2<parseInt(jasmineCore.version().split(".")[0],10),jasmineCore.ExceptionFormatter=function(){return function(){this.message=function(e){return e?e.name&&e.message?e.name+": "+e.message:e.toString():"empty error"},this.stack=function(e){return e?e.stack:null}}},jasmineCore.SpyStrategy=function(){return function(e){var t,n=(e=e||{}).name||"unknown",r=e.fn||function(){},i=e.getSpy||function(){},a=function(){},o=e.customStrategies||{};for(t in o)Object.prototype.hasOwnProperty.call(o,t)&&!this[t]&&(this[t]=function(e){return function(){return a=e.apply(null,arguments),i()}}(o[t]));this.resolveTo=function(e){return a=function(){return Promise.resolve(e)},i()},this.rejectWith=function(e){return a=function(){return Promise.reject(e)},i()},this.identity=function(){return n},this.exec=function(e,t){return jasmineVersionGreaterThan2?a.apply(e,t):a.apply(this,arguments)},this.callThrough=function(){return a=r,i()},this.returnValue=function(e){return a=function(){return e},i()},this.returnValues=function(){var e=Array.prototype.slice.call(arguments);return a=function(){return e.shift()},i()},this.throwError=function(e){return a=function(){throw e instanceof Error?e:new Error(e)},i()},this.callFake=function(e){return a=e,i()},this.stub=function(e){return a=function(){},i()},this.isConfigured=function(){return a!==this._defaultPlan}}},jasmineCore.SpyRegistry=function(l){var c=0;return l._wallabyActiveSpies={},l._wallabyUndoSpies=function(){for(var e in l._wallabyActiveSpies)l._wallabyActiveSpies.hasOwnProperty(e)&&(e=l._wallabyActiveSpies[e]).baseObj&&(e.baseObj[e.methodName]=e.originalValue,delete l._wallabyActiveSpies[e._wid])},function(e){var s=(e=e||{}).currentSpies||function(){return[]};this.allowRespy=function(e){this.respy=e},this.spyOn=function(e,t){if(l.util.isUndefined(e))throw new Error("spyOn could not find an object to spy upon for "+t+"()");if(l.util.isUndefined(t))throw new Error("No method name supplied");if(l.util.isUndefined(e[t]))throw new Error(t+"() method does not exist");if(e[t]&&l.isSpy(e[t])){if(this.respy)return e[t];throw new Error(t+" has already been spied upon")}var n,r;try{n=Object.getOwnPropertyDescriptor(e,t)}catch(e){}if(!n||n.writable||n.set)return r={spy:n=l.createSpy(t,e[t]),baseObj:e,methodName:t,originalValue:e[t],_wid:++c},s().push(r),l._wallabyActiveSpies[r._wid]=r,e[t]=n;throw new Error(t+" is not declared writable or has no setter")},this.spyOnProperty=function(e,t,n){if(n=n||"get",l.util.isUndefined(e))throw new Error("spyOn could not find an object to spy upon for "+t);if(l.util.isUndefined(t))throw new Error("No property name supplied");var r;try{r=l.util.getPropertyDescriptor(e,t)}catch(e){}if(!r)throw new Error(t+" property does not exist");if(!r.configurable)throw new Error(t+" is not declared configurable");if(!r[n])throw new Error("Property "+t+" does not have access type "+n);if(l.isSpy(r[n]))throw new Error(t+" has already been spied upon");var i=l.util.clone(r),a=l.createSpy(t,r[n]),o=Object.prototype.hasOwnProperty.call(e,t)?function(){Object.defineProperty(e,t,i)}:function(){delete e[t]},o={restoreObjectToOriginalState:o,_wid:++c};return s().push(o),l._wallabyActiveSpies[o._wid]=o,r[n]=a,Object.defineProperty(e,t,r),a},this.clearSpies=function(){for(var e=s(),t=0;t<e.length;t++){var n=e[t];n.restoreObjectToOriginalState?n.restoreObjectToOriginalState():n.baseObj[n.methodName]=n.originalValue,delete l._wallabyActiveSpies[n._wid]}}}},jasmineInstalled=!0}catch(e){tracer.start(function(){tracer.reportGlobalError("jasmine node module is not found or the version is not supported, missing `npm install jasmine --save-dev`?\n"+(e.stack||""))}),module.exports={init:function(){return{configure:function(){}}}}}jasmineInstalled&&(allSpecs={},jasmineConfigurator=function(i,e){e.configure&&e.configure({specFilter:function(e){return!e||!e.metadata_||!e.metadata_.disabled}});var a=[],t=e.describe,n=(e.describe=function(){a.push(arguments[0]);var e=Function.prototype.apply.call(t,this,arguments);return a.pop(),e},e.fdescribe),o=(e.fdescribe=function(){a.push(arguments[0]);var e=Function.prototype.apply.call(n,this,arguments);return a.pop(),e},e.it),r=(e.it=function(){var e,t,n,r=arguments[1];if("encountered a declaration exception"!==arguments[0])return r?(r.length?arguments[1]=function(e){i.specSyncStart();try{var t=Function.prototype.apply.call(r,this,arguments)}finally{i.specSyncEnd()}return t}:arguments[1]=function(){i.specSyncStart();try{var e=Function.prototype.apply.call(r,this,arguments)}finally{i.specSyncEnd()}return e},e=Function.prototype.apply.call(o,this,arguments),t=allSpecs[e.id]={_testFile:i.entryFile()},(n=a.slice()).push(e.description),e.disabled=i.hasSpecFilter()&&!i.specFilter(n),e.disabled&&(e.markedPending=!0,t._disabled=!0)):(e=Function.prototype.apply.call(o,this,arguments),allSpecs[e.id]={_testFile:i.entryFile()}),e;try{r()}catch(e){i.reportDeclarationError(e)}},e.afterEach);e.afterEach=function(){var t;return i.needToNotifySingleTestRun()&&((t=arguments[0]).length?arguments[0]=function(e){i.notifySingleTestAfterEach(function(){t(e)})}:arguments[0]=function(e){i.notifySingleTestAfterEach(function(){try{t()}finally{e()}})}),Function.prototype.apply.call(r,this,arguments)}},JasmineReporter=function(u,p){var f=u.initialSpecId(),d=[],m={};this.jasmineStarted=function(e){p()||u.started({total:e.totalSpecsDefined})},this.jasmineDone=function(){p()||u.complete()},this.suiteStarted=function(e){p()||d.push(e.description)},this.suiteDone=function(e){if(!p()){if(e&&e.failedExpectations&&e.failedExpectations.length)for(var t=0;t<e.failedExpectations.length;t++){var n=e.failedExpectations[t];n&&!n.matcherName&&"string"==typeof n.message&&"string"==typeof n.stack&&u.reportDeclarationError({message:n.message,stack:n.stack})}d.pop()}},this.specStarted=function(e){var t,n,r;p()||(t=++f,n=m[e.id]={id:t},r=allSpecs[e.id]||{},u.specStart(t,e.description,r&&r._testFile,[...d.slice(),e.description]),n.time=(new u._Date).getTime())},this.specDone=function(t){if(!p()){var n=allSpecs[t.id]||{},r=m[t.id]||{id:f},r=(t._id=r.id,t._time=r.time,delete m[t.id],delete allSpecs[t.id],u.specEnd()),i="passed"===t.status,a="disabled"===t.status||"pending"===t.status||"excluded"===t.status||t._disabled;let e=a?"pending"===t.status?"skipped":"excluded"===t.status||"disabled"===t.status?"disabled":"executed":"executed";n._disabled&&(e="disabled");var o={id:t._id,timeRange:r,name:t.description,suite:d.slice(),status:e,time:a?0:(new u._Date).getTime()-t._time,log:[],testFile:n._testFile};if(!i&&!a)for(var s=t.failedExpectations,l=0;l<s.length;l++){var c=s[l];c.showDiff=c.showDiff||"toEqual"===c.matcherName,o.log.push(u.setAssertionData(c,{message:c.message,stack:c.stack}))}o.log.length||delete o.log,u.result(o)}}},tracer.start(async function(){allSpecs={};var e=global.$_$session;jasmineConfigurator(tracer,jasmine.env),jasmine.clearReporters&&jasmine.clearReporters(),jasmine.onComplete&&jasmine.onComplete(function(){}),jasmine.addReporter(new JasmineReporter(tracer,function(){return e!==global.$_$session})),jasmine.onCompleteCallbackAdded=!0,jasmine.loader&&(jasmine.loader.alwaysImport=!1,jasmine.loader.resolvePath_=function(e){return path.resolve(e)+"?update="+(new Date).getTime()+"&wallaby=true"});try{var t=jasmine.execute();t&&t.then&&"function"==typeof t.then&&await t}finally{jasmine.checkExit&&process.removeListener("exit",jasmine.checkExit)}}),module.exports={init:function(e){return global.$_$wallabyJasmineContext=""+Date.now()+Math.random().toString(36).substring(2),(jasmine=new Jasmine).specFiles=e,jasmine}});