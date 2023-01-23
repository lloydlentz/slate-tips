/**
 *  A little script to update Slate Form Fields for an entity value.  
 *  See the writeup on https://knowledge.technolutions.com/hc/en-us/community/posts/10119257269659-Self-Aware-Entity-Form 
 * 
 * v1.1 - Added Check for Person Field and they ability to Delete
 * Lloyd Lentz || https://ll-l-ll.com   
 * ©2022, All Rights Ignored.  Use this for your own joy and gainz
 * https://yapfa.club
 */
var entity
var fields = []
var elements = []

$('div[data-export]').each(function(){
    // console.log($(this).data('export'));
    var prefix = "sys:entity:id:"
    if($(this).data('export').startsWith(prefix)){
        entity = $(this).data('export').substr(prefix.length)
        console.log('entity; ', entity)
    }
    prefix = 'sys:entity:field:'
    if($(this).data('export').startsWith(prefix)){
        var exportkey = $(this).data('export').substr(prefix.length)
        fields.push(exportkey)
    }
});
console.log(fields)

var entguid = $('[data-export="entguid"] input').val()
var personguid = $('[data-export="person"] input').val()

$('[data-export="sys:entity:id:'+entity+'"] input').val(entguid)
console.log('entguid; ', entguid)

if(!(!entguid || !personguid)){
    $('div.action').append('<button id="entDeleteButton">Delete</button><img id="imgDelete" />')

    $('#entDeleteButton').click(function () {
        if(confirm('Really DELETE this record?')){
            $.ajax({
                url: "/portal/ux?cmd=db_delete_entity",
                method: "POST",
                data: {
                    cmd: 'db_delete_entity',
                    entguid: entguid,
                    record: personguid, 
                } ,
                beforeSend: function(){
                   $('#imgDelete').attr("src","https://lloydlentz.github.io/slate-tips/ux/entityForm/loading-blue-bounce-20h.gif");
                }, 
                success: function (result) {
                    $('#imgDelete').attr("src","");
                    history.go(-1);
                }, 
                error: function () {
                    alert("ERROR: It's possible you did not setup the delete method correctly.  Have your Slate Admin go check Lloyd's writup again. 😻")
                    console.log("error");
                }
            });
                  
        }    

    })
}


/**
 * Assumes you use 
 */
if(!(!entguid || !personguid)){  // Check to make sure there are person and ent fields before filling in data 
    fields.forEach(function (field) {
        $.ajax({
            url: "/portal/ux",
            method: "GET",
            data: {
                cmd: 'get_f',
                record: entguid,
                field: field, 
            } ,
            beforeSend: function(){
                $('[data-export="sys:entity:field:'+field+'"] label').first().append("<img id='img--"+field+"' />");
                $('#img--'+field).attr("src","https://lloydlentz.github.io/slate-tips/ux/entityForm/loading-blue-bounce-20h.gif");
            }, 
            success: function (result) {
                // $('#img-'+response+'-'+field).attr("src","");
                // console.log('udpated '+response+'-'+field)
                console.log(field+': '+result)

                //If the Slate Form has a calculated value, then that will be evaluated alreadyt
                if(
                    !$('[data-export="sys:entity:field:'+field+'"] input').val() 
                    || !$('[data-export="sys:entity:field:'+field+'"] input').val() 
                    || !$('[data-export="sys:entity:field:'+field+'"] input').val()
                ){
                    $('[data-export="sys:entity:field:'+field+'"] input').val(result)
                    $('[data-export="sys:entity:field:'+field+'"] textarea').val(result)
                    $('[data-export="sys:entity:field:'+field+'"] select').val(result) //.prop('selected', true);    
                }
                $('#img--'+field).attr("src","");
            }, 
            error: function () {
                console.log("error");
            }
        });
        
    })
}