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


// getProjects()

async function showProjects(){
    const data = await getProjects();
    console.log(data);
    const cards = document.getElementById ('cards');
    cards.innerHTML = data.map(dato => {
        const creationDate = dato.creationDate.toString();
        const year = creationDate.substring(0, 4);
        const month = creationDate.substring(4, 6);
        const day = creationDate.substring(6, 8);
        const formattedDate = `${day}/${month}/${year}`;
        const availabilityClass = dato.available ? "btn-disponibilidad-si" : "btn-disponibilidad-no";


        return ` 
        <div class="card border text-left" data-uid="${dato.uid}">
                <img class="card-img-top" src="holder.js/100px180/" alt="">
                <div class="card-body">
                    <h4 class="card-title">${dato.title}</h4>
                    <p class="card-text">${dato.description}</p>

                    <a href="public/html/details.html"><button type="button" class="btn btn-aplicar">Aplica ahora</button></a>
                </div>

                <div class="footer-card">
                    <div class="row">
                        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="icon-and-user">
                                <img src="public/img/avatar3.png" alt="">
                                <p>${dato.creator}</p>
                                <p>•</p>
                                <p>Created at: ${formattedDate}</p>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 text-right">
                        <p class="${availabilityClass}">${dato.available ? 'Disponible' : 'No disponible'}</p>
                        </div>


                    </div> <!-- Cierre row-->


                </div>
            </div>
        `;
}).join("")
    
}

showProjects()

async function sendProject(){
        event.preventDefault();
        let title = document.querySelector("#title").value;
        let language = document.querySelector("#language").value;
        let description = document.querySelector("#description").value;
        let endDate = document.querySelector("#end_date").value;
        let difficulty = document.querySelector("#difficulty").value;
        let creator = "xDev1";
        let available = true;

        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // El mes está basado en cero, por eso se suma 1 y se utiliza padStart para asegurar que tenga 2 dígitos
        const day = String(date.getDate()).padStart(2, '0'); // Utilizamos padStart para asegurar que tenga 2 dígitos

        const creationDate = `${year}${month}${day}`;


    
        let newProject = {title, language, description,endDate, difficulty,creator, creationDate, available}
    
        let resp = await fetch('http://localhost:3001/api/projects',{
            method: 'POST',
            body: JSON.stringify(newProject),
            headers: {
                "Content-type": "Application/json",
            }
        });
        let data = await resp.json();
    
        console.log(resp);
        console.log(data);
    }


async function detallesProyecto(uid){
    const data = await getProjects(uid);
    console.log(data);
}

