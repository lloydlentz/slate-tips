# Getting a Material as a PDF (download or Slate viewer)

Every uploaded file in Slate is a row in the `[material]` table. Two IDs matter:

| Column | What it is | Used by |
|--------|------------|---------|
| `[material].[id]` | The material's GUID | `/manage/lookup/material` (staff links) |
| `[material].[stream]` | The GUID of the stored file (the PDF Slate rendered) | `acquire`/`viewer` tiles and `download.pdf` |

Slate converts most uploads (Word, images, etc.) to PDF on ingest, so the links below return a PDF even when the original was not one.

## 1. Get the IDs in a query

```sql
select m.[id], m.[stream], m.[name], m.[created]
from [material] m
where m.[record] = @record
  and m.[deleted_timestamp] is null
order by m.[created] desc
```

In a Configurable Joins query, join to Materials and export the **GUID** and **Stream** fields (or use the Custom SQL exports below).

## 2. Open in the Slate PDF viewer (staff)

```html
<a href="/manage/lookup/material?id={{ m.id }}&amp;cmd=display" target="_blank">{{ m.name }}</a>
```

`cmd=display` opens the material in Slate's built in viewer. The user must be logged in with permission to see the record.

## 3. Download the PDF (staff)

```html
<a href="/manage/lookup/material?id={{ m.id }}&amp;cmd=download" target="_blank">Download {{ m.name }}</a>
```

Same permissions as above, but the browser downloads the file instead of opening the viewer.

## 4. Show a page as an image (thumbnail)

```html
<img src="/manage/database/acquire?cmd=tile&amp;id={{ m.stream }}&amp;pg=0&amp;z=72" />
```

- `pg` is the zero based page number.
- `z` is the zoom/resolution (30 for a thumbnail, 72 to 100 for reading).
- Use `/apply/viewer?cmd=tile&id=...` instead of `/manage/database/acquire` in a portal context. See [materials-snippet1.md](materials-snippet1.md).

## 5. A signed download link (portals, emails, exports)

`/manage/...` links require a Slate login. For a link that works outside `/manage` (a portal, a mailing, a CSV for another system), Slate accepts a hash signed with your instance salt:

```
https://<your-instance>/apply/download.pdf?part=stream:<stream-guid>&h=<md5(part + salt)>
```

Custom SQL export (CJ query on Materials):

```sql
concat(
    (select [value] from [config] where [key] = 'https'),
    '/apply/download.pdf?part=stream:', dbo.toGuidString([stream]),
    '&h=', dbo.toGuidString(dbo.md5(convert(varbinary(max),
        'stream:' + dbo.toGuidString([stream]) + dbo.salt())))
)
```

See [material_download_url.sql](material_download_url.sql) for the long form.

> **Security:** anyone holding this URL can download the file. It never expires. Only hand it to the person who should see that document, and never put it in a public page.

## 6. Display the document with Slate's PDF viewer

**Usage:** When you don't want the user to download the PDF.

The same signed `part`/`h` pair also works on `/apply/download` (no `.pdf`). Point an `<iframe>` at it to show the document inline in a portal page, so reviewers stay on your page instead of opening a new tab.

```
https://<your-instance>/apply/download?part=stream:<stream-guid>&h=<md5(part + salt)>
```

Add a Custom SQL export (here named `document_url`) to the portal's Materials query:

```sql
concat(
    (select [value] from [config] where [key] = 'https'),
    '/apply/download?',
    '&part=stream:', dbo.toGuidString(m.[stream]),
    '&h=', dbo.toGuidString(dbo.md5(convert(varbinary(max),
        concat('stream:', dbo.toGuidString(m.[stream])) + dbo.salt())))
) as [document_url]
```

Then render it in the portal view directly as a link, or even use an ifame:

```html
<iframe id="document-preview"
        title="Document preview"
        src="{{ material.document_url }}"
        referrerpolicy="no-referrer"
        style="width:100%; height:80vh; border:0;"></iframe>
```

To switch between several materials, put each URL in a `data-` attribute and swap the iframe's `src` with JavaScript:

```html
{% for material in materials %}
<button type="button" class="doc-tab" data-document-url="{{ material.document_url }}">{{ material.filename }}</button>
{% endfor %}
<iframe id="document-preview" title="Document preview" src="about:blank" referrerpolicy="no-referrer"></iframe>

<script>
  $(document).on('click', '.doc-tab', function () {
    $('#document-preview').attr('src', $(this).data('document-url') || 'about:blank');
  });
</script>
```

Tips:

- Hold off on adding `sandbox` to the iframe. A restrictive sandbox can stop Slate's document reader from working.
- `referrerpolicy="no-referrer"` keeps the signed URL out of the Referer header sent to other sites.
- The signed link is the same never-expiring link as in section 5. Treat it like the document itself: keep it out of form responses, logs, and `localStorage`, and filter the query so it returns only materials the viewer should see.

## 7. From JavaScript

If you only have the material GUID on the client, follow the `cmd=display` redirect to find the stream, then open it:

```javascript
fetch('/manage/lookup/material?id=' + guid + '&cmd=display').then(function (r) {
  var qs = FW.decodeFormValues(new URL(r.url).search.substring(1));
  window.open('/apply/download.pdf?cid=' + qs.id, '_blank');
});
```

## Which one should I use?

| Need | Use |
|------|-----|
| Staff viewing on a dashboard | `cmd=display` |
| Staff saving a copy | `cmd=download` |
| A preview image in a list | `acquire?cmd=tile` |
| A link for someone without a Slate login | signed `download.pdf?part=...&h=...` |
| A document shown inline on a portal page | signed `download?part=...&h=...` in an `<iframe>` |
