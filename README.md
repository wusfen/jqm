# $.js
jquery 的超轻量实现 (ie8+)

```javascript

$('selector')
    .each()
    .closest()
    .find()
    .delay()
    .addClass()
    .removeClass()
    .show(animateClass) // 可使用css3动画，比如使用 animate.css: .show('animated fadeIn')
    .hide(animateClass)
    .css()
    .on() // 使用代理实现，新添加的元素也能处理事件

```
