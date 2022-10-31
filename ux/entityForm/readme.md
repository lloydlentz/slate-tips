# Shortcut Pattern for having a form that is aware of it's entity.

 1) Add Entity Fields you want your users to update to a form.
 2) Add a hidden text input field with the Entity GUID
 3) Add a hidden text input filed with the key [entguid]
 4a) add this to the Script of the form from the [script](eneityForm.js) 
OR
 4b) link directly to the scriplet
```
 <script type="text/javascript" src="https://macadv.github.io/entityForm.js"/>
```
