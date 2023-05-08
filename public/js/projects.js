async function getProjects() {
    const response = await fetch('http://localhost:3001/api/projects', {
        method: 'GET',
        headers: {
            'x-expediente': '732931'      
        }
    });

    data = await response.json();
    return data;
    // console.log(data);
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
        <div class="card border text-left">
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