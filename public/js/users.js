//const router  = require('express').Router();
// const {User} = require('../db/Users.js');



/*
async function login(){
    let email = document.getElementById("inputEmail-l").value;
    let password = document.getElementById("inputPassword-l").value;   

      
        let resp = await fetch('/api/users', {
          method: 'GET'
        });
        
    let users = await resp.json()
    let user = users.find(u=> u.email == email )
    console.log(user)
    
    if (user){
        //const token = jwt.sign({ email: user.email }, 'clave-secreta');
        //sessionStorage.setItem('token', token);
        sessionStorage.setItem('user_email', user.email)
        sessionStorage.setItem('user_name', user.Nombres)
        alert("Usuario logeado correctamente");
        
    }
     
  
}
*/

async function login() {
  // Get input values
  let email = document.getElementById("inputEmail-l").value;
  let password = document.getElementById("inputPassword-l").value;

  // Construct request body
  let user = {
      email: email,
      password: password
  };
  console.log(user);

  // Send a POST request to the login route
  let response = await fetch('/api/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
  });

  // Check if login is successful
  if (response.ok) {
      let responseBody = await response.json();
      let token = responseBody.token;

      // Save the token to sessionStorage
      sessionStorage.setItem('user_token', token);
      alert("Usuario logeado correctamente");
  } else {
      // Handle error
      let error = await response.json();
      alert("Error: " + error.error);
  }
  sessionStorage.setItem('jwtToken', token);
}




  async function Registro() {

        let Nombres = document.getElementById("inputFirstName").value;
        let Apellidos = document.getElementById("inputLastName").value;
        let username = document.getElementById("inputUser").value;
        let email = document.getElementById("inputEmail").value;
        let password = document.getElementById("inputPassword").value;
        let confirmedPass = document.getElementById("inputPassword2").value;
   
        let body = {
          "Nombres": Nombres,
          "Apellidos": Apellidos,
          "username": username,
          "email": email,
          "password": password
        };
        console.log(body)
    
      
if (password == confirmedPass) {
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (response.status == 201 || response.status == 200) {
        alert("Usuario registrado exitosamente");
      } else {
        response.text().then(text => {
          alert("Error: " + text);
        });
      }
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
  } else {
    alert("Las contraseñas no coinciden!");
  }
}

async function renderProfile(){
    //let email = sessionStorage.getItem('user_email');
    //sessionStorage('user','token)
        let token = sessionStorage.getItem('user_token')
        let resp = await fetch('/api/users/ds1@mail.com', {
            method: 'GET'
          });
        
        let user = await resp.json()
        let profile = document.getElementById('userData');
        profile.innerHTML = 
        `
        <div class="form-group mt-5">
                        <label for="">Nombre</label>
                        <input type="text" name="" id="InputNombre" class="form-control fc-edit-profile" value="${user.Nombres}" aria-describedby="helpId required">
                      </div>
      
                      <div class="form-group">
                          <label for="">Apellido</label>
                          <input type="text" name="" id="InputApellido" class="form-control fc-edit-profile" value="${user.Apellidos}" aria-describedby="helpId" required>
                      </div>
      
                      <div class="form-group">
                          <label for="">Email</label>
                          <input type="text" name="" id="InputEmail" class="form-control fc-edit-profile" value="${user.email}" aria-describedby="helpId" required>
                      </div>
      
                      <div class="form-group">
                          <label for="">Contraseña</label>
                          <input type="password" name="" id="InputContraseña" class="form-control fc-edit-profile" value="${user.password}" aria-describedby="helpId" required>
                      </div>

                      <button type="submit"  onclick="editarUsuario('${user.email}')" value="Submit" class="form-control fc-edit-profile" > Submit</button>
    
    `

}
  
// En la función editarUsuario
async function editarUsuario(id) {
  const email = document.getElementById("InputEmail").value;
  let token = sessionStorage.getItem('user_token');

  let response = await fetch('/api/users/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({"email":email})
  });

  const usuarioActualizado = await response.json();
  console.log('Usuario actualizado:', usuarioActualizado);
  alert('Cambio realizado exitosamente');
  return usuarioActualizado;
}

function borrarLogin(){
  let login = document.getElementById('Login')
  let logeado = sessionStorage.getItem('user_email')
  if (logeado){
      login.innerHTML = ''
  }
}
