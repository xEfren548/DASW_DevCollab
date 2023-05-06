const router = require('express').Router();
const {validarBodyProyecto} = require('../middlewares/validar-datos.js');
//const {validarToken} = require('../middlewares/validar-datos.js');
const {Proyecto} = require('../db/Proyecto.js');
const {nanoid} = require('nanoid')

router.get('/', async(req,res) => {
    let filtro = {}
    let {title, description, available} = req.query;
    if(title){
        filtro.title = new RegExp(title, 'i');
    }
    if(description){
        filtro.description = new RegExp(descripcion, 'i');
    }
    if(available!=undefined){
        console.log("available" ,available);
        filtro.available = available== "true" ? true : false;
    }

    let projects = await Proyecto.getProjects(filtro);
    res.send(projects);
})


router.post('/', validarBodyProyecto, async (req, res) => {
    let {title, description, creationDate, available} = req.body;
    //console.log(nanoid());
    let newDoc = await Proyecto.crearProyecto({uid: nanoid(), title, description, creationDate, available});
    res.status(201).send(newDoc);
})

router.put('/:uid', async (req, res) => {
    let uid = req.params.uid;
    console.log('uid: ');
    console.log(uid);
    let {title, description} = req.body;

    let projectDoc = await Proyecto.getProjectByID(uid);

    if(!projectDoc) {
        res.status(404).send({error: "Project not found"});
        return;
    }

    // req.body.email = req.params.email;


    let updateProject={}

    if(title){
        updateProject.title = title;
    }
    if(description){
        updateProject.description = description;
    }

    //projectDoc.actualizarProyecto(uid, updateProject);

    let changedUser = await Proyecto.actualizarProyecto(uid, updateProject);
        // fs.writeFileSync(path.join('data', 'users.json'), JSON.stringify(users));
    res.send(changedUser);


})


module.exports = router;