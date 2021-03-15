-- Custom SQL Query
-- WebService as JSON enabled
select count(distinct (case when lp.export = 'AL' then p.id end)) al
     , count(distinct (case when lp.export = 'PA' then p.id end)) pa
     , count(distinct (case when lp.export = 'MS' then p.id end)) ms
     , count(distinct (case when lp.export = 'MF' then p.id end)) mf
from [gift] g
    left join [person] p on p.id = g.record
    left join [field] rt on rt.record = p.id and rt.field = 'record_type'
    left join [lookup.prompt] lp on lp.id = rt.prompt
where	dbo.getFiscalYear(g.[date], '06-01')  = dbo.getFiscalYear(getdate(), '06-01') 
