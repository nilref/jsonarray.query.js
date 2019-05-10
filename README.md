# JsonArray.Query.js
<p>对JSON数组进行简单查询的js插件</p>

# 使用方法
``` javascript
// example
var arr = [
            {"code":"000001","name":"上证指数","type":"指数","value":1000},
            {"code":"000002","name":"A股指数","type":"指数","value":2000},
            {"code":"000003","name":"B股指数","type":"指数","value":3000}
          ];

// 查询 code 大于 "000002" 并且 name 等于 "B股指数" 的数据，参数名前要加上符号 "@"
// 查询语法关键词(用过sql的都懂的)：AND OR <> NOT = > < >= <= 
// 也可自己在代码中扩展自定义查询语法
arr.Query('@code>="000002" OR @value=3000'); 
return [{...},{...},...];
// 取数组第一个元素
arr.Query('@code>="000002" OR @value=3000').First(); 
return {...};
// 按照表达式输出结果
arr.Select('@code,@value=3000,"nametype":@name+"#"+@type'); 
return [{"code":"000001","value":"1000","nametype":"上证指数#指数"},{...},...];
// 按照表达式拼接字符串
arr.Join('@name+"#"+@type','|'); 
return "上证指数#指数|A股指数#指数|B股指数#指数";
// 查询第一个符合条件的元素的下标
arr.IndexOf('@code>="000002"');
return 1;
// 删除并返回符合条件的元素
arr.Remove('@code>="000002" OR @value=3000');
return [{...},{...},...];
// 正序
arr.OrderBy("code"); 
return [{...},{...},...];
// 倒序
arr.OrderByDesc("code"); 
return [{...},{...},...];
// 遍历
JSONArray.Each(function(index,item){...});
// 是否包含指定元素
JSONArray.Contains('test'); 
return true|false;
// 返回指定数量的元素
JSONArray.Take(3); 
return [{...},{...},{...}];
// 求和
JSONArray.Sum('@colname1'); 
return 64;
JSONArray.Sum('@colname1 + @colname1'); 
return 128;
// 去重
JSONArray.Distinct(); 
return [{...},{...},...];
// 分组查询
JSONArray.GroupBy('@colname1,@colname2'); 
return [{colname1:"test",colename2:999,Data:[{...},...]},{...},...];
```

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).
