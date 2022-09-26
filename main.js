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
//const mejoresPuntajes = [];
const registro = document.getElementById("registro");
registro.onclick = (usuario, password) => {
    usuario = document.getElementById('usuario').value;
    localStorage.setItem('Usuario', usuario);
    password = document.getElementById('password').value;
    password = toString();
    localStorage[password];
    document.querySelector('.entrada').style.display = "none";
    document.getElementById('bienvenida').innerHTML = "Hola " + usuario;
}

//inicializamos fondo sobre canvas para que podamos crear el juego
const puntosSuma = document.querySelector('#puntosSuma');
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//definimos distintas variables que utilizaremos dentro de la funcion principal

const jugador = new Jugador();
const jefe = new Jefe1();
const proyectiles = [];
const proyectilesEnemigos = [];
const invasores = [];
const proyectilesJefe = [];
let proyectilAleatorio = 0;
let game = {
    over: false,
    activo: true,
}
let puntos = 0;
let naves = 0;
let jefes = 0;
let vidaJefe = 3;
let nuevasGrillas = 0;
//sonidos
const sonidoDisparoJugador = new Audio('./sonidos/disparoJugador2.mp3');
const explosionEnemigo = new Audio('./sonidos/explosionEnemigo.mp3');
const musica = new Audio('./sonidos/Terminite.mp3');

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
    ArrowLeft: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    }
}

const DateTime = luxon.DateTime;
let inicio = DateTime.now();
//Inicio de la funcion principal
const start = document.getElementById("start");
start.onclick = () => {
    document.querySelector('.listadoEnemigos').style.display = "none";
    document.querySelector('.listadoPuntajes').style.display = "none";
    document.querySelector('.espacio').style.display = "none";
    document.querySelector('#enemigos').style.display = "none";
    document.querySelector('#trofeo').style.display = "none";
    document.querySelector('.puntos').style.display = "";
    if (!game.activo) return;
    requestAnimationFrame(start.onclick);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height); //definimos el tamaño del fondo
    musica.play();
    jugador.update();//aparecera nuestra nave
    proyectilesEnemigos.forEach((proyectilEnemigo, index) => {
        //incluyo operadores ternarios
        (proyectilEnemigo.position.y + proyectilEnemigo.height > canvas.height) ?
            (setTimeout(() => { proyectilesEnemigos.splice(index, 1) }, 0)) : proyectilEnemigo.update();
        if (proyectilEnemigo.position.y + proyectilEnemigo.height >= jugador.position.y &&
            proyectilEnemigo.position.x + proyectilEnemigo.width >= jugador.position.x &&
            proyectilEnemigo.position.x <= jugador.position.x + jugador.width) {
            proyectilEnemigo.opacity = 0;
            derrota();
        }
    })
    //parametros para que aparezca correctamente el proyectil
    proyectiles.forEach((proyectil, index) => {
        //incluyo operadores ternarios
        if (proyectil.position.y + proyectil.height <= 0) {
            (setTimeout(() => { proyectiles.splice(index, 1) }, 0));
            sonidoDisparoJugador.pause();
        }
        proyectil.update();
    });

    //Hacemos que aparezca el Jefe
    if (naves === 50 || naves == 50) {
            jefe.update();
            let disparo = jefe;
            if (proyectilesJefe < 1) {
                disparo.bossShoot(proyectilesJefe);
            }
            proyectilesJefe.forEach((proyectilJefe, index) => {
                (proyectilJefe.position.y + proyectilJefe.height > canvas.height) ?
                    (setTimeout(() => { proyectilesJefe.splice(index, 1) }, 10)) : proyectilJefe.update();
                if (proyectilJefe.position.y + proyectilJefe.height >= jugador.position.y &&
                    proyectilJefe.position.x + proyectilJefe.width >= jugador.position.x &&
                    proyectilJefe.position.x <= jugador.position.x + jugador.width) {
                    derrota();
                }
            });
            proyectiles.forEach((proyectil) => {
                //con este if logramos que el proyectil vaya reduciendo la vida del jefe
                if (proyectil.position.y <= jefe.position.y + jefe.height &&
                    proyectil.position.x >= jefe.position.x && proyectil.position.x <= jefe.position.x + jefe.width
                    && proyectil.position.y + proyectil.height >= jefe.position.y &&
                    proyectil.position.x + proyectil.width <= jefe.position.x + jefe.width) {
                    proyectil.opacity = 0;
                    if (proyectiles.length > 1) {
                        vidaJefe -= 1;
                        proyectiles.splice(1, proyectiles.length);
                        if (vidaJefe == 0) {
                            jefe.opacity = 0;
                            setTimeout(() => {

                                puntos += 1000;
                                jefes += 1;
                                naves += 1;
                                puntosSuma.innerHTML = ("Puntos " + puntos);
                            }, 10);
                        }
                    }
                }
            })
        invasores.forEach((gridInvasores) => {
            gridInvasores.enemigos.length = 0;
        })
        invasores.push(new gridInvasores());
    }

    else {
        invasores.forEach((gridInvasores) => {
            gridInvasores.update();
            //Creamos proyectiles aleatorios dentro de la grilla
            if (nuevasGrillas % 100 === 0 && gridInvasores.enemigos.length > 0) {
                if (vidaJefe == 0) {
                    proyectilAleatorio = gridInvasores.enemigos[parseInt((Math.random(1, 5)) * gridInvasores.enemigos.length)]
                    proyectilAleatorio.shoot(proyectilesEnemigos);
                }
                else {
                    proyectilAleatorio = gridInvasores.enemigos[parseInt(Math.random(1, 10) * gridInvasores.enemigos.length)]
                    proyectilAleatorio.shoot(proyectilesEnemigos);
                }

            }
            //En este punto hacemos que aparezcan las grillas de enemigos
            gridInvasores.enemigos.forEach((enemigo, i) => {
                enemigo.update({ velocidad: gridInvasores.velocidad });
                proyectiles.forEach((proyectil, j) => {
                    //con este if logramos que el proyectil empiece a eliminar correctamente a los enemigos
                    if (proyectil.position.y <= enemigo.position.y + enemigo.height &&
                        proyectil.position.x >= enemigo.position.x && proyectil.position.x <= enemigo.position.x + enemigo.width
                        && proyectil.position.y + proyectil.height >= enemigo.position.y && proyectil.position.x + proyectil.width <= enemigo.position.x + enemigo.width) {
                        setTimeout(() => {
                            const enemigoEncontrado = gridInvasores.enemigos.find(
                                (enemigo2) => enemigo2 === enemigo
                            )
                            const proyectilEncontrado = proyectiles.find(
                                (proyectil2) => proyectil2 === proyectil
                            )
                            if (enemigoEncontrado && proyectilEncontrado) {
                                gridInvasores.enemigos.splice(i, 1);
                                proyectiles.splice(j, 1);
                                sonidoDisparoJugador.pause();
                                puntos += 100;
                                setTimeout(() => {
                                    naves += 1;
                                })
                                puntosSuma.innerHTML = ("Puntos " + puntos);
                            }
                            explosionEnemigo.play();
                            explosionEnemigo.currentTime = 0;
                        }, 10)
                        setTimeout(() => {
                            //Sobre estas lineas logramos que al eliminar una columna de enemigos, la grilla entera llegue
                            //hasta el final de la pantalla
                            if (gridInvasores.enemigos.length > 0) {
                                const primerInvasor = gridInvasores.enemigos[0];
                                const ultimoInvasor = gridInvasores.enemigos[gridInvasores.enemigos.length - 1];
                                gridInvasores.width = ultimoInvasor.position.x - primerInvasor.position.x + ultimoInvasor.width;
                                gridInvasores.position.x = primerInvasor.position.x
                            }
                        }, 10)
                    }
                })
            })

        })
    }

    //Con este if generaremos nuevas grillas a partir de un numero determinado, se podria mejorar tambien con la funcion random
    if (nuevasGrillas % 900 === 0) {
        invasores.push(new gridInvasores());
        nuevasGrillas = 0;
    }
    //Con este juego de if logramos que nuestra nave se mueva
    if (teclas.a.pressed && jugador.position.x >= 0 || teclas.ArrowLeft.pressed && jugador.position.x >= 0) {
        jugador.velocidad.x = -8;
    } else if (teclas.d.pressed && jugador.position.x + jugador.width + 20 <= canvas.width || teclas.ArrowRight.pressed && jugador.position.x + jugador.width + 20 <= canvas.width) {
        jugador.velocidad.x = 8;
    }
    else {
        jugador.velocidad.x = 0;
    }
    nuevasGrillas++;

    //Definimos los que sucedera una vez que hayamos perdido
    function derrota() {
        setTimeout(() => {
            jugador.opacity = 0;
            game.over = true;

        }, 10);

        setTimeout(() => {
            game.activo = false;
            musica.pause();
            document.getElementById('fin').innerHTML = "GAME  OVER";
        }, 1000);
        setTimeout(() => {
            // definimos los distintos parametros para que podamos visualizar el tiempo jugado
            let fin = DateTime.now();
            let Interval = luxon.Interval;
            let duracion = Interval.fromDateTimes(inicio, fin);
            let minutos = 0;
            let horas = 0;
            let segundos = parseInt(duracion.length('seconds'));
            if (segundos >= 60) {
                segundos = segundos - 60
                minutos = +1;
            }
            if (minutos >= 60) {
                minutos = minutos - 60
                horas = +1;
            }

            // Con estas lineas mostramos datos del juego
            document.querySelector('.puntos').style.display = "none";
            document.querySelector('#fin').style.display = "none";
            document.querySelector('#estadisticas').style.display = "";
            let listadoDiv = document.getElementById('estadisticas');
            listadoDiv.innerHTML = "";
            let section = document.createElement('section');
            section.innerHTML = `<h5>Jugador: ${localStorage.getItem('Usuario')} </h5>
                            <p>Naves eliminadas: ${naves} </p> 
                            <p>Jefes eliminados: ${jefes} </p> 
                            <p>Puntuacion: ${puntos} </p> 
                            <p>Tiempo jugado: ${horas} hs + ${minutos} min + ${segundos} seg</p>`
            listadoDiv.appendChild(section);
            let btn = document.createElement('button');
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                reinicio();
            })
            btn.innerText = 'Reiniciar';
            listadoDiv.append(btn);
        }, 2000)

    }
}

volver = () => {
    document.querySelector('#estadisticas').style.display = "none";
    document.querySelector('.listadoEnemigos').style.display = "none";
    document.querySelector('.listadoPuntajes').style.display = "none";
    document.querySelector('.espacio').style.display = "";
    document.querySelector('#enemigos').style.display = "";
    document.querySelector('#trofeo').style.display = "";
}
reinicio = () => {
    setTimeout(() => {
        location.href = '/';
    }, 0);
}
