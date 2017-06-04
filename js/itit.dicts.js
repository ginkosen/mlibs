/*!
 Licensed under the MIT license

 Copyright (c) 2016 ItIt.Io

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 Any Problem , please contact <a href="mailto:yingosen@gmail.com">yingosen@gmail.com</a>

 */
/**
 * @auth: ginko.wang
 * @date: 2016-05-25 23:39
 */
!!(function (document, window, $, itit) {
    /**
     * 数据项
     * @param code
     * @param name
     * @param value
     * @param description
     * @param categoryCode
     * @constructor
     */
    var DataDict = function (code, name, value, description, categoryCode) {
        this.code = code;
        this.name = name;
        this.value = value;
        this.description = description;
        this.categoryCode = categoryCode;
    };

    /**
     * 数据字典存储
     * @constructor
     */
    var DataDicts = function () {
        this.__datas__ = undefined;
        this.__init__();
    };

    /**
     * 初始化数据字典存储
     * @private
     */
    DataDicts.prototype.__init__ = function () {
        this.__datas__ = [];
    };

    /**
     * 追加数据字典项
     */
    DataDicts.prototype.pushDict = function (code, name, value, description, categoryCode) {
        var _this = this;
        var _item = {
            code: code,
            name: name,
            value: value,
            description: description,
            categoryCode: categoryCode
        };
        _this.__datas__.push(_item);
    };

    /**
     * 获取父类的子项列表集合
     * @param categoryCode
     */
    DataDicts.prototype.getDicts = function (categoryCode) {
        var _result = [];
        if (!categoryCode) {
            return _result;
        }
        var _this = this;
        var _len = _this.__datas__.length;
        for (var i = 0; i < _len; i++) {
            var _item = _this.__datas__[i];
            if (_item.categoryCode !== categoryCode) {
                continue;
            }
            _result.push({
                code: _item.code,
                name: _item.name,
                value: _item.value,
                description: _item.description,
                categoryCode: _item.categoryCode
            });
        }
        return _result;
    };

    /**
     * 获取单个子项数据
     * @param categoryCode
     * @param code
     */
    DataDicts.prototype.getDictByCode = function (categoryCode, code) {
        var _result = [];
        if (!categoryCode || code === null || code === undefined) {
            return _result;
        }
        var _this = this;
        var _len = _this.__datas__.length;
        for (var i = 0; i < _len; i++) {
            var _item = _this.__datas__[i];
            if (_item.categoryCode !== categoryCode || _item.code !== code) {
                continue;
            }
            _result.push({
                code: _item.code,
                name: _item.name,
                value: _item.value,
                description: _item.description,
                categoryCode: _item.categoryCode
            });
        }
        if (_result.length === 1) {
            return _result[0];
        }
        return _result;
    };

    /**
     * 获取单个子项数据
     * @param categoryCode
     * @param value
     */
    DataDicts.prototype.getDictByValue = function (categoryCode, value) {
        var _result = [];
        if (!categoryCode || value === null || value === undefined) {
            return _result;
        }
        var _this = this;
        var _len = _this.__datas__.length;
        for (var i = 0; i < _len; i++) {
            var _item = _this.__datas__[i];
            if (_item.categoryCode !== categoryCode || _item.value != value) {
                continue;
            }
            _result.push({
                code: _item.code,
                name: _item.name,
                value: _item.value,
                description: _item.description,
                categoryCode: _item.categoryCode
            });
        }
        if (_result.length === 1) {
            return _result[0];
        }
        return _result;
    };

    /**
     * 批量添加数据字典项
     */
    DataDicts.prototype.pushDicts = function (items) {
        if (!items || !Array.isArray(items)) {
            itit.logger.debug("DataDict.pushAll error type ...");
            return;
        }
        var _this = this;
        var len = items.length;
        for (var i = 0; i < len; i++) {
            var _item = items[i];
            _this.pushDict(
                _item.code,
                _item.name,
                _item.value,
                _item.description,
                _item.categoryCode
            );
        }
    };

    /**
     * 导出对象
     * @type {DataDict}
     */
    window.itit.dataDicts = new DataDicts();
})(document, window, jQuery, window.itit);
