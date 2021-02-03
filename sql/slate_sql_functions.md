# Slate has some built in funcitons that are super handy to use.

### Combine a multi Field
We use a String Agg
```
(select string_agg([value], ', ') from dbo.getFieldMultiTable(p__JID_.[id], 'majors')) as [Person Mac Majors]
```

### Get a Form Response ID
This function takes two args.  (FormResponseId *GUID*, FormFieldExportKey *String*)
```
(select top 1 [value] from getFormResponseTopTable(fr.id,'sys:field:prospect_current_stage')) [stage]
```

### Fiscal year
 * VAR1 = Date Field
 * VAR2 = MM-DD start date of Fiscal Year
```
    dbo.getFiscalYear(GETDATE(),'06-01')
```
