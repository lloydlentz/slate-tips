SELECT id
     , name
     , created
     , updated
  FROM [source.format]
 WHERE 1 = 1
   AND [active] = 1
 ORDER BY [name]