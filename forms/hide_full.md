# Hide Full events 

If you are using a primary form to register event attendees, and are not using the Related Events widget, but instead using a series of select boxes, and an automated export import to populate related events.  Here is a way to hide events that are already full.

---
## General Idea
1) Create your form with options to register
2) Create your related events, as events, in a way that is queryiable (say all in a folder, or starte with a field, or have a related record of a Performance Goal Dataset, ...)
3) Create a spreadsheet that keeps track of your {Event Name, Event GUID, Form response values}
4) Create a query, with a webservice that will return which events are full
5) Add some Javascript to the form that checks the query with JQuery and hides any options that are now full.


## Details

### 1) Form
In my example form [1] , I have a simple registration block, with a checkbox (**Export Key**: `friday_options`) with prompt values 
```
Friday Dinner^fri_dinner
Sing along^fri_sing
Movie Night^fri_movie
```

### 2) Events
I am using events in the folder `Reunion / Sub-Events`.   

### 3) Spreadsheet.
Check out [this Spreadsheet](https://airtable.com/shrmWUY2QAcLGptMQ).   You can imagine a much longer one, with all the options.

### 4) Query
I made a query[1] that checks for events with registered >= Limit.  Then made it available as a web service .

1) New Query - Config Join - Whatever base you are looking to get values from.  I am doing Forms
2) [Edit Permissions] 
    1)  Add Grantee
        1)  Type = User Totke
        2)  Name = `webservice`
        3)  Allowed Networks *
        4)  Permissions = ✅ Web Service
        5)  [Save]
    2) [Close] 
3) [Edit Web Services]
    1) Custom Parameters: *none*
    2) Service Type: JSON
    3) Include NULLs: Include Nulls
    4) [Save]
4) Add Exports  (in my example I am an querying person)
    1) guid
    2) name
    3) classyear
    4) record_type
5) Add Filters
    1) Folder
    2) Formula: Registered >= Limit
6) click on **Web Service** [JSON]
    1) Service Accunt: User Token - webservice
    2) Authorization Type: Query String
    3) URL:  !!COPY THAT!!


### 5) Script

In your form, open the Script and you can add two parts

#### Part 1 : Map Event GUIDs to Form options
```Javascript 
var eventOptions = {
    -- [[PASTE ALL THE VALUES FROM YOUR SPREADSHEET COLUMN **[Array FOR JS]**]]
}
```

#### Part 2 : Call your query, and hide all the parts.   
This is an easy bit. 
```Javascript 
$.ajax({
    url: "[[!!YOUR WEBSERVICE URL THAT YOU COPPIED FROM STEP 4.6.3 ABOVE]]",
    success: function( data ) {
        data.row.forEach(item => {
            console.log(item.guid)
            $('.form_response :input[value="'+eventOptions[item.guid]+'"]').parent().addClass('hidden')
        });
    }
});
```

##### example
```Javascript 
var eventOptions = {
    'bbcf0ee1-a5c9-433a-a762-cc55a916e11f': 'fri_dinner',
    '86ec5a34-22b1-4686-b641-4c8926adf79f': 'fri_sing',
    '3f0217b8-9aef-4103-9334-cf073e4c9707': 'fri_movie'
}

$.ajax({
    url: "https://engage.macalester.edu/manage/query/run?id=e6c9632c-5980-4032-8e76-bef80e4d4947&cmd=service&output=json&h=578fea8f-2c64-47a5-820c-42ba3b5809f6",
    success: function( data ) {
        data.row.forEach(item => {
            console.log(item.guid)
            $('.form_response :input[value="'+eventOptions[item.guid]+'"]').parent().addClass('hidden')
        });
    }
});
```


## In summary

Never forget that slat is a [series of tubes](https://en.wikipedia.org/wiki/Series_of_tubes), tinker toy away at your instance to make it do your will. 

---






[1] - Suitcase: **c1bd5c93-1c6e-476a-ac07-419b96425285:mad**
