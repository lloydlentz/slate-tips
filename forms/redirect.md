To have a form redirect to a next page add a &referrer argurment.   i.e.

`
/manage/form/register?id=[[formguid]]&person={{personguid}}&referrer=/manage/form/register%3Fid=[[nextformguid]]%26person={{personguid}}%26referrer=/manage/lookup/record?id={{personguid}}
`
