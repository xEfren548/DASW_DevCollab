

const params = new URLSearchParams(window.location.search);
const projectId_global = params.get('uid');
console.log(projectId_global);


let user = "xDev2"

async function getTitle(){

  let response = await fetch(`http://localhost:3001/api/projects/${projectId_global}`)
  
  let project = await response.json();

  let title = document.getElementById('title');
  let text = `        <h3 class="text-center mb-3">${project.title} </h3>
  <p class="text-center mb-4">${project.description}</p>`
  title.innerHTML = text
  getTaskbyProjectID(projectId_global)
  getMessagesByProjectId(projectId_global);
}


async function getMessagesByProjectId() {

    try {
      const response = await fetch(`http://localhost:3001/api/messages/${projectId_global}`);
      const messages = await response.json();
      const contentContainer = document.getElementById('messegesHere');
  
      let htmlMessages = '';
  
      messages.forEach(m => {
        if (m.sender == user) {
          htmlMessages += `
          <div class="d-flex align-items-start mb-3 flex-column">
          <span class="small" style="color: grey;">${m.sender}</span>
            <span class="badge bg-primary" style="color: white;">${m.content}</span>
          </div>`
        } else {
          htmlMessages += `
          <div class="d-flex align-items-start mb-3 flex-column">
          <span class="small" style="color: grey;">${m.sender}</span>
            <span class="badge bg-secondary" style="color: white;">${m.content}</span>
          </div>`
        }
      });
  
      contentContainer.innerHTML = htmlMessages;
      return messages;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function getTaskbyProjectID() {
    try {
      const response = await fetch(`http://localhost:3001/api/task/${projectId_global}`);
      const task = await response.json();
      const completed = document.getElementById('completed');
      const todo = document.getElementById('todo');
      const progress = document.getElementById('progress');

      let completedHTML = ``
      let todoHTML = ``
      let progressHTML = ``
      console.log("task: ",task);
      

      task.forEach(t => {
// ...

        if (t.status == "todo") {
          todoHTML += `
            <!-- To Do tasks -->
            <li class="list-group-item d-flex justify-content-between" style="color: black;">
              ${t.title} <button class="btn btn-primary  btn-sm" style="color: white;" onclick="subscribe('${t.uid}')" > Subscribe </button><button class="btn  btn-primary btn-sm" style="color: red;" onclick="deleteTask('${t.uid}')" > delete </button>
            </li>`;
        }

        else if(t.status == "done"){
           completedHTML+= `
              <li class="list-group-item d-flex justify-content-between" style="color: black;">
              ${t.title} <span class="badge bg-success" style="color: white;"> Done </span>
              </li>
`

        }
        else{
          progressHTML+=  `<!-- In Progress tasks -->
              <li class="list-group-item d-flex justify-content-between" style="color: black;">
              ${t.title} <button class="btn btn-primary btn-sm" style="color: white;" onclick ="finished('${t.uid}')" > Done </button><button class="btn btn-primary btn-sm" style="color: red;" onclick="deleteTask('${t.uid}')" > delete </button>
              </li>
`
        }
       
        
      });
      completed.innerHTML = completedHTML;
      todo.innerHTML = todoHTML;
      progress.innerHTML = progressHTML;


    }catch (error) {
      console.error('Error:', error);
    }
  }

  async function sendMessege() {
    
    let inputMessage = document.getElementById('inputMessage');
    let content = inputMessage.value;
    
  
    try {
      let response = await fetch(`/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: user,
          projectId: projectId_global,
          content: content,
        }),
      });
      inputMessage.value = '';

      
      
    }
    catch(err){
      console.log("messege not sent");
    }
    getMessagesByProjectId(projectId_global);
    console.log(content);

  }

  async function subscribe(id){
    let response = await fetch(`/api/task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: "in-progress",
      }),
    });
    getTaskbyProjectID(projectId_global)
    
  }
  async function finished(id){
    let response = await fetch(`/api/task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId: projectId_global,
        title: taskTitle,
        status: "done",
      }),
    });
    await console.log(response.json());
    getTaskbyProjectID(projectId_global)
    
  }
  async function deleteTask(id){
    let response = await fetch(`/api/task/${id}`, {
      method: 'DELETE',
    });
    let deleted = response.json()
    console.log(deleted);
    getTaskbyProjectID(projectId_global)
  }
  async function addTask(id) {
    console.log("addtask");
    const taskTitle = document.getElementById('taskTitle').value;
  
    try {
      let response = await fetch(`/api/task/${projectId_global}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: projectId_global,
          title: taskTitle,
          status: "todo",
        }),
      });
      await console.log(response.json());
    } catch (err) {
      console.log("task not added");
    }
  
    getTaskbyProjectID(projectId_global);
    $('#addTaskModal').modal('hide');
    document.getElementById('taskTitle').value = '';
  }
  
  
  getTitle();
  
  
  
  
