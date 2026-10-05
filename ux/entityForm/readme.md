# Entity-Aware Forms

A pattern for a form that edits (and can delete) one specific entity row.

1. Add the entity fields you want users to update to a form.
2. Add a hidden text box with export key `entguid` to hold the entity GUID.
3. In **Edit Form → Edit Scripts / Styles**, add either the full script or a link to it (below).



## Option A: full script

Paste the contents of [entityForm.js](entityForm.js).

## Option B: link

```javascript
 $.getScript("https://lloydlentz.github.io/slate-tips/ux/entityForm/entityForm.js")
```


## Deleting an entity

### 1. Add a query to your portal

**Parameters:**

```xml
<param id="record" type="UNIQUEIDENTIFIER" />
<param id="entguid" type="UNIQUEIDENTIFIER" />
```
**Custom SQL:**

```sql
DELETE [field] 
 where [record] = @entguid
   and [record] in (select [id] from [entity] where [record] = @record)
	 
DELETE from [entity] 
 where [id] = @entguid 
   and [record] = @record
```

### 2. Add a method

- **Name:** CRUD - delete Entity
- **Type:** POST
- **Action:** `db_delete_entity`
- **Linked Query:** CRUD - delete Entity (the query above)
 
### 3. On your form

Add a hidden field with export key **person**. It picks up the person GUID from the query string for the script to use.
