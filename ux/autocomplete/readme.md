# Autocomplete

What century is it? We're used to the web knowing about us and helping us fill out info. Two ways to get that in a Slate form.

## Option 1: Slate's built-in autosuggest

Per Stephen Nickle @ Technolutions
> Autosuggest behavior in a form is like a waterfall starting at the top and flowing down until it hits a section break.

Try a text box with autosuggest `suggest,p/name`, followed by one with `suggest,p/id`. Map the fields to a person record, entity value, or whatever you need.

To limit suggestions to a population, see [Restrict autosuggest to a population](../../forms/autocomplete_restrict_to_population.md).

## Option 2: Custom autocomplete from your own query

You need three parts:

1. **Input:** a form with a text box
2. **Data:** a remote source that filters on what's typed (a Slate query web service is great at this)
3. **Action:** something that happens when the person picks a suggestion

### Input

1. Add a text box: Label `Search`, Export Key `search-input`.
2. Add a text box: Label `Selected`, Export Key `search-selected`.

### Data

Follow [Make a Configurable Joins query a web service](../webservice_query.md), including the optional `q` parameter and the "Search by Name" filter.

> **Security:** if you use this to prefill personal information, restrict the web service's Allowed Networks to campus.


### Action

Pro tip: never rebuild what already exists. Slate already loads jQuery, and jQuery UI has an [autocomplete widget](https://jqueryui.com/autocomplete/). It has a bit of a learning curve; for now, *hand-wavey web dev stuff*.

Add this to the form's **Edit Scripts / Styles**:
```javascript
const input = form.getElement("search-input");
const selected = form.getElement("search-selected");

$.getScript( "https://code.jquery.com/ui/1.13.2/jquery-ui.js", function( data, textStatus, jqxhr ) {

	input.autocomplete({
      source: function( request, response ) {
        $.ajax( {
          url: "<YOUR WEB SERVICE URL, without the q= part>",
         data: {
            q: request.term
          },
          success: function( data ) {
            response( $.map( data.row, function( item ) {
              return {
                label: item.name,
                value: item.name,
                class: item.class,
                id: item.guid
              }
            }));
          }
        } );
      },
      minLength: 2,
      select: function( event, ui ) {
				selected.val("Selected: " + ui.item.value + " aka " + ui.item.id );
      }
    });	
});



loadCSS = function(href) {

  var cssLink = $("<link>");
  $("head").append(cssLink); //IE hack: append before setting href

  cssLink.attr({
    rel:  "stylesheet",
    type: "text/css",
    href: href
  });

};

loadCSS("https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css")
```


Give that a whirl. Let me know what you think on Slack. :)
