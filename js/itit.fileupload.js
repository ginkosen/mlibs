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
 * @date 2016-06-07 10:23
 */
!!(function (window, $, itit) {
    //引用实例
    var __fileuploads__ = {};
    $.fn.uploadfile = function () {
        var $this = $(this);
        var _key = $this.data("fileupload-id");
        if (!_key) {
            _key = "fileupload-" + new Date().getTime();
            $this.data("fileupload-id", _key);
        }
        var fileupload = __fileuploads__[_key];
        if (!fileupload) {
            fileupload = new FileUpload();
            fileupload.__selector__($this.selector);
            __fileuploads__[_key] = fileupload;
        }
        this.fileupload = fileupload;
        this.config = function (options) {
            var _this = this;
            _this.fileupload.config(options);
            return _this;
        };
        this.action = function (_action) {
            var _this = this;
            _this.fileupload.action(_action);
            return _this;
        };
        this.method = function (_method) {
            var _this = this;
            _this.fileupload.method(_method);
            return _this;
        };
        this.addFile = function (callback) {
            var _this = this;
            _this.fileupload.addFile(callback);
            return _this;
        };
        this.upload = function (callback) {
            var _this = this;
            _this.fileupload.upload(callback);
            return _this;
        };
        this.success = function (callback) {
            var _this = this;
            _this.fileupload.success(callback);
            return _this;
        };
        this.error = function (callback) {
            var _this = this;
            _this.fileupload.error(callback);
            return _this;
        };
        this.complete = function (callback) {
            var _this = this;
            _this.fileupload.complete(callback);
            return _this;
        };
        this.progress = function (callback) {
            var _this = this;
            _this.fileupload.progress(callback);
            return _this;
        };
        this.bind = function () {
            var _this = this;
            _this.fileupload.bind.apply(_this.fileupload);
            return _this;
        };
        this.destory = function () {
            var _this = this;
            var $this = $(this);
            var _key = $this.data("fileupload-id");
            var _fileupload = __fileuploads__[_key];
            if (!!_fileupload) {
                _fileupload.destory();
            }
            delete __fileuploads__[_key];
            delete this[_this.fileupload];
            return _this;
        };
        return this.each(function () {
        });
    };

    /**
     * 文件上传
     * @constructor
     */
    var FileUpload = function () {
        this.inputSelector = undefined;
        this.url = undefined;
        this.paramName = undefined;
        this.reqType = undefined;
        this.resDataType = undefined;
        this.maxFileSize = undefined;
        this.maxNumberOfFiles = undefined;
        this.acceptFileTypes = undefined;
        this.compress = false;
        this.onsuccess = undefined;
        this.onupload = undefined;
        this.onerror = undefined;
        this.oncomplete = undefined;
        this.onprogress = undefined;
        this.refresh();
    };

    /**
     * 全局配置项
     * @type {{}}
     */
    FileUpload.options = {
        compress: {
            enable: true,
            quality: 0.7
        },
        upload: {
            paramName: "file",
            type: "POST",
            dataType: "JSON",
            maxNumberOfFiles: 1,
            maxFileSize: 4096000,
            acceptFileTypes: {
                all: "*/*",
                images: "image/(jpg|jpeg|png)"
            },
            callbacks: {
                success: function () {

                },
                error: function () {

                },
                complete: function () {

                }
            }
        }
    };

    /**
     * 系统初始化
     * @private
     */
    FileUpload.prototype.refresh = function () {
        var _this = this;
        _this.inputSelector = undefined;
        _this.url = undefined;
        _this.paramName = FileUpload.options.upload.paramName;
        _this.reqType = FileUpload.options.upload.type;
        _this.resDataType = FileUpload.options.upload.dataType;
        _this.maxFileSize = FileUpload.options.upload.maxFileSize;
        _this.maxNumberOfFiles = FileUpload.options.upload.maxNumberOfFiles;
        _this.acceptFileTypes = FileUpload.options.upload.acceptFileTypes.all;
        _this.compress = FileUpload.options.compress.enable;
        _this.compressQuality = FileUpload.options.compress.quality;
        _this.onAddFile = undefined;
        _this.onsuccess = undefined;
        _this.onupload = undefined;
        _this.onerror = undefined;
        _this.oncomplete = undefined;
        _this.onprogress = undefined;
    };

    /**
     * 设定
     * @param inputSelector
     */
    FileUpload.prototype.__selector__ = function (inputSelector) {
        var _this = this;
        _this.inputSelector = inputSelector;
        return _this;
    };

    /**
     * 配置数据
     * @param
     * options = {
     *  compress:true,                      //是否启用压缩
     *  quality:.7;                         //压缩率 (0.0 ~ 1.0)
     *  paramName:"file",                   //上传文件发送名称
     *  reqType:"POST",                     //上传文件请求方式
     *  resDataType:"JSON",                 //上传文件回包格式
     *  maxFileSize:4096000,                //上传文件大小限制(如果启用压缩,则判定压缩后的大小)
     *  maxNumberOfFiles:1,                 //上传文件个数
     *  acceptFileTypes:"/^image\/*$/"      //上传文件格式限制
     * }
     */
    FileUpload.prototype.config = function (options) {
        var _this = this;
        var $options = $.extend({}, options);
        var _compress = $options.compress;
        if (_compress !== true && _compress !== false) {
            _compress = FileUpload.options.compress.enable;
        }
        var _quality = parseInt($options.quality);
        if (isNaN(_quality) || _quality > 1.0 || _quality < 0) {
            _quality = FileUpload.options.compress.quality;
        }
        _this.compress = _compress;
        _this.compressQuality = _quality;
        _this.paramName = $options.paramName || FileUpload.options.upload.paramName;
        _this.reqType = $options.type || FileUpload.options.upload.type;
        _this.resDataType = $options.dataType || FileUpload.options.upload.dataType;
        _this.maxFileSize = $options.maxFileSize || FileUpload.options.upload.maxFileSize;
        _this.maxNumberOfFiles = $options.maxNumberOfFiles || FileUpload.options.upload.maxNumberOfFiles;
        _this.acceptFileTypes = $options.acceptFileTypes || FileUpload.options.upload.acceptFileTypes.all;
        return _this;
    };

    /**
     * 设定请求路径
     * @param url
     * @returns {FileUpload}
     */
    FileUpload.prototype.action = function (url) {
        var _this = this;
        _this.url = url;
        return _this;
    };
    /**
     * 设定请求类型
     * @param type
     * @returns {FileUpload}
     */
    FileUpload.prototype.method = function (type) {
        var _this = this;
        _this.type = type;
        return _this;
    };

    /**
     * 开始上传调用
     * @param callback
     */
    FileUpload.prototype.upload = function (callback) {
        var _this = this;
        _this.onupload = callback;
        return _this;
    };

    /**
     * 添加文件后调用
     * @param callback
     */
    FileUpload.prototype.addFile = function (callback) {
        var _this = this;
        _this.onAddFile = callback;
        return _this;
    };

    /**
     * 执行成功回调
     * @param callback
     */
    FileUpload.prototype.success = function (callback) {
        var _this = this;
        _this.onsuccess = callback;
        return _this;
    };

    /**
     * 调用报错回调
     * @param callback
     */
    FileUpload.prototype.error = function (callback) {
        var _this = this;
        _this.onerror = callback;
        return _this;
    };

    /**
     * 调用完成回调
     * @param callback
     */
    FileUpload.prototype.complete = function (callback) {
        var _this = this;
        _this.oncomplete = callback;
        return _this;
    };
    /**
     * 上传进度
     * @param callback
     */
    FileUpload.prototype.progress = function (callback) {
        var _this = this;
        _this.onprogress = callback;
        return _this;
    };

    /**
     * 上传完成操作
     * @private
     */
    FileUpload.prototype.__done__ = function () {
        var _this = this;
        return _this;
    };

    /**
     * 图片压缩
     * @private
     */
    FileUpload.prototype.__compress__ = function (data) {
        var _this = this;
        var _files = data.files;
        if (!_files || _files.length === 0) {
            itit.dialog.info("请选择上传的文件");
            if (typeof(_this.onerror) === "function") {
                _this.onerror.apply(this);
            }
            if (typeof(_this.oncomplete) === "function") {
                _this.oncomplete.apply(this);
            }
            return;
        }
        var file = _files[0];
        if (!file) {
            itit.dialog.info("请选择上传的文件");
            if (typeof(_this.onerror) === "function") {
                _this.onerror.apply(this);
            }
            if (typeof(_this.oncomplete) === "function") {
                _this.oncomplete.apply(this);
            }
            return;
        }
        var _error = _this.onerror || FileUpload.options.upload.callbacks.error;
        var _fileType = file.type;
        var _reg = new RegExp(_this.acceptFileTypes);
        if (!_reg.test(_fileType)) {
            itit.dialog.error("上传的文件类型错误");
            if (typeof(_this.onerror) === "function") {
                _this.onerror.apply(this);
            }
            if (typeof(_this.oncomplete) === "function") {
                _this.oncomplete.apply(this);
            }
            return;
        }
        var _fileName = file.name;
        if (_this.compress) {
            lrz(file, {quality: _this.compressQuality}).then(function (rst) {
                file = rst.file;
                file.name = _fileName;
                data.files = [];
                data.files.push(file);
                _this.__upload__(data);
            }).catch(function (err) {
                if (typeof(_error) === "function") {
                    _error.callback(null, err, data);
                } else {
                    itit.logger.error(err);
                }
            });
            return _this;
        }
        _this.__upload__(data);
        return _this;
    };

    /**
     * 文件上传
     * @param data
     * @private
     */
    FileUpload.prototype.__upload__ = function (data) {
        var _this = this;
        var _files = data.files;
        if (!_files || _files.length === 0) {
            itit.dialog.info("请选择上传的文件");
            if (typeof(_this.onerror) === "function") {
                _this.onerror.apply(this);
            }
            if (typeof(_this.oncomplete) === "function") {
                _this.oncomplete.apply(this);
            }
            return;
        }
        var file = _files[0];
        if (!file) {
            itit.dialog.info("请选择上传的文件");
            if (typeof(_this.onerror) === "function") {
                _this.onerror.apply(this);
            }
            if (typeof(_this.oncomplete) === "function") {
                _this.oncomplete.apply(this);
            }
            return;
        }
        var _fileSize = file.size;
        if (_fileSize > _this.maxFileSize) {
            itit.dialog.info("文件大小超过限制");
            if (typeof(_this.onerror) === "function") {
                _this.onerror.apply(this);
            }
            if (typeof(_this.oncomplete) === "function") {
                _this.oncomplete.apply(this);
            }
            return;
        }
        var _upload = _this.onupload;
        if (typeof(_upload) === "function") {
            _upload.apply(_this);
        }
        $(_this.inputSelector).addClass("uploading-file-io-itit");
        data.process().done(function () {
            data.submit();
        });
    };

    /**
     * 绑定文件上传
     */
    FileUpload.prototype.bind = function () {
        var _this = this;
        if ($(_this.inputSelector).hasClass("uploading-file-io-itit")) {
            itit.dialog.info("文件正在上传，请稍后");
            return;
        }
        var _paramName = _this.paramName || FileUpload.options.upload.paramName;
        var _type = _this.reqType || FileUpload.options.upload.type;
        var _dataType = _this.resDataType || FileUpload.options.upload.dataType;
        var _maxNumberOfFiles = _this.maxNumberOfFiles || FileUpload.options.upload.maxNumberOfFiles;
        var _maxFileSize = _this.maxFileSize || FileUpload.options.upload.maxFileSize;
        var _acceptFileTypes = _this.acceptFileTypes || FileUpload.options.upload.acceptFileTypes.all;
        $(_this.inputSelector).fileupload({
            url: _this.url,
            paramName: _paramName,
            type: _type,
            dataType: _dataType,
            maxNumberOfFiles: _maxNumberOfFiles,
            maxFileSize: (_maxFileSize * 5),
            acceptFileTypes: _acceptFileTypes,
            add: function (e, data) {
                var _abort = false;
                if (typeof(_this.onAddFile) === "function") {
                    _abort = _this.onAddFile.apply(this, [data]);
                }
                if (_abort === true) {
                    if (typeof(_this.complete) === "function") {
                        _this.oncomplete.apply(null, [data]);
                    }
                    return;
                }
                _this.__compress__(data);
            },
            progress: function (e, data) {
                if (typeof(_this.onprogress) === "function") {
                    _this.onprogress.apply(this, [data]);
                }
            },
            done: function (e, data) {
                if (typeof(_this.onsuccess) === "function") {
                    _this.onsuccess.apply(this, [data]);
                }
                $(_this.inputSelector).removeClass("uploading-file-io-itit");
            },
            fail: function (e, data) {
                if (typeof(_this.onerror) === "function") {
                    _this.onerror(null, e, data);
                } else {
                    itit.logger.error(e);
                }
            },
            always: function (e, data) {
                if (typeof(_this.complete) === "function") {
                    _this.oncomplete.apply(null, [data]);
                }
                $(_this.inputSelector).removeClass("uploading-file-io-itit");
                _this.__done__();
            }
        });
    };

    /**
     * 销毁
     */
    FileUpload.prototype.destory = function () {
        var _this = this;
        $(_this.inputSelector).fileupload("destroy");
        _this.refresh();
        return _this;
    };

    /**
     * 导出到全局变量
     * @type {FileUpload}
     */
    window.FileUpload = FileUpload;
})(window, jQuery, window.itit);