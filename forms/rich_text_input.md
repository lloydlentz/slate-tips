# Rich Text Editor on a Paragraph Field

Turn a form's Paragraph Text field into a CKEditor rich text editor. Set `exportKey` to your field's export key and add this to the form's script.

```javascript
var exportKey = "purpose";

// Load CKEditor and CKFinder, then attach the editor to the textarea
$.when(
  $.getScript("/fw/framework/ckfinder/ckfinder.js?v=25af&cdn=0"),
  $.getScript("//slate-technolutions-net.cdn.technolutions.net/manage/deliver/ckeditor.js?v=TS-25af-635119916154460870"),
  $.getScript("//fw.cdn.technolutions.net/framework/ckeditor.js?v=25af")
).done(function () {
  var textareaId = $('div[data-export="' + exportKey + '"] textarea').attr('id');
  if (!textareaId) return;

  if (CKEDITOR.instances[textareaId]) {
    CKEDITOR.remove(CKEDITOR.instances[textareaId]);
  }
  CKEDITOR.replace(textareaId, {
    filebrowserImageBrowseUrl: '/manage/database/asset?cmd=browse&type=images',
    filebrowserBrowseUrl: '/manage/database/asset?cmd=browse&type=documents',
    templates_files: ['/manage/deliver/?cmd=templates'],
    startupFocus: true,
    fullPage: false,
    height: 320,
    forceEnterMode: true,
    toolbar: CKEDITOR.getToolbar('full')
  });
}).fail(function () {
  console.error("One or more CKEditor scripts failed to load.");
});
```

> The script URLs include Slate version strings (`v=25af`). If the editor stops loading after a Slate release, check the current URLs in a Deliver message's page source.

## References

- [Rich Text Editor in a Form](https://resource.reworkflow.com/books/slate/page/rich-text-editor-in-a-form)
