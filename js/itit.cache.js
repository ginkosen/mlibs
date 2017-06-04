/*!
 Licensed under the MIT license

 Copyright (c) 2016 ItIt.Io

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 Any Problem , please contact <a href="mailto:yingosen@gmail.com">yingosen@gmail.com</a>

 */
/**
 *
 * @author ginko.wang
 * @date 2016-10-28 11:18
 */
(function (window, itit) {
    var CacheModel = function () {
        this.__keystore__ = "cached-tpbx-itit-" + window.cache.version;
        this.__init__();
    };
    CacheModel.prototype.__init__ = function () {
        var _this = this;
        var data = itit.store.get(_this.__keystore__);
        if (!data) {
            itit.store.clear();
        }
        _this.__data__ = {
            cityId: undefined,
            cityName: undefined
        };
        if (typeof(data) === "object") {
            _this.__data__ = {
                cityId: data.cityId,
                cityName: data.cityName
            };
        }
        _this.__save__();
    };
    CacheModel.prototype.reset = function () {
        this.__init__();
    };
    CacheModel.prototype.clean = function () {
        var _this = this;
        itit.store.remove(_this.__keystore__);
        _this.__init__();
    };
    CacheModel.prototype.version = function () {
        var _this = this;
        return _this.__keystore__;
    };
    CacheModel.prototype.__save__ = function () {
        var _this = this;
        itit.store.set(_this.__keystore__, _this.__data__);
    };
    itit.cached = new CacheModel();
})(window, window.itit);