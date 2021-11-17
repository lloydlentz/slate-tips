# Add Entity with values

In order to add an entity, you first need to create the Entity item, then add the associated field 


``` SQL
declare @newid uniqueidentifier;
set @newid = NEWID();

BEGIN 
	INSERT INTO [dbo].[entity] (id, record, created, updated, entity)
	VALUES (
		@newid, @record, GETDATE(), GETDATE(), '68446fdb-aa9b-444d-9713-c71d2945b7e1'. -- You need the specific GUID for the Entity
	);

	INSERT INTO [field] (field, record,related,[timestamp])
	VALUES ('peercontact_record', @newid, @identity, GETDATE() );  --This field is setup as a related dataset

	INSERT INTO [field] (field, record,value,[timestamp])
	VALUES ('peercontact_date', @newid, FORMAT( GETDATE(), 'MM/dd/yyyy'), GETDATE() );  -- This field is stored as Text/Value

	INSERT INTO [field] (field, record,value,[timestamp])
	VALUES ('peercontact_detail', @newid, @note, GETDATE() );

	INSERT INTO [field] (field, record,[prompt],[timestamp])
  -- This field is stored as a Prompt Value.  This does a lookup for the prompt GUID based on the key and export... easier to read.
	VALUES ('peercontact_type', @newid, (select top 1 [id] from [lookup.prompt] 
																			 where [key]='peercontact_type' and export='G') , GETDATE() );

END
```
