##  Add a Rich Text editor to your Paragraph Text Field 



```js
////   CK Ediitor Section 

// Define the export key
var exportKey = "purpose";

// Load CKEditor and CKFinder scripts dynamically
$.when(
    $.getScript("/fw/framework/ckfinder/ckfinder.js?v=25af&cdn=0"),
    $.getScript("//slate-technolutions-net.cdn.technolutions.net/manage/deliver/ckeditor.js?v=TS-25af-635119916154460870"),
    $.getScript("//fw.cdn.technolutions.net/framework/ckeditor.js?v=25af")
).done(function() {
    // All scripts loaded successfully, now find the textarea and attach CKEditor
    var textareaId = $('div[data-export="' + exportKey + '"] textarea').attr('id');
    
    if (textareaId) {
        if (CKEDITOR.instances[textareaId]) {
            CKEDITOR.remove(CKEDITOR.instances[textareaId]);
        }
        editor = CKEDITOR.replace(textareaId, {
            filebrowserImageBrowseUrl: '/manage/database/asset?cmd=browse&type=images',
            filebrowserBrowseUrl: '/manage/database/asset?cmd=browse&type=documents',
            templates_files: ['/manage/deliver/?cmd=templates'],
            startupFocus: true,
            fullPage: false,
            height: 320,
            forceEnterMode: true,
            toolbar: CKEDITOR.getToolbar('full'),
        });
    }
}).fail(function() {
    console.error("One or more scripts failed to load.");
});
```
