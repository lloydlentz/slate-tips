# Redirect After a Form Submits

Add a `referrer` argument to the form URL to send the user somewhere after they submit. You can chain forms this way:

```
/manage/form/register?id=[[formguid]]&person={{personguid}}&referrer=/manage/form/register%3Fid=[[nextformguid]]%26person={{personguid}}%26referrer=/manage/lookup/record?id={{personguid}}
```

How it works:

- Anything inside the `referrer` value must be URL-encoded, so it is not read as part of the first form's URL:
  - `?` = `%3F`
  - `&` = `%26`
  - `#` = `%23`
- The `%26referrer=` at the end gives the second form its own redirect (here, back to the person record).
