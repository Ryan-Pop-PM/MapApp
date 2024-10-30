import*as url from"url";import*as path from"path";import BuiltinModule from"module";import{pathToFileURL}from"url";const Module=BuiltinModule,originalSetTimeout=global.setTimeout;function addHook(e,t={}){let a=!1;const s=[],o=[];let r;const n=Module._extensions[".js"];t.matcher,t.ignoreNodeModules;return r=t.extensions||t.exts||t.extension||t.ext||[".js"],Array.isArray(r)||(r=[r]),r.forEach((t=>{if("string"!=typeof t)throw new TypeError(`Invalid Extension: ${t}`);const r=Module._extensions[t]||n;o[t]=Module._extensions[t],s[t]=Module._extensions[t]=function(t,s){let o;a||(o=t._compile,t._compile=function(a){t._compile=o;const r=e(a,s);if("string"!=typeof r)throw new Error(HOOK_RETURNED_NOTHING_ERROR_MESSAGE);return t._compile(r,s)}),r(t,s)}})),function(){a||(a=!0,r.forEach((e=>{Module._extensions[e]===s[e]&&(o[e]?Module._extensions[e]=o[e]:delete Module._extensions[e])})))}}const commonJsPatches=[{files:["pretty-format/build/index.js"],replacements:[{from:"options && options.highlight",to:"options && options.highlight && false",optional:!0}]},{files:["@testing-library/dom/dist/pretty-dom.js"],replacements:[{from:"highlight: inNode()",to:"highlight: false",optional:!0},{from:"highlight: shouldHighlight(),",to:"highlight: false,",optional:!0},{from:"const logDOM = (...args) =>",to:"const logDOM = (...args) => (console.log(prettyDOM(...args)), prettyDOM(...args));const logDOM_ = (...args) =>",optional:!0}]},{files:["@testing-library/react/dist/pure.js"],replacements:[{from:"el.forEach(e => console.log((0, _dom.prettyDOM)(e, maxLength, options)))",to:"el.map(e => (console.log((0, _dom.prettyDOM)(e, maxLength, options)), _dom.prettyDOM(e, maxLength, options)))",optional:!0},{from:"console.log((0, _dom.prettyDOM)(el, maxLength, options))",to:"(console.log((0, _dom.prettyDOM)(el, maxLength, options)), _dom.prettyDOM(el, maxLength, options))",optional:!0}]},{files:["@testing-library/react-native/build/helpers/format.js"],replacements:[{from:"highlight: true",to:"highlight: false",optional:!0}]},{files:["@testing-library/react-native/build/helpers/debugDeep.js"],replacements:[{from:"console.log((0, _format.default)(instance));",to:"return (console.log((0, _format.default)(instance)), _format.default(instance));",optional:!0}]}];commonJsPatches.forEach((e=>{e.files.forEach((t=>{addHook(((a,s)=>{const o=s.replace(/\\/g,"/");return o.endsWith(t)&&e.replacements.forEach((e=>{if(-1===a.indexOf(e.from)){if(!e.optional)throw new Error(`Failed to patch ${t} in ${o}`)}else a=a.replace(e.from,e.to)})),a}))}))}));const skippedTests=[],testsToRun=[];let currentSpecId,esmHooks,updatedTasks=!1;async function unhandledError(e){const t=global.$_$tracer;let a=!0;for(let s=0;s<testsToRun.length;s++){const o=testsToRun[s];if(o.wallabyStarted&&!o.wallabyProcessed){o.wallabyProcessed=!0,t.specSyncEnd();const s=t.specEnd(),r={id:o.wallabySpecId,timeRange:s,name:o.name,suite:o.wallabySuite,status:"executed",time:0,log:[],testFile:o.wallabyTestFileId};a=!1,r.log.push(t.setAssertionData(e,{message:e.message||"",stack:e.stack||"",passed:!1})),t.result(r)}}a&&await sendWorkerMessageToRunner("uncaughtException",e)}process.on("unhandledRejection",(async e=>{await unhandledError(e)})),process.on("uncaughtException",(async(e,t)=>{await unhandledError(e)}));const pendingMessages=[];let sending=!1,sentError=!1,inspectorSession;export async function sendWorkerMessageToRunner(e,t){let a;const s=new Promise((e=>{a=e}));if(pendingMessages.push({type:e,sessionId:global.$_$session,payload:t,done:a}),globalThis.__vitest_worker__&&globalThis.__vitest_worker__.rpc&&!sending){sending=!0;try{for(;pendingMessages.length;){const e=pendingMessages.shift();try{globalThis.__vitest_worker__.rpc.onWallabyWorkerMessage({type:e.type,sessionId:e.sessionId,payload:e.payload}).then(e.done)}catch(e){sentError||(sentError=!0,globalThis.__vitest_worker__.rpc.onWallabyWorkerMessage({type:"debugLog",sessionId:global.$_$session,payload:e.toString()}))}}}finally{sending=!1}}await s}export async function start(){const e=global.$_$tracer;if(currentSpecId=e.initialSpecId(),global.$_$profileRun){const e=await import("inspector");inspectorSession=new e.Session,inspectorSession.connect(),await new Promise((e=>{inspectorSession.post("Profiler.enable",(()=>{inspectorSession.post("Profiler.start",(()=>{e()}))}))}))}e.start()}export async function complete(){const e=global.$_$tracer;for(let t=0;t<testsToRun.length;t++){const a=testsToRun[t];if(!a.wallabyStarted){a.wallabyStarted=!0,a.wallabyProcessed=!0,e.specStart(a.wallabySpecId,a.name,a.wallabyTestFileId,[...a.wallabySuite,a.name]),e.specSyncEnd(),e.specSyncEnd();const t=e.specEnd(),s={id:a.wallabySpecId,timeRange:t,name:a.name,suite:a.wallabySuite,status:"executed",time:0,log:[],testFile:a.wallabyTestFileId};s.log.push(e.setAssertionData({},{message:"Test never executed, likely due to an uncaught exception",passed:!1})),e.result(s)}}e.complete(),inspectorSession&&await new Promise((e=>{inspectorSession.post("Profiler.stop",(async(t,{profile:a})=>{t?(await sendWorkerMessageToRunner("uncaughtException",t),process.exit(1)):await sendWorkerMessageToRunner("profile",a),e()}))})),updatedTasks||await sendWorkerMessageToRunner("uncaughtException",new Error("Wallaby did not detect that any vitest tasks were executed. This may indicate a problem with vitest dependency conflicts. Please ensure your vitest dependency versions match."));const t=await esmHooks.getErrorsAndWarnings();await sendWorkerMessageToRunner("complete",{esmWarnings:t.warnings}),delete global.$_$coverage,delete global.$_$tests,delete global.$_$session,delete global.$_$initialSpecId,delete global.$_$profileRun}function registerPatch(e,t){esmHooks.patchFile(e,t);const a=pathToFileURL(e);global.$_$patches[a.href]=global.$_$patches[a.href]||[],global.$_$patches[a.href].push(t)}global.$_$patches={};export async function initialize(ctx){if(Object.keys(ctx.wallabyContext.globals).forEach((e=>{global[e]=ctx.wallabyContext.globals[e]})),global.$_$reuseableTracer=!0,global.$_$receiver={send(e){sendWorkerMessageToRunner("receiverMessage",e)}},await import("../../../tracer.js"),esmHooks=await eval(`import('${url.pathToFileURL(ctx.wallabyContext.esmHooksPath)}')`),await esmHooks.registerHook(),ctx.config.deps.registerNodeLoader){const e=await import(url.pathToFileURL(ctx.wallabyContext.vitestDistLoader));esmHooks.setExternalLoad(e.load),esmHooks.setExternalResolve(e.resolve)}ctx.wallabyContext.externalModulesExecutorPath&&registerPatch(ctx.wallabyContext.externalModulesExecutorPath,[{from:'const source = readFileSync(path, "utf-8");',to:'const source = global.$_$wallabyVitest.patchReadFileSync(path, readFileSync(path, "utf-8"));'},{from:'const source = await promises.readFile(path, "utf-8");',to:'const source = await global.$_$wallabyVitest.patchReadFileAsync(path, promises.readFile(path, "utf-8"));'}]),ctx.wallabyContext.childFilePath&&registerPatch(ctx.wallabyContext.childFilePath,[{key:"processExit",from:"procesExit();",to:"await global.$_$wallabyVitest.processExit(); procesExit();"},{key:"run",from:"async function run(ctx) {",to:"async function run(ctx) { try { return await runInternal(ctx); } catch (e) { await global.$_$wallabyVitest.unhandledError(e); } } async function runInternal(ctx) {"}]),ctx.wallabyContext.vmFilePath&&registerPatch(ctx.wallabyContext.vmFilePath,[{key:"state",from:"context.__vitest_worker__ = state;",to:"context.__vitest_worker__ = state; globalThis.__vitest_worker__ = context.__vitest_worker__;"},{key:"state",from:"context.global = context;",to:"context.global = context; globalThis.__vitest_worker__ = context.__vitest_worker__;"}]),registerPatch(ctx.wallabyContext.viteNodeUtils,[{key:"fetchModule",from:"{ code: transformed, externalize } = await this.options.fetchModule(id);",to:"{ code: transformed, externalize } = global.$_$wallabyVitest.wrapFetchedModule(id, await this.options.fetchModule(id));"},{key:"fetchModule",from:"{ code: transformed, externalize } = await this.options.fetchModule(resolvedId || dep);",to:"{ code: transformed, externalize } = global.$_$wallabyVitest.wrapFetchedModule(resolvedId || dep, await this.options.fetchModule(id));"}]),registerPatch(ctx.wallabyContext.vendorEntryFilePath,[{from:"async function collectTests(paths, runner) {",to:"async function collectTests(paths, runner) { const result = await collectTestsPatched(paths, runner); global.$_$wallabyVitest.adjustFileTasks(result); return result; } async function collectTestsPatched(paths, runner) {"},{key:"updateTask",from:"function updateTask(task) {",to:"function updateTask(task) { global.$_$wallabyVitest.updateTask(task); "},{key:"updateTask",from:"function updateTask(task, runner) {",to:"function updateTask(task, runner) { global.$_$wallabyVitest.updateTask(task); "},{key:"getFn",from:"await getFn(test)();",to:"await global.$_$wallabyVitest.getFn(test); await getFn(test)();"},{key:"getFn",from:"const fn = getFn(test);",to:"await global.$_$wallabyVitest.getFn(test); const fn = getFn(test);"},{key:"runSuite",from:"await runSuite(file);",to:"global.$_$wallabyVitest.runSuite(file); await runSuite(file);"},{key:"runSuite",from:"await runSuite(file, runner);",to:"global.$_$wallabyVitest.runSuite(file); await runSuite(file, runner);"}]),registerPatch(ctx.wallabyContext.collectedFilePath,[{key:"collected",from:"rpc().onCollected(files);",to:"rpc().onCollected(files, global.$_$session);"},{key:"collected",from:"rpc().onCollected(files);",to:"rpc().onCollected(files, global.$_$session);"},{key:"collected",from:"(_b = runner.onCollected) == null ? void 0 : _b.call(runner, files)",to:"(_b = runner.onCollected) == null ? void 0 : _b.call(runner, files, global.$_$session)"}]),ctx.wallabyContext.utilsErrorsPath&&registerPatch(ctx.wallabyContext.utilsErrorsPath,[{from:"err.expected = stringify(err.expected, 10);",to:"err.expected = global.$_$wallabyVitest.inspect(err.expected);",warn:!0},{from:"err.actual = stringify(err.actual, 10);",to:"err.actual = global.$_$wallabyVitest.inspect(err.actual);",warn:!0}]),registerPatch(ctx.wallabyContext.snapshotStatePath,[{key:"inlineSnapshotSaved",from:'await promises.writeFile(file, transformed, "utf-8");',to:"global.$_$wallabyVitest.inlineSnapshotSaved(file, transformed)",warn:!0},{key:"inlineSnapshotSaved",from:"await environment.saveSnapshotFile(file, transformed);",to:"global.$_$wallabyVitest.inlineSnapshotSaved(file, transformed)",warn:!0},{from:'if (hasSnapshot && this._updateSnapshot === "all" || ',to:'global.$_$tracer._matchSnapshot({ key, snapshotPath: this.snapshotPath }); if (hasSnapshot && this._updateSnapshot === "all" || ',warn:!0},{from:"this._updateSnapshot = options.updateSnapshot;",to:"this._updateSnapshot = global.$_$wallabyVitest.updateSnapshot();",warn:!0},{from:'if (this._updateSnapshot === "all" && this._uncheckedKeys.size) {',to:'if ((global.$_$wallabyVitest.canUpdateSnapshot(this)) && this._updateSnapshot === "all" && this._uncheckedKeys.size) {',warn:!0},{from:"snapshot.unchecked = !status.deleted ? uncheckedCount : 0;",to:"snapshot.unchecked = !status.deleted ? this.getUncheckedCount() : 0;",warn:!0},{from:"snapshot.uncheckedKeys = Array.from(uncheckedKeys);",to:"snapshot.uncheckedKeys = Array.from(this.getUncheckedKeys());",warn:!0},{from:'if (hasSnapshot && this._updateSnapshot === "all" || (!hasSnapshot || !snapshotIsPersisted) && (this._updateSnapshot === "new" || this._updateSnapshot === "all")) {',to:'if ((global.$_$wallabyVitest.canUpdateSnapshot(this)) && ((hasSnapshot && this._updateSnapshot === "all" || (!hasSnapshot || !snapshotIsPersisted) && (this._updateSnapshot === "new" || this._updateSnapshot === "all")))) {',warn:!0},{from:"this.snapshotState = this.getSnapshotState(test);",to:"this.snapshotState = this.getSnapshotState(test); global.$_$wallabyVitest.getSnapshotState(this);",key:"getSnapshotState",warn:!0},{from:"this.snapshotState = this.getSnapshotState(filepath);",to:"this.snapshotState = this.getSnapshotState(filepath); global.$_$wallabyVitest.getSnapshotState(this);",key:"getSnapshotState",warn:!0}]),ctx.wallabyContext.vitestEnvironmentPath&&registerPatch(ctx.wallabyContext.vitestEnvironmentPath,[{from:"return dom.getInternalVMContext();",to:"global.$_$wallabyVitest.ensureDomGlobals(dom); return dom.getInternalVMContext();"}]),skippedTests.length=0,testsToRun.length=0;const tracer=global.$_$tracer;function normalizePath(e){return e?e.replace("win32"===process.platform?"file:///":"file://","").split(path.sep).join("/"):e}function getFileData(e){-1!==e.indexOf("?wallaby=")&&(e=e.substr(0,e.indexOf("?wallaby=")));const t=ctx.wallabyContext.normalizedLocalProjectDir,a=ctx.wallabyContext.normalizedProjectCacheDir;let s=normalizePath(e).replace(t,"").replace(a,"");"/"===s[0]&&(s=s.substr(1));let o=tracer._filePathToFileData[s];return!o&&ctx.wallabyContext.normalizedRootPrefix&&(o=tracer._filePathToFileData[ctx.wallabyContext.normalizedRootPrefix+s]),o}function processErrors(e){if("string"==typeof e)return[{error:e,message:e,stack:null,passed:!1}];if(Array.isArray(e)){const t=[];return e.forEach((e=>{t.push(processErrors(e))})),t.flat()}try{const t={error:e,passed:!1};return e&&"AssertionError"===e.name?t.message=e?(e.message?e.message:e.toString()).split(" // ")[0]:"empty error":t.message=e?e.name&&e.message?e.name+": "+e.message:e.toString():"empty error",0===t.message.indexOf("Error:")&&(t.message=t.message.substr(7)),t.stack=e?e.stack:null,e.diff&&!e.showDiff&&(t.message+="\n\n"+e.diff),e&&(e.showDiff||e.diff)&&(t.showDiff=!0,t.actual=e.actual,t.expected=e.expected),[t]}catch(e){return[{passed:!1,message:e.toString()}]}}return tracer._shouldReportProgramScope=!0,tracer.initLoadingPhase(),tracer._highPriorityReceiver={send:function(e){sendWorkerMessageToRunner("receiverHighPriorityMessage",e)}},global.$_$receiver.onopen&&global.$_$receiver.onopen(),tracer._onStart=()=>{},Object.keys(ctx.wallabyContext.tracer).forEach((e=>{tracer[e]=ctx.wallabyContext.tracer[e]})),tracer._beforeMatchSnapshot=(e,t)=>{tracer._expectedMatchSnapshotCall=[e,t]},tracer._matchSnapshot=({key:e,snapshotPath:t})=>{if(!tracer._expectedMatchSnapshotCall)return;const[a,s]=tracer._expectedMatchSnapshotCall;delete tracer._expectedMatchSnapshotCall,tracer._matchSnapshotCalls||(tracer._matchSnapshotCalls=[]),tracer._matchSnapshotCalls.push({fileId:a,snapshotCallRangeId:s,snapshotKey:e,snapshotPath:normalizePath(path.relative(ctx.wallabyContext.globals.wallaby.localProjectRoot,t))})},global.$_$wallabyVitest={inspect:e=>global.$_$tracer.inspectAssertionValue(e),wrapFetchedModule(e,t){if(t.coverage){const e=new Array(t.coverage.ranges);for(let a=0;a<t.coverage.ranges;a++)e[a]={};global.$_$coverage[t.coverage.id]=e,delete t.coverage}const a=t.filter;if(a){if(a.name){"*"===global.$_$tests&&(global.$_$tests={});(global.$_$tests[":?"]=global.$_$tests[":?"]||{})[":"+a.name]="*"}else global.$_$tests&&global.$_$tests[":?"]&&(global.$_$tests="*");delete t.filter}return t},adjustFileTasks(e){for(const t of e){const e=tracer.hasSpecFilter(),a=[],s=getFileData(t.filepath).id,o=(t,r)=>{for(const n of t.tasks)if(n.concurrent=!1,n.wallabyTestFileId=s,"test"===n.type){n.wallabySpecId=++currentSpecId,n.wallabySuite=r;const t=e&&!tracer.specFilter([...r,n.name]);if(t){skippedTests.push([...r,n.name].join(" > ")),n.mode="skip";continue}if("skip"===n.mode||"todo"===n.mode){skippedTests.push(n.name),tracer.specStart(n.wallabySpecId,n.name,n.wallabyTestFileId,[...n.wallabySuite,n.name]),tracer.specSyncEnd();const e=tracer.specEnd();t||(tracer.result({id:n.wallabySpecId,timeRange:e,name:n.name,suite:n.wallabySuite,status:"todo"===n.mode?"todo":"skipped",time:0,testFile:n.wallabyTestFileId}),a.push({path:[...n.wallabySuite,n.name],mode:n.mode}))}else testsToRun.push(n),a.push({path:[...n.wallabySuite,n.name],mode:n.mode})}else o(n,[...r,n.name])};o(t,[]);const r=[{specFileId:s,tests:a}];tracer.specFileTests(r),sendWorkerMessageToRunner("specFileTests",r)}},updateSnapshot:()=>tracer.canUpdateSnapshots()?"all":"new",inlineSnapshotSaved(e,t){sendWorkerMessageToRunner("inlineSnapshotSaved",{fileName:e,content:t})},runSuite(e){getFileData(e.filepath)&&tracer.started({total:"unknown number of"})},async getFn(e){e.wallabyStarted||(e.wallabyStarted=!0,tracer.specSyncStart(),tracer.specStart(e.wallabySpecId,e.name,e.wallabyTestFileId,[...e.wallabySuite,e.name]),await new Promise((e=>originalSetTimeout(e,0))))},updateTask(e){if(updatedTasks=!0,e.wallabySpecId&&e.result)if("run"!==e.result.state||e.wallabyStarted||e.wallabyPreStart){if(void 0!==e.result.duration&&!e.wallabyProcessed){e.wallabyProcessed=!0,tracer.specSyncEnd();const t=tracer.specEnd(),a={id:e.wallabySpecId,timeRange:t,name:e.name,suite:e.wallabySuite,status:"executed",time:Math.round(100*e.result.duration)/100,log:[],testFile:tracer.entryFile()},s=e.result.errors||e.result.error;if(s){processErrors(s).forEach((e=>{a.log.push(tracer.setAssertionData(e,{message:e.message||"",stack:e.stack}))}))}e.wallabyStarted||(e.wallabyStarted=!0,a.log.push(tracer.setAssertionData({},{message:"Test execution did not start; check Suite Hooks for possible errors"}))),a.log.length||delete a.log,tracer.result(a)}}else e.wallabyPreStart=!0,tracer.programScopeStartLoading(e.wallabyTestFileId),tracer.specSyncStart()},canUpdateSnapshot:e=>!tracer._updateNoMoreThanOneSnapshotPerTestFileRun||0===e.updated,getSnapshotState(e){if(e&&e.snapshotState&&e.snapshotState.markSnapshotsAsCheckedForTest)try{skippedTests.forEach((t=>e.snapshotState.markSnapshotsAsCheckedForTest(t)))}catch(e){sendWorkerMessageToRunner("debugLog","Error processing skipped snapshots"),sendWorkerMessageToRunner("debugLog",e.toString())}},async processExit(){await complete()},async unhandledError(e){const t=await esmHooks.getErrorsAndWarnings();if(t.errors.length){const e=Object.keys(t.errors.reduce(((e,t)=>(e[t]=!0,e)),{}));await sendWorkerMessageToRunner("uncaughtException",e.join("\n\n"))}await sendWorkerMessageToRunner("uncaughtException",e)},patchReadFileSync(e,t){const a=pathToFileURL(e);return global.$_$patches[a.href]?esmHooks.applyReplacements(a.href,global.$_$patches[a.href],t.toString()):t},async patchReadFileAsync(e,t){const a=pathToFileURL(e);return global.$_$patches[a.href]?esmHooks.applyReplacements(a.href,global.$_$patches[a.href],(await t).toString()):t},ensureDomGlobals(e){e.window.wallaby=global.wallaby,Object.keys(global).forEach((t=>{t.startsWith("$_$")&&(e.window[t]=global[t])}))}},{}}