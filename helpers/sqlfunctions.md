#  Slate Built in SQL Functions

### getPromptExportTable

```SQL
select top 10
       (select top 1 [value] from dbo.getPromptExportTable(s.major1))
  from school s 
```

Will return the export value of the prompt in the prompt lookup table.  Also available is **getPromptExport[2-5]Table()**

### getPromptCategoryTable

