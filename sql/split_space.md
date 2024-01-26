# Search by multiple parts of name, split by a space

If you do a direct search comparison, say for `smith` you will get direct matches.  But if you want to search for part of both first and last names, the database will search for direct string match, including the space. 
So if you put `Sam Smith` it will do a direct name comparison, and return 0 results if the record is actually `Samuael J Smith`.   

## STRING_SPLIT

In SQL, if you use the function [STRING_SPLIT](https://learn.microsoft.com/en-us/sql/t-sql/functions/string-split-transact-sql?view=sql-server-ver16) function, it will return a table array of all values split by the deilimter.  

```SQL
SELECT value FROM STRING_SPLIT('Lorem ipsum dolor sit amet.', ' ');
```

will return a table 

|value|
|---|
|Lorem|
|ipsum|
|dolor|
|sit|
|amet.|


## Filter in Slate.

1) In your query, add a Parameter `@search_name`
2) Create a SubQuery Filter.
3) Aggregate: Formula
4) Add An Export of the field you want to search `@name`
5) Add the following into the formula


```SQL
(
  (@search_name is null)
   or 
  (select count(*) from string_split(@search_name , ' ') s 
   where  @name like '%' + value + '%')  
    =
    ( select count(*) from string_split(@search_name , ' ')  )
)
```


This will return all results if there is no `@search_name` but then filter the results to where each part of the `@search_name` split by all spaces finds a match.
