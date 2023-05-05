const {mongoose} = require('./connectdb');

const projectSchema = mongoose.Schema({
    uid: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creationDate: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true,
        required: true
    }
})

projectSchema.statics.getProjects = async(filtros) =>{
    let docs = await Proyecto.find(filtros);
    console.log(docs);
    return docs;
}

projectSchema.statics.getTareaByID = async(uid) =>{
    let doc = await Tarea.findOne({uid});
    console.log(doc);
    return doc;
}

projectSchema.statics.crearProyecto = async(datosProyecto) =>{
    let newProject = Proyecto(datosProyecto);
    console.log(newProject);
    
    return await newProject.save();
}

projectSchema.statics.actualizarTarea = async(uid, datosTarea) => {
    let updatedTask = await Tarea.findOneAndUpdate({uid}, {$set: datosTarea}, {new: true});
    return updatedTask;
}

projectSchema.statics.borrarTarea = async(uid) => {
    let doc = await Tarea.findOneAndDelete({uid});
    console.log("Borrado");
    return doc;
}

const Proyecto = mongoose.model('Proyecto', projectSchema );

// Tarea.crearTarea({uid:"12345", titulo: "Practica redes inalambricas", descripcion: "Practica", fechaLimite: "20230424"})
Proyecto.getProjects()
// Tarea.getTareaByID("12345")
// Tarea.borrarTarea("1234");

module.exports = {Proyecto}
