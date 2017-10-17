'use strict';
/*
Complete Utility File For Checking all kind of variables.
Here is the Complete solution which, not only gives you basic util function to find out if value is String object or anything else. Plus some other good to have functions.
this raw file is used in my this simple react redux project on github Simple React Redux (https://github.com/Peripona/SimpleReactRedux)
*/
var Sys = {
    /** This Returns Object Type */
    getType: function (val) {
        return Object.prototype.toString.call(val);
    },
    /** This Checks and Return if Object is Defined */
    isDefined: function (val) {
        return val !== void 0 || typeof val !== 'undefined';
    }
    /** Run a Map on an Array **/
    map: function (arr, fn) {
        var res = [], i = 0;
        for (; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        arr = null;
        return res;
    },
    /** Checks and Return if the prop is Objects own Property */
    hasOwnProp: function (obj, val) {
        return Object.prototype.hasOwnProperty.call(obj, val);
    },
    /** Extend properties from extending Object to initial Object */
    extend: function (newObj, oldObj) {
        for (var prop in oldObj) {
            if (hasOwnProp(oldObj, prop)) {
                newObj[prop] = oldObj[prop];
            }
        }
        return newObj;
    }
}

['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Object', 'Array'].forEach(
    function (name) {
        Sys['is' + name] = function (obj) {
            return toString.call(obj) == '[object ' + name + ']';
        };
    });
// The above code will Create a Object Sys = {} this method has all the functions like getType, isDefined To use them simply check call this method like this.
    if(Sys.isDefined(myVar)){ console.log('myVar is defined'); }else { console.log('no myVar is not defined.'); }
//Similar to this 
var myStr = 'You are awesome.. !!';
if (Sys.isString(myStr)) { console.log(myStr); }


// You may want to play with the assertions ( (o.constructor === Number || s.constructor === Boolean) ).Anecdotally,  parseInt and NaN are fragile but powerful tools.Just remember, Not - a - Number is NOT Not- a - Number, and undefined can be defined. 
