## Snippet from Slack
### Author:  Bryce Kunkel  [2020-11-12](https://slate-users.slack.com/archives/CJHEUQW5V/p1605193931121400)

If you’ve ever wanted to display materials in a portal (think making your own custom reader process) this script will get it for you.

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
