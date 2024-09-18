/***** PARAMETERS *****

<param id="guid" />

***********************/ 

SELECT count(*)
FROM [source.format]
WHERE 1 = 1
	AND remap.exist('//val[not(@dst)]') = 1
	and [id] = @guid