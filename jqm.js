/**
 * jqmini main
 *
 * @param  {Function|String|Element|Array<Elements>|$} selector - desc
 * @return {$} ArrayLike
 */
function $(selector) {
    if ($.isString(selector)) {
    	console.log('s')
    }
}

/**
 * $ 扩展接口
 *
 * @type {Object}
 */
$.fn = $.prototype;

/**
 * return object type
 *
 * @example
 *
 * console.log($.type(undefined)) // => 'undefined'
 * console.log($.type(1)) // => 'number'
 * console.log($.type(NaN)) // => 'number'
 * console.log($.type(true)) // => 'boolean'
 * console.log($.type('str')) // => 'string'
 * console.log($.type({})) // => 'object'
 * console.log($.type([])) // => 'array'
 * console.log($.type(function(){})) // => 'function'
 *
 * @param  {*} obj
 * @return {String}
 */
$.type = function(obj) {
    return ({}).toString.call(obj).match(/\w+(?=])/)[0].toLowerCase();
};


/**
 * each arraylike
 *
 * @example
 *
 * $.each([1, 2, 3], function(item, index) {
 *     console.log(index, item);
 * })
 *
 * @param  {ArrarLike}   arraylike
 * @param  {Function} fn
 */
$.each = function(arraylike, fn) {
    for (var i = 0; i < arraylike.length; i++) {
        fn(arraylike[i], i);
    }
};

/**
 * $.is[Type]
 *
 * @example
 *
 * console.log($.isUndefined(undefined)); // => true
 * console.log($.isNumber(1)) // => true
 * console.log($.isBoolean(true)) // => true
 * console.log($.isString('string')) // => true
 * console.log($.isObject({})) // => true
 * console.log($.isArray([])) // => true
 * console.log($.isFunction(function() {})) // => true
 *
 * @param  {*} obj
 * @return {Boolean}
 */
$.each('Undefined Number Boolean String Object Array Function'.split(' '), function(type) {
    $['is' + type] = function(obj) {
        return $.type(obj) == type.toLowerCase()
    };
});
