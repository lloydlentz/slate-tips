# Slate has some built in funcitons that are super handy to use.

### Combine a multi Field
We use a String Agg
```
(select string_agg([value], ', ') from dbo.getFieldMultiTable(p__JID_.[id], 'majors')) as [Person Mac Majors]
```


### Fiscal year
VAR1 = Date Field
VAR2 = MM-DD start date of Fiscal Year
```
    dbo.getFiscalYear(GETDATE(),'06-01')
```
