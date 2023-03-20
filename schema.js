import mongoose from "mongoose";
const { Schema } = mongoose;

const tareasParaHacer = new Schema({
    "titulo":String,
    "descripcion":String,
    "idNum":Number
},{collection:'hacer'})

const tareasEliminadas = new Schema({
    "titulo":String,
    "descripcion":String,
    "idNum":Number
},{collection:'eliminadas'})

const connectHacer = mongoose.model('hacer', tareasParaHacer)
const connectEliminadas = mongoose.model('eliminadas', tareasEliminadas)

export {connectHacer, connectEliminadas}
