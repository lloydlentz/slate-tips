# Add an Entity with Values

To add an entity row, first insert into `[entity]`, then add each of its fields to `[field]` with the new entity's ID as the `[record]`.

Use this in a portal query (`@record` is the parent record, `@identity` is the logged-in user, `@note` is a parameter).

```sql
declare @newid uniqueidentifier = newid();

insert into [entity] ([id], [record], [created], [updated], [entity])
values (@newid, @record, getdate(), getdate(),
        '68446fdb-aa9b-444d-9713-c71d2945b7e1'); -- the GUID of your Entity definition

-- Related (dataset/user) field
insert into [field] ([record], [field], [related])
values (@newid, 'peercontact_record', @identity);

-- Text value fields
insert into [field] ([record], [field], [value])
values (@newid, 'peercontact_date', format(getdate(), 'MM/dd/yyyy'));

insert into [field] ([record], [field], [value])
values (@newid, 'peercontact_detail', @note);

-- Prompt field: look up the prompt GUID by key and export value
insert into [field] ([record], [field], [prompt])
values (@newid, 'peercontact_type',
        (select top 1 [id] from [lookup.prompt]
          where [key] = 'peercontact_type' and [export] = 'G'));
```

> **Tip:** leave `[timestamp]` and `[source]` out of `[field]` inserts. Slate fills them in itself, and that's what triggers it to update the record.
