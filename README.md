# hoverscroll

used to scroll lists by hovering over an element

## limitations

can only scroll horizontally currently

## requirements
jQuery 3.5.1+ **(not tested on previous versions)**

jQuery UI 1.12+ **(not tested on previous versions)** - only for extra custom animation styles/easings, e.g easeInOutQuad etc)

## how to use
first, create a new object

```javascript
let hoverScroll = new HoverScroll( /*hover-scroller id/jQuery object*/, /*scroll direction*/, /*list id/jQuery object*/ );
```

for example, if you want to create two hover scrollers for left and right scrolling, then it should look something like this

```javascript
let listElement = $('#list');
let leftHoverScrollElement = $('#left-hover-scroll');
let rightHoverScrollElement = $('#right-hover-scroll');

let leftHoverScroll = new HoverScroll(leftHoverScrollElement, "left", listElement);
let rightHoverScroll = new HoverScroll(rightHoverScrollElement, "right", listElement);
```

or this

```javascript
let listID = 'list';
let leftHoverScrollID = 'left-hover-scroll';
let rightHoverScrollID = 'right-hover-scroll';

let leftHoverScroll = new HoverScroll(leftHoverScrollID, "left", listID);
let rightHoverScroll = new HoverScroll(rightHoverScrollID, "right", listID);
```

then we can access the following methods

### scrolling a list
note: once scroll.start() has been called, the list will not stop scrolling until scroll.stop() is called.

this will start the scrolling animation

```javascript
scroll.start( /*pixels/second, default = 1000*/, /*easing method, default="linear"*/ )
// look at jQueryUI easings for more info. here are examples of the different options: https://matthewlein.com/tools/jquery-easing
```

this will stop the current scrolling animation

```javascript
scroll.stop()
```

**example**

```javascript
leftHoverScrollElement.hover(function() {
	leftHoverScroll.scroll.start();
}, function() {
	leftHoverScroll.scroll.stop();
});
```

### check if the scrollers should be visible or not
this function can show/hide the scroller, depending on the where the user is scrolled to in the list.

it should be called by an onscroll event from the chosen list.

**example**

```javascript
listElement.scroll(function() {
	leftHoverScroll.check();
	rightHoverScroll.check();
});
```

### manually fading in/out the element
the scroller can be faded in or out manually by using animate.in() or animate.out(), but these functions will be called automatically by check() when needed.

**example**

```javascript
leftHoverScroll.animate.out();
rightHoverScroll.animate.in();
```
