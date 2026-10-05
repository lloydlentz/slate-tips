# Slate Built-in SQL Functions

Slate ships with helper functions that save a lot of joins. In Configurable Joins Custom SQL, replace `p__JID_` / `fr` with your own alias.

### Fiscal year

`dbo.getFiscalYear(date, fiscalYearStart)`, where `fiscalYearStart` is `MM-DD`:

```sql
dbo.getFiscalYear(getdate(), '06-01')
```

### Field value

`dbo.getFieldTable(recordId, fieldKey)` returns the stored value of a field:

```sql
(select top 1 [value] from dbo.getFieldTable(p__JID_.[id], 'minors')) as [Person Minors]
```

Related functions, all taking `(recordId, fieldKey)`:

| Function | Returns |
|----------|---------|
| `getFieldTopTable` | The top (single) value |
| `getFieldMultiTable` | Every value of a multi-value field |
| `getFieldExportTable`, `getFieldExport2Table` … `5` | The prompt's export value(s) |
| `getPromptCategoryTable` | The prompt's category |

### Combine a multi-value field

```sql
(select string_agg([value], ', ') from dbo.getFieldMultiTable(p__JID_.[id], 'majors')) as [Person Majors]
```

### Prompt export value

`dbo.getPromptExportTable(promptId)` returns a prompt's export value. `getPromptExport2Table` through `5` return the other export columns.

```sql
select top 10 (select top 1 [value] from dbo.getPromptExportTable(s.[major1]))
  from [school] s
```

### Form response field

`getFormResponseTopTable(formResponseId, exportKey)`:

```sql
(select top 1 [value] from getFormResponseTopTable(fr.[id], 'sys:field:prospect_current_stage')) as [stage]
```

**Tip:** give the form an **Export** key so you can find its responses without hard-coding a GUID:

```sql
select p.[ref]
     , p.[name]
     , (select top 1 [value] from getFormResponseTopTable(fr.[id], 'service')) as [service]
     , (select top 1 [value] from getFormResponseTopTable(fr.[id], 'hometown')) as [hometown]
  from [person] p
  left join (select fr.[id], fr.[record]
               from [form.response] fr
               join [form] f on f.[id] = fr.[form] and f.[export] = 'donorrelations-student-bio'
            ) fr on p.[id] = fr.[record]
```
