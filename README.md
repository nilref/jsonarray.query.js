# JsonArray.Query.js
<p>对JSON数组进行简单查询的js插件</p>
<p>项目主页：<a href="http://mahatmasmile.github.io/JsonArray.Query.js/">http://mahatmasmile.github.io/JsonArray.Query.js/</a></p>

# 使用方法
``` javascript
// example
var arr = [
            {"code":"000001","name":"上证指数","type":"指数"},
            {"code":"000002","name":"A股指数","type":"指数"},
            {"code":"000003","name":"B股指数","type":"指数"}
          ];
// 正序
arr.OrderBy("code"); 
// 倒序
arr.OrderByDesc("code"); 
// 查询 code 大于 "000002" 并且 name 等于 "B股指数" 的数据，参数名前要加上符号 "@"
// 查询语法关键词(用过sql的都懂的)：AND OR <> NOT = > < >= <= 
// 也可自己在代码中扩展自定义查询语法
arr.Query('@code>="000002" AND @name="B股指数"'); 
```
