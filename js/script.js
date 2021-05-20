//VALIDANDO INICIO DE SESION 

$(document).ready(function () {
    $("#error1").hide()

    $("#txt1").blur(function () {
        console.log("txt1 perdió el foco")
        if ($("#txt1").val().length < 4) {
            $("#error1").html("Recuerda que el nombre de usuario debe tener como minimo 4 caracteres")
            $("#error1").fadeIn()
        } else {
            $("#error1")
        }
    });

    $("#txt1").focus(function () {
        console.log("txt1 ganó el foco")
        $("#error1").fadeOut()
    });
    $("#form1").submit(function () {
        console.log("submit")

        var pass = $("#txt2").val()

        if (pass.length < 8) {
            $("#error2").html("contraseña debe tener minimo 8 caracteres")
            event.preventDefault()
        }
    })
});

//SE TERMINÓ LA VALIDACIÓN DE INICIO SESION

//Fecha actual
function fechaActual() {
    var dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    var currentdate = new Date();

    var hoy = dias[currentdate.getUTCDay()] + ', '
        + currentdate.getDate() + " de "
        + meses[currentdate.getMonth()] + " de "
        + currentdate.getFullYear()
    $("#fecha").html(hoy)
}

function getCoordenadas() {
    if (navigator.geolocation) {
        console.log("Dispositivo soporta la geolocalización.")
        navigator.geolocation.getCurrentPosition(getClima, manejo_errores);
    }
    else {
        console.log("Dispositivo no admite la geolocalización")
    }
}

function getClima(posicion) {
    var lat = posicion.coords.latitude
    var lon = posicion.coords.longitude
    console.log("Obteniendo clima coord: lat " + lat + " long " + lon)

    var APIKey = '83203aa9f7e1fc2e7015240f64c45793'
    var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey + '&lang=es&units=metric'

    $.getJSON(
        url,
        function (data) {
            console.log("Ciudad: " + data.name)
            console.log("Temperatura: " + data.main.temp.toFixed(0))
            console.log("Icon: " + data.weather[0].icon)
            $("#ciudad").html(data.name)
            $("#temperatura").html(data.main.temp.toFixed(0) + '°c')

            var img_url = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'

            $('#imgClima').attr('src', img_url);
        }
    )
}


function manejo_errores(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED: console.log("El usurio no compartió su ubicación geográfica");
            break;
        case error.POSITION_UNAVAILABLE: console.log("No se pudo detectar la posición geográfica actual");
            break;
        case error.TIMEOUT: console.log("Se ha agotado el tiempo de espera al consultar posición geográfica");
            break;
        default: console.log("Error desconocido");
            break;
    }
}

function getValorMoneda(codigo) {
    var url = 'https://api.gael.cloud/general/public/monedas/' + codigo;

    $.getJSON(
        url,
        function (data) {
            $("#nombreMoneda").html('Valor de ' + data.Nombre)
            $("#valorMoneda").html('$' + data.Valor)

        }
    )
}

$(document).ready(function () {
    fechaActual()
    getCoordenadas()
}

);

$(document).ready(function () {

    $.getJSON(
        'https://api.gael.cloud/general/public/monedas/',
        function (data) {

            $.each(data, function (i, item) {
                $("#monedas").append(
                    '<option value="' + item.Codigo + '">' + item.Nombre + '</option>'
                );
            })
        }
    );

    $("#verValor").click(function () {
        var codigo = $("#monedas").val()
        getValorMoneda(codigo)
    });

    $("#Limpiar").click(function () {
        $("#nombreMoneda").hide()
        $("#valorMoneda").hide()
    });

});

$(document).ready(function () {

    //DESLIZAR FORMULARIO

    $("#flip").click(function () {
        $("#panel").slideToggle("slow");
    });


    //VALIDACIÓN FORMULARIO PÁGINA PRIENCIPAL

    //NOMBRE Y APELLIDO

    $("#errorNom").hide()

    $("#NombreApellido").blur(function () {
        console.log("NombreApellido perdió el foco")


        if ($("#NombreApellido").val().length < 9) {
            $("#errorNom").html("Debe contener mínimo 10 caractres.")
            $("#errorNom").fadeIn()
        }
        else $("#errorNom").hide()
    });

    $("NombreApellido").focus(function () {
        console.log("NombreApellido ganó el foco")
        $("errorNom").fadeOut()
    });

    //CORREO ELECTRÓNICO

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    function validaEmail() {
        if ($("#email").val().trim().length == 0) {
            mensajeError("ErrorEmail", "Ingrese su correo electrónico")
            return false
        } else {
            if (!isEmail($("#email").val())) {
                mensajeError("ErrorEmail", "Correo electrónico no válido")
                return false
            } else {
                noError("ErrorEmail")
                return true
            }
        }
    }


    $("#contEmail").blur(function () {
        exito = validaEmail()
    });

    //VALIDACION MENSAJE
    $("#ErrorMensaje").hide()

    $("#mensaje").blur(function () {
        console.log("mensaje perdió el foco")


        if ($("#mensaje").val().length < 5) {
            $("#ErrorMensaje").html("Debe contener mínimo 5 caractres.")
            $("#ErrorMensaje").fadeIn()
        }
        else $("#ErrorMensaje").hide()
    });

    $("#mensaje").focus(function () {
        console.log("mensaje ganó el foco")
        $("ErrorMensaje").fadeOut()
    });

    $("#restablecer").click(function () {
        $("#NombreApellido").hide()
        $("#email").hide()
        $("#mensaje").hide()
    });


});
