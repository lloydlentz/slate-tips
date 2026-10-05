# Send Staff to the Internal Version of a Form

If a logged-in staff user opens the public version of a form, redirect them to the internal (`/manage/form/register`) version so the response is linked directly to the person.

Add to the form's script:

```javascript
var url = window.location.origin;
var form_id = location.search.substring(1);
var isStaff = document.querySelectorAll('li[data-realm="manage"]');

if (isStaff.length > 0) {
  alert('Please access this form using the internal link');
  window.location.href = url + '/manage/form/register?' + form_id;
}
```

_Credit: Austin Cariveau._
