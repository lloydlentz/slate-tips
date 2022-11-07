# Shortcut Pattern for having a form that is aware of it's entity.

 1) Add Entity Fields you want your users to update to a form.
 2) Add a hidden text input field with the Entity GUID
 3) Add a hidden text input filed with the key [entguid]
 4) GOTO your Forms Script [Edit Form]>>[Edit Scripts / Styles] and enter either the **Full Script** or **Link** to this script



## [Full Script ](entityForm.js)
add [this script text](https://lloydlentz.github.io/slate-tips/ux/entityForm/entityForm.js)

## Link
add this 
```
 $.getScript("https://lloydlentz.github.io/slate-tips/ux/entityForm/entityForm.js")
```


## To Delete

### Add a query to your UX Portal
#### Parameters
```
<param id="record" type="UNIQUEIDENTIFIER" />
<param id="entguid" type="UNIQUEIDENTIFIER" />
```
#### Custom SQL 
```SQL
DELETE [field] 
 where [record] = @entguid
   and [record] in (select [id] from [entity] where [record] = @record)
	 
DELETE from [entity] 
 where [id] = @entguid 
   and [record] = @record
```

### Add a Method
 - **Name:** 	CRUD - delete Entity
 - **Type:**	POST
 - **Action:**	db_delete_entity
 - **Linked Query:** - *CRUD - delete Entity* (That you just made above )
 
### On Your Form
 - Add a hidden field with export Key of **person**.   This will pick up the person GUID from the querystring, and make it available to the JS that was just added.
