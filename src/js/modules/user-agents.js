'use strict';

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
        _bot

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
}

const ua = {
    // IE
    ie: _IE,
    ie10: (_IEver == 10.0),
    ie11: (_IEver == 11.0),

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
        !!_xbox || !!_ps4 || !!_ps3 || !!_psp || !!_psv || !!_3ds || !!_dsi || !!_wii ||
        !!_Opera ||
        !!_BlackBerry || !!_nexus7 || !!_WindowsPhone ||
        _IE && _IEver < 11 || //IE
        _iOSver < '9' || // Safari????
        _AndroidVer < '6' // android???????_AndroidVer < '6?
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
}

export { ua as default }