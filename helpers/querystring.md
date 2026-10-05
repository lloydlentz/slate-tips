# Read Query String Parameters in JavaScript

Query string parameters are the `?param=val` part of the URL.

> **Note:** this doesn't work inside a popup. Script in a popup sees the *host* page's URL. To get parameters passed to a popup, use Liquid and Configurable Joins query parameters instead.

## Slate's built-in parser

```javascript
var qs = FW.decodeFormValues(location.search.substring(1));
delete qs.cmd;
console.log(qs.param)
```

## A more predictable helper

`FW.decodeFormValues` doesn't always parse values as you'd expect. After some [discussion with my elders](https://stackoverflow.com/questions/7731778/get-query-string-parameters-url-values-with-jquery-javascript-querystring), I recommend adding a small jQuery helper:

```javascript
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                      .exec(window.location.search);

    return (results !== null) ? decodeURIComponent(results[1]) || 0 : false;
}
```

Then:

```javascript
console.log($.urlParam('startdt'));
// OUTPUT:  06/01/2020
```

`decodeURIComponent` means dates and other encoded values are usable as-is.

In modern browsers you can also use the built-in `new URLSearchParams(location.search).get('startdt')`.
