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
!!(function (window, $, itit) {
    $("body").on("vmouseover", ".hover-event", function () {
        var event = arguments[0] || window.event;
        event.preventDefault();
        var $this = $(this);
        var _class = $this.data("hover-class");
        if (!_class || _class.toString().trim().length === 0) {
            _class = "hover";
        }
        $this.addClass(_class);
    }).on("vmouseout", ".hover-event", function () {
        var event = arguments[0] || window.event;
        event.preventDefault();
        var $this = $(this);
        var _class = $this.data("hover-class");
        if (!_class || _class.toString().trim().length === 0) {
            _class = "hover";
        }
        $this.removeClass(_class);
    }).on("tap", ".href-event", function () {
        var event = arguments[0] || window.event;
        event.preventDefault();
        var $this = $(this);
        var _disabled = $this.data("disabled");
        if (_disabled === "disabled") {
            return;
        }
        var _href = $this.data("href");
        var _target = $this.data("target");
        if (!_href) {
            itit.logger.debug("unknow data-href for ", $this[0]);
            return;
        }
        _href = window.location.assembleHref(_href);
        if (_target === "blank") {
            window.open(_href);
            return;
        }
        window.location.href = _href;
    }).on("tap", ".tel-event", function () {
        var event = arguments[0] || window.event;
        event.preventDefault();
        var $this = $(this);
        var _disabled = $this.data("disabled");
        if (_disabled === "disabled") {
            return;
        }
        var _tel = $this.data("tel");
        if (!_tel) {
            itit.logger.debug("unknow data-tel for ", $this[0]);
            return;
        }
        window.location = "tel:" + _tel;
    }).on("tap", ".data-tips", function () {
        var event = arguments[0] || window.event;
        event.preventDefault();
        event.stopImmediatePropagation();
        var $this = $(this);
        var _tips = $this.data("tips");
        if (!_tips || _tips.trim().length === 0) {
            return;
        }
        layer.tips($this.data("tips"), $this, {
            tips: [1, "#358ed7"],
            time: 3e3
        });
    }).on("tap", ".data-event", function () {
        var event = arguments[0] || window.event;
        event.preventDefault();
        var $this = $(this);
        var _disabled = $this.data("disabled");
        if (_disabled === "disabled") {
            return;
        }
        var _handler = $this.data("handler");
        if (!_handler) {
            itit.logger.debug("unknow data-handler for " + _handler + " on ", $this[0]);
            return;
        }
        if (typeof(itit[_handler]) !== "function") {
            itit.logger.debug("notfound data-handler function for " + _handler + " on ", $this[0]);
            return;
        }
        itit[_handler].call($this);
    }).on("tap", ".btn-layer-show-event", function () {
        var event = arguments[0] || window.event;
        event.preventDefault();
        var $this = $(this);
        var $selector = $($this.data("selector"));
        if ($selector.length === 0) {
            return;
        }
        var _aw = $selector.data("width");
        var _ah = $selector.data("height");
        var _awf = parseFloat(_aw);
        var _ahf = parseFloat(_ah);
        var _area = [];
        if (isNaN(_awf)) {
            _area.push("auto");
        } else {
            _area.push(_aw);
        }
        if (isNaN(_ahf)) {
            _area.push("auto");
        } else {
            _area.push(_ah);
        }
        var idx = layer.open({
            type: 1,
            offset: "120px",
            area: _area,
            title: false,
            resize: false,
            content: $selector,
            cancel: function () {
                setTimeout(function () {
                    $selector.addClass("hide").data("layer-index", "");
                }, 500);
            }
        });
        $selector.removeClass("hide").data("layer-index", idx);
    }).on("tap", ".btn-layer-close-event", function () {
        var event = arguments[0] || window.event;
        event.preventDefault();
        var $this = $(this);
        var $selector = $($this.data("selector"));
        if ($selector.length === 0) {
            return;
        }
        var _idx = $selector.data("layer-index");
        _idx = parseInt(_idx);
        if (isNaN(_idx)) {
            return;
        }
        layer.close(_idx);
        $selector.addClass("hide").data("layer-index", "");
    });

})(window, jQuery, window.itit);