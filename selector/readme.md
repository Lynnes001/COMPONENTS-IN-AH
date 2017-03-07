##selector
- 表格输入框，能够实现三级联动
- 点击修改，前面的内容会变为可编辑项，其中三个下拉框联动；其他框体设置为input
- 下拉框具体数据通过get请求，并分为三次。
- 代码极度依赖页面中的class、id定位，应当组件化。






编写思路：
jQuery实现可输入和自动匹配的下拉框思路有以下几种

1. 使用H5的`<datalist></datalist>`很好用，亲测可编辑、可自动匹配。
	- H5适配性可能比较低
2. 找其他插件完成
	- chosen
	- [editable-select](https://github.com/indrimuska/jquery-editable-select)
