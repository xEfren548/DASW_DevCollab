let projectId_global
let user = "xDev1"

async function getMessagesByProjectId(projectId) {
  projectId_global= projectId

    try {
      const response = await fetch(`http://localhost:3001/api/messages/${projectId}`);
      const messages = await response.json();
      
  
      const contentContainer = document.getElementById('messegesHere');
  
      let htmlMessages = '';
  
      messages.forEach(m => {
        console.log('Messages:', m.content);


        
        if(m.sender == user ){
          htmlMessages += `
          <div class="d-flex align-items-end mb-3">
            <span class="badge bg-primary" style="color: white;">${m.content}</span>
          </div>`
      }
        
          else {htmlMessages += `<div class="d-flex align-items-start mb-3">
          <span class="badge bg-secondary" style="color: white;">${m.content}</span>
        </div>`}
      });
  
      contentContainer.innerHTML = htmlMessages;
      return messages;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function getTaskbyProjectID(projectId) {
    try {
      const response = await fetch(`http://localhost:3001/api/task/${projectId}`);
      const task = await response.json();
      console.log(task);
      const completed = document.getElementById('completed');
      const todo = document.getElementById('todo');
      const progress = document.getElementById('progress');

      let completedHTML = ``
      let todoHTML = ``
      let progressHTML = ``

      task.forEach(t => {
        if(t.status == "todo"){
            todoHTML+= `   
            <!-- To Do tasks -->
              <li class="list-group-item d-flex justify-content-between" style="color: black;">
                ${t.title} <button class="btn btn-primary btn-sm" style="color: white;" onclick"subscribe(${t.uid})" > Subscribe </button><button class="btn btn-primary btn-sm" style="color: red;" onclick"deleteTask(${t.uid})" > delete </button>
              </li>
`       

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
              ${t.title} <button class="btn btn-primary btn-sm" style="color: white;" onclick"finished(${t.uid})" > finished </button><button class="btn btn-primary btn-sm" style="color: red;" onclick"deleteTask(${t.uid})" > delete </button>
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

  async function sendMessage() {
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
    }
    catch(err){
      console.log("messege not sent");
    }
    getMessagesByProjectId(projectId_global);

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
    
  }
  async function finished(id){
    let response = await fetch(`/api/task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: "done",
      }),
    });
    
  }
  async function deleteTask(id){
    let response = await fetch(`/api/task/${id}`, {
      method: 'DELETE',
    });
  }
  
  
  getTaskbyProjectID("project-123")
  getMessagesByProjectId("a7");
  
  
  
  
