/*!
 Licensed under the MIT license

 Copyright (c) 2016 ItIt.Io

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 Any Problem , please contact <a href="mailto:yingosen@gmail.com">yingosen@gmail.com</a>

 */
/**
 * 网络请求出发管理
 * @auth: ginko.wang
 * @date: 2016-05-25 23:39
 */
!!(function (window, $, itit) {
    var $codes = {};

    /**
     * 请求返回错误统一处理类
     * @param codes
     * @param data
     * @returns {boolean}
     */
    ITAjax.options.callbacks.code = function (codes, data) {
        var _code = -1;
        do {
            if (typeof(data) !== "object") {
                _code = 1000;
                break;
            }
            if (typeof(data.errorCode) !== "number") {
                _code = 1000;
                break;
            }
            _code = data.errorCode;
        } while (false);
        if (_code === 10005) {
            itit.dialog.warn("用户会话已过期,系统将为您重新刷新");
            setTimeout(function () {
                window.location.reload(true);
            }, 2e3);
            return true;
        }
        if (_code === 0) {
            return false;
        }
        var _message = codes[_code];
        if (!_message) {
            _message = $codes[_code];
        }
        if (_code === -1) {
            _message = data.errorMessage;
        }
        if (_message !== 0 && !_message) {
            _message = "系统错误:(CODE:" + _code + ")";
        }
        itit.dialog.error(_message);
        return true;
    };
})(window, jQuery, window.itit);