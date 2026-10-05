# Embed a Form with Readable jQuery

Slate's default form embed code works, but passing many prefill values makes it one very long URL:

```html
  <div id="form_b6455cc8-58da-49d7-92c2-41f1f229b50d">
    Loading...
  </div>
 <script async="async" src="/register/?id=b6455cc8-58da-49d7-92c2-41f1f229b50d&amp;output=embed&amp;div=form_b6455cc8-58da-49d7-92c2-41f1f229b50d&amp;sys:job:id={{job_guid}}&amp;sys:job:employer={{org}}&amp;sys:job:title={{title}}&amp;sys:job:from={{startdt}}&amp;sys:job:field:field_of_work={{fow}}&amp;sys:job:field:field_of_spec={{fos}}&amp;sys:field:dir_show_employment={{viz}}&amp;sys:job:field:show_job_function={{show_job_function}}&amp;person={{guid}}" type="text/javascript"></script>
 ```
 
With more than a couple of values that gets cumbersome. jQuery to the rescue: pass the values as an object instead.

```html
     <script>
        var formguid = 'b6455cc8-58da-49d7-92c2-41f1f229b50d';
        $.ajax({
            url: '/register/',
            dataType: "script",
            data: {
                id: formguid,
                output: 'embed',
                div:'form_' + formguid, 
                'sys:job:id':'{{jobs[0].job_guid}}', 
                'sys:job:employer': '{{org}}', 
                'sys:job:title': '{{title}}', 
                'sys:job:from': '{{startdt}}', 
                'sys:job:field:field_of_work': '{{fow}}', 
                'sys:job:field:field_of_spec': '{{fos}}', 
                'sys:field:dir_show_employment': '{{viz}}', 
                'sys:job:field:show_job_function': '{{show_job_function}}', 
                person:'{{guid}}'
            },
            // success: success
        });

    </script>
```

## Also pass through the page's query string parameters

This forwards the parameters in the page URL to the form, then adds your own.

 ```html
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title></title>
  </head>
  <body>
    <div id="form_18b3081b-33ef-4fe1-87c2-45b53a7f54c1">
      Loading...
    </div>
    <script> $(document).ready(function() {
      
    
     var formguid = '18b3081b-33ef-4fe1-87c2-45b53a7f54c1';
       
       //GET THE LOCAL QUERYSTRING PARAMS  !!!  THESE HAVE TO BE VISIBLE IN YOUR URL BAR.   Not passed as an AJAX call  !!!
       const params = {};
       const queryString = window.location.search;
       if (queryString) {
         const searchParams = new URLSearchParams(queryString.substring(1));
         for (const [key, value] of searchParams.entries()) {
           params[key] = value;
         }
        
       }

       // DELETE THE ID of the form or page currently loading
       delete params.id;
       //Add in the key form items
       params["id"] = formguid;
       params["output"] = 'embed';
       params["div"] = 'form_' + formguid;
       //  ADD MORE HERE 
       params['sys:job:title'] =  '{{title}}'; 
       params['sys:job:from'] =  '{{startdt}}'; 
       params['sys:job:field:field_of_work'] =  '{{fow}}';
       // ... etc
    
       //  Load the form Items as needed        
       $.ajax({
           url: '/register/',
           dataType: "script",
           data: params,
           // success: success
       });
 
    
    });
   </script>
  </body>
</html>
```


## Level up: generate the div

Instead of hard-coding the target div, create it with a random ID. This avoids ID collisions when the same form is embedded twice on a page.

```html
     <script>
        function uuidv4() {  //Generate a GUID
          return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
          );
        }
        
        
        var formguid = 'b6455cc8-58da-49d7-92c2-41f1f229b50d';
        var divId = 'form_' + uuidv4();

        $('div.content').prepend('<div id="' + divId + '">loading...</div>');

        $.ajax({
            url: '/register/',
            dataType: "script",
            data: {
                id: formguid,
                output: 'embed',
                div: divId,
                'sys:job:id':'{{jobs[0].job_guid}}', 
                'sys:job:employer': '{{org}}', 
                'sys:job:title': '{{title}}', 
                'sys:job:from': '{{startdt}}', 
                'sys:job:field:field_of_work': '{{fow}}', 
                'sys:job:field:field_of_spec': '{{fos}}', 
                'sys:field:dir_show_employment': '{{viz}}', 
                'sys:job:field:show_job_function': '{{show_job_function}}', 
                person:'{{guid}}'
            },
            // success: success
        });

    </script>
```
