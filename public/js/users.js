// const router  = require('express').Router();
// const {User} = require('../db/Users.js');


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
        sessionStorage.setItem('user_email', user.email)
    }
     
  
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
    let email = sessionStorage.getItem('user_email');
    if (email){
        let resp = await fetch('/api/users/'+email, {
            method: 'GET'
          });
        
        let user = await resp.json()
        let profile = document.getElementById('userData');
        profile.innerHTML = 
        `
        <h2>---------</h2>
        <h2>${user.Nombres}</h2>
        <h2>---------</h2>
        <h2>${user.Apellidos}</h2>
        <h2>---------</h2>
        <h2>${user.email}</h2>
        <h2>---------</h2>
        <h2>${user.password}</h2>
        <h2>---------</h2>
    }
    `

}
  
function borrarLogin(){
    let login = document.getElementById('Login')
    let logeado = sessionStorage.getItem('user_email')
    if (logeado){
        login.innerHTML = ''
    }
}}


// async function getUser() {
//     const response = await fetch('http://localhost:3001/api/users', {
//         method: 'GET',
//         headers: {
//             'x-expediente': '12345'      
//         }
//     });

//     data = await response.json();
//     return data;
//     // console.log(data);
// }


// //login
// router.postUser('/', async (req, res)=>{
//     console.log(req.body);
//     let user = await User.getUserByEmail(req.body.email);
//     if(! user){
//         res.status(401).send({error: "Usuario no existente"})
//         return;
//     }
   
//     console.log("user");
//     console.log(user);

//     //TODO: comparar usando bcrypt
//     if(user.password != req.body.password){
//         res.status(401).send({error: "usuario o contraseña inválidos"})
//         return;
//     }

//     let token = jwt.sign({email: user.email},
//                          config.jwtSecret,
//                          { expiresIn: 60 * 3 },)

//     res.send({token})
// })

// //Cargar usuario
// async function loadUsers(){
//     let response = await fetch("api/users",{
//      method: "GET"
//     })
//     console.log(response.status);
//     users = await response.json()
//     console.log(users);
//     let listaUsers = document.getUserByEmail("login")
//     listaUsers.innerHTML = users.map(usr=>` 
//     <div class="border">
//      <p>id: ${usr.id}</p>
//      <p>Username: ${usr.username}</p>
//      <p>email: ${usr.email}</p>
//      ${usr.password? `<p>password: ${usr.password} </p>`:""}
//      <button type="button" class="btn btn-primary" onclick="deleteUser('${usr.id}')" > <i class="fas fa-trash    "></i></button>
//      <button type="button" class="btn btn-primary" onclick="editarUser('${usr.id}')" > <i class="fas fa-edit    "></i></button>
//     </div>
//     `).join("")
//    //  listaUsers.innerText = JSON.stringify(users);
//  }

//  loadUsers()

// module.exports = router;
  