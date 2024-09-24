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

-- select pvt.*
select pvt.account_number
     , pvt.method
     ,  ( select top 1 [name] from [message.number] mn where mn.number = pvt.account_number) [Number Title]
     , format(pvt.[2020], 'c') [2020]
     , format(pvt.[2021], 'c') [2021]
     , format(pvt.[2022], 'c') [2022]
     , format(pvt.[2023], 'c') [2023]
     , format(pvt.[2024], 'c') [2024]
     , format(pvt.[2025], 'c') [2025]
from (
select m.account_number
     , m.fy
     , m.method
--     , m.[status]
     , cast(m.credits as money) * 0.01 [credits]
  from @msg m
) p
PIVOT
(
    SUM (credits)
    FOR fy IN ([2020], [2021], [2022], [2023], [2024], [2025])
) AS pvt
ORDER BY 1,2;

