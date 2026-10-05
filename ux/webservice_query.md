# Make a Configurable Joins Query a Web Service

Expose a query as a JSON web service you can call from a form or portal script. Several other tips here ([Autocomplete](autocomplete/readme.md), [Hide full events](../forms/hide_full.md)) start with this setup.

1. Create a new **Configurable Joins** query with whatever base you need: Person usually, but Events, Funds, or Contact Reports work too.
2. **Edit Permissions** → **Add Grantee**:
   1. Type: **User Token**
   2. Name: `webservice`
   3. Allowed Networks: `*` (or, better, only your campus networks)
   4. Permissions: ✅ **Web Service**
   5. **Save**, then **Close**.
3. **Edit Web Services**:
   1. (Optional) Custom Parameters: `<param id="q" />`
   2. Service Type: **JSON**
   3. Include NULLs: **Include Nulls**
   4. **Save**.
4. Add exports. For a person search: `guid`, `name`, `classyear`, `record_type`.
5. Add filters:
   1. Any overall filters you want (record status, degree type, donor category, etc.).
   2. A **Subquery Filter** named "Search by Name": Aggregate **Formula**, export **Person Name**, formula `@Person-Name like '%' + @q + '%'`.
6. Click **Web Service → JSON**:
   1. Service Account: **User Token - webservice**
   2. Authorization Type: **Query String**
   3. Copy the URL.

> **Security:** the copied URL includes an `h=` token. Anyone who has it can run the query. Keep it out of public pages and public repos, restrict Allowed Networks when the data is personal, and regenerate the token if it leaks.

## Call it from JavaScript

```javascript
$.ajax({
  url: "<YOUR WEB SERVICE URL FROM STEP 6>",
  data: { q: "smith" },
  success: function (data) {
    data.row.forEach(function (item) {
      console.log(item.guid, item.name);
    });
  }
});
```
