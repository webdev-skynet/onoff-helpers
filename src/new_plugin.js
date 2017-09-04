//get rid of this stupid name (new_plugin) like utility or helpers...
// ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
// ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
// CONVERT TO ES& (let + const ect) + transpile or ployfill
// ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
// ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼

(function (global,factory) {

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(global);

    } else if (typeof define === 'function' && define.amd) {

    } else {
        global['Antares'] = factory(global);
    }

})((this || 0).self || global, function (global) {

    var _ua = {};
    const _hasTouch = ('TouchEvent' in global && _ua.smartdevice)


    const _objTypes = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Object', 'Array'];

    // private class (TODO: transfert to es6 module)
    class Sys {
        /** This Returns Object Type */
        getType(val) {
            return Object.prototype.toString.call(val);
        };
        /** This Checks and Return if Object is Defined */
        isDefined(val) {
            return val !== void 0 || typeof val !== 'undefined';
        };
        /** Run a Map on an Array **/
        map(arr, fn) {
            let res = [];
            for (let i = 0; i < arr.length; ++i) {
                res.push(fn(arr[i], i));
            }
            arr = null;
            return res;
        };
        /** Checks and Return if the prop is Objects own Property */
        hasOwnProp(obj, val) {
            return Object.prototype.hasOwnProperty.call(obj, val);
        };
        /** Extend properties from extending Object to initial Object */
        extend(newObj, oldObj) {
            for (let prop in oldObj) {
                if (hasOwnProp(oldObj, prop)) {
                    newObj[prop] = oldObj[prop];
                }
            }
            return newObj;
        }
    };

    _objTypes.forEach(
        name => {
            Sys[`is${name}`] = obj => toString.call(obj) == `[object ${name}]`;
        }
    );

    /*****************************************************************************************************************
     * ユーザーエージェント判別
     *****************************************************************************************************************/

    if (global.navigator) {
        var _userAgent = global.navigator.userAgent.toLowerCase(),
            _IE, _IEver,
            _Edge, _EdgeVer,
            _Chrome, _ChromeVer,
            _FireFox, _FireFoxVer,
            _Safari, _SafariVer,
            _Opera, _OperaVer,
            _Mac, _iPhone, _iPad, _iPod, _iOSver, _BlackBerry,
            _Android, _AndroidMobile, _AndroidTablet, _AndroidVer,
            _WindowsPhone, _nexus7,
            _3ds, _dsi, _wii, _wiiu, _ps3, _ps4, _psp, _psv, _xbox, _switch,
            _bot;

        // ブラウザ
        if (_userAgent.indexOf("msie") != -1) {
            _IE = true;
            _userAgent.match(/msie (\d+\.\d)/);
            _IEver = parseFloat(RegExp.$1);

        } else if (_userAgent.indexOf('trident') != -1) {
            _IE = true;
            _userAgent.match(/rv:(\d+\.\d)/);
            _IEver = parseFloat(RegExp.$1);

        } else if (_userAgent.indexOf('edge/') != -1) {
            _Edge = true;
            _userAgent.match(/edge[\/ ]?(\d+\.\d)/);
            _EdgeVer = parseFloat(RegExp.$1);

        } else if (_userAgent.indexOf("chrome") != -1) {
            _Chrome = true;
            _userAgent.match(/chrome[\/ ]?(\d+\.\d+)/);
            _ChromeVer = parseFloat(RegExp.$1);

        } else if (_userAgent.indexOf("firefox") != -1) {
            _FireFox = true;
            _userAgent.match(/firefox[\/ ]?(\d+\.\d+)/);
            _FireFoxVer = parseFloat(RegExp.$1);

        } else if (_userAgent.indexOf("opera") != -1) {
            _Opera = true;
            _userAgent.match(/opera[\/ ]?(\d+\.\d+)/);
            _OperaVer = parseFloat(RegExp.$1);

        } else if (_userAgent.indexOf("safari") != -1) {
            _Safari = true;
            _userAgent.match(/version[\/ ]?(\d+\.\d+)/);
            _SafariVer = parseFloat(RegExp.$1);
        }

        if (_userAgent.indexOf("iphone") != -1) {
            _iPhone = true;
            _userAgent.match(/iphone os (\d+)_(\d+)/);
            _iOSver = RegExp.$1 * 1 + RegExp.$2 * 0.1;

        } else if (_userAgent.indexOf("ipad") != -1) {
            _iPad = true;
            _userAgent.match(/cpu os (\d+)_(\d+)/);
            _iOSver = RegExp.$1 * 1 + RegExp.$2 * 0.1;

        } else if (_userAgent.indexOf("ipod") != -1) {
            _iPod = true;
            _userAgent.match(/os (\d+)_(\d+)/);
            _iOSver = RegExp.$1 * 1 + RegExp.$2 * 0.1;

        } else if (_userAgent.indexOf("android") != -1) {
            _Android = true;
            _userAgent.match(/android (\d+\.\d)/);
            _AndroidVer = parseFloat(RegExp.$1);

            if (_userAgent.indexOf('mobile') != -1) {
                _AndroidMobile = true;
            } else {
                _AndroidTablet = true;
            }
        } else if (_userAgent.indexOf("windows phone") != -1) {
            _WindowsPhone = true;

        } else if (_userAgent.indexOf('blackberry') !== -1 || _userAgent.indexOf('bb10') !== -1) {
            _BlackBerry = true;
        }

        if (_userAgent.indexOf('mac os') != -1) {
            _Mac = true;
        }
        if (_userAgent.indexOf('nexus 7') != -1) {
            _nexus7 = true;
        }

        if (_userAgent.indexOf('playstation 3') != -1) {
            _ps3 = true;
        }
        if (_userAgent.indexOf('playstation 4') != -1) {
            _ps4 = true;
        }
        if (_userAgent.indexOf('playstation portable') != -1) {
            _psp = true;
        }
        if (_userAgent.indexOf('playstation vita') != -1) {
            _psv = true;
        }
        if (_userAgent.indexOf('nintendo') != -1) {
            if (_userAgent.indexOf('dsi;') != -1) {
                _dsi = true;
            } else if (_userAgent.indexOf('3ds') != -1) {
                _3ds = true;
            } else if (_userAgent.indexOf('wii;') != -1) {
                _wii = true;
            } else if (_userAgent.indexOf('wiiu') != -1) {
                _wiiu = true;
            } else if (_userAgent.indexOf('Switch')) {
                _switch = true;
            }  
        }

        if (_userAgent.indexOf('mac os') != -1) {
            _Mac = true;
        }
        if (_userAgent.indexOf('nexus 7') != -1) {
            _nexus7 = true;
        }

        if (_userAgent.indexOf('googlebot') != -1 || _userAgent.indexOf('yahoo') != -1 || _userAgent.indexOf('msnbot') != -1) {
            _bot = true;
        }

        _ua = {
            // IE
            ie: _IE,
            ie10: (_IEver == 10.0),
            ie11: (_IEver == 11.0),

            // その他
            iphone: !!_iPhone,
            ipad: !!_iPad,
            ipod: !!_iPod,
            ios: !!(_iPhone || _iPad || _iPod),
            android: !!_Android,
            androidmobile: !!_AndroidMobile,
            androidtablet: !!_AndroidTablet,
            smartdevice: (!!_iPhone || !!_iPad || !!_iPod || !!_Android),
            mobile: (!!_iPhone || !!_iPod || !!_AndroidMobile),
            tablet: (!!_iPad || !!_AndroidTablet),
            //switch: (!!_switch), FIXME: IE8 error...
            bot: !!_bot,

            legacyUA: (
                !!_xbox || !!_ps4 || !!_ps3 || !!_psp || !!_psv || !!_3ds || !!_dsi || !!_wii || //ゲーム器
                !!_Opera || //日本で人気ない？？
                !!_BlackBerry || !!_nexus7 || !!_WindowsPhone || //検証器ないやつ
                _IE && _IEver < 10 || //昔のIE
                _iOSver < '9' || // Safariの古いや
                _AndroidVer < '6' // androidの古いやつ　（_AndroidVer < '6）
            ),
            test: (_iOSver < '9'), // TODO: just for test erase later
            version: {
                ie: _IEver,
                edge: _EdgeVer,
                firefox: _FireFoxVer,
                chrome: _ChromeVer,
                safari: _SafariVer,
                opera: _OperaVer,
                android: _AndroidVer,
                ios: _iOSver
            }
        };
    }


	/*****************************************************************************************************************
	 * ユーティリティ
	 *****************************************************************************************************************/

    const _util = (() => {

        const Random = (() => {
            class Rand {
                constructor(seed) {
                    this.seeds = [123456789, 362436069, 521288629, 88675123];
                    if (typeof seed !== 'number') seed = +new Date();
                    this.seeds[2] ^= seed;
                    this.seeds[2] ^= this.seeds[2] >> 21;
                    this.seeds[2] ^= this.seeds[2] << 35;
                    this.seeds[2] ^= this.seeds[2] >> 4;
                    this.seeds[2] *= 268582165;
                    this.get();
                }

                get(min, max) {
                    let t = (this.seeds[0] ^ (this.seeds[0] << 11));
                    this.seeds[0] = this.seeds[1];
                    this.seeds[1] = this.seeds[2];
                    this.seeds[2] = this.seeds[3];

                    let r = (this.seeds[3] = (this.seeds[3] ^ (this.seeds[3] >> 19)) ^ (t ^ (t >> 8)));

                    if (arguments.length >= 2 && max > min) {
                        return min + r % (max - min + 1);
                    } else {
                        return r;
                    }
                }
            }

            return Rand;
        })();

        // 外部用乱数生成器
        let _o_rand = null;
        // 内部用乱数生成器
        const _i_rand = new Random();
        // ユニーク文字列ストック
        let _ustock = {};
        // 画面幅
        let _winW = 0;
        // 画面高
        let _winH = 0;
        // リサイズリスナー関数
        let _resizeListeners = null;
        // スクロールリスナー関数
        let _scrollListeners = null;
        // ホイールリスナー関数
        let _wheelListeners = null;
        // フレームリスナー関数
        let _frameListeners = null;


        const unique = (len) => {
            let str = '';
            let stack = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

            if (len && !isNaN(len)) {
                len = parseInt(len);
            } else {
                len = 10;
            }
            for (let i = 0; i < len; i++) {
                str += stack.charAt(_i_rand.get(0, stack.length - 1));
            }
            if (str in _ustock) {
                return uniqueString(len + 1);
            } else {
                _ustock[str] = 1;
                return str;
            }
        };

        const getWindowSize = () => {
            let w = 0;
            let h = 0;

            if (!isNaN(global.innerWidth)) {
                w = Math.min(global.innerWidth, global.document.documentElement.clientWidth);
                h = global.innerHeight;
            } else {
                w = global.document.documentElement.clientWidth;
                h = global.document.documentElement.clientHeight;
            }
            return { w, h };
        };

        const startResizeListner = (listener, thisObject) => {
            let id = unique(10);

            if (Sys.isFunction(listener)) {
                let _this = thisObject !== undefined ? thisObject : global;

                if (_resizeListeners === null) {
                    _resizeListeners = {};

                    const size = getWindowSize();

                    _winW = size.w;
                    _winH = size.h;

                    const handler = () => {
                        const size = getWindowSize();
                        _winW = size.w;
                        _winH = size.h;

                        for (let _id in _resizeListeners) {
                            _resizeListeners[_id].callable.call(_resizeListeners[_id].thisObject, _winW, _winH);
                        }
                    };

                    global.addEventListener('resize', handler, false);
                    global.addEventListener('orientationchange', () => { setTimeout(handler, 1000); }, false);
                }
                _resizeListeners[id] = { callable: listener, thisObject: _this };

                listener.call(_this, _winW, _winH);
            }

            return id;

        };

        const cancelResizeListner = id => {
            if (_resizeListeners !== null && Sys.isString(id) && id in _resizeListeners) {
                delete _resizeListeners[id];
            }
        };

        const startScrollListner = (listener, thisObject) => {
            const id = unique(10);

            if (Sys.isFunction(listener)) {
                const _this = thisObject !== undefined ? thisObject : global;

                if (_scrollListeners === null) {
                    _scrollListeners = {};

                    const handler = () => {
                        const size = getWindowSize();
                        const t = global.document.body.scrollTop || global.document.documentElement.scrollTop;
                        const l = global.document.body.scrollLeft || global.document.documentElement.scrollLeft;
                        const b = t + size.h;
                        const r = l + size.w;

                        for (let _id in _scrollListeners) {
                            _scrollListeners[_id].callable.call(_scrollListeners[_id].thisObject, t, b, l, r);
                        }
                    };

                    if (window.addEventListener) {
                        global.addEventListener('resize', handler, false);
                        global.addEventListener('scroll', handler, false);
                    }
                    if (_hasTouch && _ua.ios) {
                        global.addEventListener('touchmove', handler, false);
                    }
                }
                _scrollListeners[id] = { callable: listener, thisObject: _this };

                if (global.document.body) {
                    const t = global.document.body.scrollTop || global.document.documentElement.scrollTop;
                    const l = global.document.body.scrollLeft || global.document.documentElement.scrollLeft;
                    const b = t + _winH;
                    const r = l + _winW;
                    listener.call(_this, t, b, l, r);
                }
            }
            return id;
        };

        const cancelScrollListner = id => {
            if (_scrollListeners !== null && Sys.isString(id) && id in _scrollListeners) {
                delete _scrollListeners[id];
            }
        };

        const startWheelListner = (element, listener, thisObject) => {
            const id = unique(10);

            if (Sys.isFunction(listener)) {
                const _this = thisObject !== undefined ? thisObject : global;

                const wheelEvent = {
                    type: '',
                    wheelDeltaX: 0,
                    wheelDeltaY: 0,
                    returnValue: true,
                    originalEvent: null,

                    preventDefault() {
                        this.returnValue = false;
                    }
                };

                if (_wheelListeners === null) {
                    _wheelListeners = {};
                }

                _wheelListeners[id] = { target: element, callable: listener, thisObject: _this, off: null };

                if (element.addEventListener) {

                    if (_hasTouch) {
                        let timer = null;
                        let dx;
                        let dy;
                        let sx;
                        let sy;

                        const tick = e => {
                            dx *= 0.9;
                            dy *= 0.9;

                            wheelEvent.returnValue = true;
                            wheelEvent.type = 'touchend';
                            wheelEvent.wheelDeltaX = dx;
                            wheelEvent.wheelDeltaY = dy;

                            for (const _id in _wheelListeners) {
                                if (element === _wheelListeners[id].target) {
                                    _wheelListeners[id].callable.call(thisObject, wheelEvent);
                                }
                            }

                            if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
                                timer = setTimeout(tick, 10);
                            }
                        };

                        const touchstart = ({ touches }) => {
                            clearTimeout(timer);
                            sx = touches[0].clientX;
                            sy = touches[0].clientY;
                        };

                        const touchmove = e => {
                            dx = e.touches[0].clientX - sx;
                            dy = e.touches[0].clientY - sy;
                            sx = e.touches[0].clientX;
                            sy = e.touches[0].clientY;

                            wheelEvent.returnValue = true;
                            wheelEvent.type = 'touchmove';
                            wheelEvent.wheelDeltaX = dx;
                            wheelEvent.wheelDeltaY = dy;
                            wheelEvent.originalEvent = e;

                            for (const _id in _wheelListeners) {
                                if (element === _wheelListeners[id].target) {
                                    _wheelListeners[id].callable.call(thisObject, wheelEvent);
                                }
                            }

                            if (wheelEvent.returnValue === false) {
                                e.preventDefault();
                            }
                        };

                        _wheelListeners[id].off = () => {
                            element.removeEventListener('touchstart', touchstart);
                            element.removeEventListener('touchmove', touchmove);
                            element.removeEventListener('touchend', tick);
                            element.removeEventListener('touchcancel', tick);
                        };

                        element.addEventListener('touchstart', touchstart, false);
                        element.addEventListener('touchmove', touchmove, false);
                        element.addEventListener('touchend', tick, false);
                        element.addEventListener('touchcancel', tick, false);
                    } else {

                        const mousewheel = e => {
                            let dx = e.wheelDeltaX ? e.wheelDeltaX : 0;
                            let dy = e.wheelDeltaY ? e.wheelDeltaY : e.wheelDelta;

                            if (dy % 40 == 0) {
                                dy *= 0.8;
                            } else {
                                dy *= 0.15;
                            }
                            if (dx % 40 == 0) {
                                dx *= 0.8;
                            } else {
                                dx *= 0.15;
                            }

                            wheelEvent.returnValue = true;
                            wheelEvent.type = 'mousewheel';
                            wheelEvent.wheelDeltaX = dx;
                            wheelEvent.wheelDeltaY = dy;
                            wheelEvent.originalEvent = e;

                            for (const _id in _wheelListeners) {
                                if (element === _wheelListeners[id].target) {
                                    _wheelListeners[id].callable.call(thisObject, wheelEvent);
                                }
                            }

                            if (wheelEvent.returnValue === false) {
                                e.preventDefault();
                            }
                        };

                        const MozMousePixelScroll = e => {
                            let dx = 0;
                            let dy = 0;

                            if (e.axis === e.VERTICAL_AXIS) {
                                dy = -e.detail * 0.6;
                            } else if (e.axis === e.HORIZONTAL_AXIS) {
                                dx = -e.detail * 0.6;
                            }

                            wheelEvent.returnValue = true;
                            wheelEvent.type = 'mousewheel';
                            wheelEvent.wheelDeltaX = dx;
                            wheelEvent.wheelDeltaY = dy;
                            wheelEvent.originalEvent = e;

                            for (const _id in _wheelListeners) {
                                if (element === _wheelListeners[id].target) {
                                    _wheelListeners[id].callable.call(thisObject, wheelEvent);
                                }
                            }

                            if (wheelEvent.returnValue === false) {
                                e.preventDefault();
                            }
                        };

                        _wheelListeners[id].off = () => {
                            element.removeEventListener('mousewheel', mousewheel);
                            element.removeEventListener('MozMousePixelScroll', MozMousePixelScroll);
                        };

                        element.addEventListener('mousewheel', mousewheel, false);
                        element.addEventListener('MozMousePixelScroll', MozMousePixelScroll, false);
                    }
                }
            }
            return id;
        };

        const cancelWheelListner = id => {
            if (_wheelListeners !== null && Sys.isString(id) && id in _wheelListeners) {
                _wheelListeners[id].off();
                delete _wheelListeners[id];
            }
        };


        return {
            Sys: Sys,
            random: Random,
            getWindowSize: getWindowSize,
            startResizeListner: startResizeListner,
            cancelResizeListner: cancelResizeListner,
            startScrollListner: startScrollListner,
            cancelScrollListner: cancelScrollListner,
            startWheelListner: startWheelListner,
            cancelWheelListner: cancelWheelListner,
            // startAnimationFrame: startAnimationFrame,
            // cancelAnimationFrame: cancelAnimationFrame
        };

    })();


    /*****************************************************************************************************************
	 * Cookie
	 *****************************************************************************************************************/

    // TODO: make a class ? transfert to es6 module
    const _cookie = {

        read(key, defaultValue) {
            if (!!document.cookie) {
                const sp = document.cookie.split(';');

                for (let i = 0; i < sp.length; i++) {
                    const pair = sp[i].split('=');

                    if (_util.trim(pair[0]) === key) {
                        const obj = JSON.parse(decodeURIComponent(_util.trim(pair[1])));

                        return obj._v;
                    }
                }
            }
            return defaultValue;
        },

        write(key, val, options) {
            const path = Sys.isObject(options) && options.path ? `; path=${options.path}` : '';
            const domain = Sys.isObject(options) && options.domain ? `; domain=${options.domain}` : '';
            const secure = Sys.isObject(options) && options.secure ? '; secure' : '';
            let expires = Sys.isObject(options) && options.expires ? options.expires : '';

            if (expires !== '') {
                let date;

                if (Sys.isNumber(expires)) {
                    date = new Date();
                    date.setTime(date.getTime() + expires * 1000);

                } else if (expires.toUTCString) {
                    date = expires;

                } else if (Sys.isString(expires)) {
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

    };

    /*****************************************************************************************************************
    * IE8以下にHTML5タグを認識させる
    *****************************************************************************************************************/

    if (global.document) {
        const tags = ['header', 'footer', 'nav', 'section', 'article', 'aside', 'main'];

        for (let i = 0; i < tags.length; i++) {
            document.createElement(tags[i]);
        }
    }



    return {
        ua: _ua,
        // css: _css,
        // html: _html,
        util: _util,
        // event: _event,
        // device: _device,
        cookie: _cookie
        // easing: _easing
    };



    
});

console.log(Antares.ua);
console.log(Antares.util);