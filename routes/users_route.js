// USERS
const router = require('express').Router();
const {authStrict, validateCreator} = require('../middlewares/auth')
const {User} = require('../db/User.js')
const nanoid = require('nanoid');
const fs = require('fs');
const path = require('path')

console.log(nanoid.nanoid());

//con archivo users.json
// router.get('/',validateAdmin, (req,res)=>{
//     let isAdmin = req.isAdmin;
//     let users  = users;
//     let filtered = [...users]
//     console.log(filtered);
//     if(!isAdmin)
//       filtered = filtered.map(usr => ({id: usr.id, username: usr.username,email:usr.email}))
    
//     let {username, email} = req.query
//     if(username) 
//         filtered = filtered.filter(usr => usr.username
//                                             .toUpperCase()
//                                             .includes(username.toUpperCase()) )
//     if(email) 
//         filtered = filtered.filter(usr => usr.email.toUpperCase().includes(email.toUpperCase()) )
    
//     res.send(filtered)
// })

router.get('/', async (req,res)=>{
    let isAdmin = req.isAdmin;
    let {username, email} = req.query
    let filtros = {}
    if(username) 
        filtros.username = new RegExp(username,'i')

    if(email) 
        filtros.email = new RegExp(email,'i')
    

    let users  = await User.getUser(filtros)
    console.log(users)
    res.send(users)
})


//1) convertir la funcion a statics como parte del esquema del usuario
//2) cambiar a recibir /:email y mandar llamar la función de User.getUserByEmail
//3) poner el async y await 

router.get('/:email', async (req,res)=>{
    // let user = users.find(usr => usr.id ==req.params.id )
    let user = await User.getUserByEmail(req.params.email)
    if(user){
        res.send(user)
    }else{
        res.status(404).send({error:"no existe usuario"})
    }
})


//NUNCA SERÁ ACCESIBLE porque ya existe un endpoint antes con /:id
router.get('/:test', (req, res) => {
    res.send({test: "hola"})
})


// 1) funciona de update hacerla statics para el esquema
// 2) convertir funcion de put en async
// 3) usar User.updateUser

router.put('/:email', async(req,res)=>{
    
    let userDoc = await User.getUserByEmail(req.params.email)


    if(! userDoc) {
        res.status(404).send({error: 'User not found'})
        return
    }
    
    

    let {username, password} = req.body;
    let email = req.params.email;
    let updateUser={}
    // if(email) updateUser.email = email;
    if(username) updateUser.username = username;
    if(password) updateUser.password = password;

    userDoc.update(updateUser)
        // fs.writeFileSync(path.join('data','users.json'), JSON.stringify(users))
    let changedUser = await User.updateUser(email, updateUser);
    
    console.log(users)
    res.send(changedUser)

})


router.post('/',validateCreator,async (req,res)=>{
    //atributos username, email, password
    let {username, email, password} = req.body;
    let errores = []
    if(!username) errores.push("username")
    if(!email) errores.push("email")
    if(!password) errores.push("password")

    if(errores.length>0){
        res.status(400).send({errores})
        return;
    }

    let newUser = {uid: nanoid.nanoid(),username,email,password}
    let existeUsuario = await User.getUserByEmail(newUser.email)

    if(existeUsuario){
        res.status(400).send({error: "Usuario ya existe"})
        return;
    }

    console.log(newUser);
    let newDoc = await User.addUser(newUser);
    // users.push(newUser);
    // fs.writeFileSync(path.resolve('./data','users.json'), JSON.stringify(users))
    // fs.writeFileSync(path.join('data','users.json'), JSON.stringify(users))

    res.status(201).send(newDoc)

})

router.delete('/:email',authStrict,async(req,res)=>{
    
    let userDoc = await User.getUserByEmail(req.params.email)
    if(!userDoc){
        res.status(404).send({error: "no se encontró usuario"})
        return;
    }
    let deleted = await User.deleteUser(req.params.email)

    // let deleted =  users.splice(pos,1)
    // fs.writeFileSync(path.join('data','users.json'), JSON.stringify(users))
    res.send({info: "usuario "+ deleted.username+ " ha sido borrado"})
})


module.exports = router;
// export default routes