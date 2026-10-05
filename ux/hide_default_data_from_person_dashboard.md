# Hide Default Sections on the Person Dashboard

The default sections on a person dashboard (Biographic, Activity History, Employment History, Interactions) often raise more questions than they answer, especially for Advancement staff.

![Default person dashboard sections](https://github.com/user-attachments/assets/2c403ed4-5315-40b5-bc37-a8c742e422c8)

Selecting them is a bit of a hack, but it works. Add this to a script on your Person Dashboard:

```javascript
$("#content h2:contains('Biographic'), " +
  "#content h2:contains('Activity History'), " +
  "#content h2:has(a:contains('Employment History')), " +
  "#content h2:has(a:contains('Interactions'))")
  .filter(function () { return !$(this).closest("div[id^='widget_']").length; }) // skip your own widgets
  .each(function () {
    $(this).hide().next("div").hide(); // hide the heading and its section
  });
```
