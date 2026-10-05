# Change an Embedded Form's Submit Button and Add Cancel

Use this when a form is embedded in a portal popup. It renames the Submit button and adds a Cancel button that closes the popup.

```javascript
$(".form_button_submit").text("Remove");
$(".form_button_submit").after("<button type='button' onclick='FW.Dialog.Unload()'>Cancel</button>");
```

See also: [Popups](popup.md), [Change submit button text in a form](../forms/change_submit_button_text.js), [Add a cancel button in a form](../forms/add_cancel_button.js).
