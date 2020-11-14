## Snippet from Slack
### Author:  Byrce Kunkel  2020-11-12

If you’ve ever wanted to display materials in a portal (think making your own custom reader process) this script will get it for you.

```javascript
//returns a promise
function getMaterial(guid) {
    const host = '${document.location.protocol}//${document.location.hostname}'
    return fetch('${host}/manage/lookup/material?id=${guid}&cmd=display')
    .then(response => {
        if (response.ok) {
            return response
        }
    })
    .then(function(json) {
        const stream = FW.decodeFormValues(new URL(json.url).search.split('?')[1])
        return '${host}/apply/viewer?cmd=tile&id=${stream.id}&pg=0&z=72'
  })
}
```
