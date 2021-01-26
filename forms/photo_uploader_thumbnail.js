//########## Thumnail Size  #########
var maxWidth = 300;
var maxHeight = 300;

//########## Define elements ########
var photoField = form.getElement("photo_data_url");
var photoFieldThumbnail = form.getElement("photo_data_url_thm");
var fileInput = $("<input type='file' />");
var photoData = $("<br/><img id='photodata' style='height:300px'/>");
var height = 1;
var width = 1;
var imgURL;
photoField.after(fileInput);
photoField.after(photoData);
photoField.hide();
photoFieldThumbnail.hide();


// If there is already Base64, then load the preview
if (photoField.val()){
	$('#photodata').attr("src",photoField.val());
}

//########### Define local functions
var encodeImageFileAsURL = function(element) {
   var file = element.files[0];
   var reader = new FileReader();
    reader.onloadend = function() {
    imgURL = reader.result;
    photoField.val(imgURL);
    $("#photodata").attr("src",imgURL);
    photoField.val = imgURL;  //Show the preview of the img
    createThumbnail(imgURL, photoFieldThumbnail);
   }
   reader.readAsDataURL(file);
}

fileInput.bind("change", function(){
    encodeImageFileAsURL(this);
});

var createThumbnail = function(photoString, varPhotoField)
{
    $("#photodisplay").remove();
    var photoDisplay = new Image();
    photoDisplay.id = "photodisplay";
    photoDisplay.onload = function(){
        var width = ((maxHeight/maxWidth) <= (photoDisplay.height/photoDisplay.width)) ?  ((photoDisplay.width * maxHeight) / photoDisplay.height) : maxWidth;
        var height = ((maxHeight/maxWidth) > (photoDisplay.height/photoDisplay.width)) ?  ((photoDisplay.height * maxHeight) / photoDisplay.width) : maxHeight;
        
        imageToDataUri(photoDisplay, width, height, function(dataUrl) {
            photoDisplay.src = dataUrl;         // Set the src
            varPhotoField.after(photoDisplay);	// Show the new thumbnail
            varPhotoField.val(dataUrl);         // Store the Data
        });
    
    };			
    photoDisplay.src = photoString;			
}


var imageToDataUri = function(img, width, height, callback) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(img, 0, 0, width, height);
    callback(canvas.toDataURL());
}
