concat((select 
	(select [value] from [config] where ([key] = 'https'))
	from (values (null)) subquery(x)
	), '/apply/download.pdf?part=', (select 
		CONCAT('stream:', dbo.toGuidString([stream]))
	from (values (null)) subquery(x)
	), '&h=', (select 
		dbo.toGuidString(dbo.md5(convert(varbinary(max), (select 
					CONCAT('stream:', dbo.toGuidString([stream]))
				from (values (null)) subquery(x)
				) + dbo.salt())))
			
	from (values (null)) subquery(x)
))


----- You can also use this in a CJ Formula Export

concat( 
        (select [value] from [config] where ([key] = 'https'))
        , '/apply/download.pdf?part='
        , 'stream:'
        , dbo.toGuidString([stream])
        , '&h='
        , dbo.toGuidString(dbo.md5(convert(varbinary(max), (select 
                        CONCAT('stream:', dbo.toGuidString([stream]))
                    from (values (null)) subquery(x)
                    ) + dbo.salt())))        
)
