'use strict';

//  retrieve the real global object in all possible environments
// https://www.contentful.com/blog/2017/01/17/the-global-object-in-javascript/

import ua from './modules/user-agents'
// import { utils } from './modules/utility-helpers'

//window.ua = require('./modules/user-agents.js').default
window.ua = ua


// https://stackoverflow.com/questions/41949768/how-to-create-common-helper-class-in-react-js-using-es6-which-is-used-by-another
import utils from './modules/utility-helpers'

// expose to window (http://www.mattburkedev.com/export-a-global-to-the-window-object-with-browserify/)

/*
var userAgt = window.userAgt || {};
const utility = window.utility || {};
*/


//userAgt.ua = ua // for object mapping purpose?
//utility.util = util // for object mapping purpose?


/*
window.userAgt = ua
window.utility = utils

var u = new utils()
*/


// console.log(utility);
console.log(utils.getWindowSize())
