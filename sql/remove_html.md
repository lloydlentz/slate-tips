# Remove HTML from a Value

Strip the tags from an HTML value (for example, a Task description) in a Custom SQL export.

### Option 1: XQuery text nodes

```sql
cast(cast(tsk__JID_.[description] as xml).query('for $x in //. return ((($x)//text()))') as varchar(max))
```

Replace `tsk__JID_.[description]` with your own column. See also [this Stack Overflow answer](https://stackoverflow.com/a/50912787/4594).

### Option 2: XHTML body (for mailing bodies)

```sql
[body].value('declare namespace h="http://www.w3.org/1999/xhtml"; (//h:body)[1]', 'nvarchar(max)')
```

_Credit: Jared Randall, Bowdoin College._
