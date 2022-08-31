//Creo el fondo de pantalla de estrellas

const estrellas = document.querySelector('.estrellas');
const fondoEstrellas = () => {
    let inicio = 0;
    while (inicio <= 80) {
        let i = document.createElement('i');
        let position = innerWidth * Math.random();
        let time = 1 * Math.random();
        i.style.animationDuration = time * 20 + 's';
        i.style.animationDelay = time * 20 + 's';
        i.style.left = position + 'px';
        estrellas.appendChild(i);
        inicio++;
    }
}
fondoEstrellas();

// funcion para tomar los datos del usuario y guardarlos en LocalStorage

const registro = document.getElementById("registro");
registro.onclick = (usuario, password) => {
    usuario = document.getElementById('usuario').value;
    localStorage.setItem('Usuario', usuario)
    password = document.getElementById('password').value;
    password = toString;
    localStorage[password];
    document.querySelector('.entrada').style.display = "none";
    document.getElementById('bienvenida').innerHTML = "Bienvenido " + usuario;
}

//inicializamos fondo sobre canvas para que podamos crear el juego
const puntosSuma = document.querySelector('#puntosSuma');
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//definimos distintas variables que utilizaremos dentro de la funcion principal

const jugador = new Jugador();
const proyectiles = [];
const proyectilesEnemigos = [];
const invasores = [];
let game = {
    over: false,
    activo: true,
}
let puntos = 0;
let naves=0;
const teclas = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    space: {
        pressed: false,
    },
}
let nuevasGrillas = 0;

//Inicio de la funcion principal
const DateTime = luxon.DateTime;
let inicio = DateTime.now();
console.log(inicio);

const start = document.getElementById("start");
start.onclick = () => {
    document.querySelector('.espacio').style.display = "none";
    if (!game.activo) return;
    requestAnimationFrame(start.onclick);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height); //definimos el tamaño del fondo
    jugador.update();//aparecera nuestra nave
    proyectilesEnemigos.forEach((proyectilEnemigo, index) => {
        //incluyo operadores ternarios
        (proyectilEnemigo.position.y + proyectilEnemigo.height > canvas.height) ?
            (setTimeout(() => { proyectilesEnemigos.splice(index, 1) }, 0)) : proyectilEnemigo.update();
        if (proyectilEnemigo.position.y + proyectilEnemigo.height >= jugador.position.y &&
            proyectilEnemigo.position.x + proyectilEnemigo.width >= jugador.position.x &&
            proyectilEnemigo.position.x <= jugador.position.x + jugador.width) {
            setTimeout(() => {
                jugador.opacity = 0;
                game.over = true;

            }, 10);

            setTimeout(() => {
                game.activo = false;

                document.getElementById('fin').innerHTML = "GAME  OVER";
            }, 1000);
            setTimeout(() => {
                let fin = DateTime.now();
                let Interval = luxon.Interval;
                let duracion = Interval.fromDateTimes(inicio, fin);
                document.querySelector('.puntos').style.display = "none";
                document.querySelector('#fin').style.display = "none";
                let listadoLi = document.getElementById('estadisticas');
                listadoLi.innerHTML = "";
                let li = document.createElement('li');
                li.innerHTML = `<h5>Jugador: ${localStorage.getItem('Usuario')} </h5>
                                <p>Naves eliminadas: ${naves} </p> 
                                <p>Puntuacion: ${puntos} </p> 
                                <p>Tiempo jugado: ${duracion.length('seconds')}</p>`
                listadoLi.appendChild(li);
            }, 2000);
        }
    })
    //parametros para que aparezca correctamente el proyectil
    proyectiles.forEach((proyectil, index) => {
        //incluyo operadores ternarios
        (proyectil.position.y + proyectil.radius <= 0) ? proyectiles.splice(index, 1) : proyectil.update();
    });

    //Hacemos que aparezcan las grillas de invasores
    invasores.forEach((gridInvasores) => {
        gridInvasores.update();
        if (nuevasGrillas % 100 === 0 && gridInvasores.enemigos.length > 0) {
            let proyectilAleatorio = gridInvasores.enemigos[parseInt(Math.random() * gridInvasores.enemigos.length)]
            proyectilAleatorio.shoot(proyectilesEnemigos);
        }
        gridInvasores.enemigos.forEach((enemigo, i) => {
            enemigo.update({ velocidad: gridInvasores.velocidad });

            proyectiles.forEach((proyectil, j) => {
                //con este if logramos que el proyectil empiece a eliminar correctamente a los enemigos
                if (proyectil.position.y <= enemigo.position.y + enemigo.height &&
                    proyectil.position.x >= enemigo.position.x && proyectil.position.x <= enemigo.position.x + enemigo.width
                    && proyectil.position.y >= enemigo.position.y) {
                    setTimeout(() => {
                        puntos += 100;
                        naves +=1;
                        puntosSuma.innerHTML = ("Puntos " + puntos);
                        gridInvasores.enemigos.splice(i, 1);
                        proyectiles.splice(j, 1);
                        if (gridInvasores.enemigos.length > 0) {
                            const primerInvasor = gridInvasores.enemigos[0];
                            const ultimoInvasor = gridInvasores.enemigos[gridInvasores.enemigos.length - 1];
                            gridInvasores.width = ultimoInvasor.position.x - primerInvasor.position.x + ultimoInvasor.width;
                            gridInvasores.position.x = primerInvasor.position.x
                        }

                    })
                }
            })
        })

    })
    //Con este if generaremos nuevas grillas a partir de un numero determinado, se podria mejorar tambien con la funcion random
    if (nuevasGrillas % 900 === 0) {
        invasores.push(new gridInvasores());
        nuevasGrillas = 0;
    }
    //Con este juego de if logramos que nuestra nave se mueva
    if (teclas.a.pressed && jugador.position.x >= 0) {
        jugador.velocidad.x = -8;
    } else if (teclas.d.pressed && jugador.position.x + jugador.width + 20 <= canvas.width) {
        jugador.velocidad.x = 8;
    }
    else {
        jugador.velocidad.x = 0;
    }
    nuevasGrillas++;
}




