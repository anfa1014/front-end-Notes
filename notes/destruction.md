解构是ES6中的新特性，本文的题目取自《深入理解ES6》的第五章！

## 什么是解构

* 解构是将原本的数据结构拆分为更小部分的过程
* ES6为对象和数组两种数据结构，提供了解构功能，将其打散为更小的部分，从中获取所需信息


举栗说明


```
 var obj = {
 	a: 1,
 	b: 2
 }
 var {a, b, c} = obj;// 解构对象obj
 
 console.log(a); // 1
 console.log(b); // 2
 console.log(c); // undefined
```

上栗中，变量`obj `具有两个属性`a`和`b`,栗子中的<font color="#4169E1">解构</font>发生在赋值语句中：`var {a, b, c} = obj`

首先，等号左侧出现了<span style="color:	#FF8C00;">花括号</span>，JS引擎会用解构对象的方式解构等号右侧，若等号左侧出现的是<span style="color:#FF8C00;">中括号</span>，则会用解构数组的方式解构等号左侧。栗子中是解构对象。


将对象obj进行分解，那分解的原则是什么？对象是一个无序的key-value集合，应当根据key分解对象，可以将obj分成两部分：`a`和`b`

接着，赋值语句的左侧出现了花括号`{}`。JS中花括号`{}`出现在两个地方：1.块级 2.对象。在这里，花括号与对象有关。`{}`中的变量的名字，对应着右侧对象中的key，变量的值是相应key的value

`var {a, b, c} = obj`可以理解如下：

```
var a = obj['a'],
	b = obj['b'],
	c = obj['c'];
```

以上是 最基本的 解构。

值得注意的是，如果被解构的是<span style="color:#DC143C;">null</span>和<span style="color:	#DC143C;">undefined</span>,会报TypeError。但是按照解构对象的规则，解构基本类型不会出错！因为，<span style="color:#DC143C;">null</span>和<span style="color:#DC143C;">undefined</span>不能对其设置属性，但是你可以对基本类型设置属性。实际上，并不是真的可以对基本类型设置属性，而是JS引擎会在给基本类型的变量设置属性时创建一个临时对应类型的对象，将属性添加到这个临时对象上。当语句执行完这个临时的对象就会被销毁！所以，解构一个基本类型，并不会报错，会创建一个临时对应类型的对象。

代码如下：


```
var num = 1;
var {a} = num;
console.log(a) // undefined

```

语句`var {a} = num` 执行过程如下： 


```
var obj = Number(num);
var a = obj.a;
obj = null; // 销毁obj，设置会为null，被垃圾回收机制收回

``` 

## 对象解构

对象解构，是按照解构对象的规则，将等号右侧的变量进行解构，然后赋值给等号左侧。


```
var obj = {
		a: 'a',
		b: 'b'
	},
	arr = [0,1,2];

var {a, b} = obj; // 按照对象解构的规则，解构对象obj
console.log(a,b) // a => 'a' , b => 'b'

var {length} = arr; //按照对象解构的规则，解构数组arr
console.log(length) // length => 3
```
在解构赋值过程中，如果左侧的变量名作为key，在右侧的变量自身属性不存在时，会通过原型链查找<span style="color:red;">!!!</span>

```
Object.prototype.a = 'a';
var obj = {};
var {a, b} = obj;
console.log(a,b) // a => 'a', b => undefined
```
对象解构中，还有两个小技巧

* 默认值

```
var obj ={
		a: 'a in obj'
	};
	
var {a='a', b='b', c} = obj;
console.log(a); //	a => 'a in obj',
conosle.log(b);	//	b => 'b'
console.log(c);	//	c => undefined	

```

* 重命名

```var
var obj = {
		a: 'a'
	};
var {a: aaa} = obj; // 将obj的属性a的值，赋予了变量aaa
console.log(aaa) // aaa => 'a' 
```

另外，假设被赋值的变量，已声明，则在对象解构赋值表达式最外层添加<span style="color: #FF8C00;">( )</span>

```
var obj = {};
....
var a = 0 ;
....
( {a} = obj ) // 代码通过
{a} = obj // 报错
```


## 数组解构
在数组解构中，我们通过值在数组 中的位置进行选取，并可以将其存储在任意变量中，未显示声明的元素都会被直接忽略，在整个过程中，数组本身不会发生任何变化。

```
var arr = [1,2,3];
var [first,,third] = arr;
console.log(first); // first => 1
console.log(third); // third => 3
```

实际上，只要被解构的变量是可以循环迭代，即具有Iterator接口，就可以进行数组解构。

* set

```
var [first, second] = new Set([1,2]);
console.log(first); // first => 1
console.log(second); // second => 2
```
* generator函数

```
function* fun(){
   	var output = 0;
	while (true) {
		yield output;
		output++ ;
	}
}

var [first,second] = fun();
console.log(first); // first => 0
console.log(second); // second => 1
```
换言之，如果被解构的变量不可以循环迭代，就会报错<span style="color:red;">!!!</span>

```
// 以下都会报错
var [foo] = 1;  
var [foo] = false;  
var [foo] = NaN;  
var [foo] = undefined;  
var [foo] = null;  
var [foo] = {};  
```
数组解构有两个特别明显的优点：

* 交换两个变量的值

```
var a = 1,
	b =2;
[a,b] = [b,a];
console.log(a); // a => 2
console.log(b); // b => 1
```

* 复制数组

```
var arr = [1,2,3,4];
var [...copy] = arr;
console.log(copy); // copy => [1,2,3,4]
console.log(copy == arr); //  false
```

