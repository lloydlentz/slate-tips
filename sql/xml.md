# XML

Working with XML is not always intuitive. [SQL Doc](https://docs.microsoft.com/en-us/sql/t-sql/xml/value-method-xml-data-type)

Quick way to query an XML element

``` sql
select top 10 
       m.[xml].value('(p[k = "user-email"]/v)[1]','varchar(max)') as email
     , m.*
  from [message] m
 where m.[mailing] = 'ed04ad47-2b4c-48b1-bc59-54d88716678c'
 order by m.delivered desc
 ```
 
 If you wanted to do this in a Configurable Join export you would do a SQL export (Say from Message Mailing base)
 ```
 Name: "Email"
 SQL: (mm__JID_.xml.value('(p[k = "user-email"]/v)[1]','varchar(max)'))
 ```
 
 
 FWIW Slate stores the p/k/v of the merge elements in the [xml] feild in message in a structure like 
 ``` xml
 <p>
	<k>
		user-email
	</k>
	<v>
		yermama@macalester.edu
	</v>
</p>
<p>
	<k>
		project-task-name
	</k>
	<v>
		Set meeting with Kathy
	</v>
</p>
<p>
	<k>
		project-task-url-title
	</k>
	<v>
		Blow, Joeseph (Joe)
	</v>
</p>
<p>
	<k>
		project-task-url
	</k>
	<v>
		/manage/lookup/?id=9afca31c-bf92-4104-841f-aaaaaaaaaa0f
	</v>
</p>
```
