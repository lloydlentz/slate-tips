# Show a Form-Uploaded Image in a Query

Return a preview image URL for a file uploaded on a form. Add a Custom SQL export named **Image URL** to a Form Response based query:

```sql
(select top 1 '/manage/database/acquire?cmd=tile&id='+ dbo.toGuidString(m.stream) + '&pg=0&z=72' 
          from [form.response.field] frf 
            INNER JOIN [material] as m on m.id = TRY_CAST(frf.[value] as uniqueidentifier) and m.deleted_timestamp is null
           where frf.response = fr__JID_.id
        )
```
        
