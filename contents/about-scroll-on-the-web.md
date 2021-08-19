---
Title: scrolling on the web - things you should know
Date: "2021-08-17"
Language: en-US
Category: other
---

#### overflow

When a box doesn't have engough space to hold its content, it has a few choices, the most common ones are:

1. Display overflowed part as is
2. Hide the overflowed part & disable user scroll
3. Use a scroll bar

The CSS prop corresponding to those scenarios are:

1. `overflow: visible;`
2. `overflow: hidden`  or `overflow: clip;` (hidden & clip both disables user scroll, but only hidden allows prgrammatic scroll which give developer a way to scroll using Javascript)
3. `overflow: scroll;`

Sometimes, dimension of content could be dynamic, when content container has enough space, we do not wish to show a scrollbar, otherwise, display it. To do this, simply use `overflow: auto` , this is probably the most used value.

PS: you can also specify overflow direction using `overflow-x` and `overflow-y`

#### Track Scroll Position

When tracking element scroll position, those props come in handy (suppose we are talking about vertical scrolling)

1. clientHeight
2. offsetHeight
3. scrollHeight

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements) provides good explainination for this

aside from these, the follwing props are also associated with scrolling:

![Screenshot](http://realrz.com/pub/img/ss_scroll.png)

you can search the prop in mdn for details, for instance, scrollTop gets or sets the number of pixels that an elements's content is scrolled vertically

we could use it to detect whether an element has scrolled to bottom:

```javascript
function scrolledToBottom(box) {
  const { scrollTop, offsetHeight, scrollHeight } = box;
  return scrollTop + offsetHeight === scrollHeight;
}
```

#### Detect scroll direction

This task on itself is quite simple, all we need to do is record last scroll position, and compare it with current scroll position:

```javascript
let lastScrollTop = box.scrollTop;

box.addEventListener("scroll",  function(){
  if (box.scrollTop > lastScrollTop) console.log("scroll directon: down")
  else console.log("scroll direction:  up")
  lastScrollTop = box.scrollTop
})
```

What if we want to detect scroll direction but prevent scrolling to happen?

Before I show you the solution, the suitable question could be "Why would anyone want to do that?"

Well, suppose you wrote a long article, any user could read the first few paragraphs, but you want user to login in order to read the full article. In this scenario, when user scrolls down, you would want prevent scrolling, at the same time, show a login modal.

How to prevent scrolling while scrolling? Simple, use `preventDefault`, right?

Actually, there's a catch, the goal is to prevent scrolling only when scroll direction is downward, and how do we detect scroll direction: by comparing scrollTop prop which only changes after scrolling.

Seems like we need a way to detect scroll direction without actually triggering scroll.

The solution I come up with is to listen to `whell` event  to detect scroll direction. After all, page scroll is caused by scrolling mouse wheel (or trackpad which also dispathes `wheel` event) 

```javascript
box.addEventListener("wheel", function(e) {
  if (e.deltaY <= 0) return; // scroll up
  e.preventDefault();
  // below should be code to display the login modal
})
```

What is this `deltaY` thing? It turns out to be a parameter associated with your mouse that indicates how much the mouse wheel(not the page) has scrolled vertically. It comes in handy for direction detection: the value is positive if scroll down, negative if scroll up. 

####  Style scrollbar

You may have noticed on different platforms, default scrollbar style differs. This inconsistency could harm UI experience.

Unfortunately, until today (2021-08-18), there isn't an unified standard on how to style scrollbars. Difference engines provide different CSS props to do this.

Fortunately, most browsers (chrome, safari, edge) uses webkit as its rendering engine (Firefox is a little special since it uses Gecko, other browsers have small market share). As UI developers, we need to write 2 set of rules, one for webkit and one for Gecko.

webkit users `::-webkit` as prefix, most of the time, we want to set scrollbar-track and scrollbar-thumb when doing customization, e.g.

```css
.any-class::-webkit-scrollbar {
  height: 10px; // use height if u are styling horizontal scrollbar
  width: 10px; // use width if u are styling vertical scrollbar
}

.any-class::-webkit-scrollbar-track {
  background: #F5F5F7;
}

.any-class::-webkit-scrollbar-thumb {
  background: #C1C1C1;
  border-radius: 5px;
}
```

Firefox's Gecko offers fewer but simpler css props for scrollbar styling, named `scrollbar-width` and `scrollbar-color`, e.g.

```css
.any-class {
  scrollbar-width: thin; // firefox uses keywords such as auto, thin, none
  scrollbar-color: #C1C1C1 #F5F5F7; // thumb bgcolor & track bgcolor
}
```









