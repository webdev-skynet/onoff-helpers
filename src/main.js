'use strict';

import { legacyTagFix } from './modules/core'
import UA from './modules/user-agents';
import UTILS from './modules/utility-helpers';
import COOKIES from './modules/cookie';

if(UA.ie) legacyTagFix();

var arr = [
    { ua: UA },
    { util: UTILS },
    { cookie: COOKIES }
];

global.Shared = arr.reduce(function (result, item) {
    var key = Object.keys(item);
    result[key] = item[key];
    return result;
}, {});
