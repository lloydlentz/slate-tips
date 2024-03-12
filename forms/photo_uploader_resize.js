//Get Material Uploader object 
var cec_interests_ceo1_img = $("div[data-export='cec_interests_ceo1_img'] input")
cec_interests_ceo1_img.data("textfield","sys:field:cec_interest_ceo1_img_url")


cec_interests_ceo1_img.on( "change", function() {
	console.log("change")
	var file = document.getElementById(cec_interests_ceo1_img.attr("id")).files[0];
	putBase64inInput(file,$('div[data-export="sys:field:cec_interest_ceo1_img_url"] input'))	
});




//Get Material Uploader object 
var cec_interests_ceo2_img = $("div[data-export='cec_interests_ceo2_img'] input")
cec_interests_ceo2_img.data("textfield","sys:field:cec_interest_ceo2_img_url")


cec_interests_ceo2_img.on( "change", function() {
	console.log("change")
	var file = document.getElementById(cec_interests_ceo2_img.attr("id")).files[0];
	putBase64inInput(file,$('div[data-export="sys:field:cec_interest_ceo2_img_url"] input'))	
});





function putBase64inInput(file,input) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
		 var result = reader.result
		 console.log("file is ",result.length," long")
		 
//		 input.val(result);
//		 var resized = resizedataURL(reader.result,200,200)
		 var resized = resizeDataUrlToMaxSize(reader.result,200,200)
		 resized.then(function(result) { 
        console.log("Result: " + result);
 	    	console.log("file is ",result.length," long")
		    input.val(result)
    });
		 
     //console.log(reader.result);
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}


function getBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
		 var result = reader.result
		 console.log("file is ",result.length," long")
		 return result;
     //console.log(reader.result);
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}


// Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size.
function resizedataURL(datas, wantedWidth, wantedHeight){
    return new Promise(async function(resolve,reject){

        // We create an image to receive the Data URI
        var img = document.createElement('img');

        // When the event "onload" is triggered we can resize the image.
        img.onload = function()
        {        
            // We create a canvas and get its context.
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            // We set the dimensions at the wanted size.
            canvas.width = wantedWidth;
            canvas.height = wantedHeight;

            // We resize the image with the canvas method drawImage();
            ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);

            var dataURI = canvas.toDataURL();

            // This is the return of the Promise
            resolve(dataURI);
        };

        // We put the Data URI in the image's src attribute
        img.src = datas;

    })
}// Use it like : var newDataURI = await resizedataURL('yourDataURIHere', 50, 50);



function resizeDataUrlToMaxSize(dataURI, maxWidth, maxHeight) {
    return new Promise(function(resolve, reject) {
        var img = new Image();

        img.onload = function() {
            // Calculate the scaling factor to maintain aspect ratio
            var scale = Math.min(maxWidth / img.width, maxHeight / img.height);

            // Calculate the new width and height
            var newWidth = img.width * scale;
            var newHeight = img.height * scale;

            // Create a canvas to perform the resize operation
            var canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
            var ctx = canvas.getContext('2d');

            // Draw the resized image on the canvas
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Extract the resized image as a data URL
            var resizedDataURI = canvas.toDataURL();

            // Resolve the promise with the resized data URL
            resolve(resizedDataURI);
        };

        // Reject the promise if there's an error loading the image
        img.onerror = function() {
            reject(new Error('Failed to load image'));
        };

        // Start loading the image
        img.src = dataURI;
    });
}

// Usage example:
// var newDataURI = await resizeDataUrlToMaxSize('yourDataURIHere', 50, 50);
