# Helpers Library for employment projects

Helpers are divided into two categories:
- DOM events utility helpers (mainly user interaction like resize and scroll)
- Custom easings for animation
- Cookies helper class (deprecated)
- User agents detection function to parse and detect browser and device (deprecated)

### How to configure
In main.js use es6 import to add helper module and use the reduce function to create a global object.
```js
var arr = [
  { util: EVENT_UTILITIES },
];

global.Helpers = arr.reduce(function (result, item) {
  var key = Object.keys(item);
  result[key] = item[key];
  return result;
}, {});
```

### Misc ressources
[Retrieve the real global object in all possible environments](https://www.contentful.com/blog/2017/01/17/the-global-object-in-javascript/)
[Expose to window](http://www.mattburkedev.com/export-a-global-to-the-window-object-with-browserify/)
[Export an instantiated class](https://stackoverflow.com/questions/41949768/how-to-create-common-helper-class-in-react-js-using-es6-which-is-used-by-another)