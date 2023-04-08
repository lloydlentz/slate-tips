# Make your Config Joins Query a Webservice

1) New Query - Config Join - Whatever base you are looking to get values from.   Usually Person, but why not something else?   Events? Funds? Contact Reports?
2) [Edit Permissions] 
    1)  Add Grantee
        1)  Type = User Totke
        2)  Name = `webservice`
        3)  Allowed Networks *
        4)  Permissions = ✅ Web Service
        5)  [Save]
    2) [Close] 
3) [Edit Web Services]
    1) **OPTIONAL** Custom Parameters: add `<param id="q" />`
    2) Service Type: JSON
    3) Include NULLs: Include Nulls
    4) [Save]
4) Add Exports  (in my example I am an querying person)
    1) guid
    2) name
    3) classyear
    4) record_type
5) Add Filters
    1) Add any over arching filters you want.  (Recrods Status, Degree Type, Donor Categroy, etc)
    2) Subquery Filter
        1) Name: Search by Name
        2) Aggregate: Formula
        3) Formula: `@Person-Name like '%' + @q + '%'`
        4) Export: [Person Name]
        5) [Save]
6) click on **Web Service** [JSON]
    1) Service Accunt: User Token - webservice
    2) Authorization Type: Query String
    3) URL:  !!COPY THAT!!




## To use with query 

### Eample 1
``` Javascript
$.ajax({
    // url: "[[!!YOUR WEBSERVICE URL THAT YOU COPPIED FROM STEP 6 ABOVE]]",
    url: "https://engage.macalester.edu/manage/query/run?id=e6c9632c-5980-4032-8e76-bef80e4d4947&cmd=service&output=json&h=578fea8f-2c64-47a5-820c-42ba3b5809f6",
    success: function( data ) {
        data.row.forEach(item => {
            console.log(item.guid)
            $('.form_response :input[value="'+eventOptions[item.guid]+'"]').parent().addClass('hidden')
        });
    }
});
```

### Example 2


