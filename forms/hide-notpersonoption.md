# Hide the "Not ___? Click here" Banner

When a form is opened with a person's link, Slate shows a "Not So-and-so? Click here" banner. Add this to the form's script to hide it:

```javascript
$('#form_response_banner').hide();
```

To also hide the "Logout" link:

```javascript
$('.c_contained div#global').hide();
```
