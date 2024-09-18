/***** PARAMETERS *****

<param id="guid" />

***********************/ 

WITH ExtractedVals AS (
    SELECT 
        sf.[id], 
        sf.[name], 
        map.value('@src', 'NVARCHAR(100)') AS map_src,
        val.value('@src', 'NVARCHAR(100)') AS val_src
    FROM [source.format] sf
    CROSS APPLY sf.remap.nodes('//map') AS T(map)
    CROSS APPLY map.nodes('val[not(@dst)]') AS V(val)
)
SELECT 
    [id],
    [name],
    map_src,
    COUNT(*) AS [count]
FROM ExtractedVals
where [id] = @guid
  and [map_src] in (select [key] from [source.key] where [source] in (select id from [source] where format =  @guid))
GROUP BY [id], [name], map_src
ORDER BY map_src