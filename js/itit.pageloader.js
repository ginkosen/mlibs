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
!!(function () {
    // 判断v1是否大于v2
    Handlebars.registerHelper("compare", function (v1, v2, options) {
        if (v1 > v2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    Handlebars.registerHelper("stringEmpty", function (value, options) {
        if (!value || value.trim().length === 0) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    Handlebars.registerHelper("dataDict", function (category, value) {
        if (category === null || category === undefined || value === null
            || value === undefined) {
            return;
        }
        var _val = itit.dataDicts.getDictByValue(category, value);
        if (!_val) {
            return value;
        }
        return _val.name;
    });
    // 判断是否相等
    Handlebars.registerHelper("equal", function (v1, v2, options) {
        if (v1 == v2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    // 判断是否相等
    Handlebars.registerHelper("noequal", function (v1, v2, options) {
        if (v1 != v2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    // 格式化日期
    Handlebars.registerHelper("formatDate", function (value) {
        return Date.format(value, "yyyy-MM-dd");
    });
    // 格式化日期时间
    Handlebars.registerHelper("formatDateTime", function (value) {
        return Date.format(value, "yyyy-MM-dd hh:mm");
    });
    // 格式化按照格式格式化
    Handlebars.registerHelper("formatDateByPattern", function (value, pattern) {
        return Date.format(value, pattern);
    });
    // 格式化时间
    Handlebars.registerHelper("formatTime", function (value) {
        return Date.format(value, "hh:mm");
    });
    Handlebars.registerHelper("getAppellative", function (value) {
        if (value == 1) {
            return "先生";
        }
        if (value == 2) {
            return "女式";
        }
        return "";
    });
    Handlebars.registerHelper("dateDifference", function (value) {
        var date = new Date(parseInt(value, 10));
        var now = new Date();
        return Math.floor((now.getTime() - date.getTime()) / (3600 * 24 * 1000));
    });
    Handlebars.registerHelper("formatPenny", function (value) {
        value = parseInt(value);
        if (isNaN(value)) {
            value = 0;
        }
        return (value / 100).toFixed(2);
    });
    Handlebars.registerHelper("formatSecond", function (value) {
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
    });
    Handlebars.registerHelper("dateDiff", function (value) {
        var date = new Date(parseInt(value, 10));
        var now = new Date();
        var diffDay = Math.floor((now.getTime() - date.getTime()) / 1000);
        var _diff = Date.format(value, "yyyy-MM-dd hh:mm");
        if (diffDay < 60) {
            _diff = "1分钟前"
        } else if (diffDay < 5 * 60) {
            _diff = "5分钟前"
        } else if (diffDay < 10 * 60) {
            _diff = "10分钟前"
        } else if (diffDay < 20 * 60) {
            _diff = "20分钟前"
        } else if (diffDay < 30 * 60) {
            _diff = "30分钟前"
        } else if (diffDay < 60 * 60) {
            _diff = "1小时前"
        } else if (diffDay < 2 * 60 * 60) {
            _diff = "2小时前"
        } else if (diffDay < 3 * 60 * 60) {
            _diff = "3小时前"
        } else if (diffDay < 12 * 60 * 60) {
            _diff = "12小时前"
        } else if (diffDay < 24 * 60 * 60) {
            _diff = "24小时前"
        }
        return _diff;
    });
    Handlebars.registerHelper("caculateCollectPercent", function (curr, total) {
        return ((curr / total) * 100).toFixed(2);
    });
    Handlebars.registerHelper("equalTotal", function (v1, v2, v3, options) {
        var percent = v1 / v2;
        if (percent == v3) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
})();
/**
 * PageLoader 实现类
 */
!!(function (document, window, $) {
    var PageLoader = function (url, parmaters, targetSelector, templateSelector, autoNext, pageBeforeCallback, pageAfterCallback) {
        this.__url__ = url;
        this.__parmaters__ = parmaters || {};
        this.__dataContainerSelector__ = targetSelector + " .data-container";
        this.__dataLoadSelector__ = targetSelector + " .data-loading";
        this.__dataNoTipSelector__ = targetSelector + " .data-no-tip";
        this.__dataNoMoreTipSelector__ = targetSelector + " .data-no-more-tip";
        this.__templateSelector__ = templateSelector;
        this.__currentPage__ = 0;
        this.__pageSize__ = parseIntWithDefault(parmaters.pageSize, 10);
        this.__loading__ = false;
        this.__finished__ = false;
        this.__autoNext__ = (autoNext === true);
        this.__templateHandebars__ = undefined;
        this.__pageBeforeCallback__ = pageBeforeCallback;
        this.__pageAfterCallback__ = pageAfterCallback;
        this.__onscroll__ = "scroll.event.PageLoader";
        this.__init__();
    };

    /**
     * 初始化PageLoader
     *
     * @private
     */
    PageLoader.prototype.__init__ = function () {
        var _this = this;
        if (_this.__autoNext__ === true) {
            $(window).on(_this.__onscroll__, function () {
                var $this = $(this);
                if ($this.scrollTop() + $this.height() === $(document).height()) {
                    _this.loadNextPage.call(_this);
                }
            });
        }
        var source = $(_this.__templateSelector__).html();
        _this.__templateHandebars__ = Handlebars.compile(source);
        $(_this.__dataLoadSelector__).hide(0);
        $(_this.__dataNoTipSelector__).hide(0);
        $(_this.__dataNoMoreTipSelector__).hide(0);
    };

    /**
     * 加载数据
     */
    PageLoader.prototype.loadData = function (params) {
        var _this = this;
        _this.__loading__ = true;
        _this.__parmaters__ = $.extend({}, _this.__parmaters__, params);
        var _params = $.extend({
            pageIndex: _this.__currentPage__,
            pageSize: _this.__pageSize__
        }, _this.__parmaters__);
        $(_this.__dataNoTipSelector__).hide(0);
        $(_this.__dataNoMoreTipSelector__).hide(0);
        $(_this.__dataLoadSelector__).show(0);
        itAjax().action(_this.__url__).params(_params).success(function (data) {
            _this.__loading__ = false;
            if (data.errorCode != 0) {
                itit.dialog.error("错误:" + data.code + ",请稍后重试");
                return;
            }
            var _list = [];
            if (typeof(_this.__pageBeforeCallback__) === "function") {
                _list = _this.__pageBeforeCallback__.call(_this, data);
            } else {
                _list = data.list;
            }
            if (!Array.isArray(_list)) {
                _list = [];
            }
            if (_list.length > 0) {
                if (_this.__currentPage__ === 0) {
                    $(_this.__dataContainerSelector__).html(_this.__templateHandebars__({
                        list: _list
                    }));
                } else {
                    $(_this.__dataContainerSelector__).append(_this.__templateHandebars__({
                        list: _list
                    }));
                }
                _this.__currentPage__++;
                if (_list.length <= _this.__pageSize__) {
                    $(_this.__dataLoadSelector__).hide(0);
                }
            } else {
                if (_this.__currentPage__ === 0) {
                    $(_this.__dataNoTipSelector__).show(0);
                } else {
                    $(_this.__dataNoMoreTipSelector__).show(0);
                }
                $(_this.__dataLoadSelector__).hide(0);
                _this.__finished__ = true;
            }
            if (typeof(_this.__pageAfterCallback__) === "function") {
                _this.__pageAfterCallback__.call(_this, data);
            }
        }).complete(function () {
            _this.__loading__ = false;
        }).invoke();
    };

    /**
     * 重新加载数据
     */
    PageLoader.prototype.reloadData = function (params) {
        var _this = this;
        $(_this.__dataContainerSelector__).empty();
        _this.__currentPage__ = 0;
        _this.__finished__ = false;
        _this.loadData(params);
    };

    /**
     * 加载下一页数据
     */
    PageLoader.prototype.loadNextPage = function () {
        var _this = this;
        if (_this.__loading__ || _this.__finished__) {
            return;
        }
        _this.loadData();
    };

    /**
     * 销毁,禁用滚动事件,移除下一页数据加载
     */
    PageLoader.prototype.disable = function () {
        var _this = this;
        $(window).off(_this.__onscroll__);
    };

    /**
     * 销毁,禁用滚动事件,移除下一页数据加载
     */
    PageLoader.prototype.enable = function () {
        var _this = this;
        $(window).off(_this.__onscroll__).on(_this.__onscroll__, function () {
            var $this = $(this);
            if ($this.scrollTop() + $this.height() === $(document).height()) {
                _this.loadNextPage.call(_this);
            }
        });
    };

    /**
     *
     * @returns {{pageIndex: number, pageSize: *}}
     */
    PageLoader.prototype.getPage = function () {
        var _this = this;
        return {
            pageIndex: _this.__currentPage__,
            pageSize: _this.__pageSize__
        }
    }

    /**
     * 导出局部类到全局
     * @type {PageLoader}
     */
    window.PageLoader = PageLoader;
})(document, window, jQuery);