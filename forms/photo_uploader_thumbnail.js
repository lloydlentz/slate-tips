/*
 * Photo-response form script (hardened version)
 *
 * Base pattern copied from existing forms already in production use
 * (e.g. "Tutor Bio and Expertise - Combined", export key form_profile_image;
 * several Admin/TEST forms, export key photo_data_url). Paste into a form's
 * Edit Form -> Edit Scripts / Styles -> Custom Scripts tab.
 *
 * Requires: a plain Slate "text" field on the form, export key set below in
 * PHOTO_FIELD_EXPORT_KEY. No maxlength cap needed -- form.response.field.value
 * is varchar(MAX), so there's no DB truncation risk at any of these sizes.
 *
 * Changes from the original snippet:
 *   1. accept="image/*" + capture hint so mobile opens the camera directly,
 *      instead of a general file picker.
 *   2. Rejects non-image files with a visible message instead of silently
 *      producing a blank preview / empty field value.
 *   3. Re-encodes as JPEG (quality below) instead of the default PNG, which
 *      shrinks stored payloads several times over for photographic content
 *      versus the original snippet's uncompressed PNG at the same dimension.
 *
 * Sizing note: MAX_DIMENSION/JPEG_QUALITY are a resolution-vs-page-weight
 * tradeoff, not a storage limit -- every completed stop's photo gets pulled
 * back into the hunt hub's query result on *every* page load (not just at
 * submission), so bumping these up trades a heavier hub page for sharper
 * photos. Current values (1200px / 0.9) are noticeably sharper than the
 * original 300px/0.8, at the cost of a larger embedded payload per photo.
 */

// ---- Configuration -------------------------------------------------------

// Must match the export key of the hidden text field on this form.
var PHOTO_FIELD_EXPORT_KEY = "photo_ans";

// "environment" opens the rear/outward camera first (good for "photograph
// this location" prompts). Use "user" instead for selfie-style prompts.
var PHOTO_CAPTURE_MODE = "environment";

var MAX_DIMENSION = 1200;
var JPEG_QUALITY = 0.9;

// ---------------------------------------------------------------------------

// Scales the *displayed* preview to fit the form's width -- the stored data
// URI stays at full MAX_DIMENSION/JPEG_QUALITY resolution regardless.
var PHOTO_PREVIEW_MAX_HEIGHT = "400px";

var displayImage = function () {
  $("#photodisplay").remove();
  var photoDisplay = new Image();
  photoDisplay.id = "photodisplay";
  photoDisplay.style.maxWidth = "100%";
  photoDisplay.style.maxHeight = PHOTO_PREVIEW_MAX_HEIGHT;
  photoDisplay.style.height = "auto";
  photoDisplay.style.display = "block";
  photoField.after(photoDisplay);
  photoDisplay.src = photoField.val();
};

var showPhotoError = function (message) {
  $("#photoerror").remove();
  var error = $("<div id='photoerror' style='color:#b00020;font-size:0.9em;margin-top:4px;'></div>");
  error.text(message);
  fileInput.after(error);
};

var clearPhotoError = function () {
  $("#photoerror").remove();
};

var imageToDataUri = function (img, width, height, callback) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(img, 0, 0, width, height);
  callback(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
};

var loadImageFileAsURL = function (fileInputEl, photoField) {
  var filesSelected = fileInputEl.files;
  if (filesSelected.length === 0) {
    return;
  }

  var fileToLoad = filesSelected[0];

  if (fileToLoad.type.indexOf("image/") !== 0) {
    showPhotoError("Please choose an image file.");
    fileInputEl.value = "";
    return;
  }

  clearPhotoError();

  var fileReader = new FileReader();

  fileReader.onload = function (fileLoadedEvent) {
    var photoString = fileLoadedEvent.target.result;

    $("#photodisplay").remove();
    var photoDisplay = new Image();
    photoDisplay.id = "photodisplay";
    photoDisplay.onload = function () {
      var width = photoDisplay.width;
      var height = photoDisplay.height;

      if (height > MAX_DIMENSION || width > MAX_DIMENSION) {
        if (MAX_DIMENSION / width < MAX_DIMENSION / height) {
          height = (height * MAX_DIMENSION) / width;
          width = MAX_DIMENSION;
        } else {
          width = (width * MAX_DIMENSION) / height;
          height = MAX_DIMENSION;
        }
      }

      imageToDataUri(photoDisplay, width, height, function (dataUrl) {
        photoField.after(photoDisplay);
        photoField.val(dataUrl);
        displayImage();
      });
    };
    photoDisplay.src = photoString;
  };

  fileReader.onerror = function () {
    showPhotoError("That file couldn't be read. Please try a different photo.");
  };

  fileReader.readAsDataURL(fileToLoad);
};

var photoField = form.getElement(PHOTO_FIELD_EXPORT_KEY);
photoField.hide();

var fileInput = $("<input type='file' accept='image/*' capture='" + PHOTO_CAPTURE_MODE + "' />");
photoField.after(fileInput);

if (photoField.val()) {
  displayImage();
}

fileInput.bind("change", function () {
  loadImageFileAsURL(fileInput.get(0), photoField);
});
