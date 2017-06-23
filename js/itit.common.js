/*!
 Licensed under the MIT license

 Copyright (c) 2016 ItIt.Io

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 Any Problem , please contact <a href="mailto:yingosen@gmail.com">yingosen@gmail.com</a>

 */

/**
 * 通用事件处理
 * @auth: ginko.wang
 * @date: 2016-05-25 23:39
 */
!!(function () {
    if (!!window.Waves) {
        Waves.init();
    }
})();
!!(function (window, $) {
    window.onerror = function (message, path, line, column, error) {
        var event = event || window.event;
        event.preventDefault();
        event.stopPropagation();
        itit.logger.error(message + " on " + path + ":" + line + ":" + column, error);
    };
    window.location.reloadUrl = function () {
        window.location.hrefUrl(window.location.href);
    };
    window.location.hrefUrl = function (url) {
        url = window.location.assembleHref(url);
        if (String.isEmpty(url)) {
            return;
        }
        window.location.href = url;
    };
    window.location.assembleHref = function (url) {
        if (String.isEmpty(url)) {
            return;
        }
        var rregx = /r=[\d.]+/;
        var tregx = /t=[\d]+/;
        do {
            if (url.indexOf("r=") > -1) {
                url = url.replace(rregx, "r=" + Math.random());
                url = url.replace(tregx, "t=" + (new Date().getTime()));
                break;
            }
            if (url.indexOf("?") > -1) {
                url = url + "&r=" + Math.random() + "&t=" + (new Date().getTime());
            } else {
                url = url + "?r=" + Math.random() + "&t=" + (new Date().getTime());
            }
        } while (false);
        return url;
    };
    window.parseIntWithDefault = function (value, vdefault) {
        vdefault = parseInt(vdefault);
        if (isNaN(vdefault)) {
            vdefault = 0;
        }
        value = parseInt(value);
        if (isNaN(value)) {
            value = vdefault;
        }
        return value;
    };
    window.parseFloatWithDefault = function (value, vdefault, toFixed) {
        vdefault = parseFloat(vdefault);
        if (isNaN(vdefault)) {
            vdefault = 0;
        }
        toFixed = parseInt(toFixed);
        if (isNaN(toFixed)) {
            toFixed = -1;
        }
        value = parseFloat(value);
        if (isNaN(value)) {
            value = vdefault;
        }
        if (toFixed > -1) {
            return parseFloat((value).toFixed(toFixed));
        }
        return value;
    };
    window.itit = {
        version: "1.0.0",
        cached: {}
    };
    window.itit.store = store;
    window.itit.logger = new Logger("itit.log");
    itit.request = function (_url) {
        if (!_url || _url.indexOf("?") < 0) {
            return {};
        }
        _url = decodeURI(_url);
        var params = _url.substr(_url.indexOf("?") + 1, _url.length);
        var req = {};
        var _params = params.split("&");
        var _len = !!_params ? _params.length : 0;
        for (var i = 0; i < _len; i++) {
            var param = _params[i];
            if (!param || param.indexOf("=") < 0) {
                continue;
            }
            var _param = param.split("=");
            req[_param[0]] = _param[1];
        }
        return req;
    };
    itit.isMobile = function (mobile) {
        var reg = /^1[0-9]{10}$/;
        return reg.test(mobile);
    };
    itit.isEmail = function (email) {
        var reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return reg.test(email);
    };
    itit.isUrl = function (url) {
        var reg = /(http[s]?):\/\/[^\/\.]+?\..+\w$/i;
        return reg.test(url);
    };
    itit.dialog = {
        alert: function (message) {
            if (!message) {
                return;
            }
            iosOverlay({
                text: message,
                icon: "./images/common/alert.png",
                duration: 2e3
            });
        },
        success: function (message) {
            if (!message) {
                return;
            }
            iosOverlay({
                text: message,
                icon: "./images/common/check.png",
                duration: 2e3
            });
        },
        info: function (message) {
            if (!message) {
                return;
            }
            iosOverlay({
                text: message,
                icon: "./images/common/alert.png",
                duration: 2e3
            });
        },
        warn: function (message) {
            if (!message) {
                return;
            }
            iosOverlay({
                text: message,
                icon: "./images/common/alert.png",
                duration: 2e3
            });
        },
        error: function (message) {
            if (!message) {
                return;
            }
            iosOverlay({
                text: message,
                icon: "./images/common/cross.png",
                duration: 3e3
            });
        }
    }
})(window, jQuery);
// Add Extends for JS Object
(function () {
    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }
    Array.prototype.remove = function (index) {
        this.splice(index, 1);
    };
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (callback) {
            var t, k;
            if (!this) {
                throw new TypeError('this is null or not defined');
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }
            if (arguments.length > 1) {
                t = arguments[1];
            }
            k = 0;
            while (k < len) {
                var kValue;
                if (k in O) {
                    kValue = O[k];
                    var ret = callback.apply(t, [kValue, k, O]);
                    if (ret === true) {
                        break;
                    }
                }
                k++;
            }
        };
    }
})();
(function () {
    Date.prototype.format = function (fmt) { // author: meizz
        var o = {
            "M+": this.getMonth() + 1, // 月份
            "d+": this.getDate(), // 日
            "h+": this.getHours(), // 小时
            "m+": this.getMinutes(), // 分
            "s+": this.getSeconds(), // 秒
            "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
            "S": this.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
                    : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    Number.prototype.format = function (precision, separator) {
        return Number.format(this, precision, separator);
    };
    Number.prototype.toFixed = function (digits) {
        return Number.toFixed(this, digits);
    };
    Number.toFixed = function (value, digits) {
        value = parseFloat(value);
        if (isNaN(value)) {
            return NaN;
        }
        digits = parseInt(digits);
        if (isNaN(digits)) {
            digits = 0;
        }
        if (digits < 0 || digits > 20) {
            throw new Error("digits argument must be between 0 and 20");
        }
        if (digits == 0) {
            return Math.floor(value) + "";
        }
        var _val = Math.pow(10, digits);
        _val = Math.round(value * _val) / _val + "";
        var _sval = _val.toString().split(".");
        var _point = _sval[1];
        if (typeof(_point) === "undefined") {
            _point = "";
        }
        var _vals = [];
        _vals.push(_sval[0]);
        _vals.push(".");
        _vals.push(_point);
        var _len = digits - _point.length;
        for (var i = 0; i < _len; i++) {
            _vals.push("0");
        }
        return _vals.join("");
    };
    Number.format = function (num, precision, separator) {
        var parts = [];
        // 判断是否为数字
        if (!isNaN(parseFloat(num)) && isFinite(num)) {
            // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
            // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
            // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
            // 的值变成了 12312312.123456713
            num = Number(num);
            // 处理小数点位数
            num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
            // 分离数字的小数部分和整数部分
            parts = num.split('.');
            // 整数部分加[separator]分隔, 借用一个著名的正则表达式
            parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));
            return parts.join('.');
        }
        return NaN;
    };
    /**
     * 数字检查
     * @param value
     * @param min option
     * @param max option
     */
    Number.check = function (value, min, max) {
        var ret = false;
        var _value = parseFloat(value);
        if (isNaN(_value) || _value.toString() !== value.toString()) {
            return ret;
        }
        ret = true;
        var _min = parseFloat(min);
        var _max = parseFloat(max);
        if (!isNaN(_min)) {
            if (_min.toString() !== min.toString()) {
                return false;
            }
            ret = _value >= _min;
            if (!ret) {
                return false;
            }
        }
        if (!isNaN(_max)) {
            if (_max.toString() !== max.toString()) {
                return false;
            }
            ret = _value <= _max;
        }
        return ret;
    };
    Date.format = function (jsondate, fmt) {
        return new Date(jsondate).format(fmt);
    };
    /**
     * 秒时间格式化
     * @param seconds
     * @returns {string}
     */
    Date.formatSecond = function (value) {
        var _diff = "-:-";
        if (typeof(value) !== "number") {
            return _diff;
        }
        var _val = [];
        var _second = value % 60;
        var _minute = parseInt(value / 60) % 60;
        var _hour = parseInt(value / 60 / 60) % 60;
        if (_hour > 0) {
            if (_hour < 10) {
                _val.push("0");
            }
            _val.push(_hour);
            _val.push(":");
        }
        if (_minute < 10) {
            _val.push("0");
        }
        _val.push(_minute);
        _val.push(":");
        if (_second < 10) {
            _val.push("0");
        }
        _val.push(_second);
        _diff = _val.join("");
        return _diff;
    };
    Date.dateDiff = function (jsonDate, now) {
        var date = new Date(parseInt(value, 10));
        var diffDay = Math.floor((now.getTime() - date.getTime()) / 1000);
        var _diff = Date.format(value, "yyyy-MM-dd hh:mm");
        if (diffDay < 60) {
            _diff = "一分钟前"
        } else if (diffDay < 5 * 60) {
            _diff = "五分钟前"
        } else if (diffDay < 10 * 60) {
            _diff = "十分钟前"
        } else if (diffDay < 20 * 60) {
            _diff = "二十分钟前"
        } else if (diffDay < 30 * 60) {
            _diff = "三十分钟前"
        } else if (diffDay < 60 * 60) {
            _diff = "一小时前"
        } else if (diffDay < 2 * 60 * 60) {
            _diff = "两小时前"
        } else if (diffDay < 3 * 60 * 60) {
            _diff = "三小时前"
        } else if (diffDay < 12 * 60 * 60) {
            _diff = "半天前"
        }
        return _diff;
    };
    String.isEmpty = function (value) {
        return !value || value.toString().trim().length === 0;
    };
    String.prototype.replaceAll = function (target, replacement) {
        return this.split(target).join(replacement);
    };
    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    };
    String.prototype.ltrim = function () {
        return this.replace(/(^\s*)/g, "");
    };
    String.prototype.rtrim = function () {
        return this.replace(/(\s*$)/g, "");
    };
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
    String.prototype.endWith = function (s) {
        if (!s || s.trim().length === 0 || s.length > this.length) {
            return false
        }
        return (this.substring(this.length - s.length) === s);
    };
})();