'use strict';

import { legacyTagFix } from './modules/core'
import UA from './modules/user-agents';
import UTILS from './modules/utility-helpers';
import COOKIES from './modules/cookie';

if(UA.ie) legacyTagFix();
global.UA = UA;

// UTILS TEST
const onResizeFlag = UTILS.startResizeListner(testResize);
const onScrollFlag = UTILS.startScrollListner(testScroll);

function testResize(w, h) {
    console.log('%i X %i', w, h);
}

function testScroll(t) {
    console.log('%d', t);
}
// setTimeout(function() {
//     utils.cancelResizeListner(onResizeFlag);
//     utils.cancelScrollListner(onScrollFlag);
// }, 6000);


// COOKIES TEST
COOKIES.write('dodo', off, '30seconds');

var off = COOKIES.read('dodo', true);

console.log(off);


// UA TEST
console.log(UA);
