# Shortcut Pattern for having a form that is aware of it's entity.

 1) Add Entity Fields you want your users to update to a form.
 2) Add a hidden text input field with the Entity GUID
 3) Add a hidden text input filed with the key [entguid]
 4) GOTO your Forms Script [Edit Form]>>[Edit Scripts / Styles] and enter either the **Full Script** or **Link** to this script



## [Full Script ](entityForm.js)

## Link
add this 
 to the Script of the form from the [script](eneityForm.js) 
 7) (OR, instead of (4)) link directly to the scriplet... add this to your [Edit Form]>>[Edit Scripts / Styles]
```
 $.getScript("https://lloydlentz.github.io/slate-tips/ux/entityForm/entityForm.js")
```
