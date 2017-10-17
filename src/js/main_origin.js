'use strict';

import { legacyTagFix } from './modules/core'
import UA from './modules/user-agents';
import UTILS from './modules/utility-helpers';
import COOKIES from './modules/cookie';
import easings from './modules/easings';

console.log(easings);



if(UA.ie) legacyTagFix();

// jQueryイージング拡張
// if ($) {
//     $.extend($.easing, easings);
// }

global.UA = UA;


var arr = [
    { ua: UA },
    { util: UTILS },
    { cookie: COOKIES }
];

var Shared = arr.reduce(function (result, item) {
    var key = Object.keys(item)[0]; //first property: ua
    result[key] = item[key];
    return result;
}, {});


console.log(Shared.ua);



// UTILS TEST
const onResizeFlag = Shared.util.startResizeListner(testResize);
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

//console.log(off);


// UA TEST
//console.log(UA);
