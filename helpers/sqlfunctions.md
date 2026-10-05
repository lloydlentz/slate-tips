#  Slate Built in SQL Functions

### getPromptExportTable

```SQL
select top 10
       (select top 1 [value] from dbo.getPromptExportTable(s.major1))
  from school s 
```

Will return the export value of the prompt in the prompt lookup table.  Also available is **getPromptExport[2-5]Table()**

**getPromptCategoryTable** will export the category of the prompt

## getFieldTable

```sql
(select top 1 [value] from dbo.getFieldTable(p__JID_.[id], 'minors')) as [Person Mac Minors]
```

Will return the value of the fild associated with the stored prompt field

**getFieldExportTable( guid , 'key' )** Will get the export value of the prompt associated with the field stored

**getFieldExportTable[2-5]( guid , 'key' )** Will get the export value of the prompt associated with the field stored

**getPromptCategoryTable( guid , 'key' )** Will get the Category value of the prompt associated with the field stored



