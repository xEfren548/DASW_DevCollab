{/* <div class="col-6">
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Project Title</h5>
            <p>Encargado : Tu </p>


            <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, ipsa nam, quam accusamus minus architecto laudantium et quas inventore at aperiam perspiciatis quasi. Sit, illo?</p>
            <a href="agregarProyecto.html" class="edit-project">Edit</a>
            <button class="btn btn-danger delete-project">Delete</button>
        </div>
    </div>
</div> */}
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

function getProjectsByCreator(projects, creator) {
    return projects.filter(project => project.creator === creator);
}

async function showProjects() {
    const data = await getProjects();

    // Filtrar proyectos por creador
    const filteredProjects = getProjectsByCreator(data, 'xDev1');
    console.log(filteredProjects);
    const manageRow = document.getElementById('manageRow');

    manageRow.innerHTML = filteredProjects.map(project => {
        return `
        <div class="col-6">
            <div class="card">
                <div class="card-body">
                <h5 class="card-title">${project.title}</h5>
                <p>Encargado : ${project.creator} </p>


                <p class="card-text">${project.description}</p>
                <a href="agregarProyecto.html" class="edit-project">Edit</a>
            <button class="btn btn-danger delete-project" onclick="deleteProject('${project.uid}')">Delete</button>
        </div>
    </div>
</div>
        
`
    }).join("")


}

showProjects();

async function deleteProject(uid) {
    Swal.fire({
      title: '¿Estás seguro que quieres borrar este proyecto?',
      text: "Esta es una acción irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Borrar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let url = 'http://localhost:3001/api/projects';
  
          if (uid) {
            url += `/${uid}`;
          }
  
          const response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'x-expediente': '732931'
            }
          });
  
          if (response.ok) {
            Swal.fire(
              'Deleted!',
              'Proyecto borrado correctamente.',
              'success'
            ).then(() => {
              // Redirigir a index.html después de la confirmación exitosa
              window.location.href = window.location.href;
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Hubo un error al borrar el proyecto..."
            });
          }
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message
          });
        }
      }
    });
  }
  
 