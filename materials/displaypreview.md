# How to display an image that was uploaded via a form, and display it in a query

### Custom SQL Export

#### Name 
```
Image URL
```
#### SQL
```
(select top 1 'https://engage.macalester.edu/manage/database/acquire?cmd=tile&id='+ dbo.toGuidString(m.stream) + '&pg=0&z=72' 
          from [form.response.field] frf 
            INNER JOIN [material] as m on m.id = TRY_CAST(frf.[value] as uniqueidentifier) and m.deleted_timestamp is null
           where frf.response = fr__JID_.id
        )
```
        
