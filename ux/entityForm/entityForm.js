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
$('[data-export="sys:entity:id:'+entity+'"] input').val(entguid)
console.log('entguid; ', entguid)



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
