/**
 * ~"secure" query for matching refid to a person
 * Slightly more secure SQL Assumes you are adding the last two characters of a person's GUID into the custom shortened URL.
 * 
 * 
 * https://github.com/lloydlentz/slate-tips/tree/main/ux/shorturl
 * No rights reserved.  Use this for your own profit and joy.
 * Nov 2022, Lloyd,  https://ll-l-ll.com
 *
 * https://yapfa.club 
 */
--declare @invite VARCHAR(max) = '/shorturltest/000106'
declare @event varchar(max)
declare @refid varchar(max)
declare @lastTwoOfGUID VARCHAR(2)
declare @person UNIQUEIDENTIFIER
declare @checkSecure BIT = 1 -- This is up to you.   If you want to check the 'Security" of the link, basically make it less guessable, go for this. 

select @event = value from string_split(@invite,'/') order by getdate() offset 1 ROWS FETCH next 1 rows only
select @refid = value from string_split(@invite,'/') order by getdate() offset 2 ROWS FETCH next 1 rows only
select @lastTwoOfGUID = SUBSTRING(@refid,len(@refid)-2+1,2)
select @refid = SUBSTRING(@refid,1,len(@refid)-2)
select @person = id from [person] where ref = @refid  and SUBSTRING(cast(id as varchar(max)),len(cast(id as varchar(max))) - 2+1,2 ) = @lastTwoOfGUID

--select @event, @refid, @lastTwoOfGUID, @person

select concat(
    (select value from [config] where [key] = 'https')
    , '/register/'
    , @event
    , '?person='
    , @person
)

