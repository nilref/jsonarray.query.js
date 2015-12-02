//JSON数组 查询插件
/*
* JSONArray.Query('@colname="val"') return [...];
* AND OR <> NOT = > < >= <=
*/
(function () {
    var len = function (s) {
        return s.length;
    }
    var left = function (s, n) {
        return s.substr(0, n);
    }
    var right = function (s, n) {
        return s.substr(-n);
    }
    var index = function (s, find) {
        return s.indexOf(find) + 1;
    }
    var _proto = Array.prototype;

    // 编译后的缓存，提升效率
    var _cache = {};
    // 自定义运算符：JS运算符
    var _alias = [
        /@/g, "_e.",
        /AND/gi, "&&",
        /OR/gi, "||",
        /<>/g, "!=",
        /NOT/gi, "!",
        /([^=<>])=([^=]|$)/g, '$1==$2',
        /([^=<>])>([^=]|$)/g, '$1>$2',
        /([^=<>])<([^=]|$)/g, '$1<$2',
        /([^=<>])>=([^=]|$)/g, '$1>=$2',
        /([^=<>])<=([^=]|$)/g, '$1<=$2'
    ];
    var _rQuote = /""/g;
    var _rQuoteTemp = /!~/g;
    // 编译自定义语法
    var _complite = function (code) {
        return eval("0," + code);
    }
    // 将自定义语法转成JS语法
    var _interpret = function (exp) {
        exp = exp.replace(_rQuote, "!~");
        var arr = exp.split('"');
        var i,
        n = arr.length;
        var k = _alias.length;
        for (var i = 0; i < n; i += 2) {
            var s = arr[i];
            for (var j = 0; j < k; j += 2) {
                if (index(s, _alias[j]) > -1) {
                    s = s.replace(_alias[j], _alias[j + 1]);
                }
            }
            arr[i] = s;
        }
        for (var i = 1; i < n; i += 2) {
            arr[i] = arr[i].replace(_rQuoteTemp, '\\"');
        }
        return arr.join('"');
    }
    // 定义模函数
    var _templ = function (_list) {
        var _ret = [];
        var _i = -1;
        for (var _k in _list) {
            var _e = _list[_k];
            if (_e != _proto[_k]) {
                if ($C) {
                    _ret[++_i] = _e;
                }
            }
        }
        return _ret;
    }
    .toString();
    // 扩展查询的方法
    _proto.Query = function (exp) {
        if (!exp) {
            return [];
        }
        var fn = _cache[exp];
        try {
            if (!fn) {
                var code = _interpret(exp);
                code = _templ.replace("$C", code);
                fn = _cache[exp] = _complite(code);
            }
            return fn(this);
        } catch (e) {
            return [];
        }
    }

    // 正序排序
    _proto.OrderBy = function (proname) {
        return _objArrSort(this, proname);
    }

    // 倒序排序
    _proto.OrderByDesc = function (proname) {
        return _objArrSort(this, proname).reverse();
    }

    // 对象数组排序  proname:"排序的字段"
    function _objArrSort(objArr, proname) {
        if (!objArr || objArr.length == 0)
            return [];
        if (!proname || proname == "")
            return objArr;

        var tmpObj = {};
        for (var i = 0; i < objArr.length - 1; i++) {
            for (var c = 0; c < objArr.length - 1 - i; c++) {
                if (objArr[c][proname] > objArr[c + 1][proname]) {
                    tmpObj = objArr[c];
                    objArr[c] = objArr[c + 1];
                    objArr[c + 1] = tmpObj;
                }
            }
        }
        return objArr;
    }
})();
