/*!
 Licensed under the MIT license

 Copyright (c) 2016 ItIt.Io

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 Any Problem , please contact <a href="mailto:yingosen@gmail.com">yingosen@gmail.com</a>

 */
(function (window, itit) {
    /**
     * 地域计算
     * @constructor
     */
    var Area = function () {
        this.__data__ = {};
    };
    /**
     * 追加地域数据到内存
     * @param data
     */
    Area.prototype.push = function (data) {
        var _this = this;
        if (typeof(data) !== "object") {
            return;
        }
        if (isNaN(parseInt(data.level))) {
            return;
        }
        var key = data.level.toString();
        var temp = _this.__data__[key];
        if (!Array.isArray(temp)) {
            temp = [];
        }
        temp.push(data);
        _this.__data__[key] = temp;
    };
    /**
     * 批量追加地域数据
     * @param datas
     */
    Area.prototype.pushAll = function (datas) {
        var _this = this;
        if (!Array.isArray(datas)) {
            return;
        }
        datas.forEach(function (data) {
            _this.push(data);
        });
    };

    /**
     * 通过层级和父级id获取地域数据
     * @param level
     * @param parent
     * @returns {Array}
     */
    Area.prototype.getData = function (level, parent) {
        var _this = this;
        if (!level) {
            return [];
        }
        var key = level.toString();
        var temp = _this.__data__[key];
        if (!Array.isArray(temp)) {
            return [];
        }
        var datas = [];
        if (parent === 0) {
            return datas;
        }
        temp.forEach(function (data) {
            if (!!parent && data.parent != parent) {
                return;
            }
            datas.push({
                id: data.id,
                name: data.name,
                parent: data.parent,
                level: data.level
            });
        });
        return datas;
    };

    /**
     * 初始化滚动组件
     * @param provinceId
     * @param cityId
     * @param regionId
     * @param withDefault
     */
    Area.prototype.mobiscroll = function (provinceId, cityId, regionId, withDefault) {
        areaMobiscroll.refresh(provinceId, cityId, regionId, withDefault);
    };
    /**
     * 获取滚动组件默认值
     * @returns {[*,*,*]}
     */
    Area.prototype.defualtValue = function () {
        return [
            areaMobiscroll.defaultValue.province,
            areaMobiscroll.defaultValue.city,
            areaMobiscroll.defaultValue.region
        ]
    };

    /**
     * 获取滚动列表的列表数据
     * @returns {[*,*,*]}
     */
    Area.prototype.scrollData = function () {
        return [areaMobiscroll.__data__.province, areaMobiscroll.__data__.city, areaMobiscroll.__data__.region];
    };

    /**
     * 选择省份后调用该事件
     * @param provinceId 省份id
     * @param changed   是否由组件调用
     * @returns {[*,*]}
     */
    Area.prototype.changeProvince = function (provinceId, changed) {
        areaMobiscroll.city(provinceId, changed);
        return [areaMobiscroll.__data__.city, areaMobiscroll.__data__.region];
    };
    /**
     * 选择城市后调用该事件
     * @param cityId 城市id
     * @param changed   是否由组件调用
     * @returns {[*,*]}
     */
    Area.prototype.changeCity = function (cityId, changed) {
        areaMobiscroll.region(cityId, changed);
        return [areaMobiscroll.__data__.region];
    };
    /**
     * 选择县区后调用该事件
     * @param regionId 城市id
     */
    Area.prototype.changeRegion = function (regionId) {
        areaMobiscroll.defaultValue.region = regionId;
    };

    /**
     * 获取滚动组件数据
     * @param idxs
     * @returns {{province: number, city: number, region: number, text: string}}
     */
    Area.prototype.getVal = function () {
        var _provinceId = 0;
        var _cityId = 0;
        var _regionId = 0;
        var _province = {};
        var _city = {};
        var _region = {};
        areaMobiscroll.__data__.province.data.forEach(function (item) {
            if (item.value == areaMobiscroll.defaultValue.province) {
                _province = item;
                _provinceId = parseIntWithDefault(item.value, 0);
                return true;
            }
        });
        areaMobiscroll.__data__.city.data.forEach(function (item) {
            if (item.value == areaMobiscroll.defaultValue.city) {
                _city = item;
                _cityId = parseIntWithDefault(item.value, 0);
                return true;
            }
        });
        areaMobiscroll.__data__.region.data.forEach(function (item) {
            if (item.value == areaMobiscroll.defaultValue.region) {
                _region = item;
                _regionId = parseIntWithDefault(item.value, 0);
                return true;
            }
        });
        var text = [];
        text.push("全国");
        if (!!_province.display) {
            text = [];
            text.push(_province.display);
        }
        if (!!_city.display && _cityId > 0) {
            text.push(" ");
            text.push(_city.display);
        }
        if (!!_region.display && _regionId > 0) {
            text.push(" ");
            text.push(_region.display);
        }
        return {
            provinceId: _provinceId,
            provinceName: _province.display,
            cityId: _cityId,
            cityName: _city.display,
            regionId: _regionId,
            region: _region.display,
            text: text.join("")
        };
    };

    /**
     * 定义滚动组件数据对象
     * @constructor
     */
    var AreaMobiscroll = function () {
        this.defaultValue = {
            province: 0,
            city: 0,
            region: 0
        };
        this.__withDefault__ = false;
        this.__data__ = {
            province: {label: "省份", data: []},
            city: {label: "城市", data: []},
            region: {label: "区县", data: []}
        }
    };

    /**
     * 刷新滚动组件数据
     * @param provinceId
     * @param cityId
     * @param regionId
     * @param withDefault 是否不全默认数据[全国/所有市/所有区域]
     */
    AreaMobiscroll.prototype.refresh = function (provinceId, cityId, regionId, withDefault) {
        var _this = this;
        var _provinceId = parseIntWithDefault(provinceId, 0);
        var _cityId = parseIntWithDefault(cityId, 0);
        var _regionId = parseIntWithDefault(regionId, 0);
        this.defaultValue = {
            province: _provinceId,
            city: _cityId,
            region: _regionId
        };
        this.__withDefault__ = (withDefault === true);
        _this.province();
    };

    /**
     * 刷新省份滚动数据
     */
    AreaMobiscroll.prototype.province = function () {
        var _this = this;
        var __datas__ = itit.area.getData(1);
        _this.__data__.province.data = [];
        if (_this.__withDefault__ === true) {
            _this.__data__.province.data.push({
                value: "#0",
                display: "全国"
            });
        }
        __datas__.forEach(function (item) {
            _this.__data__.province.data.push({
                value: item.id.toString(),
                display: item.name
            });
        });
        var _provinceId = parseIntWithDefault(_this.defaultValue.province, 0);
        if (_provinceId === 0) {
            _provinceId = _this.__data__.province.data[0].value;
        }
        _this.city(_provinceId);
    };

    /**
     * 刷新城市滚动数据
     * @param provinceId
     * @param changed
     */
    AreaMobiscroll.prototype.city = function (provinceId, changed) {
        var _this = this;
        var __datas__ = itit.area.getData(2, provinceId);
        _this.__data__.city.data = [];
        if (_this.__withDefault__ === true) {
            _this.__data__.city.data.push({
                value: "#" + provinceId,
                display: "全部"
            });
        }
        __datas__.forEach(function (item) {
            _this.__data__.city.data.push({
                value: item.id.toString(),
                display: item.name
            });
        });
        var _cityId = 0;
        if (changed !== true) {
            _cityId = parseIntWithDefault(_this.defaultValue.city, 0);
        }
        if (_cityId === 0 && _this.__data__.city.data.length > 0) {
            _cityId = _this.__data__.city.data[0].value;
        }
        _this.defaultValue.province = provinceId;
        _this.region(_cityId, changed);
    };

    /**
     * 刷新区县滚动数据
     * @param cityId
     * @param changed
     */
    AreaMobiscroll.prototype.region = function (cityId, changed) {
        var _this = this;
        var __datas__ = itit.area.getData(3, cityId);
        _this.__data__.region.data = [];
        if (_this.__withDefault__ === true) {
            _this.__data__.region.data.push({
                value: "#" + cityId,
                display: "全部"
            });
        }
        __datas__.forEach(function (item) {
            _this.__data__.region.data.push({
                value: item.id.toString(),
                display: item.name
            });
        });
        var _regionId = 0;
        if (changed !== true) {
            _regionId = parseIntWithDefault(_this.defaultValue.region, 0);
        }
        if (_regionId === 0 && _this.__data__.region.data.length > 0) {
            _regionId = _this.__data__.region.data[0].value;
        }

        _this.defaultValue.city = cityId;
        _this.defaultValue.region = _regionId;
    };
    /**
     * 实例化滚动组件数据对象
     * @type {AreaMobiscroll}
     */
    var areaMobiscroll = new AreaMobiscroll();
    /**
     * 实例化地域滚动对象
     * @type {AreaMobiscroll}
     */
    itit.area = new Area();
})(window, window.itit);