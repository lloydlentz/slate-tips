# Add "Required" Asterisks with CSS

Slate marks required questions with `data-required="1"`. This CSS adds a red asterisk to their labels automatically.

```css
[data-required="1"] label:after,
[data-required="1"] legend:after {
  color: #c1001b;
  content: " *";
  font-weight: bold;
}

/* Don't mark every option inside a checkbox/radio group */
[data-required="1"] fieldset label:after {
  color: #eeeeee;
}
```

_Credit: Jared Randall, Bowdoin College._
