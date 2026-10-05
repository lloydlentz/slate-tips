# Portal Popups

Open a portal method in Slate's popup dialog.

## Open a popup

Link to the popup's method with `data-href` and call `FW.Lazy.Popup`:

```html
<a data-href="?cmd=detail&amp;id={{person.id}}" href="#" onclick="return (FW.Lazy.Popup(this, {width: '500px'}));">{{person.name}}</a>
```


## Popup layout

Slate styles a popup's `.header` and `.content` blocks. `FW.Dialog.Unload()` closes the popup.

```html
<div class="header">
      Person Details
    </div>
    
    
    <div class="content" style="height: 400px;">
          
     <h3>Info</h3> 
         <div class="action" id="peercontact">
           <textarea name="peercontact_note" id="peercontact_note" cols="60" rows=5></textarea>
           <button onclick="save()" style="padding: 10px; margin: 20px;" type="button">Save</button>
           <button onclick="FW.Dialog.Unload();" style="padding: 10px; margin: 20px" type="button">Cancel</button>
         </div>

    </div>

    <script type="text/javascript">
     </script>
```


## Popup with an embedded form

```html
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title></title>
  </head>
  <body>
    <div class="header">
      New Research Request
    </div>

    <div class="content" style="height: 200px;">
      <div id="form_ae92507a-ba22-47f2-9c51-f0c5005112fb">
        Loading...
      </div>
    </div>
    <script>
       var formguid = 'ae92507a-ba22-47f2-9c51-f0c5005112fb';
       $.ajax({
           url: '/register/',
           dataType: "script",
           data: {
               id: formguid,
               output: 'embed',
               div:'form_' + formguid, 
               'currentuser' : '{{currentuser}}', 
              person : '{{person}}'
           },
           // success: success
       });

</script>
  </body>
</html>
```

See also: [Popup template](pop-up-template.html), [Change the submit button and add Cancel](popup_formbuttons.md), [jQuery form embed](jquery-form-embed.md).
