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
var Q=require("q"),path=require("path"),tracer=global.$_$tracer,tracerUtils=tracer._utils,Runner,Test,runner,errorFormatter,format,improperUsage,onBeforeTest,onAfterTest;const vm=require("vm"),url=require("url"),runtimeSupportsVmModules="function"==typeof vm.SyntheticModule;function getAbsoluteImportRoot(){var e=require("module"),t=new e(".",null),a=path.dirname(global.wallaby._localNodeModules),a=(t.filename=path.join(a,"wallaby.js"),t.paths=e._nodeModulePaths(a),e._resolveFilename("ava",t,!1));if(a.endsWith(`${path.sep}ava${path.sep}entrypoints${path.sep}main.mjs`)||a.endsWith(`${path.sep}ava${path.sep}entrypoints${path.sep}main.cjs`))return a.substring(0,a.length-`${path.sep}ava${path.sep}entrypoints${path.sep}main.mjs`.length)}tracerUtils.patchModulesCode([{files:["ava/lib/snapshot-manager.js"],replacements:[{from:"function resolveSourceFile(file) {",to:`function resolveSourceFile(file) {
          if (global.$_$testFiles) {
            const metadata = global.$_$testFiles.find(m => m.path === file);
            if (metadata && metadata.type && metadata.originalType && metadata.type !== metadata.originalType) {			
              return file.substring(0, file.length - metadata.type.length) + metadata.originalType;
            }
          }
        `},{from:"const resolveSourceFile = mem(file => {",to:`const resolveSourceFile = mem(file => {
          if (global.$_$testFiles) {
            const metadata = global.$_$testFiles.find(m => m.path === file);
            if (metadata && metadata.type && metadata.originalType && metadata.type !== metadata.originalType) {			
              return file.substring(0, file.length - metadata.type.length) + metadata.originalType;
            }
          }
        `}]}]);try{var absoluteImportRoot=getAbsoluteImportRoot()}catch(e){}async function avaRequire(modulePath){absoluteImportRoot&&(modulePath=path.join(absoluteImportRoot,modulePath)+".js");let module;try{module=require(modulePath)}catch(e){if("ERR_REQUIRE_ESM"===e.code){const moduleUrl=url.pathToFileURL(modulePath);module=await eval("import(moduleUrl)"),module.default&&(Object.keys(module).forEach(e=>{module.default[e]=module[e]}),module=module.default)}}return{path:modulePath,module:module}}var testFiles=[],options={},initialized=!1,avaInstalled=!1,util=require("util"),truncate=function(e,t){return"string"!=typeof e||e.length<t?e:e.slice(0,t)},getMessage=function(e){return truncate(util.inspect(e.actual),128)+" "+e.operator+" "+truncate(util.inspect(e.expected),128)};tracer.start(async function(){if(!initialized)try{initialized=!0;var nodeFs=require("fs"),originalRenameSync=nodeFs.renameSync,Module=(originalRenameSync.alreadyReplaced||(tracer.writeFileAtomicDone=async function(t,e){var e=await e,a=path.extname(t);if((".snap"===a||".md"===a)&&0===t.indexOf(global.wallaby.projectCacheDir)){var r=require("fs-extra"),n=path.join(global.wallaby.localProjectDir,path.relative(global.wallaby.projectCacheDir,t));if(n){r.ensureDirSync(path.dirname(n));const o=n.substring(0,n.length-a.length);!nodeFs.existsSync(o)&&(r=nodeFs.readdirSync(path.dirname(t)).find(e=>e.startsWith(o)&&e!==t))?nodeFs.writeFileSync(r+a,nodeFs.readFileSync(t)):nodeFs.writeFileSync(n,nodeFs.readFileSync(t))}}return e},nodeFs.renameSync=function(e,t){var a,r,n=originalRenameSync.apply(this,arguments);return(".snap"===path.extname(t)||".md"===path.extname(t))&&0===t.indexOf(global.wallaby.projectCacheDir)&&(a=require("fs-extra"),r=path.join(global.wallaby.localProjectDir,path.relative(global.wallaby.projectCacheDir,t)))&&(a.ensureDirSync(path.dirname(r)),nodeFs.writeFileSync(r,nodeFs.readFileSync(t))),n},nodeFs.renameSync.alreadyReplaced=!0),require("module").Module),modulePrototype=Module.prototype,originalRequire=modulePrototype.require,originalLoad=Module._load,changeTestMetadata=(Module._load=function(e,t,a){var r;return~tracerUtils.normalizePath(e).indexOf("ava/lib/worker/main.cjs")?((r=runner.test||runner.chain.test||runner.chain).default||(r.default=r),r.test=r):originalLoad.call(this,e,t,a)},modulePrototype.require=function(e){var a,t;return"ava"===e?((t=runner.test||runner.chain.test||runner.chain).default||(t.default=t),t.test=t):"empower-core"===e?(a=originalRequire.call(this,e),(t=function(){var t=arguments[1].onError;return arguments[1].onError=function(e){return e.originalMessage=e.error.message+"\n",t.apply(this,arguments)},a.apply(this,arguments)}).defaultOptions=a.defaultOptions,t):originalRequire.call(this,e)},function(e){e.metadata.serial=!0,e.metadata._ignored="test"===e.metadata.type&&tracer.hasSpecFilter()&&!tracer.specFilter([e.title]),e.metadata._testFile=tracer.entryFile(),e.metadata._ignored&&(e.metadata.skipped=!0)});try{(await avaRequire("ava/lib/worker/options")).set({}).module}catch(e){}try{var createChainReq=await avaRequire("ava/lib/worker/create-chain-req"),originalCreateChain=createChainReq.module;require.cache[require.resolve(createChainReq.path)].exports=function(){var a=arguments[0];return arguments[0]=function(e,t){return changeTestMetadata({metadata:e,title:"string"==typeof t[0]?t[0]:void 0}),a.apply(this,arguments)},originalCreateChain.apply(this,arguments)}}catch(e){}try{(await avaRequire("ava/lib/chalk")).module.set({enabled:!1}).module}catch(e){}try{improperUsage=(await avaRequire("ava/lib/reporters/improper-usage-messages")).module}catch(e){}var originalObjectDefineProperty=Object.defineProperty;Object.defineProperty=function(e,t,a){return"AssertionError"===t&&(a.writable=!0),originalObjectDefineProperty.apply(this,arguments)},(await avaRequire("ava/lib/assert")).module,Runner=(await avaRequire("ava/lib/runner")).module,Object.defineProperty=originalObjectDefineProperty;try{errorFormatter=(await avaRequire("ava/lib/enhance-assert")).module.formatter;try{errorFormatter()&&(errorFormatter=errorFormatter())}catch(e){}}catch(e){errorFormatter=null}Test=(await avaRequire("ava/lib/test")).module;var originalTestRun=Test.prototype.run;Test.prototype.run=function(){onBeforeTest(this);try{tracer.specSyncStart();var e=originalTestRun.apply(this,arguments);return e.then&&e.then(function(e){return onAfterTest(e),e}),e}finally{tracer.specSyncEnd()}},avaInstalled=!0}catch(e){e&&e.stack&&tracer.reportGlobalError(e.stack)}var sessionId,runComplete,otherSession,completeRun,isHook,specId,runnerPromise;avaInstalled?(sessionId=global.$_$session,runComplete=!1,otherSession=function(){return sessionId!==global.$_$session},completeRun=function(){runComplete||otherSession()||(runComplete=!0,tracer.complete())},isHook=function(e){return"test"!==e.metadata.type},specId=tracer.initialSpecId(),runnerPromise=(tracer.started({total:"unknown number of"}),Q.when(!0)),testFiles.forEach(function(file){runnerPromise=runnerPromise.then(async function(){try{(await avaRequire("ava/lib/globals")).module.options={file:file},delete(await avaRequire("ava/lib/snapshot-state")).module.state}catch(e){}runner=new Runner(Object.assign(Object.assign({},options),{file:file,projectDir:global.wallaby.projectCacheDir,recordNewSnapshots:!0,updateSnapshots:tracer.canUpdateSnapshots(),serial:!0})),tracer.avaRunner=runner,onBeforeTest=function(e){otherSession()||isHook(e)||(e.metadata._id=++specId,e.metadata._testFile=e.metadata._testFile||tracer.entryFile(),tracer.specStart(e.metadata._id,e.title,e.metadata&&e.metadata._testFile||void 0,e.title))},onAfterTest=function(e){var t,a,r,n,o;otherSession()||(o=e.passed,e=e.result||e,n=isHook(e),o&&n)||(t=e.metadata.skipped||e.metadata.todo,a=tracer.specEnd(),r=e.metadata.skipped?"skipped":e.metadata.todo?"todo":"executed",a={id:e.metadata._id,timeRange:a,name:e.title,suite:[],status:r,time:void 0===e.duration?0:e.duration,log:[],hook:n?e.metadata.type:void 0,testFile:e.metadata&&e.metadata._testFile||void 0},o||t||("Error thrown in test"===(r=e.assertError||e.error).message&&delete r.message,r.powerAssertContext&&errorFormatter&&(r.message=errorFormatter(r.powerAssertContext)),improperUsage&&(n=improperUsage.forError?improperUsage.forError(r):improperUsage(r))&&(r.message=(r.message||"")+"\n"+n),r.showDiff=!0,o={message:r.message,stack:r.stack},/^\s+$/.test(o.message)?o.message=getMessage(r):!o.message&&format?o.message=format.formatSerializedError(r):r.values&&r.values.length&&(o.message=(o.message?o.message+"\n":"")+r.values[0].formatted),r.raw&&(r.actual=r.raw.actual,r.expected=r.raw.expected),tracer.setAssertionData(r,o),a.log.push(o)),a.log.length||delete a.log,tracer.result(a))};try{if(runtimeSupportsVmModules){const fileUrl=url.pathToFileURL(file);fileUrl.href=`${fileUrl.href}?update=${+new Date}&wallaby=true`,await eval("import(fileUrl)")}else require(file);let isExclusiveTestRun=!1,ignoredTasks=[];if(runner.tasks.serial)for(const task of runner.tasks.serial)!isExclusiveTestRun&&(isExclusiveTestRun=task.metadata.exclusive,isExclusiveTestRun)||task.metadata.skipped&&ignoredTasks.push(task);if(isExclusiveTestRun)ignoredTasks=[];else if(runner.tasks.todo)for(const task of runner.tasks.todo)ignoredTasks.push(task);for(const task of ignoredTasks)task.metadata._ignored||(onBeforeTest(task),onAfterTest(task));var onFulfilled=async function(){runner.saveSnapshotState&&await runner.saveSnapshotState()};return Q.promise(function(t){runner.on("error",function(e){throw e}),runner.on("start",function(e){return t(e.ended.then(onFulfilled))}),runner.on("finish",async function(){return await onFulfilled(),t()}),runner.start(),runner.start=function(){}})}catch(e){return tracer.reportDeclarationError(e),Q.when(!0)}})}),runnerPromise.then(completeRun)):tracer.reportGlobalError("ava node module is not found or the version is not supported, missing `npm install ava --save-dev`?")}),module.exports={init:function(e){return testFiles=e,options}};