## 说两句

以下根据MDN，自己对CSS定位整理。个人感受：

- MDN对CSS的讲解，清晰简单
- 网上大部分对CSS讲解太玄乎了，结合应用讲后，简单的变复杂
- CSS很难，也很简单。规则是简单的，难在你想做什么东西
- 好好看MDN


### 布局模式
- 布局 
    - normal flow
    - table layout
    - float layout
    - positioned layout
    - multi-column layout
    - flexible box layout
    - grid layout

这里没有写中文，中文是直译的，感觉比较抽象。用英文，个人觉得理解起来更轻松，它们就是一个概念性的东西，名字不重要，歪果仁给不同的CSS布局起了名字，仅仅是名字哈哈。

### 定位

- 类型
    - relatively positioned
        - position: relative
        - 偏移距离是相对正常位置normal position
    - absolutely positioned
        - position:absolute or fixed
        - 偏移距离是相对于它的containing block
        - 元素的margins会添加到偏移量中
        - 元素没有明确width或height,且top/bottom和left和right同时存在，则响应方向铺满
        - 元素具有明确width或height，top> bottom,left>right(English，Japanese，ETC) ；right > left（Persian，Arabic ，ETC）
    - stickily positioned
        - position:sticky
        - 在元素的container block滚动超过一个specified threshlod时，元素的位置表现行为为relavtive；当container block超过specified block之后，元素的位置表现行为为fixed(treated ad stuck)，位置是由top决定。当元素与container block的content区的下边下边缘重合时，元素的位置表现行为为relative。
        - container block的高度必须大于元素的高度
        - 在container block到达specified block之前，元素的位置要根据自身top,兄弟位置和高度以及container block的高度决定。
- 可选值
    - static
        - 根据normal flow布局
    - relative
        - 根据normal flow布局
        - z-index不为auto时，创建新的stacking context。在table-*-group, table-row, table-column, table-cell, and table-caption元素上无效
    - absolute
        - 从normal flow中移除，不占据space
        - 如存在closest positioned ancestor，相对它定位，否则相对initial containing block
        - margin不会塌陷
        - z-index不为auto时，创建新的stacking context。
    - fixed
        - 从normal flow中移除
        - 根据浏览器创建的containing block定位
        - 除非，祖先元素具有transform,perspective,fliter属性
        - 总是创建一个新的stacking context
    - sticky
        - 根据normal flow定位
        - 偏移量是根据nearest scrolling ancestors和containing block决定
        - 总是创建一个新的stacking context
        - 当nearest ancestor具有“scolling mechanism” ，元素会粘住在ancestor上

### BFC
- 概念
    - block formatting block
- 触发条件
    - 根元素
    - absolutely positioned eliments(position:absoulte/fixed)
    - display为某些值
        - inline-block
        - table-cell
        - flow-root
        - ...
    - overflow属性有值的块级元素
    - flex items
        - 是指flex容器中的元素
        - 不是display:flex的元素
    - grid items
        - 同上
    - multicol elements
        - column-count和column-width的值不为auto
    - coumn-span: all
- 注意
    - 定位和清除浮动只对在同一个bfc的things有效
    - 浮动不会影响到其他bfc的内部内容
    - 同属于一个BFC的两个元素会发生margin collapse

### 浮动
- 概念
    - 尽管属于文档流的一部分，浮动元素将从normal flow移除
    - 浮动元素会沿着容器的左右边排列
- 浮动元素，会改变display属性值
    - inline -> block
    - inline-block -> block
    - inline-table -> table
    - table-row -> block
    - ....
    - flex -> flex （浮动无效果）
    - inline-flex -> inline-flex  （浮动无效果）
### clear清除浮动
- 概念
    - clear属性可以用于浮动和非浮动元素
    - 具有clear属性的元素可以与前面的float元素挨着，准确说是会被移动到浮动元素的下面
- 特性
    - 在非浮动元素上：
        - 非浮动元素会发生移动
        - 结束位置：非浮动元素的top border边缘触碰到前面浮动元素最低的bottom margin边缘
    - 在浮动元素上：
        - 具有clear属性的浮动元素会移动到它前方的浮动元素下方
        - 结束为止：两者的margin边缘想触碰
- 属性值
    - none
        - 不会被移动
    - left
        - 移动到前方左浮动元素下方
    - right
        - 移动到前方右浮动元素下方
    - both
        - 移动到前方左右浮动元素最靠底部的下方