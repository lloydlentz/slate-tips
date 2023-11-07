# Slate Events tips

- [Show Group Name on Event Summary Page](summary_page_group_name.md)



# check or uncheck all registered

Any question of Laruen's always trips my interest.   You can run this from the command line, or make a javascript shortcut.
```javascript 
$("input.attend").each(function(){ $(this).prop('checked', false).trigger("change"); })
```
^^^
will uncheck them all.
 
 
This one will check them
```javascript 
$("input.attend").each(function(){ $(this).prop('checked', true).trigger("change"); }) 
```
