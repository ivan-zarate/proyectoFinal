const listaEnemigos = document.getElementById("enemigos");
listaEnemigos.onclick = () => {
    document.querySelector('.listadoEnemigos').style.display = "";
    document.querySelector('#enemigos').style.display = "none";
    document.querySelector('#trofeo').style.display = "none";
    document.querySelector('.espacio').style.display = "none";
    document.querySelector('.listadoPuntajes').style.display = "none";
    const lista = document.querySelector('.listadoEnemigos')
    fetch('/enemigos.json')
        .then((resp) => resp.json())
        .then((data) => {
            lista.innerHTML = "";
            data.forEach((nave) => {
                let div = document.createElement('div');
                div.innerHTML += `
                <h2>Nombre: ${nave.name}</h2>
                <p>Duración: ${nave.life}</p>
                <p>Velocidad: ${nave.velocidad}</p>
                <p>Información: ${nave.info}</p>
                <img src="${nave.img}" alt="Jefe Enemigo">
                `

                lista.append(div);
            })
            let btn = document.createElement('button');
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                volver();
            })
            btn.innerText = 'VOLVER';
            lista.append(btn);
        })
}

const listaGanadores = document.getElementById("trofeo");
listaGanadores.onclick = () => {
    document.querySelector('.listadoPuntajes').style.display = "";
    document.querySelector('.listadoEnemigos').style.display = "none";
    document.querySelector('#enemigos').style.display = "none";
    document.querySelector('#trofeo').style.display = "none";
    document.querySelector('.espacio').style.display = "none";
    const lista = document.querySelector('.listadoPuntajes')
    fetch('/ganadores.json')
        .then((resp) => resp.json())
        .then((data) => {
            lista.innerHTML = "";
            data.forEach((ganador) => {
                let div = document.createElement('div');
                div.innerHTML += `
                <h2>${ganador.name}</h2>
                <p>${ganador.points}</p>
                `

                lista.append(div);
            })
            let btn = document.createElement('button');
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                volver();
            })
            btn.innerText = 'VOLVER';
            lista.append(btn);
        })
}