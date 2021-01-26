## Storing a photo as Base64 Data is not too hard.

### Step 1 - Form

Add a Text Box.  With [Export Key] = **photo_data_url**
 
### Step 2 - Form Script

In the "Edit Form Script" add the following 

```Javascript
//########## Define elements ########
var photoField = form.getElement("photo_data_url");
var fileInput = $("<input type='file' />");
var photoData = $("<br/><img id='photodata' style='height:300px'/>");
photoField.after(fileInput);
photoField.after(photoData);
photoField.hide();


if (form.getElement('photo_data_url').val()){
	$('#photodata').attr("src",form.getElement('photo_data_url').val());
}

var encodeImageFileAsURL = function(element) {
   var file = element.files[0];
   var reader = new FileReader();
    reader.onloadend = function() {
     console.log('RESULT', reader.result);
     photoField.val(reader.result);
      $("#photodata").attr("src",reader.result);
   }
   reader.readAsDataURL(file);
}


fileInput.bind("change", function(){
	encodeImageFileAsURL(encodeImageFileAsURL(this));
});
```

Give it a whirl.  this will store the result in your form.
![](https://github.com/lloydlentz/slate-tips/blob/main/img/imglaod.gif)


### Optional

If you would like to seperately store a Thubmail version, you could add a field 
 * [Export Key] = **photo_data_url_thm**
 * [Label] = **Thumbnail Size**
 
  [Use this JS instead](photo_uploader_thumbnail.js)
