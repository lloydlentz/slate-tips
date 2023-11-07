//  DATES SHOULD have a DatePicker
form.getElement('sys:field:crd_date').datepicker();

//  Hide the grey box person lookup thing.
$('#form_response_banner').hide();
$('.c_contained div#global').hide();


//  If the user is trying to access this form from the PUBLIC view, redirect to the Internal View
var url = window.location.origin;               // Base of domain
var form_id = location.search.substring(1);     // querystring parameters
var usercheck2 = document.querySelectorAll('li[data-realm="manage"]');
if(usercheck2.length > 0) {
    alert('Please access this form using the internal link');
	window.location.href = url+'/manage/form/register?'+form_id;
}


//  TRY TO ENFORCE FORM VALIDATION
var formIsValid = true;
$('.default.form_button_submit').off('click');

$('.default.form_button_submit').on('click', async function(event) {
    if (!formIsValid){
        alert('please fix missing items')
    } else {
        var form = window['form_30e19670-4230-42b7-96f6-fd41ea57cae6'];    // REPLACE WITH YOUR FORM GUID
        if (form.Validate()) {
            FW.Lazy.Commit(this, { cmd: 'submit' }); 
        } else {
            alert('Missing some required fields')
        }
    }
});


// Validate Autosuggest selections
$("body").on("blur", "input", validateAllPersonLookups);
$("body").on("keyup", "input", validateAllPersonLookups);
$("body").on("click", "input", validateAllPersonLookups);

//  Run Every Time
function validateAllPersonLookups() {
    formIsValid = true;

    $('[data-export*="sys:entity:field:crc_person_id"')   	// REPLACE WITH YOUR FIELD IDS,
    .add('[data-export*="sys:entity:field:crc_company_id"')	// Keep stacking all the field IDs you want validated.
    .each(function () {
        var thisInputId = $(this).data("id")

        if(!$(this).hasClass('hidden')){
            if (!$("#form_"+thisInputId+"_id").val()){
                $("#"+thisInputId+"warning").removeClass('hidden')
                formIsValid = false;
            } else {

                $("#"+thisInputId+"warning").addClass('hidden')
            }
        } else {  // Extra hide in case the option has been hidden as well.
            $("#"+thisInputId+"warning").addClass('hidden')
        }
            
    })
}

// Add all the warning labels to be ready.
// RUn only on page load
$(document).ready(function() {
    $('[data-export*="sys:entity:field:crc_person_id"')
    .add('[data-export*="sys:entity:field:crc_company_id"')
    .each(function () {
        var thisInputId = $(this).data("id")
        // Add the Warning Label after the field label element
        $(this).find("label").after("<div style='clear: both; background-color: yellow; display:block; padding: 5px' id='"+thisInputId+"warning' class='hidden' >Please Choose a valid record from the lookup.</div>")
    })
    
});
