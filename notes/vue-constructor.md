水平有限，理解不对地方欢迎指出！

Vue构造函数的初始化工作：
- 扩展Vue.prototype上的功能
- 扩展Vue上的功能,即全局的静态方法

源码：（src/core/index.js）

![](../img/vue1.png)

扩展Vue.prototype功能

![](../img/vue2.png)

- 方块1
    - new Vue({...}) 真实执行的部分
    - 判断Vue的执行方法：只能通过new,不能Vue()
    - _init方法是Vue.prototype扩展的功能
- 方块2
    - 扩展Vue.prototype功能
    - initMixin：在Vue.prototype上注册了_init方法，用于vue实例化
    - stateMixin：在Vue.protype定义getter/setter属性:$data、$props、$watch
    - eventMixin：在Vue.prototype上注册了$on、$once、$off、$emit
    - lifecycleMixin：在Vue.prototype上注册了_update、$forceUpdate、$destroy 
    - renderMixin：在Vue.prototype上注册了$nextTick、_render

扩展Vue功能

![](../img/vue3.png)

函数体较长，但是主要工作比较明确，框选我认为主要的

- 方块1
    - 常用的set,delete,nextTick函数
- 方块2 
    - 函数存在于src/core/global-api目录下
    - ASSET_TYPES：component、directive、filter

总结
- 写的非常非常的粗略，至于vue是怎么运用mixin和extend的没写，日后补上，往后看这里有很多xxxMixin的函数调用
- vue把函数按照功能分别写在不同模块中，然后挂载到Vue.prototype和Vue对象上,这样做好处是非常方便代码的维护和管理，这是class很难做到的
