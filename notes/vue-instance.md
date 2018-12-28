实例化一个vue实际调用了Vue.prototype上的_init方法主要经过了三个步骤

1. 合并参数
2. 在实例vm注册函数及属性
3. 执行mount，进行挂载