//VALIDANDO CONTÁCTANOS.
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{8,14}$/ // 8 a 14 numeros.
}

const campos = {
	nombre: false,
	correo: false,
	telefono: false
}

const validarFormulario = (e) => { 
	switch (e.target.name) { //comenzará a valizar, quiero comprobar
		case "nombre": //quiero que el nombre del input nombre
			validarCampo(expresiones.nombre, e.target, 'nombre'); // en caso de que sea nombre quiero ejecutar que es válido
		break;//se sale del ciclo.
		case "correo": //quiero que el nombre del input correo
			validarCampo(expresiones.correo, e.target, 'correo'); // en caso de que sea correo quiero ejecutar que es válido
		break;//se sale del ciclo.
		case "telefono": //quiero que el nombre del input telefono
			validarCampo(expresiones.telefono, e.target, 'telefono'); // en caso de que sea telefono quiero ejecutar que es válido
		break;//se sale del ciclo.
	}
}

const validarCampo = (expresion, input, campo) => { //buscará en expresiones, utilizará los input y los campos puestos anteriormente lo utilizarám
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = false;
	}
}


inputs.forEach((input) => { //por cada imput ejecutará
	input.addEventListener('keyup', validarFormulario); // validará cuando deje de escribir
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => { //aquí el botón validará el formulario 
    e.preventDefault();                       // antes de enviarlo y luego vaciará los campos.
	

	const terminos = document.getElementById('terminos');
	if(campos.nombre && campos.correo && campos.telefono && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});
//TERMINÓ LA VALIDACIÓN DE CONTÁCTANOS


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

function getClima(posicion){
    var lat = posicion.coords.latitude
    var lon = posicion.coords.longitude
    console.log("Obteniendo clima coord: lat " + lat + " long " + lon)

    var APIKey = '83203aa9f7e1fc2e7015240f64c45793'
    var url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+APIKey+'&lang=es&units=metric'

    $.getJSON(
        url,
        function(data){
            console.log("Ciudad: " + data.name)
            console.log("Temperatura: " + data.main.temp.toFixed(0))
            console.log("Icon: " + data.weather[0].icon)
            $("#ciudad").html(data.name)
            $("#temperatura").html(data.main.temp.toFixed(0)+'°c')

            var img_url  = 'https://openweathermap.org/img/wn/'+ data.weather[0].icon+'@2x.png'

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
            $("#valorMoneda").html('$'+data.Valor)

        }
    )
}

$(document).ready(
    function () {
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
