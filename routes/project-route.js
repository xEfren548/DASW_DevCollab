const router = require('express').Router();
//const {validarBodyTarea} = require('../middlewares/validarDatos.js');
//const {validarToken} = require('../middlewares/validarDatos.js');
const {Project} = require('../db/Proyecto.js');
//const {nanoid} = require('nanoid')

router.get('/api/projects', async(req,res) => {
    let filtro = {}
    let {titulo, descripcion, completado} = req.query;
    if(titulo){
        filtro.titulo = new RegExp(titulo, 'i');
    }
    if(descripcion){
        filtro.descripcion = new RegExp(descripcion, 'i');
    }
    if(completado!=undefined){
        console.log("completado" ,completado);
        filtro.completado = completado== "true" ? true : false;
    }

    let projects = await Project.getProjects(filtro);
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