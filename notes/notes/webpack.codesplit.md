- code-splitting是按需将代码拆分成很多chunk
    - 按需加载
    - 利用浏览器缓存，提高缓存命中率

- 方法（webpack官网）
    - entty
        - 多入口
        - 若不同的入口文件具有相同模块，则相同模块会同时存在不同chunks中
    - SplitChunksPlugin
        - 前身是CommonsChunkPlugin
        - webpack自带插件，帮助提取公共依赖模块
        - 抽离CSS: mini-css-extract-plugin
    - 动态引入
        - webpack官方推荐的分割方法
        - import()
        - webpack在编译打包静态文件遇到import()语法，会将其视为分割点，进行分割输出chunk
        - import()内部实际调用promise
        