/**
 * Copyright 2011 Google Inc. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    http://www.apache.org/licenses/LICENSE-2.0
 *  
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

DOMSnitch.Modules.Document = function(parent) {
  this._parent = parent;
  this._targets = {
    "document.write": {
      capture: true,
      funcName: "write", 
      obj: document, 
      origPtr: document.write
    },
    "document.writeln": {
      obj: document, 
      funcName: "writeln", 
      origPtr: document.writeln,
      capture: true
    }
  };
  
  this._loaded = false;
  
  this.htmlElem = document.childNodes[document.childNodes.length - 1];
  this.beforeDocumentWriteEvt = document.createEvent("Event");
  this.beforeDocumentWriteEvt.initEvent("BeforeDocumentWrite", true, true);
  this.documentWriteEvt = document.createEvent("Event");
  this.documentWriteEvt.initEvent("DocumentWrite", true, true);
}

DOMSnitch.Modules.Document.prototype = new DOMSnitch.Modules.Base;

DOMSnitch.Modules.Document.prototype._createElement = function() {
  var target = this._targets["document.createElement"];
  var htmlModule = this._parent.modules["Html"];
  var elem = target.origPtr.apply(target.obj, arguments);

  htmlModule.interceptElement(elem);
  
  return elem;
}

DOMSnitch.Modules.Document.prototype._createMethod = function(module, type, target, callback) {
  return function(data) {
    document.dispatchEvent(module.beforeDocumentWriteEvt);
    var retVal = target.origPtr.apply(this, arguments);
    document.dispatchEvent(module.documentWriteEvt);

    return retVal;
  };
}

DOMSnitch.Modules.Document.prototype.load = function() {
  this.config = this._parent.config;
  
  if(this._loaded) {
    return;
  }
  
  this._overloadMethod("document.write", "doc.write");
  this._overloadMethod("document.writeln", "doc.write");

  this._loaded = true;
}

DOMSnitch.Modules.Document.prototype.unload = function() {
  for(entryName in this._targets) {
    var entry = this._targets[entryName];
    if(entry.funcName) {
      entry.obj[entry.funcName] = entry.origPtr;
    }
  }
  
  this._loaded = false;
}