const router = require('express').Router();
//const {validarBodyTarea} = require('../middlewares/validarDatos.js');
//const {validarToken} = require('../middlewares/validarDatos.js');
const {Proyecto} = require('../db/Proyecto.js');
//const {nanoid} = require('nanoid')

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

/*
router.post('/', validarToken, validarBodyTarea, async (req, res) => {
    let {titulo, descripcion, fechaLimite, completado} = req.body;
    console.log(nanoid());
    let newDoc = await Tarea.crearTarea({uid: nanoid(), titulo, descripcion, fechaLimite, completado});
    res.status(201).send(newDoc);
})
*/

module.exports = router;