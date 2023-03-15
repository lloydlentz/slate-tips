# Autocomplete

What century is it?   We are used to having the web know about us, and help us fill out info.  

---
## Slate Form Default

Per Stephen Nickle @ Technolutions
> Autosuggest behavior in a form is like a waterfall starting at the top and flowing down until it hits a section break.

Try putting a text box on your form with  autosuggest = `suggest,p/name`  and one after it with autosuggest `suggest,p/id`

You can set the filed mapping to store that on a person record / Entity value, whatever.   Go for it!

---
## Custom AutoComplete

Autocomple has been around for decades.  **THANKS GOOGS**.  It is even part of the HTML5 [web standard](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)

Fundamenatlly you need three parts
1) **Input**; A form with an input box
2) **Data**; remote data source that will filter on what is in the input box
3) **Action**; Do something after the person chooses an autocomplete item

Slate is super great at providing remote data source that will filter on a value.  There are a few ways you can do this within slate.  Here is an easy enough one.

#### Form

1) Add an Input Box on a form.  Label = `Search`,  Export-Key = `search-input`
2) Add an Input Box on a form.  Label = `Selected`, Export Key = `search-selected`

#### Data

Let's get our data from a query, with config joins.  
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
    1) Custom Parameters: add `<param id="q" />`
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


* **SECURITY** Always think about the level of security you want to provide to your users.   
It would be a good idea to restrict the networks used to only on campus if you are using this teqnigue to pre-fill any personal information on a form.


## Action

PRO-TIP, never re-create work that has already been done for you.   Slate relies upon the JQuery framework.   JQuery has this great addon for [AUTOCOMPLETE](https://jqueryui.com/autocomplete/)
Let's use that.

JQuery AutoComplete has a bit of a learning curve with it.  For this note's sake I will incant //hand-wavey-webdev-stuff//.

If you go back to your form on Step 1 and add this to your [Edit Scripts/Styles] 
```javascript
const input = form.getElement("search-input");
const selected = form.getElement("search-selected");

$.getScript( "https://code.jquery.com/ui/1.13.2/jquery-ui.js", function( data, textStatus, jqxhr ) {

	input.autocomplete({
      source: function( request, response ) {
        $.ajax( {
          url: "[[!!YOUR WEBSERVICE URL THAT YOU COPPIED FROM STEP 2 ABOVE... MINUS THE q=]]",
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


Give that a whirl.   Let me know what you thik on slack.  :)
