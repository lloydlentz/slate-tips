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

select pvt.*
from (
select m.account_number
     , m.fy
     , m.method
     , cast(m.credits as money) * 0.01 [credits]
  from @msg m
) p
PIVOT
(
    SUM (credits)
    FOR fy IN ([2020], [2021], [2022], [2023], [2024], [2025])   --Fiscal years you want to consider
) AS pvt
ORDER BY 1,2;
