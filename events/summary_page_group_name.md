# Show Group Name on the Event Summary Page

Show the group leader's name for each registrant on an event's summary list. This loads much faster than joining out with Configurable Joins.

1. Edit the Event, then **Edit Properties**.
2. Under **Custom List Fields**, add a field with a name.
3. Add a **Subquery Export**:
   1. Aggregate: **Formula**
   2. Exports: **ResponseGUID**, **PersonName** (we use a "name for letters" field that's essentially First Last)
   3. Formula:

```sql
(select top 1 coalesce(pref_mail_name.[value], @PersonName, ffrp.[name])
   from [form.response] ffr1
   left join [form.response] ffr on ffr1.[group] = ffr.[id]
   left join [person] ffrp on ffrp.[id] = ffr.[record]
   left join [field] pref_mail_name on ffr.[record] = pref_mail_name.[record]
                                   and pref_mail_name.[field] = 'pref_mail_name'
  where ffr1.[id] = @ResponseGUID)
```
