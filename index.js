import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import { connectHacer, connectHechas, connectEliminadas } from "./schema.js"
import cors from 'cors'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())


mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.xluvuqg.mongodb.net/todolist?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('base de datos conectada')
})
.catch((e)=>{console.log(e)})

app.get('/gethacer', async (req, res)=>{
    let dias = await connectHacer.find()
    res.send(dias)
})

app.get('/geteliminadas', async (req, res)=>{
    let dias = await connectEliminadas.find()
    res.send(dias)
})

app.post('/posthacer', async(req,res)=>{
    if(req.body.tipo == 'crear'){
        let newKey = await connectHacer.countDocuments()
        await connectHacer.insertMany({'titulo':req.body.nuevoTitulo, 'descripcion':req.body.nuevaDescripcion, 'idNum':newKey})
    }
    if(req.body.lista == 'Tareas Hacer'){
        if(req.body.tipo == 'borrar'){
            let newKey = await connectEliminadas.countDocuments()
            console.log('id a borrar = '+req.body.tarea.idNum)
            await connectHacer.findOneAndDelete({'idNum':req.body.tarea.idNum})
            console.log('tarea eliminada de Hacer')
            await connectEliminadas.insertMany({'titulo':req.body.tarea.titulo, "descripcion":req.body.tarea.descripcion, "idNum":(newKey)})
            console.log('tarea Movida a Eliminadas')
        }
        if(req.body.tipo == 'modificar'){
            await connectHacer.findOneAndUpdate({'idNum':req.body.tarea.idNum},{$set:{"titulo":req.body.nuevoTitulo,"descripcion":req.body.nuevaDescripcion}})
            console.log('tarea Modificada')
        }
        console.log( await connectHacer.find({'idNum':req.body.tarea.id}))
    }
    if(req.body.tipo == 'eliminar'){
        await connectEliminadas.findOneAndDelete({'idNum':req.body.tarea.idNum})
    }

})

//app.post('/post', async (req,res)=>{
//    console.log(req.body)
//    await connectHacer.insertMany(req.body)
//    await connectEliminadas.insertMany(req.body)
//    res.send('post page')
//})

app.listen(3001)
console.log('server On')