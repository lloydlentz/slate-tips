# Slate has some built in funcitons that are super handy to use.

### Fiscal year
 * VAR1 = Date Field
 * VAR2 = MM-DD start date of Fiscal Year
```
    dbo.getFiscalYear(GETDATE(),'06-01')
```

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

### Form SQL tip - Give the Form an Export ID
This makes using the above query super handy.  
```SQL
select p.[ref]
     , p.[name]
     , (select top 1 [value] from getFormResponseTopTable(fr.id,'service')) [service]
     , (select top 1 [value] from getFormResponseTopTable(fr.id,'hometown')) [hometown]
  from [person] p
        LEFT JOIN (select fr.id, fr.record from [form.response] fr  
                    INNER JOIN [form] f on f.id = fr.form and f.export = 'donorrelations-student-bio'
                  ) fr on p.id = fr.record
```

