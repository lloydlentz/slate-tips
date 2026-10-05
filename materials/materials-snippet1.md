# Get a Material's Viewer Image from JavaScript

To display materials in a portal (say, a custom reader), this returns a page-image URL for a material GUID.

_Credit: Bryce Kunkel ([Slate Community Slack, 2020-11-12](https://slate-users.slack.com/archives/CJHEUQW5V/p1605193931121400))._

```javascript
//returns a promise
function getMaterial(guid) {
    const host = `${document.location.protocol}//${document.location.hostname}`
    return fetch(`${host}/manage/lookup/material?id=${guid}&cmd=display`)
    .then(response => {
        if (response.ok) {
            return response
        }
    })
    .then(function(response) {
        const stream = FW.decodeFormValues(new URL(response.url).search.split('?')[1])
        return `${host}/apply/viewer?cmd=tile&id=${stream.id}&pg=0&z=72`
  })
}
```
