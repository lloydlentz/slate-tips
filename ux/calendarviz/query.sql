/******************************
/ux/calendarviz/query.sql
https://engage.macalester.edu/manage/query/build?id=d6586582-28de-4708-aa38-4c56e780b117
Scheduled Export:	none
Web Service: json
Purpose:  This will give a daily count of logins to your portals from external users
Author: Lloyd
Date: 2/23/21
GitHub: Yes
******************************/

DECLARE @logins TABLE(
    year INTEGER
    , week INTEGER
    , startdt DATE
    , dt DATE
    , person UNIQUEIDENTIFIER
)

insert into @logins
select distinct
       datepart(year, [issued]) as year
     , datepart(wk, [issued]) as week
     , format(dateadd(week, datediff(week, 0, [issued]), 0),'yyyy-MM-dd') startdt
     , cast([issued] as DATE) dt
     , pl.person
  from [person.login] pl
 where pl.[user] is NULL
   and pl.issued >= '2021-01-01';

select l.dt, count(*) as cnt
  from @logins as l
 group by l.dt
 order by l.dt
