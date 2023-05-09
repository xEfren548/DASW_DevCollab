async function getMessagesByProjectId(projectId) {
    try {
      const response = await fetch(`http://localhost:3001/api/messages/${projectId}`);
      const messages = await response.json();
      
  
      const contentContainer = document.getElementById('messegesHere');
  
      let htmlMessages = '';
  
      messages.forEach(m => {
        console.log('Messages:', m.content);

        htmlMessages += `
          <div class="d-flex align-items-end mb-3">
            <span class="badge bg-primary" style="color: white;">${m.content}</span>
          </div>`
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
            completedHTML+= `   
            <!-- To Do tasks -->
              <li class="list-group-item d-flex justify-content-between" style="color: black;">
                ${t.title} <button class="btn btn-primary btn-sm" style="color: white;"> Subscribe </button>
              </li>
`

        }
        else if(t.status == "done"){
           todoHTML+= `
              <li class="list-group-item d-flex justify-content-between" style="color: black;">
              ${t.title} <span class="badge bg-success" style="color: white;"> Done </span>
              </li>
`

        }
        else{
          progressHTML+=  `<!-- In Progress tasks -->
              <li class="list-group-item d-flex justify-content-between" style="color: black;">
              ${t.title}  <span class="badge bg-warning text-dark" >In Progress</span>
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

  
  getTaskbyProjectID("project-123")
  //getMessagesByProjectId("a7");
  
  
  
  