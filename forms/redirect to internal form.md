# Redirct to internal form, so they can link directly to a person.


_thanks to_ **Austin Cariveau**

```
var url = window.location.origin;
var form_id = location.search.substring(1);
var usercheck2 = document.querySelectorAll('li[data-realm="manage"]');
if(usercheck2.length > 0) {
	
alert('Please access this form using the internal link');
window.location.href = url+'/manage/form/register?'+form_id;
}

```
