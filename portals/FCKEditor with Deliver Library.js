// Load the CKEEditor, then when that is done, load it to the editor area.
$.when(
    $.getScript( "/fw/framework/ckeditor.js?v=25ae" ),
    $.getScript( "/fw/framework/ckfinder/ckfinder.js?v=25af&cdn=0" ),
    $.getScript( "https://slate-technolutions-net.cdn.technolutions.net/manage/database/folder.js?v=TS-25af-638550528213886842" ),
    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
).done(function(){
    
    //place your code here, the scripts are all loaded
    //  CKEDITOR.replace('html');

	if (CKEDITOR.instances) {
		if (CKEDITOR.instances['editor1']) {
			CKEDITOR.remove(CKEDITOR.instances['editor1']);
		}
	}
	editor = CKEDITOR.replace('editor1', { 
		startupFocus: true, 
		filebrowserImageBrowseUrl: '/manage/database/asset?cmd=browse&type=images', 
		filebrowserBrowseUrl: '/manage/database/asset?cmd=browse&type=documents', 
		contentsCss: '/manage/deliver/mail.css', 
		fullPage: true, 
		height: 320, 
		templates_files: [ '/manage/deliver/?cmd=templates' ],
		forceEnterMode: true,
		toolbar: CKEDITOR.getToolbar('full') 
	});
	
  CKEDITOR.instances.editor1.on('change', function() {
    var editorData = CKEDITOR.instances.editor1.getData();
    form.setValue('html_data',editorData);
    // You can also do other actions with editorData here
  });

	
});
