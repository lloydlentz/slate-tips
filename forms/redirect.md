To have a form redirect to a next page add a &referrer argurment.   i.e.

`
/manage/form/register?id=[[formguid]]&person={{personguid}}&referrer=/manage/form/register%3Fid=[[nextformguid]]%26person={{personguid}}%26referrer=/manage/lookup/record?id={{personguid}}
`

A little about that sample. 

 * In order to have arguments you need to HTML Escape the ?s and &s 
   * ? =  %3F
   * & =  %26
   * # =  %23
 * To send a referer to the second (referred) form, that is the %26referrer=  arg at the end.
