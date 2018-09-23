// Notas		 --	  --   --   --
/*
	# El unico pararametro que puedo pasar a una funcion que se ejecuta en un evento es el mismo evento.
		ej: la funcion gato se ejecuta desde el evento "addEventListener" addEventListener("click",gato), por tanto gato solo puede recibir como parametro los valores del evento cuando se hace click sobre el objeto que desencadena la accion.

*/

//   Variables   --   --   --   --

var turno =1;	// Auxiliar que determinar que turno esta jugando si es X ó O.
var queTurno;	// Determina el turno que esta jugando  si es X ó Y.
var arregloGato = new Array(9);	// Arreglo que guarda la letra X ó O segun se presione click en cada posicion de la tabla.
var celdas = document.getElementsByClassName("gato");	// Obtener todos los elementos con el nombre de la clase gato.

//   Funciones   --   --   --   --

// Determina quien gana segun la validacion de las 8 combinaciones ganadoras posibles.
// Evaluar si ya hay una combinacion Ganadora
function ganaJugador(letra)
{
	if(
		(arregloGato[0]==letra && arregloGato[1]==letra && arregloGato[2]==letra) ||
		(arregloGato[3]==letra && arregloGato[4]==letra && arregloGato[5]==letra) ||
		(arregloGato[6]==letra && arregloGato[7]==letra && arregloGato[8]==letra) ||
		(arregloGato[0]==letra && arregloGato[3]==letra && arregloGato[6]==letra) ||
		(arregloGato[1]==letra && arregloGato[4]==letra && arregloGato[7]==letra) ||
		(arregloGato[2]==letra && arregloGato[5]==letra && arregloGato[8]==letra) ||
		(arregloGato[0]==letra && arregloGato[4]==letra && arregloGato[8]==letra) ||
		(arregloGato[2]==letra && arregloGato[4]==letra && arregloGato[6]==letra)
	)
	{
		alert("Jugador "+letra+" GANA");
		window.location.reload();
	}
}

// Logica de programacion del Juego "laVieja".
function gato(evento)
{
	var celda = evento.target; // Se utilizara para poder marcar la X ó O en la celda que se le dio click mediente la propiedad innerHTML --
	var idCelda = evento.target.id; // ID de la celda a la cual el usuario hizo click.
	var posicionAMarcar = idCelda[1]-1;// Guarda en el arreglo el valor id de la celda que se le dio click.

	queTurno = turno%2; // Determina mediente el concepto de par/impar que jugador esta jugando --.

	// Si el residuo es diferente de 0 entonces le toca marcar al Jugador X si es igual a 0 Marca el Jugador O

	if(queTurno!=0)
	{
		celda.innerHTML = "X";
		arregloGato[posicionAMarcar] = "X"; // Asignar el valor de X en la posicio correspondiente en el arreglo.
		celda.style.background = "#40ff00";
		ganaJugador("X");
	}
	else if(queTurno == 0)
	{
		celda.innerHTML = "O";
		arregloGato[posicionAMarcar] = "O"; // Asignar el valor de X en la posicio correspondiente en el arreglo.
		celda.style.background = "#ffd633";
		ganaJugador("O");
	}
	if(turno == 9) 
	{
		alert("Este juego no lo gana nadie, esto se llama: EMPATE");
		window.setTimeout(function(){window.location.reload();},1000);
		// // Recargar la pagina para comenzar el juego nuevamente.
	}
	else
	{
		turno++;
	}
}

// Asignar eventos, cuando se cargue el documento.
// Cada vez que haga click en un cuadro de la tabla ejecute la funcion gato.
function cargarDocumento()
{
var i = 0;
	while(i<celdas.length)	// Mientras control de iteracciones sea menor al numero de celdas de la tabla (9).
	{
		// Ejecuta la funcion gato que tiene la logica de programacion del Juego.
		celdas[i].addEventListener("click",gato);
		console.log(i,celdas[i]);
		i++;
	}
}
//   Eventos     --   --   --   --

/*
Los manejadores se asignan mediante las funciones DOM, que solamente se pueden utilizar después de que la página se ha cargado completamente.

Para que la asignación de los manejadores no resulte errónea, es necesario asegurarse de que la página ya se ha cargado.

Una de las formas más sencillas de asegurar que cierto código se va a ejecutar después de que la página se cargue por completo es utilizar el evento onload:

ej:
		  window.onload = function() {
  	#1 		cargarDocumento;
		  }
	Este metodo solo permite ejecutar un solo evento

	#2	  window.addEventListener("load",cargarDocumento);

	Este otro metodo es un manejardor de eventos multiples, se pueden ejecutar varias funciones desde el mismo evento. ESTA ES LA OPCIÓN MAS RECOMENDABLE PARA EJECUTAR EVENTOS...

*/
window.addEventListener("load",cargarDocumento);