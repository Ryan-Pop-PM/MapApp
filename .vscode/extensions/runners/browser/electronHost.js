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
var ipc,electron=require("electron"),currentRequestId=0;if(global.window){try{Error.stackTraceLimit=80}catch(e){}ipc=electron.ipcRenderer,ipc.on("message",function(event,msg){eval(msg.code),ipc.send("message",{id:msg.id})})}else{process.setFdLimit&&process.setFdLimit(8192),process.on("uncaughtException",function(e){e&&e.message&&host&&host._send({type:"error",error:{message:e.message,stack:e.stack}})});var fs=require("fs"),_=require("lodash"),ipc=electron.ipcMain,app=electron.app,BrowserWindow=electron.BrowserWindow,Host=("darwin"===process.platform&&app.dock.hide(),function(){this._pages=Object.create(null),this._callbacks=Object.create(null)}),host=(Host.prototype={stop:function(){app.exit(0)},closePage:function(e){e=e.pageId;this._destroyExistingPage(e)},evaluateOnPage:function(e,t){var s=e.pageId,s=this._pages[s];this._requestWithCorrelationId(s,{code:e.action},t)},openPage:function(e,t){var s=e.pageId,n=e.url,e=_.defaults(e.options||{},{width:800,height:600,show:!1,skipTaskbar:!0,webPreferences:{contextIsolation:!1}}),s=(e.webPreferences.nodeIntegration=e.webPreferences.nodeIntegration||!1,e.webPreferences.preload=__filename,this._destroyExistingPage(s),this._pages[s]=new BrowserWindow(e));s.loadURL(n),s.webContents.on("did-finish-load",function(){t({status:"success"})}),s.webContents.on("did-fail-load",function(){t({status:"failed"})})},capturePage:function(t,s){var e=t.pageId,e=this._pages[e];e?e.capturePage(function(e){fs.writeFile(t.file,e.toPng(),function(){s()})}):s()},_destroyExistingPage:function(e){var t=this._pages[e];t&&(t.destroy(),delete this._pages[e])},_send:function(e){process.send(e)},_requestWithCorrelationId:function(e,t,s){var n=this,o=++currentRequestId,s=n._callbacks[o]={done:s};t.id=o,e.webContents.send("message",t),s.timeout=setTimeout(function(){delete n._callbacks[o]},12e5)},_responseWithCorrelationId:function(e){var t=this._callbacks[e.id];delete this._callbacks[e.id],t&&(clearTimeout(t.timeout),t.done(e))}},new Host);process.on("message",function(t){try{var e=host[t.type];e&&(t.id?e.call(host,t,function(e){(e=e||{}).id=t.id,host._send(e)}):e.call(host,t))}catch(e){host._send({type:"error",error:{message:e.message,stack:e.stack}})}}),ipc.on("message",function(e,t){t.id&&host._responseWithCorrelationId(t)}),ipc.on("resizeWindow",function(e,t){var s,n=host._pages[t.pageId];n&&(s=n.getSize(),n.setSize(t.width||s[0],t.height||s[1]),n.webContents.send("resizeWindow"))}),app.on("ready",function(){host._send({type:"ready"})}),app.on("before-quit",function(e){e.preventDefault()})}