# Get Querysting Info

The Querystring Paramas are those thing in the URL of your browser like ?param=val

```JAVASCRIPT
var qs = FW.decodeFormValues(location.search.substring(1));
delete qs.cmd;
console.log(qs.param)
```

Is what Slate uses for thier built in.   

## HOWEVER

That does not always parse params as expected.   After some [discussion wht my elders](https://stackoverflow.com/questions/7731778/get-query-string-parameters-url-values-with-jquery-javascript-querystring)
 I'd reccomend adding a jQuery bootstrap
 
```JAVASCRIPT
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                      .exec(window.location.search);

    return (results !== null) ? decodeURIComponent(results[1]) || 0 : false;
}
```

and then 

```JAVASCRIPT
console.log($.urlParam('startdt'));
// OUTPUT:  06/01/2020
```
will output 
*note*  I added the decodeURIComponent so that date params and other things are usable out of the box
