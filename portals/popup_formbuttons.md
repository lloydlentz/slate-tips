The following bit of script will change the embedded Form's Submit Button text and add another button to cancel.

  ```Javascript
$(".form_button_submit").text("Remove")
$(".form_button_submit").after("<button type='button' onclick='FW.Dialog.Unload()'>Cancel</button>")
```
