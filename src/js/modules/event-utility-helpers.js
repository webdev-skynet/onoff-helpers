import { objectScan } from './objectTypes-helpers';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

/*****************************************************************************************************************
	 * DOM EVENTS
*****************************************************************************************************************/
// NOTE: https://www.kirupa.com/javascript/classy_way_to_create_objects.html
// https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id

const _hasTouch = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/))

function _guIDGenerator() {
  var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  var uniqID = randLetter + Date.now();
  return uniqID;
}

class EventUtils {
  constructor() {
    this._winW = 0
    this._winH = 0
    this._resizeListeners = null;
    this._scrollListeners = null;
  }

  getWindowSize() {
    this.w = 0;
    this.h = 0;

    if (!isNaN(global.innerWidth)) {
      this.w = Math.min(global.innerWidth, global.document.documentElement.clientWidth);
      this.h = global.innerHeight;
    } else {
      this.w = global.document.documentElement.clientWidth;
      this.h = global.document.documentElement.clientHeight;
    }
    return {
      w: this.w,
      h: this.h
    }
  }

  addResizeListener(listner, thisObject) {
    const id = _guIDGenerator();

    if (objectScan.isFunction(listner)) {
      let _that = thisObject !== undefined ? thisObject : global;

      if (this._resizeListeners === null) {
        this._resizeListeners = {};

        const size = this.getWindowSize();

        this._winW = size.w;
        this._winH = size.h;

        const handler = () => {
          const size = this.getWindowSize();
          this._winW = size.w;
          this._winH = size.h;

          for (let _id in this._resizeListeners) {
            this._resizeListeners[_id].callable.call(this._resizeListeners[_id].thisObject, this._winW, this._winH);
          }
        };

        global.addEventListener('resize', debounce(handler, 50), false);
        global.addEventListener('orientationchange', () => { setTimeout(handler, 1000); }, false);

      }

      this._resizeListeners[id] = { callable: listner, thisObject: _that };
      listner.call(_that, this._winW, this._winH)
    }

    return id;

  }

  removeResizeListener(id) {
    if (this._resizeListeners !== null && objectScan.isString(id) && id in this._resizeListeners) {
      delete this._resizeListeners[id];
    }
  }

  addScrollListener(listener, thisObject) {
    const id = _guIDGenerator();

    if (objectScan.isFunction(listener)) {
      const _this = thisObject !== undefined ? thisObject : global;

      if (this._scrollListeners === null) {
        this._scrollListeners = {};

        const handler = () => {
          const size = this.getWindowSize();
          const t = global.document.body.scrollTop || global.document.documentElement.scrollTop;
          const l = global.document.body.scrollLeft || global.document.documentElement.scrollLeft;
          const b = t + size.h;
          const r = l + size.w;

          for (let _id in this._scrollListeners) {
            this._scrollListeners[_id].callable.call(this._scrollListeners[_id].thisObject, t, b, l, r);
          }
        };

        if (window.addEventListener) {
          global.addEventListener('resize', throttle(handler, 100), false);
          global.addEventListener('scroll', throttle(handler, 100), false);
        }
        if (_hasTouch && navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
          global.addEventListener('touchmove', handler, false);
        }
      }
      this._scrollListeners[id] = { callable: listener, thisObject: _this };

      if (global.document.body) {
        const t = global.document.body.scrollTop || global.document.documentElement.scrollTop;
        const l = global.document.body.scrollLeft || global.document.documentElement.scrollLeft;
        const b = t + this._winH;
        const r = l + this._winW;
        listener.call(_this, t, b, l, r);
      }
    }

    return id;

  }

  removeScrollListener(id) {
    if (this._scrollListeners !== null && objectScan.isString(id) && id in this._scrollListeners) {
      delete this._scrollListeners[id];
    }
  }

}

// NOTE: make it global from here directly ( equivalent to => global.EventUtils = new EventUtils())
export default new EventUtils();