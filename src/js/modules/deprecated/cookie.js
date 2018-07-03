'use strict';

/*****************************************************************************************************************
 * Cookie
 *****************************************************************************************************************/

import { objectScan } from './utility-objectTypes';

function _trim(str) {
    if (objectScan.isString(str)) {
        return unescape(escape(str).replace(/^(%u3000|%20|%09)+|(%u3000|%20|%09)+$/g, ""));
    }
}

class cookie {

    read(key, defaultValue) {
        if (!document.cookie) {
            const splitCookie = document.cookie.split(';');

            for (let i = 0; i < splitCookie.length; i++) {
                const pair = splitCookie[i].split('=');

                if (_trim(pair[0]) === key) {
                    const obj = JSON.parse(decodeURIComponent(_trim(pair[1])));
                    return obj._v;
                }
            }
        }
        return defaultValue;
    }

    write(key, val, options) {
        const path = objectScan.isObject(options) && options.path ? `; path=${options.path}` : '';
        const domain = objectScan.isObject(options) && options.domain ? `; domain=${options.domain}` : '';
        const secure = objectScan.isObject(options) && options.secure ? '; secure' : '';
        let expires = objectScan.isObject(options) && options.expires ? options.expires : '';

        if (expires !== '') {
            let date;

            if (objectScan.isNumber(expires)) {
                date = new Date();
                date.setTime(date.getTime() + expires * 1000);

            } else if (expires.toUTCString) {
                date = expires;

            } else if (objectScan.isString(expires)) {
                let msec = 0;

                if (expires.match(/^([0-9]+)second(s)?$/)) {
                    msec = (RegExp.$1 - 0) * 1000;
                } else if (expires.match(/^([0-9]+)minute(s)?$/)) {
                    msec = (RegExp.$1 - 0) * 60 * 1000;
                } else if (expires.match(/^([0-9]+)hour(s)?$/)) {
                    msec = (RegExp.$1 - 0) * 60 * 60 * 1000;
                } else if (expires.match(/^([0-9]+)day(s)?$/)) {
                    msec = (RegExp.$1 - 0) * 24 * 60 * 60 * 1000;
                } else if (expires.match(/^([0-9]+)week(s)?/)) {
                    msec = (RegExp.$1 - 0) * 7 * 24 * 60 * 60 * 1000;
                } else if (expires.match(/^([0-9]+)month(s)?$/)) {
                    msec = (RegExp.$1 - 0) * 30 * 24 * 60 * 60 * 1000;
                } else if (expires.match(/^([0-9]+)year(s)?$/)) {
                    msec = (RegExp.$1 - 0) * 365 * 24 * 60 * 60 * 1000;
                }
                if (msec > 0) {
                    date = new Date();
                    date.setTime(date.getTime() + msec);
                }
            }
            if (date) expires = `; expires=${date.toUTCString()}`;
        }

        document.cookie = `${key}=${encodeURIComponent(JSON.stringify({ _v: val }))}${path}${domain}${secure}${expires}`;
    }

}

export default new cookie();