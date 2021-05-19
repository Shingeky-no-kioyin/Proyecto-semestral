$(document).ready(function(){
    $("#txt_contactanos").hide()

    $("#txt_con").blur(function(){
        var txt1 = $("#txt_contactanos").val()
        if(txt1.length > 0){
            console.log("txt1 perdió el foco") 
            $("#txt_contactanos").html("nombre debe tener como minimo 3 caracteres")
            $("#txt_contactanos").fadeIn() 
        }
    });

    $("#txt_con").focus(function(){
        console.log("txt_con ganó el foco")
        $("#txt_contactanos").fadeOut()
    });
    $("#form1").submit(function(){
        console.log("submit")

        var pass = $("#txt2").val()

        if(pass.length < 8){
            $("#error2").html("contraseña debe tener minimo 8 caracteres")
            event.preventDefault()
        }
    })
});