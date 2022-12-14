//Creo la clase con los distintos atributos de jugador pasandole una imagen ya descargada
class Jugador {

    constructor() {

        this.velocidad = {
            x: 0,
            y: 0,
        }
        this.opacity = 1;

        const image = new Image();
        image.src = './img/spaceship.png'
        image.onload = () => {
            this.scale = 0.2;
            this.image = image;
            this.width = image.width * this.scale;
            this.height = image.height * this.scale;
            this.position = {
                x: (canvas.width / 2) - (this.width / 2),
                y: canvas.height - (this.height) - 15,
            }
        }
    }

    draw() {
        context.globalAlpha = this.opacity;
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocidad.x;
        }
    }
}

// Creo la clase con los distintos atributos del proyectil y creamos el misil

class Proyectil {
    constructor({ position, velocidad }) {
        this.velocidad = velocidad;
        const image = new Image();
        image.src = './img/disparoJugador.png'
        this.scale = 0.03;
        this.image = image;
        this.width = image.width * this.scale;
        this.height = image.height * this.scale;
        this.position = {
            x: position.x,
            y: position.y,
        }
    }

    draw() {
        context.globalAlpha = this.opacity;
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

    }

    update() {
        if (this.image) {
            this.draw();
            this.position.y += this.velocidad.y;
        }
    }

}

//Creo al enemigo, para esto simplemente copiamos la clase de jugador

class Enemigo {
    constructor({ position }) {

        this.velocidad = {
            x: 0,
            y: 0,
        }
        this.opacity = 1;

        const image = new Image();
        if (vidaJefe == 0) {
            image.src = './img/alien2.png'
            this.scale = 0.1;
        }
        else {
            image.src = './img/alien1.png';
            this.scale = 0.07;
        }
        image.onload = () => {
            this.image = image;
            this.width = image.width * this.scale;
            this.height = image.height * this.scale;
            this.position = {
                x: position.x,
                y: position.y,
            }
        }
    }

    draw() {
        context.globalAlpha = this.opacity;
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    update({ velocidad }) {
        if (this.image) {
            this.draw();
            this.position.x += velocidad.x;
            this.position.y += velocidad.y;
        }
    }
    shoot(proyectilesEnemigos) {
        proyectilesEnemigos.push(new ProyectilEnemigo({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height,
            },
            velocidad: {
                x: 0,
                y: 5,
            }

        }))
    }
}

//Creamos la grilla de enemigos

class gridInvasores {
    constructor() {
        if(vidaJefe==0){
            this.velocidad = {
                x: 5, //defino una velocidad inicial para que empiece a moverse
                y: 0,
            }
        }
        else{
        this.velocidad = {
            x: 3, //defino una velocidad inicial para que empiece a moverse
            y: 0,
        }}
        this.position = {
            x: 0,
            y: 0,
        }
        this.enemigos = [];
        const columns = parseInt(Math.random() * 10) + 5; // Creamos aleatoriamente las grillas con la funcion random
        const rows = parseInt(Math.random() * 5 + 2);
        this.width = columns * 50;
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                this.enemigos.push(new Enemigo({
                    position: {
                        x: x * 50,
                        y: y * 50,
                    }
                }))
            }
        }

    }
    update() {
        this.position.x += this.velocidad.x;
        this.position.y += this.velocidad.y;
        this.velocidad.y = 0;
        if ((this.position.x + this.width) >= canvas.width || (this.position.x) <= 0) {
            this.velocidad.x = -this.velocidad.x; //con este if podemos hacer que la grilla no se salga de la pantalla
            this.velocidad.y = 20;//con este punto hacemos que la grilla comience a bajar despues de que rebote con los margenesx|
        }
    }
}
class ProyectilEnemigo {
    constructor({ position, velocidad }) {

        this.velocidad = velocidad;
        this.opacity = 1;
        if (vidaJefe == 0) {
            const image = new Image();
            image.src = './img/disparoAlien2.png'
            this.scale = 0.03;
            this.image = image;
            this.width = image.width * this.scale;
            this.height = image.height * this.scale;
            this.position = {
                x: position.x,
                y: position.y,
            }
        }
        else {
            this.position = position;
            this.width = 3;
            this.height = 10;
        }
    }
    draw() {
        if (vidaJefe == 0) {
            context.globalAlpha = this.opacity;
            context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }
        else{
        context.fillStyle = 'yellow';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }
    update() {
        if (vidaJefe == 0) {
            if (this.image) {
                this.draw();
                this.position.y += (this.velocidad.y);
            }
        }
        else{
            this.draw();
            this.position.y += (this.velocidad.y);
        }
        
    }

}
class Jefe1 {
    constructor() {

        this.velocidad = {
            x: Math.floor(Math.random() * 2) + 6,
            y: 0,
        }
        this.opacity = 1;
        const image = new Image();
        image.src = './img/JefeEnemigo.png'
        image.onload = () => {
            this.scale = 0.15;
            this.image = image;
            this.width = image.width * this.scale;
            this.height = image.height * this.scale;
            this.position = {
                x: (canvas.width / 2) - (this.width / 2),
                y: 15,
            }
        }
    }

    draw() {
        context.globalAlpha = this.opacity;
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocidad.x;
            if ((this.position.x + this.width) >= canvas.width || (this.position.x) <= 0) {
                this.velocidad.x = -this.velocidad.x; //con este if podemos hacer que la grilla no se salga de la pantalla
            }
        }
    }
    //Nuevo bloque
    bossShoot(proyectilesJefe) {
        proyectilesJefe.push(new ProyectilJefe({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height,
            },
            velocidad: {
                x: 0,
                y: 10,
            }

        }))
    }
    //
}
class ProyectilJefe {
    constructor({ position }) {
        this.velocidad = {
            x: 0,
            y: 0,
        }
        this.audio = new Audio('./sonidos/disparoJefe.mp3');
        const image = new Image();
        image.src = './img/disparoJefe1.png'
        this.scale = 0.04;
        this.image = image;
        this.width = image.width * this.scale;
        this.height = image.height * this.scale;
        this.position = {
            x: position.x,
            y: position.y,
        }

    }

    draw() {
        context.globalAlpha = this.opacity;
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

    }

    update() {
        if (this.image) {
            this.draw();
            this.position.y += this.velocidad.y * Math.random() + 10;
            this.audio.play();
        }
    }

}