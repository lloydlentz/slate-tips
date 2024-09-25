 declare @msg TABLE(
    id UNIQUEIDENTIFIER
    ,  account_number VARCHAR(max)
    , [status] VARCHAR(20)
    , [credits] INT
    , [dt] DATETIME
    , [fy] INT
    , [method] VARCHAR(10)
 )

insert into @msg
select 
       m.id
     , case when m.[status] = 'external' then m.recipient 
         else coalesce(m.sender, (select top 1 [sender] from [message.mailing] where id = m.mailing)) end account_number
     , m.[status]
     , m.credits
     , m.delivered
     , dbo.getFiscalYear(m.delivered,'06-01')
     , m.method
  from [message] m
 where m.credits > 0

; with smry as (
select m.account_number
     , CONCAT_WS('-', m.fy, m.method) [key]
     , m.fy
     , m.method
     , sum(cast(m.credits as money) * 0.01) [credits]
  from @msg m
group by m.account_number
     , CONCAT_WS('-', m.fy, m.method) 
     , m.fy
     , m.method
)
select coalesce(mn.name, concat('Historical: ',smry.account_number)) [name]
     , smry.*
  from smry
  left join [message.number] mn on smry.account_number = mn.number

