//VALIDANDO CONTÁCTANOS Y CREANDO USUARIO
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{8,14}$/, // 8 a 14 numeros.
    password: /^.{8,12}$/ // 4 a 12 digitos.
}

const campos = {
	nombre: false,
	correo: false,
	telefono: false,
    password: false
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
        case "password": //quiero que el nombre del input password
			validarCampo(expresiones.password, e.target, 'password'); // en caso de que sea password quiero ejecutar que es válido
			validarPassword2();
		break;//se sale del ciclo.
        case "password2": //quiero que el nombre del input password2
			validarPassword2(); // en caso de que sea password2 quiero ejecutar que es válido
		break;//se sale del ciclo.
	}
}

const validarCampo = (expresion, input, campo) => { //buscará en expresiones, utilizará los input y los campos puestos anteriormente lo utilizarám
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

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true;
	}
}


inputs.forEach((input) => { //por cada imput ejecutará
	input.addEventListener('keyup', validarFormulario); // validará cuando deje de escribir
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => { //aquí el botón validará el formulario 
    e.preventDefault();                       // antes de enviarlo y luego vaciará los campos.
	

	const terminos = document.getElementById('terminos');
	if(campos.nombre && campos.correo && campos.telefono && terminos.checked){
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
//TERMINÓ LA VALIDACIÓN DE CONTÁCTANOS Y CREAR USUARIO
$(document).ready(function() {
    $("#eli").click(function () {
		$("#nombre").html().drop 
		$("#password").html().drop
		$("#password2").html().drop
		$("#correo").html().drop
	});
});