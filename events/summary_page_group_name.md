# Show Group Name on Event Summary Page

1) Edit Event
2) Edit Properties
3) Custom List Fields
    1) Add name and whatever you want
    2) Add a Subquery Export
        1) Aggregate = Formula
        2) Add Exports
            1)  **ResponseGUID**
            2)  **PersonName**   (Our instnace has a Field for addressing letters that is essentially FirstName Last)
        3) Formula Value
```SQL 
(select top 1 (coalesce(pref_mail_name.[value], @PersonName, ffrp.[name] ))
from [form.response] ffr1
 left join [form.response]  ffr on ffr1.[group] = ffr.id
left join [person] ffrp on ffrp.id = ffr.record
left join [field] pref_mail_name on ffr.record = pref_mail_name.record and pref_mail_name.[field] = 'pref_mail_name'
where ffr1.id = @responseGUID 
)
```

This will load the Event Summary page WAY faster than trying to join out with CJs
