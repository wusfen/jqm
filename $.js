/**
 * wushufen
 * 20171115
 * 20171116
 *
 * $('selector')
 *     .each()
 *     .closest()
 *     .delay()
 *     .addClass()
 *     .removeClass()
 *     .show(animateClass)
 *     .hide(animateClass)
 *     .css()
 *     .on()
 */
$ = function(selector) {
    if (!(this instanceof $)) {
        var els = new $
        els.selector = selector

        if (typeof selector == 'string') {
            var nodeList = document.querySelectorAll(selector)
            nodeList = els.slice.call(nodeList)
            els.splice.apply(els, [0, 0].concat(nodeList))
        }
        if (typeof selector == 'object') {
            els.push(selector)
        }

        return els
    }
}
$.fn = $.prototype = []

$.fn.each = function(cb) {
    var deal = function() {
        for (var i = 0; i < this.length; i++) {
            cb.call(this, this[i], i)
        }
        delete this.delayTime
    }.bind(this)

    var delayTime = this.delayTime
    delayTime ? setTimeout(deal, delayTime) : deal()

    return this
}
$.fn.closest = function(selector) {
    var _els = $(selector)
    var els = new $
    this.each(function(item) {
        (function loop(node) {
            if (!node) return
            if (_els.indexOf(node) != -1) {
                els.push(node)
            } else {
                loop(node.parentNode)
            }
        })(item)
    })
    return els
}
$.fn.addClass = function(className) {
    var classNames = className.trim().split(/ +/)
    return this.each(function(item) {
        var classList = item.classList
        for (var i = 0; i < classNames.length; i++) {
            classList && classList.add(classNames[i])
        }
    })
}
$.fn.removeClass = function(className) {
    var classNames = className.trim().split(/ +/)
    return this.each(function(item) {
        var classList = item.classList
        for (var i = 0; i < classNames.length; i++) {
            classList && classList.remove(classNames[i])
        }
    })
}
$.fn.css = function(arg, val) {
    var item = this[0]
    if (!item) return

    if (val !== undefined) {
        var key = arg
        arg = {}, arg[key] = val
    }

    // set
    if (typeof arg == 'object') {
        return this.each(function(item) {
            var style = item.style
            for (var name in arg) {
                style['-webkit-' + name] = arg[name]
                style['-moz-' + name] = arg[name]
                style['-ms-' + name] = arg[name]
                style[name] = arg[name]
            }
        })
    }
    // get
    else {
        var style = getComputedStyle(item, null)
        var value = style[arg] ||
            style['-webkit-' + arg] ||
            style['-moz-' + arg] ||
            style['-ms-' + arg]

        return arg ? value : style
    }

}
$.fn.show = function(className) {
    if (className) {
        return this.addClass(className)
            .css('display', '')
            .delay(this.css('animation-duration'))
            .removeClass(className)
    }
    return this.css('display', '')
}
$.fn.hide = function(className) {
    if (className) {
        this.addClass(className)
            .delay(this.css('animation-duration'))
            .removeClass(className)
    }
    return this.css('display', 'none')
}
$.fn.on = function(eventType, cb) {
    var _this = this
    document.addEventListener(eventType, function(e) {
        var el = $(e.target).closest(_this.selector)[0]
        if (el) {
            cb.call(el, e)
        }
    })
    return this
}
$.fn.delay = function(time) {
    if (String(time).match('s')) {
        time = parseFloat(time) * 1000
    }
    this.delayTime = time + (this.delayTime || 0)
    return this
}