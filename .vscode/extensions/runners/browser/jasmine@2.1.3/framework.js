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
getJasmineRequireObj=function(n){var t;function e(){return t}return(t="undefined"!=typeof module&&module.exports?(n=global,exports):n.jasmineRequire=n.jasmineRequire||{}).core=function(t){var e={};return t.base(e,n),e.util=t.util(),e.Any=t.Any(),e.CallTracker=t.CallTracker(),e.MockDate=t.MockDate(),e.Clock=t.Clock(),e.DelayedFunctionScheduler=t.DelayedFunctionScheduler(),e.Env=t.Env(e),e.ExceptionFormatter=t.ExceptionFormatter(),e.Expectation=t.Expectation(),e.buildExpectationResult=t.buildExpectationResult(),e.JsApiReporter=t.JsApiReporter(),e.matchersUtil=t.matchersUtil(e),e.ObjectContaining=t.ObjectContaining(e),e.pp=t.pp(e),e.QueueRunner=t.QueueRunner(e),e.ReportDispatcher=t.ReportDispatcher(),e.Spec=t.Spec(e),e.SpyRegistry=t.SpyRegistry(e),e.SpyStrategy=t.SpyStrategy(),e.Suite=t.Suite(),e.Timer=t.Timer(),e.version=t.version(),e.matchers=t.requireMatchers(t,e),e},e}(this),getJasmineRequireObj().requireMatchers=function(t,e){for(var n=["toBe","toBeCloseTo","toBeDefined","toBeFalsy","toBeGreaterThan","toBeLessThan","toBeNaN","toBeNull","toBeTruthy","toBeUndefined","toContain","toEqual","toHaveBeenCalled","toHaveBeenCalledWith","toMatch","toThrow","toThrowError"],r={},i=0;i<n.length;i++){var o=n[i];r[o]=t[o](e)}return r},getJasmineRequireObj().base=function(u,t){u.unimplementedMethod_=function(){throw new Error("unimplemented method")},u.MAX_PRETTY_PRINT_DEPTH=40,u.MAX_PRETTY_PRINT_ARRAY_LENGTH=100,u.DEFAULT_TIMEOUT_INTERVAL=5e3,u.getGlobal=function(){return t},u.getEnv=function(t){return u.currentEnv_=u.currentEnv_||new u.Env(t)},u.isArray_=function(t){return u.isA_("Array",t)},u.isString_=function(t){return u.isA_("String",t)},u.isNumber_=function(t){return u.isA_("Number",t)},u.isA_=function(t,e){return Object.prototype.toString.apply(e)==="[object "+t+"]"},u.isDomNode=function(t){return 0<t.nodeType},u.any=function(t){return new u.Any(t)},u.objectContaining=function(t){return new u.ObjectContaining(t)},u.createSpy=function(t,e){var n,r=new u.SpyStrategy({name:t,fn:e,getSpy:function(){return o}}),i=new u.CallTracker,o=function(){var t={object:this,args:Array.prototype.slice.apply(arguments)},e=(i.track(t),r.exec.apply(this,arguments));return t.returnValue=e};for(n in e){if("and"===n||"calls"===n)throw new Error("Jasmine spies would overwrite the 'and' and 'calls' properties on the object being spied upon");o[n]=e[n]}return o.and=r,o.calls=i,o},u.isSpy=function(t){return!!t&&t.and instanceof u.SpyStrategy&&t.calls instanceof u.CallTracker},u.createSpyObj=function(t,e){if(!u.isArray_(e)||0===e.length)throw"createSpyObj requires a non-empty array of method names to create spies for";for(var n={},r=0;r<e.length;r++)n[e[r]]=u.createSpy(t+"."+e[r]);return n}},getJasmineRequireObj().util=function(){var t={inherit:function(t,e){function n(){}n.prototype=e.prototype,t.prototype=new n},htmlEscape:function(t){return t&&t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},argsToArray:function(t){for(var e=[],n=0;n<t.length;n++)e.push(t[n]);return e},isUndefined:function(t){return void 0===t},arrayContains:function(t,e){for(var n=t.length;n--;)if(t[n]===e)return!0;return!1},clone:function(t){if("[object Array]"===Object.prototype.toString.apply(t))return t.slice();var e,n={};for(e in t)t.hasOwnProperty(e)&&(n[e]=t[e]);return n}};return t},getJasmineRequireObj().Spec=function(t){function e(t){this.expectationFactory=t.expectationFactory,this.resultCallback=t.resultCallback||function(){},this.id=t.id,this.description=t.description||"",this.queueableFn=t.queueableFn,this.beforeAndAfterFns=t.beforeAndAfterFns||function(){return{befores:[],afters:[]}},this.userContext=t.userContext||function(){return{}},this.onStart=t.onStart||function(){},this.getSpecName=t.getSpecName||function(){return""},this.expectationResultFactory=t.expectationResultFactory||function(){},this.queueRunnerFactory=t.queueRunnerFactory||function(){},this.catchingExceptions=t.catchingExceptions||function(){return!0},this.queueableFn.fn||this.pend(),this.result={id:this.id,description:this.description,fullName:this.getFullName(),failedExpectations:[],passedExpectations:[]}}return e.prototype.addExpectationResult=function(t,e){e=this.expectationResultFactory(e);(t?this.result.passedExpectations:this.result.failedExpectations).push(e)},e.prototype.expect=function(t){return this.expectationFactory(t,this)},e.prototype.execute=function(t){var e,n=this;function r(){n.result.status=n.status(),n.resultCallback(n.result),t&&t()}this.onStart(this),this.markedPending||this.disabled?r():(e=(e=this.beforeAndAfterFns()).befores.concat(this.queueableFn).concat(e.afters),this.queueRunnerFactory({queueableFns:e,onException:function(){n.onException.apply(n,arguments)},onComplete:r,userContext:this.userContext()}))},e.prototype.onException=function(t){e.isPendingSpecException(t)?this.pend():this.addExpectationResult(!1,{matcherName:"",passed:!1,expected:"",actual:"",error:t})},e.prototype.disable=function(){this.disabled=!0},e.prototype.pend=function(){this.markedPending=!0},e.prototype.status=function(){return this.disabled?"disabled":this.markedPending?"pending":0<this.result.failedExpectations.length?"failed":"passed"},e.prototype.isExecutable=function(){return!this.disabled&&!this.markedPending},e.prototype.getFullName=function(){return this.getSpecName(this)},e.pendingSpecExceptionMessage="=> marked Pending",e.isPendingSpecException=function(t){return!(!t||!t.toString||-1===t.toString().indexOf(e.pendingSpecExceptionMessage))},e},null==typeof window&&"object"==typeof exports&&(exports.Spec=jasmineRequire.Spec),getJasmineRequireObj().Env=function(I){return function(t){function r(){return c||f()}var o=this,t=(t=t||{}).global||I.getGlobal(),u=0,e=!0,n=I.getGlobal().setTimeout,i=I.getGlobal().clearTimeout,s=(this.clock=new I.Clock(t,new I.DelayedFunctionScheduler,new I.MockDate(t)),{}),a={},c=null,l=[],p=null,f=function(){return l[l.length-1]},h=new I.ReportDispatcher(["jasmineStarted","jasmineDone","suiteStarted","suiteDone","specStarted","specDone"]),d=(this.specFilter=function(){return!0},this.addCustomEqualityTester=function(t){if(!r())throw new Error("Custom Equalities must be added in a before function or a spec");a[r().id].customEqualityTesters.push(t)},this.addMatchers=function(t){if(!r())throw new Error("Matchers must be added in a before function or a spec");var e,n=a[r().id].customMatchers;for(e in t)n[e]=t[e]},I.Expectation.addCoreMatchers(I.matchers),0),m=function(){return"spec"+d++},y=0,g=function(){return"suite"+y++},b=function(t,n){return I.Expectation.Factory({util:I.matchersUtil,customEqualityTesters:a[n.id].customEqualityTesters,customMatchers:a[n.id].customMatchers,actual:t,addExpectationResult:function(t,e){return n.addExpectationResult(t,e)}})},E=function(t,e){var n={spies:[],customEqualityTesters:[],customMatchers:{}};a[e]&&(n.customEqualityTesters=I.util.clone(a[e].customEqualityTesters),n.customMatchers=I.util.clone(a[e].customMatchers)),a[t]=n},x=function(t){q.clearSpies(),delete a[t]},v=function(i,o){return function(){for(var t=[],e=[],n=[],r=[];i;)t=t.concat(i.beforeFns),e=e.concat(i.afterFns),o()&&(n=n.concat(i.beforeAllFns),r=r.concat(i.afterAllFns)),i=i.parentSuite;return{befores:n.reverse().concat(t.reverse()),afters:e.concat(r)}}},S=function(t,e){return e.getFullName()+" "+t.description},w=I.buildExpectationResult,T=new I.ExceptionFormatter,R=function(t){return t.messageFormatter=T.message,t.stackFormatter=T.stack,w(t)},F=(this.catchExceptions=function(t){return e=!!t},this.catchingExceptions=function(){return e},20),j=0;function D(t){F<=++j?n(t,j=0):t()}function A(t){var e=new I.Suite({env:o,id:g(),description:t,parentSuite:p,queueRunner:O,onStart:function(t){l.push(t),E(t.id,t.parentSuite.id),h.suiteStarted(t.result)},expectationFactory:b,expectationResultFactory:R,resultCallback:function(t){e.disabled||(x(e.id),l.pop()),h.suiteDone(t)}});return s[e.id]=e}var J=function(t){return I.Spec.isPendingSpecException(t)||e},O=function(t){t.catchException=J,t.clearStack=t.clearStack||D,t.timer={setTimeout:n,clearTimeout:i},t.fail=o.fail,new I.QueueRunner(t).execute()},C=new I.Suite({env:this,id:g(),description:"Jasmine__TopLevel__Suite",queueRunner:O}),q=(s[C.id]=C,E(C.id),p=C,this.topSuite=function(){return C},this.execute=function(t){t?M=!0:t=k.length?(M=!0,k):[C.id];for(var e=[],n=0;n<t.length;n++){var r=s[t[n]];e.push(function(e){return{fn:function(t){e.execute(t)}}}(r))}h.jasmineStarted({totalSpecsDefined:u}),O({queueableFns:e,onComplete:h.jasmineDone})},this.addReporter=function(t){h.addReporter(t)},new I.SpyRegistry({currentSpies:function(){if(r())return a[r().id].spies;throw new Error("Spies must be created in a before function or a spec")}})),k=(this.spyOn=function(){return q.spyOn.apply(q,arguments)},this.describe=function(t,e){t=A(t);return _(t,e),t},this.xdescribe=function(t,e){t=this.describe(t,e);return t.disable(),t},[]);function _(t,e){var n=p,r=(n.addChild(t),p=t,null);try{e.call(t)}catch(t){r=t}r&&o.it("encountered a declaration exception",function(){throw r}),p=n}function N(){var t=function(t){for(;t;){if(t.isFocused)return t.id;t=t.parentSuite}return null}(p);if(t)for(var e=0;e<k.length;e++)if(k[e]===t){k.splice(e,1);break}}function L(t,e,n,r){u++;var i=new I.Spec({id:m(),beforeAndAfterFns:v(n,U),expectationFactory:b,resultCallback:function(t){x(i.id),c=null,h.specDone(t)},getSpecName:function(t){return S(t,n)},onStart:function(t){E((c=t).id,n.id),h.specStarted(t.result)},description:t,expectationResultFactory:R,queueRunnerFactory:O,userContext:function(){return n.clonedSharedUserContext()},queueableFn:{fn:e,timeout:function(){return r||I.DEFAULT_TIMEOUT_INTERVAL}}});return s[i.id]=i,o.specFilter(i)||i.disable(),i}var M=!(this.fdescribe=function(t,e){t=A(t);return t.isFocused=!0,k.push(t.id),N(),_(t,e),t}),U=function(){return M};this.it=function(t,e,n){t=L(t,e,p,n);return p.addChild(t),t},this.xit=function(){var t=this.it.apply(this,arguments);return t.pend(),t},this.fit=function(){var t=this.it.apply(this,arguments);return k.push(t.id),N(),t},this.expect=function(t){if(r())return r().expect(t);throw new Error("'expect' was used when there was no current spec, this could be because an asynchronous test timed out")},this.beforeEach=function(t,e){p.beforeEach({fn:t,timeout:function(){return e||I.DEFAULT_TIMEOUT_INTERVAL}})},this.beforeAll=function(t,e){p.beforeAll({fn:t,timeout:function(){return e||I.DEFAULT_TIMEOUT_INTERVAL}})},this.afterEach=function(t,e){p.afterEach({fn:t,timeout:function(){return e||I.DEFAULT_TIMEOUT_INTERVAL}})},this.afterAll=function(t,e){p.afterAll({fn:t,timeout:function(){return e||I.DEFAULT_TIMEOUT_INTERVAL}})},this.pending=function(){throw I.Spec.pendingSpecExceptionMessage},this.fail=function(t){var e="Failed";t&&(e=e+": "+(t.message||t)),r().addExpectationResult(!1,{matcherName:"",passed:!1,expected:"",actual:"",message:e})}}},getJasmineRequireObj().JsApiReporter=function(){var s={start:function(){},elapsed:function(){return 0}};return function(t){var e,n=t.timer||s,r="loaded",i=(this.started=!1,this.finished=!1,this.jasmineStarted=function(){this.started=!0,r="started",n.start()},this.jasmineDone=function(){this.finished=!0,e=n.elapsed(),r="done"},this.status=function(){return r},[]),o={},u=(this.suiteStarted=function(t){o[t.id]=t},this.suiteDone=function(t){i.push(t=t),o[t.id]=t},this.suiteResults=function(t,e){return i.slice(t,t+e)},this.suites=function(){return o},[]);this.specDone=function(t){u.push(t)},this.specResults=function(t,e){return u.slice(t,t+e)},this.specs=function(){return u},this.executionTime=function(){return e}}},getJasmineRequireObj().Any=function(){function t(t){this.expectedObject=t}return t.prototype.jasmineMatches=function(t){return this.expectedObject==String?"string"==typeof t||t instanceof String:this.expectedObject==Number?"number"==typeof t||t instanceof Number:this.expectedObject==Function?"function"==typeof t||t instanceof Function:this.expectedObject==Object?"object"==typeof t:this.expectedObject==Boolean?"boolean"==typeof t:t instanceof this.expectedObject},t.prototype.jasmineToString=function(){return"<jasmine.any("+this.expectedObject+")>"},t},getJasmineRequireObj().CallTracker=function(){return function(){var n=[];this.track=function(t){n.push(t)},this.any=function(){return!!n.length},this.count=function(){return n.length},this.argsFor=function(t){t=n[t];return t?t.args:[]},this.all=function(){return n},this.allArgs=function(){for(var t=[],e=0;e<n.length;e++)t.push(n[e].args);return t},this.first=function(){return n[0]},this.mostRecent=function(){return n[n.length-1]},this.reset=function(){n=[]}}},getJasmineRequireObj().Clock=function(){return function(r,n,e){var i,t=this,o={setTimeout:r.setTimeout,clearTimeout:r.clearTimeout,setInterval:r.setInterval,clearInterval:r.clearInterval},u={setTimeout:function(t,e){return n.scheduleFunction(t,e,l(arguments,2))},clearTimeout:function(t){return n.removeFunctionWithId(t)},setInterval:function(t,e){return n.scheduleFunction(t,e,l(arguments,2),!0)},clearInterval:function(t){return n.removeFunctionWithId(t)}},s=!1;return t.install=function(){return c(r,u),i=u,s=!0,t},t.uninstall=function(){n.reset(),e.uninstall(),c(r,o),i=o,s=!1},t.mockDate=function(t){e.install(t)},t.setTimeout=function(t,e,n){if(a()){if(2<arguments.length)throw new Error("IE < 9 cannot support extra params to setTimeout without a polyfill");return i.setTimeout(t,e)}return Function.prototype.apply.apply(i.setTimeout,[r,arguments])},t.setInterval=function(t,e,n){if(a()){if(2<arguments.length)throw new Error("IE < 9 cannot support extra params to setInterval without a polyfill");return i.setInterval(t,e)}return Function.prototype.apply.apply(i.setInterval,[r,arguments])},t.clearTimeout=function(t){return Function.prototype.call.apply(i.clearTimeout,[r,t])},t.clearInterval=function(t){return Function.prototype.call.apply(i.clearInterval,[r,t])},t.tick=function(t){if(!s)throw new Error("Mock clock is not installed, use jasmine.clock().install()");e.tick(t),n.tick(t)},t;function a(){return!(o.setTimeout||o.setInterval).apply}function c(t,e){for(var n in e)t[n]=e[n]}function l(t,e){return Array.prototype.slice.call(t,e)}}},getJasmineRequireObj().DelayedFunctionScheduler=function(){function DelayedFunctionScheduler(){var self=this,scheduledLookup=[],scheduledFunctions={},currentTime=0,delayedFnCount=0;return self.tick=function(t){t=currentTime+(t=t||0);runScheduledFunctions(t),currentTime=t},self.scheduleFunction=function(funcToCall,millis,params,recurring,timeoutKey,runAtMillis){var f,f="string"==typeof funcToCall?function(){return eval(funcToCall)}:funcToCall,funcToSchedule=(millis=millis||0,timeoutKey=timeoutKey||++delayedFnCount,runAtMillis=runAtMillis||currentTime+millis,{runAtMillis:runAtMillis,funcToCall:f,recurring:recurring,params:params,timeoutKey:timeoutKey,millis:millis});return runAtMillis in scheduledFunctions?scheduledFunctions[runAtMillis].push(funcToSchedule):(scheduledFunctions[runAtMillis]=[funcToSchedule],scheduledLookup.push(runAtMillis),scheduledLookup.sort(function(t,e){return t-e})),timeoutKey},self.removeFunctionWithId=function(e){for(var t in scheduledFunctions){var n=scheduledFunctions[t],r=indexOfFirstToPass(n,function(t){return t.timeoutKey===e});if(-1<r){1===n.length?(delete scheduledFunctions[t],deleteFromLookup(t)):n.splice(r,1);break}}},self.reset=function(){scheduledLookup=[],scheduledFunctions={},delayedFnCount=currentTime=0},self;function indexOfFirstToPass(t,e){for(var n=-1,r=0;r<t.length;++r)if(e(t[r])){n=r;break}return n}function deleteFromLookup(t){var e=Number(t),t=indexOfFirstToPass(scheduledLookup,function(t){return t===e});-1<t&&scheduledLookup.splice(t,1)}function reschedule(t){self.scheduleFunction(t.funcToCall,t.millis,t.params,!0,t.timeoutKey,t.runAtMillis+t.millis)}function runScheduledFunctions(t){if(!(0===scheduledLookup.length||scheduledLookup[0]>t))do{currentTime=scheduledLookup.shift();var e=scheduledFunctions[currentTime];delete scheduledFunctions[currentTime];for(var n=0;n<e.length;++n){var r=e[n];r.recurring&&reschedule(r),r.funcToCall.apply(null,r.params||[])}}while(0<scheduledLookup.length&&currentTime!==t&&scheduledLookup[0]<=t)}}return DelayedFunctionScheduler},getJasmineRequireObj().ExceptionFormatter=function(){return function(){this.message=function(t){var e="";return t.name&&t.message?e+=t.name+": "+t.message:e+=t.toString()+" thrown",(t.fileName||t.sourceURL)&&(e+=" in "+(t.fileName||t.sourceURL)),(t.line||t.lineNumber)&&(e+=" (line "+(t.line||t.lineNumber)+")"),e},this.stack=function(t){return t?t.stack:null}}},getJasmineRequireObj().Expectation=function(){function i(t){this.util=t.util||{buildFailureMessage:function(){}},this.customEqualityTesters=t.customEqualityTesters||[],this.actual=t.actual,this.addExpectationResult=t.addExpectationResult||function(){},this.isNot=t.isNot;var e,n=t.customMatchers||{};for(e in n)this[e]=i.prototype.wrapCompare(e,n[e])}return i.prototype.wrapCompare=function(o,u){return function(){var e=Array.prototype.slice.call(arguments,0),t=e.slice(0),n="",r=(e.unshift(this.actual),u(this.util,this.customEqualityTesters)),i=r.compare;i=(i=this.isNot?r.negativeCompare||function(){var t=r.compare.apply(null,e);return t.pass=!t.pass,t}:i).apply(null,e);i.pass||(n=i.message?"[object Function]"===Object.prototype.toString.apply(i.message)?i.message():i.message:(e.unshift(this.isNot),e.unshift(o),this.util.buildFailureMessage.apply(null,e))),1==t.length&&(t=t[0]),this.addExpectationResult(i.pass,{matcherName:o,passed:i.pass,message:n,actual:this.actual,expected:t})}},i.addCoreMatchers=function(t){var e,n=i.prototype;for(e in t){var r=t[e];n[e]=n.wrapCompare(e,r)}},i.Factory=function(t){var e=new i(t=t||{});return t.isNot=!0,e.not=new i(t),e},i},getJasmineRequireObj().buildExpectationResult=function(){return function(t){var e=t.messageFormatter||function(){},n=t.stackFormatter||function(){},r={matcherName:t.matcherName,message:i(),stack:function(){if(t.passed)return"";var e=t.error;if(!e)try{throw new Error(i())}catch(t){e=t}return n(e)}(),passed:t.passed};return r.passed||(r.expected=t.expected,r.actual=t.actual),r;function i(){return t.passed?"Passed.":t.message||(t.error?e(t.error):"")}}},getJasmineRequireObj().MockDate=function(){return function(e){var n,t=this,r=0;return e&&e.Date?(n=e.Date,t.install=function(t){r=(t instanceof n?t:new n).getTime(),e.Date=i},t.tick=function(t){r+=t=t||0},t.uninstall=function(){r=0,e.Date=n},i.prototype=n.prototype,i.now=function(){if(n.now)return r;throw new Error("Browser does not support Date.now()")},i.toSource=n.toSource,i.toString=n.toString,i.parse=n.parse,i.UTC=n.UTC):(t.install=function(){},t.tick=function(){},t.uninstall=function(){}),t;function i(){switch(arguments.length){case 0:return new n(r);case 1:return new n(arguments[0]);case 2:return new n(arguments[0],arguments[1]);case 3:return new n(arguments[0],arguments[1],arguments[2]);case 4:return new n(arguments[0],arguments[1],arguments[2],arguments[3]);case 5:return new n(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);case 6:return new n(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);case 7:return new n(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6])}}}},getJasmineRequireObj().ObjectContaining=function(o){function t(t){this.sample=t}return t.prototype.jasmineMatches=function(t,e,n){if("object"!=typeof this.sample)throw new Error("You must provide an object to objectContaining, not '"+this.sample+"'.");e=e||[],n=n||[];function r(t,e){return null!==t&&!o.util.isUndefined(t[e])}for(var i in this.sample)!r(t,i)&&r(this.sample,i)?e.push("expected has key '"+i+"', but missing from actual."):o.matchersUtil.equals(t[i],this.sample[i])||n.push("'"+i+"' was '"+(t[i]&&o.util.htmlEscape(t[i].toString()))+"' in actual, but was '"+(this.sample[i]&&o.util.htmlEscape(this.sample[i].toString()))+"' in expected.");return 0===e.length&&0===n.length},t.prototype.jasmineToString=function(){return"<jasmine.objectContaining("+o.pp(this.sample)+")>"},t},getJasmineRequireObj().pp=function(o){function t(){this.ppNestLevel_=0,this.seen=[]}function n(){t.call(this),this.string=""}return t.prototype.format=function(t){this.ppNestLevel_++;try{o.util.isUndefined(t)?this.emitScalar("undefined"):null===t?this.emitScalar("null"):0===t&&1/t==-1/0?this.emitScalar("-0"):t===o.getGlobal()?this.emitScalar("<global>"):t.jasmineToString?this.emitScalar(t.jasmineToString()):"string"==typeof t?this.emitString(t):o.isSpy(t)?this.emitScalar("spy on "+t.and.identity()):t instanceof RegExp?this.emitScalar(t.toString()):"function"==typeof t?this.emitScalar("Function"):"number"==typeof t.nodeType?this.emitScalar("HTMLNode"):t instanceof Date?this.emitScalar("Date("+t+")"):o.util.arrayContains(this.seen,t)?this.emitScalar("<circular reference: "+(o.isArray_(t)?"Array":"Object")+">"):o.isArray_(t)||o.isA_("Object",t)?(this.seen.push(t),o.isArray_(t)?this.emitArray(t):this.emitObject(t),this.seen.pop()):this.emitScalar(t.toString())}finally{this.ppNestLevel_--}},t.prototype.iterateObject=function(t,e){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,!!t.__lookupGetter__&&!o.util.isUndefined(t.__lookupGetter__(n))&&null!==t.__lookupGetter__(n))},t.prototype.emitArray=o.unimplementedMethod_,t.prototype.emitObject=o.unimplementedMethod_,t.prototype.emitScalar=o.unimplementedMethod_,t.prototype.emitString=o.unimplementedMethod_,o.util.inherit(n,t),n.prototype.emitScalar=function(t){this.append(t)},n.prototype.emitString=function(t){this.append("'"+t+"'")},n.prototype.emitArray=function(t){if(this.ppNestLevel_>o.MAX_PRETTY_PRINT_DEPTH)this.append("Array");else{var e=Math.min(t.length,o.MAX_PRETTY_PRINT_ARRAY_LENGTH);this.append("[ ");for(var n=0;n<e;n++)0<n&&this.append(", "),this.format(t[n]);t.length>e&&this.append(", ..."),this.append(" ]")}},n.prototype.emitObject=function(n){var r,i;this.ppNestLevel_>o.MAX_PRETTY_PRINT_DEPTH?this.append("Object"):((r=this).append("{ "),i=!0,this.iterateObject(n,function(t,e){i?i=!1:r.append(", "),r.append(t),r.append(": "),e?r.append("<getter>"):r.format(n[t])}),this.append(" }"))},n.prototype.append=function(t){this.string+=t},function(t){var e=new n;return e.format(t),e.string}},getJasmineRequireObj().QueueRunner=function(p){function t(t){this.queueableFns=t.queueableFns||[],this.onComplete=t.onComplete||function(){},this.clearStack=t.clearStack||function(t){t()},this.onException=t.onException||function(){},this.catchException=t.catchException||function(){return!0},this.userContext=t.userContext||{},this.timer=t.timeout||{setTimeout:setTimeout,clearTimeout:clearTimeout},this.fail=t.fail||function(){}}return t.prototype.execute=function(){this.run(this.queueableFns,0)},t.prototype.run=function(t,e){for(var n=t.length,r=this,i=e;i<n;i++){var o=t[i];if(0<o.fn.length){var u,s=o,a=function(t){var e=!1;return function(){e||(e=!0,t())}}(function(){Function.prototype.apply.apply(r.timer.clearTimeout,[p.getGlobal(),[u]]),r.run(t,i+1)});a.fail=function(){r.fail.apply(null,arguments),a()},s.timeout&&(u=Function.prototype.apply.apply(r.timer.setTimeout,[p.getGlobal(),[function(){c(new Error("Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.")),a()},s.timeout()]]));try{s.fn.call(r.userContext,a)}catch(t){l(t),a()}return}s=void 0;s=o;try{s.fn.call(r.userContext)}catch(t){l(t)}}function c(t){r.onException(t)}function l(t){if(c(t),!r.catchException(t))throw t}n<=i&&this.clearStack(this.onComplete)},t},getJasmineRequireObj().ReportDispatcher=function(){return function(t){for(var e=t||[],n=0;n<e.length;n++){var r=e[n];this[r]=function(i){return function(){for(var t=i,e=arguments,n=0;n<o.length;n++){var r=o[n];r[t]&&r[t].apply(r,e)}}}(r)}var o=[];return this.addReporter=function(t){o.push(t)},this}},getJasmineRequireObj().SpyRegistry=function(i){return function(t){var r=(t=t||{}).currentSpies||function(){return[]};this.spyOn=function(t,e){if(i.util.isUndefined(t))throw new Error("spyOn could not find an object to spy upon for "+e+"()");if(i.util.isUndefined(t[e]))throw new Error(e+"() method does not exist");if(t[e]&&i.isSpy(t[e]))throw new Error(e+" has already been spied upon");var n=i.createSpy(e,t[e]);return r().push({spy:n,baseObj:t,methodName:e,originalValue:t[e]}),t[e]=n},this.clearSpies=function(){for(var t=r(),e=0;e<t.length;e++){var n=t[e];n.baseObj[n.methodName]=n.originalValue}}}},getJasmineRequireObj().SpyStrategy=function(){return function(t){var e=(t=t||{}).name||"unknown",n=t.fn||function(){},r=t.getSpy||function(){},i=function(){};this.identity=function(){return e},this.exec=function(){return i.apply(this,arguments)},this.callThrough=function(){return i=n,r()},this.returnValue=function(t){return i=function(){return t},r()},this.returnValues=function(){var t=Array.prototype.slice.call(arguments);return i=function(){return t.shift()},r()},this.throwError=function(t){var e=t instanceof Error?t:new Error(t);return i=function(){throw e},r()},this.callFake=function(t){return i=t,r()},this.stub=function(t){return i=function(){},r()}}},getJasmineRequireObj().Suite=function(){function t(t){this.env=t.env,this.id=t.id,this.parentSuite=t.parentSuite,this.description=t.description,this.onStart=t.onStart||function(){},this.resultCallback=t.resultCallback||function(){},this.clearStack=t.clearStack||function(t){t()},this.expectationFactory=t.expectationFactory,this.expectationResultFactory=t.expectationResultFactory,this.beforeFns=[],this.afterFns=[],this.beforeAllFns=[],this.afterAllFns=[],this.queueRunner=t.queueRunner||function(){},this.disabled=!1,this.children=[],this.result={id:this.id,description:this.description,fullName:this.getFullName(),failedExpectations:[]}}function n(t){return t&&t[0].result.status}function e(t){var e,n={};for(e in t)t.hasOwnProperty(e)&&(n[e]=t[e]);return n}return t.prototype.expect=function(t){return this.expectationFactory(t,this)},t.prototype.getFullName=function(){for(var t=this.description,e=this.parentSuite;e;e=e.parentSuite)e.parentSuite&&(t=e.description+" "+t);return t},t.prototype.disable=function(){this.disabled=!0},t.prototype.beforeEach=function(t){this.beforeFns.unshift(t)},t.prototype.beforeAll=function(t){this.beforeAllFns.push(t)},t.prototype.afterEach=function(t){this.afterFns.unshift(t)},t.prototype.afterAll=function(t){this.afterAllFns.push(t)},t.prototype.addChild=function(t){this.children.push(t)},t.prototype.status=function(){return this.disabled?"disabled":0<this.result.failedExpectations.length?"failed":"finished"},t.prototype.execute=function(t){var e=this;if(this.onStart(this),this.disabled)i();else{for(var n=[],r=0;r<this.children.length;r++)n.push(function(e){return{fn:function(t){e.execute(t)}}}(this.children[r]));this.isExecutable()&&(n=(n=this.beforeAllFns.concat(n)).concat(this.afterAllFns)),this.queueRunner({queueableFns:n,onComplete:i,userContext:this.sharedUserContext(),onException:function(){e.onException.apply(e,arguments)}})}function i(){e.result.status=e.status(),e.resultCallback(e.result),t&&t()}},t.prototype.isExecutable=function(){for(var t=!1,e=0;e<this.children.length;e++)if(this.children[e].isExecutable()){t=!0;break}return t},t.prototype.sharedUserContext=function(){return this.sharedContext||(this.sharedContext=this.parentSuite?e(this.parentSuite.sharedUserContext()):{}),this.sharedContext},t.prototype.clonedSharedUserContext=function(){return e(this.sharedUserContext())},t.prototype.onException=function(){if(n(this.children))this.result.failedExpectations.push(this.expectationResultFactory({matcherName:"",passed:!1,expected:"",actual:"",error:arguments[0]}));else for(var t=0;t<this.children.length;t++){var e=this.children[t];e.onException.apply(e,arguments)}},t.prototype.addExpectationResult=function(){if(n(this.children)&&!arguments[0])this.result.failedExpectations.push(this.expectationResultFactory(arguments[1]));else for(var t=0;t<this.children.length;t++){var e=this.children[t];e.addExpectationResult.apply(e,arguments)}},t},null==typeof window&&"object"==typeof exports&&(exports.Suite=jasmineRequire.Suite),getJasmineRequireObj().Timer=function(){function r(){return(new t).getTime()}var t;t=Date;return function(t){var e,n=(t=t||{}).now||r;this.start=function(){e=n()},this.elapsed=function(){return n()-e}}},getJasmineRequireObj().matchersUtil=function(m){return{equals:function(t,e,n){return y(t,e,[],[],n=n||[])},contains:function(t,e,n){if(n=n||[],"[object Array]"===Object.prototype.toString.apply(t)||t&&!t.indexOf){for(var r=0;r<t.length;r++)if(y(t[r],e,[],[],n))return!0;return!1}return!!t&&0<=t.indexOf(e)},buildFailureMessage:function(){var t=Array.prototype.slice.call(arguments,0),e=t[0],n=t[1],r=t[2],i=t.slice(3),t=e.replace(/[A-Z]/g,function(t){return" "+t.toLowerCase()}),o="Expected "+m.pp(r)+(n?" not ":" ")+t;if(0<i.length)for(var u=0;u<i.length;u++)0<u&&(o+=","),o+=" "+m.pp(i[u]);return o+"."}};function y(t,e,n,r,i){for(var o=!0,u=0;u<i.length;u++){var s=i[u](t,e);if(!m.util.isUndefined(s))return s}if(t instanceof m.Any&&(o=t.jasmineMatches(e)))return!0;if(e instanceof m.Any&&(o=e.jasmineMatches(t)))return!0;if(e instanceof m.ObjectContaining&&(o=e.jasmineMatches(t)))return!0;if(t instanceof Error&&e instanceof Error)return t.message==e.message;if(t===e)return 0!==t||1/t==1/e;if(null===t||null===e)return t===e;var a=Object.prototype.toString.call(t);if(a!=Object.prototype.toString.call(e))return!1;switch(a){case"[object String]":return t==String(e);case"[object Number]":return t!=+t?e!=+e:0===t?1/t==1/e:t==+e;case"[object Date]":case"[object Boolean]":return+t==+e;case"[object RegExp]":return t.source==e.source&&t.global==e.global&&t.multiline==e.multiline&&t.ignoreCase==e.ignoreCase}if("object"!=typeof t||"object"!=typeof e)return!1;for(var c=n.length;c--;)if(n[c]==t)return r[c]==e;n.push(t),r.push(e);var l=0;if("[object Array]"==a){if(o=(l=t.length)==e.length)for(;l--&&(o=y(t[l],e[l],n,r,i)););}else{var p,a=t.constructor,f=e.constructor;if(a!==f&&!(d(a)&&a instanceof a&&d(f)&&f instanceof f))return!1;for(p in t)if(h(t,p)&&(l++,!(o=h(e,p)&&y(t[p],e[p],n,r,i))))break;if(o){for(p in e)if(h(e,p)&&!l--)break;o=!l}}return n.pop(),r.pop(),o;function h(t,e){return t.hasOwnProperty(e)}function d(t){return"function"==typeof t}}},getJasmineRequireObj().toBe=function(){return function(){return{compare:function(t,e){return{pass:t===e}}}}},getJasmineRequireObj().toBeCloseTo=function(){return function(){return{compare:function(t,e,n){return 0!==n&&(n=n||2),{pass:Math.abs(e-t)<Math.pow(10,-n)/2}}}}},getJasmineRequireObj().toBeDefined=function(){return function(){return{compare:function(t){return{pass:void 0!==t}}}}},getJasmineRequireObj().toBeFalsy=function(){return function(){return{compare:function(t){return{pass:!t}}}}},getJasmineRequireObj().toBeGreaterThan=function(){return function(){return{compare:function(t,e){return{pass:e<t}}}}},getJasmineRequireObj().toBeLessThan=function(){return function(){return{compare:function(t,e){return{pass:t<e}}}}},getJasmineRequireObj().toBeNaN=function(n){return function(){return{compare:function(t){var e={pass:t!=t};return e.message=e.pass?"Expected actual not to be NaN.":function(){return"Expected "+n.pp(t)+" to be NaN."},e}}}},getJasmineRequireObj().toBeNull=function(){return function(){return{compare:function(t){return{pass:null===t}}}}},getJasmineRequireObj().toBeTruthy=function(){return function(){return{compare:function(t){return{pass:!!t}}}}},getJasmineRequireObj().toBeUndefined=function(){return function(){return{compare:function(t){return{pass:void 0===t}}}}},getJasmineRequireObj().toContain=function(){return function(n,r){return r=r||[],{compare:function(t,e){return{pass:n.contains(t,e,r)}}}}},getJasmineRequireObj().toEqual=function(){return function(r,i){return i=i||[],{compare:function(t,e){var n={pass:!1};return n.pass=r.equals(t,e,i),n}}}},getJasmineRequireObj().toHaveBeenCalled=function(n){return function(){return{compare:function(t){var e={};if(!n.isSpy(t))throw new Error("Expected a spy, but got "+n.pp(t)+".");if(1<arguments.length)throw new Error("toHaveBeenCalled does not take arguments, use toHaveBeenCalledWith");return e.pass=t.calls.any(),e.message=e.pass?"Expected spy "+t.and.identity()+" not to have been called.":"Expected spy "+t.and.identity()+" to have been called.",e}}}},getJasmineRequireObj().toHaveBeenCalledWith=function(o){return function(r,i){return{compare:function(){var t=Array.prototype.slice.call(arguments,0),e=t[0],n=t.slice(1),t={pass:!1};if(o.isSpy(e))return e.calls.any()?r.contains(e.calls.allArgs(),n,i)?(t.pass=!0,t.message=function(){return"Expected spy "+e.and.identity()+" not to have been called with "+o.pp(n)+" but it was."}):t.message=function(){return"Expected spy "+e.and.identity()+" to have been called with "+o.pp(n)+" but actual calls were "+o.pp(e.calls.allArgs()).replace(/^\[ | \]$/g,"")+"."}:t.message=function(){return"Expected spy "+e.and.identity()+" to have been called with "+o.pp(n)+" but it was never called."},t;throw new Error("Expected a spy, but got "+o.pp(e)+".")}}}},getJasmineRequireObj().toMatch=function(){return function(){return{compare:function(t,e){return{pass:new RegExp(e).test(t)}}}}},getJasmineRequireObj().toThrow=function(u){return function(o){return{compare:function(t,e){var n,r={pass:!1},i=!1;if("function"!=typeof t)throw new Error("Actual is not a Function");try{t()}catch(t){i=!0,n=t}return i?1==arguments.length?(r.pass=!0,r.message=function(){return"Expected function not to throw, but it threw "+u.pp(n)+"."}):o.equals(n,e)?(r.pass=!0,r.message=function(){return"Expected function not to throw "+u.pp(e)+"."}):r.message=function(){return"Expected function to throw "+u.pp(e)+", but it threw "+u.pp(n)+"."}:r.message="Expected function to throw an exception.",r}}}},getJasmineRequireObj().toThrowError=function(a){return function(t){return{compare:function(t){var e,n=!1,r={pass:!0},i={pass:!1};if("function"!=typeof t)throw new Error("Actual is not a Function");var o=function(){var n=null,r=null;if(2==arguments.length)s(n=arguments[1])&&(r=n,n=null);else if(2<arguments.length&&(r=arguments[1],n=arguments[2],!s(r)))throw new Error("Expected error type is not an Error.");if(n&&!function(t){return t instanceof RegExp||"string"==typeof t}(n))throw r?new Error("Expected error message is not a string or RegExp."):new Error("Expected is not an Error, string, or RegExp.");return{errorTypeDescription:r?u(r):"an exception",thrownDescription:function(t){var e="";return(r?u(t.constructor):"an exception")+(e=n?" with message "+a.pp(t.message):e)},messageDescription:function(){return null===n?"":n instanceof RegExp?" with a message matching "+a.pp(n):" with message "+a.pp(n)},hasNoSpecifics:function(){return null===n&&null===r},matches:function(t){return(null===r||t.constructor===r)&&(null===n||(t=t.message,"string"==typeof n?n==t:n.test(t)))}}}.apply(null,arguments);try{t()}catch(t){n=!0,e=t}return n?e instanceof Error?o.hasNoSpecifics()?(r.message="Expected function not to throw an Error, but it threw "+u(e)+".",r):o.matches(e)?(r.message=function(){return"Expected function not to throw "+o.errorTypeDescription+o.messageDescription()+"."},r):(i.message=function(){return"Expected function to throw "+o.errorTypeDescription+o.messageDescription()+", but it threw "+o.thrownDescription(e)+"."},i):(i.message=function(){return"Expected function to throw an Error, but it threw "+a.pp(e)+"."},i):(i.message="Expected function to throw an Error.",i)}};function u(t){return t.name||t.toString().match(/^\s*function\s*(\w*)\s*\(/)[1]}function s(t){var e;if("function"==typeof t)return(e=function(){}).prototype=t.prototype,new e instanceof Error}}},getJasmineRequireObj().interface=function(t,n){var e={describe:function(t,e){return n.describe(t,e)},xdescribe:function(t,e){return n.xdescribe(t,e)},fdescribe:function(t,e){return n.fdescribe(t,e)},it:function(t,e){return n.it(t,e)},xit:function(t,e){return n.xit(t,e)},fit:function(t,e){return n.fit(t,e)},beforeEach:function(t){return n.beforeEach(t)},afterEach:function(t){return n.afterEach(t)},beforeAll:function(t){return n.beforeAll(t)},afterAll:function(t){return n.afterAll(t)},expect:function(t){return n.expect(t)},pending:function(){return n.pending()},fail:function(){return n.fail.apply(n,arguments)},spyOn:function(t,e){return n.spyOn(t,e)},jsApiReporter:new t.JsApiReporter({timer:new t.Timer}),jasmine:t};return t.addCustomEqualityTester=function(t){n.addCustomEqualityTester(t)},t.addMatchers=function(t){return n.addMatchers(t)},t.clock=function(){return n.clock},e},getJasmineRequireObj().version=function(){return"2.1.3"};