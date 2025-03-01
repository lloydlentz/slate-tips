## The default data points that come on a person dashboard conntinue to cause more questsions than answers from folks, especially Advancement office folks.  

![image](https://github.com/user-attachments/assets/2c403ed4-5315-40b5-bc37-a8c742e422c8)

Currently to select those items is a bit of a hack, but servicable.   Add this to a script on your Person Dashbaord

```js
$("#content h2:contains('Biographic')
, #content h2:contains('Activity History')
, #content h2:has(a:contains('Employment History'))
, #content h2:has(a:contains('Interactions'))")
    .filter(function() { return !$(this).closest("div[id^='widget_']").length; }) // Exclude sections inside widget_* divs
    .each(function() {
        $(this).css("display", "none").next("div").hide(); // Hide both the heading and its section
    });
```
