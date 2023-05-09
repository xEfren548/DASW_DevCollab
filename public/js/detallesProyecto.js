async function getProjects(uid) {
    let url = 'http://localhost:3001/api/projects';
    
    if (uid) {
        url += `/${uid}`;
    }
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'x-expediente': '732931'      
        }
    });

    const data = await response.json();
    return data;
}

async function detallesProyecto(uid) {
    const data = await getProjects(uid);
    console.log(data);
    const rowDetalles = document.getElementById('rowDetalles');
    
    if (data) {
        rowDetalles.innerHTML = `
            <div class="col-12 col-details">
                <h1>Project Information</h1>
            </div>
            <div class="project-info">
                <h2>${data.title}</h2>
                <p>${data.description}</p>
                <br>
                <br>
                <h3>Dificulty: </h3>
                <ul>
                    <li>${data.difficulty}</li>
                </ul>
                <br>
                <h3>Lenguaje: </h3>
                <ul>
                    <li>${data.language}</li>
                </ul>
                <br>
                <h3>Fecha de finalización: </h3>
                <ul>
                    <li>${data.endDate}</li>
                </ul>
                <br>
                <a name="" id="" class="btn btn-proyectos d-block" href="#" role="button">Inscribirse</a>
            </div>
        `;
    } else {
        // Manejar el caso en el que no se encuentren detalles del proyecto
        rowDetalles.innerHTML = "No se encontraron detalles del proyecto";
    }
}


detallesProyecto("kOFkZdxPbyzxF_vINs1ZA")

function getUid(uid){

}


