# Add as a custom SQL Field

In this case I am using the Task records

`CAST(CAST(tsk__JID_.[description] as xml).query('for $x in //. return ((($x)//text()))') as varchar(max))`

update that **tsk__JID_.[description]** field to whatever you need 


or [this Stack Overflow item](https://stackoverflow.com/a/50912787/4594)


## Jared to the rescue. 

Per Jared Randal(Bowdoin)
```sql
[body].value('declare namespace h="http://www.w3.org/1999/xhtml"; (//h:body)[1]', 'nvarchar(max)')
```
