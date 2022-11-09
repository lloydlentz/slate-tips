--declare @invite VARCHAR(max) = '/shorturltest/0001'
declare @event varchar(max)
declare @refid varchar(max)
declare @person UNIQUEIDENTIFIER

select @event = value from string_split(@invite,'/') order by getdate() offset 1 ROWS FETCH next 1 rows only
select @refid = value from string_split(@invite,'/') order by getdate() offset 2 ROWS FETCH next 1 rows only
select @person = id from [person] where ref = @refid

select @event, @refid, @person

select concat(
    (select value from [config] where [key] = 'https')
    , '/register/'
    , @event
    , '?person='
    , @person
)
