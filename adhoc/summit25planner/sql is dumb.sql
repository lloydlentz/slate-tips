select 'Thursday, June 26, 2025	1:30 PM (PDT)'
     , TRY_CAST('June 26, 2025	1:30 PM (PDT)' as datetime)
     , TRY_CAST('June 26, 2025	1:30 PM (PDT)' as date)
     , TRY_CAST('June 26, 2025	1:30 PM' as datetime)
     , CONVERT(DATETIME, 
        LEFT(STUFF(your_column, 1, CHARINDEX(',', your_column) + 1, ''), 
             CHARINDEX('(', your_column) - 2), 
        109) AS ConvertedDateTime