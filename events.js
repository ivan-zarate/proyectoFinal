//listado de eventos sobre las teclas para que se mueva la nave y tambien dispare

addEventListener('keydown', (e) => {
    if (game.over) {
        return;
    } else
        switch (e.key) {
            case 'a':
                teclas.a.pressed = true;

                break;
            case 'A':
                teclas.a.pressed = true;

                break;
            case 'd':
                teclas.d.pressed = true;
                break;

            case 'D':
                teclas.d.pressed = true;
                break;

            case ' ':
                e.preventDefault();
                proyectiles.push(new Proyectil({
                    position: {
                        x: jugador.position.x + (jugador.width / 2),
                        y: jugador.position.y,
                    },
                    velocidad: {
                        y: -8,
                    }
                })
                )
                teclas.space.pressed = true;
                break;
        }
})

addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'a':
            teclas.a.pressed = false;
            jugador.velocidad.x = -5;
            break;

        case 'A':
            teclas.a.pressed = false;
            jugador.velocidad.x = -5;
            break;

        case 'd':
            teclas.d.pressed = false;
            break;

        case 'D':
            teclas.d.pressed = false;
            break;

        case ' ':
            teclas.space.pressed = false;
            break;
    }
})