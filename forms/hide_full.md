# Hide Full Events on a Registration Form

Use this if you register attendees on one main form with checkboxes (not the Related Events widget), and an automated export/import fills in the related events. It hides options for events that are already full.

## Overview
1. Create the form with registration options.
2. Create the related events so they are easy to query (all in one folder, a shared field, etc.).
3. Keep a spreadsheet mapping each event name and GUID to its form option value.
4. Create a query web service that returns the events that are full.
5. Add form script that calls the web service and hides those options.


## Details

### 1) Form
My example form [1] has a checkbox question (Export Key `friday_options`) with these prompt values:

```
Friday Dinner^fri_dinner
Sing along^fri_sing
Movie Night^fri_movie
```

### 2) Events
The events are in the folder `Reunion / Sub-Events`.

### 3) Spreadsheet

See [this example spreadsheet](https://airtable.com/shrmWUY2QAcLGptMQ). Yours will likely have many more rows.

### 4) Query
The query [1] returns events where Registered >= Limit, exposed as a web service.

Follow [Make a Configurable Joins query a web service](../ux/webservice_query.md), with these differences:

- Base: **Form** (one row per related event)
- No custom parameters
- Exports: `guid` (the event's GUID)
- Filters: your events folder, and a formula filter for Registered >= Limit

### 5) Script

Add two parts to the form's script.

#### Part 1: Map event GUIDs to form option values

```javascript
var eventOptions = {
  // paste the values from the spreadsheet's "Array for JS" column
};
```

#### Part 2: Call the web service and hide full options

```javascript
$.ajax({
    url: "<YOUR WEB SERVICE URL>",
    success: function( data ) {
        data.row.forEach(item => {
            console.log(item.guid)
            $('.form_response :input[value="'+eventOptions[item.guid]+'"]').parent().addClass('hidden')
        });
    }
});
```

#### Full example

```javascript
var eventOptions = {
    'bbcf0ee1-a5c9-433a-a762-cc55a916e11f': 'fri_dinner',
    '86ec5a34-22b1-4686-b641-4c8926adf79f': 'fri_sing',
    '3f0217b8-9aef-4103-9334-cf073e4c9707': 'fri_movie'
}

$.ajax({
    url: "<YOUR WEB SERVICE URL>",
    success: function( data ) {
        data.row.forEach(item => {
            console.log(item.guid)
            $('.form_response :input[value="'+eventOptions[item.guid]+'"]').parent().addClass('hidden')
        });
    }
});
```


## In summary

Never forget that Slate is a [series of tubes](https://en.wikipedia.org/wiki/Series_of_tubes), Tinker away at your instance to make it do your will.

---

[1] Briefcase: `c1bd5c93-1c6e-476a-ac07-419b96425285@mad`
