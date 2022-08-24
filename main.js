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

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//definimos distintas variables que utilizaremos dentro de la funcion principal

const jugador = new Jugador();
const proyectiles = [];
const invasores = [];
console.log(proyectiles);
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

const start = document.getElementById("start");
start.onclick = () => {
    document.querySelector('.espacio').style.display = "none";
    requestAnimationFrame(start.onclick);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height); //definimos el tamaño del fondo
    jugador.update();//aparecera nuestra nave
    
    //parametros para que aparezca correctamente el proyectil
    proyectiles.forEach((proyectil, index) => {
        if (proyectil.position.y + proyectil.radius <= 0) {
            proyectiles.splice(index, 1);
        }
        proyectil.update();
    });

    //Hacemos que aparezcan las grillas de invasores
    invasores.forEach((gridInvasores) => {
        gridInvasores.update();
        gridInvasores.enemigos.forEach((enemigo, i) => {
            enemigo.update({ velocidad: gridInvasores.velocidad });
            proyectiles.forEach((proyectil, j) => {
                //con este if logramos que el proyectil empiece a eliminar correctamente a los enemigos
                if (proyectil.position.y <= enemigo.position.y + enemigo.height && 
                    proyectil.position.x >= enemigo.position.x && proyectil.position.x <= enemigo.position.x + enemigo.width
                    && proyectil.position.y>=enemigo.position.y) {
                    setTimeout(() => {
                        gridInvasores.enemigos.splice(i, 1);
                        proyectiles.splice(j, 1);
                    })
                }
            })
        })
    })
    //Con este if generaremos nuevas grillas a partir de un numero determinado, se podria mejorar tambien con la funcion random
    if (nuevasGrillas % 800 === 0) {
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
    console.log(nuevasGrillas)//punto de control para saber si cumple la condicion de nueva grilla
}


