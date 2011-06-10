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

var configData = {"xhr.open": false};

var snitch = new DOMSnitch(configData);

// Test 1
try {
  var xhr = new XMLHttpRequest;
  console.debug("Test 1: PASSED.");
} catch (e) {
  console.error("Test 1: FAILED! " + e.toString());
}


// Test 2
try {
  xhr.open("GET", location.pathname);
  console.debug("Test 2: PASSED.");
} catch (e) {
  console.error("Test 2: FAILED! " + e.toString());
}

// Test 3
try {
  xhr.send(null);
  console.debug("Test 3: PASSED.");
} catch (e) {
  console.error("Test 3: FAILED! " + e.toString());
}