# Search by Multiple Name Parts

A plain `like '%Sam Smith%'` search matches the whole string, space included, so it finds nothing when the record is `Samuel J Smith`. Split the search on spaces and require every part to match instead.

## STRING_SPLIT

[STRING_SPLIT](https://learn.microsoft.com/en-us/sql/t-sql/functions/string-split-transact-sql) returns a table with one row per piece:

```sql
select value from string_split('Lorem ipsum dolor sit amet.', ' ');
```

| value |
|-------|
| Lorem |
| ipsum |
| dolor |
| sit |
| amet. |

## Filter in Slate

1. Add a query parameter `@search_name`.
2. Add a **Subquery Filter** with Aggregate: **Formula**.
3. Add an export of the field to search, e.g. `@name`.
4. Use this formula:

```sql
(
  (@search_name is null)
  or
  (select count(*) from string_split(@search_name, ' ') s where @name like '%' + s.value + '%')
  =
  (select count(*) from string_split(@search_name, ' '))
)
```

With no `@search_name`, everything is returned. Otherwise a row matches only when every word in `@search_name` is found in the name.
