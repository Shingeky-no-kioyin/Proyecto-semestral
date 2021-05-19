//VALIDANDO CONTÁCTANOS.
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{8,14}$/ // 8 a 14 números.
}

const campos = {
	nombre: false,
	correo: false,
	telefono: false
}

const validarFormulario = (e) => {
	switch (e.target.name) { //comenzará a valizar, quiero comprobar
		case "nombre": 
			if(expresiones.nombre.test(e.target.value)){
                document.getElementById("grupo__nombre").classList.remove("formulario__grupo-incorrecto");
                document.getElementById("grupo__nombre").classList.add("formulario__grupo-correcto");
                document.querySelector("#grupo__nombre i").classList.remove("fa-check-circle");
                document.querySelector("#grupo__nombre i").classList.add("fa-times-circle");
            } else{
                document.getElementById('grupo__nombre').classList.add("formulario__grupo-incorrecto");
                document.getElementById('grupo__nombre').classList.remove("formulario__grupo-correcto");
                document.querySelector("#grupo__nombre i").classList.add("fa-times-circle");
                document.querySelector("#grupo__nombre i").classList.remove("fa-check-circle");
                document.querySelector("#grupo__nombre .formulario__input-error").classList.add("formulario__input-error-activo")
            }
		break;
        case "correo": 
			validarCampo(expresiones.telefono, e.target, 'telefono'); 
		break; 
        case "telefono": 
			validarCampo(expresiones.telefono, e.target, 'telefono'); 
		break; 
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}
inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){
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

    var APIKey = '83203aa9f7e1fc2e7015240f64c45793'  //KEY de www.openweathermap.org (Registrarse para obtener una)

    var url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+APIKey+'&lang=es&units=metric'

    $.getJSON(
        url,
        function(data){
            console.log("Ciudad: " + data.name)
            console.log("Temperatura: " + data.main.temp.toFixed(0))
            console.log("Icon: " + data.weather[0].icon)
            //Para más información respecto a los íconos: https://openweathermap.org/weather-conditions#How-to-get-icon-URL
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

$(document).ready(
    function () {
        fechaActual()
        getCoordenadas()
    }
);