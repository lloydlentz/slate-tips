# Query a Value in Slate's XML Columns

Slate stores lots of key/value data in `[xml]` columns as `<p><k>key</k><v>value</v></p>` pairs. Use the SQL Server [`value()` method](https://learn.microsoft.com/en-us/sql/t-sql/xml/value-method-xml-data-type) to pull one out.

For example, the recipient email on a message:

```sql
select top 10 
       m.[xml].value('(p[k = "user-email"]/v)[1]','varchar(max)') as email
     , m.*
  from [message] m
 where m.[mailing] = 'ed04ad47-2b4c-48b1-bc59-54d88716678c'
 order by m.delivered desc
```

In a Configurable Joins query (Message base), add a Custom SQL export named **Email**:

```sql
(msg__JID_.[xml].value('(p[k = "user-email"]/v)[1]', 'varchar(max)'))
```

For reference, a message's `[xml]` looks like this:

```xml
 <p>
	<k>
		user-email
	</k>
	<v>
		someone@example.edu
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
