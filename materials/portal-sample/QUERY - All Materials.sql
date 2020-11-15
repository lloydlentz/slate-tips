/**
output:  allmaterials

params:
<param id="record" />
**/
SELECT top 100
       m.id materialguid
    , m.[key]
    , p.name
    , p.id personguid
    , (select top 1 f.[value]  from dbo.[field] f where f.record = m.id and f.field = 'material_memo') Memo
    , (select top 1 f.[value]  from dbo.[field] f where f.record = m.id and f.field = 'material_document_date') DocDate
  FROM dbo.material m
  LEFT JOIN dbo.[person] p on m.record = p.id
 WHERE m.record = @record
