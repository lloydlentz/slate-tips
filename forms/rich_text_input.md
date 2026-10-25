# Rich Text Editor on a Paragraph Field

Turn a form's Paragraph Text field into a CKEditor rich text editor. Set `exportKey` to your field's export key and add this to the form's script.

**Updated October 25, 2026:** The old shared CDN `/manage/deliver/ckeditor.js` URL returns 404. Use the same-origin Slate framework URLs below instead. This loading pattern is also used by the Macalester and Lewis & Clark fundraising initiative content forms; both instances' script URLs were checked on this date.

```javascript
var exportKey = "purpose";

// Load CKEditor and CKFinder, then attach the editor to the textarea
$.when(
  $.getScript("/fw/framework/ckfinder/ckfinder.js?v=25af&cdn=0"),
  $.getScript("/fw/framework/ckeditor.js?v=25ae")
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
}).fail(function (jqxhr, textStatus, errorThrown) {
  console.error("CKEditor or CKFinder failed to load:", jqxhr.status, textStatus, errorThrown);
});
```

The leading `/` loads each script from the current form's Slate instance. Do not add the retired shared CDN Deliver script as another dependency: `$.when(...)` requires every request to succeed, so a single 404 prevents the editor from attaching even when the framework script loads successfully.

The `v=` parameters are Slate cache/version strings, not CKEditor release numbers. Changing only the version parameter on the retired Deliver URL does not fix its missing path. These framework URLs were working when checked; future Slate changes can still require an update. If the editor stops loading, check the browser's Network and Console tabs and compare the framework URLs with those used by your instance's current Deliver editor.

The asset browser and templates URLs in the configuration are separate editor features. Keep them if needed, and verify permissions and image/document browsing in the form's intended user context. Loading the scripts successfully does not establish that those features work for anonymous users.

## References

- [Rich Text Editor in a Form](https://resource.reworkflow.com/books/slate/page/rich-text-editor-in-a-form)
