--**PARAMS**
-- <param id="k" />

declare @scancount INT
declare @eventid UNIQUEIDENTIFIER
declare @fieldid UNIQUEIDENTIFIER

select @eventid = [form] from [form.response] fr where fr.id = @k

select @fieldid = ff.id from [form.field] ff 
 where ff.form = (select isnull(f.[parent],f.id) from [form] f where f.id = @eventid)
   and ff.export = 'scancount'

select @scancount = coalesce((select [value] from dbo.getFormResponseTopTable(@k, 'scancount')), '0') 
  from [form.response] fr where fr.id = @k

-- SELECT @eventid, @fieldid, @scancount

DELETE [form.response.field] 
 where [response] = @k
   and [field] = @fieldid
	 
IF @scancount is not null
BEGIN
   Select @scancount = @scancount +1

   update fr
      set fr.STATUS = 'attend'
     from [form.response] fr
    where fr.id = @k

   INSERT INTO [form.response.field] (response, field, value)
   VALUES ( @k, @fieldid, @scancount)

   SELECT fr.status
        , format(fr.guests,'00') [guests]
        , p.ref
        , format(@scancount, '00') [scancount]
        , (select top 1 _f.[value] from [field] _f where (_f.[record] = p.[id]) and (_f.[field] = 'pref_mail_name')) [name]
        , (select top 1 _f.[value] from [field] _f where (_f.[record] = p.[id]) and (_f.[field] = 'person_pref_class')) [class]
     from [form.response] fr
     join [person] p on fr.record = p.id
     where fr.id = @k

END
