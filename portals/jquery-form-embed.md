The default way to embed a form, is snazzy.  

```
  <div id="form_b6455cc8-58da-49d7-92c2-41f1f229b50d">
    Loading...
  </div>
 <script async="async" src="https://engage.macalester.edu/register/?id=b6455cc8-58da-49d7-92c2-41f1f229b50d&amp;output=embed&amp;div=form_b6455cc8-58da-49d7-92c2-41f1f229b50d&amp;sys:job:id={{job_guid}}&amp;sys:job:employer={{org}}&amp;sys:job:title={{title}}&amp;sys:job:from={{startdt}}&amp;sys:job:field:field_of_work={{fow}}&amp;sys:job:field:field_of_spec={{fos}}&amp;sys:field:dir_show_employment={{viz}}&amp;sys:job:field:show_job_function={{show_job_function}}&amp;person={{guid}}" type="text/javascript"></script>
 ```
 
 But seriously, if you have a number of elements you are trying to map... it gets cumbersome.   As usualy jQuery to the rescue.
 
 ```
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

## Level Up
If you want to level that up Dont add the default GUID DIV.

 ```
     <script>
        function uuidv4() {  //Generate a GUID
          return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
          );
        }
        
        
        var formguid = uuidv4();
        
        $('div.content').prepend('<div id="form_'+formguid+'">loading...</div>');

        $.ajax({
            url: 'https://engage.macalester.edu/register/',
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
