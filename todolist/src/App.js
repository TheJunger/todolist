import "./ToDoList.css";
import React, { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";

function ToDoList() {

  const [tareasHacer, getTareasHacer] = useState([]);
  const [tareasEliminadas, getTareasEliminadas] = useState([]);
  const [menuElegido, setMenuElegido] = useState(tareasHacer)
  const [mostrar, setMostrar] = useState(false);
  const [numero, setNumero] = useState(0);
  const [editarTarea, showEditTarea] = useState(false)
  const [advertTask, setAdvertTask] = useState(false)
  const [addOrEdit, setAddOrEdit] = useState('')
  const [permanentDel, setPermanentDel] = useState(false)

  const handleClick = (index) => {
    setNumero(index)
    console.log("mostrar = " + mostrar);
    console.log('index = ' + index)
    console.log('numero = ' + numero)
  };

  useEffect(() => {
    fetch("http://localhost:3001/gethacer", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        //console.log(data[0])
        //console.log(data.length)
        let tarea = data.map((tarea,index) => {
          return {
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            id:index,
            idNum:tarea.idNum
          };
        });
        getTareasHacer(tarea);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/geteliminadas", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        //console.log(data[0])
        //console.log(data.length)
        let tarea = data.map((tarea,index) => {
          return {
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            id:index,
            idNum:tarea.idNum
          };
        });
        getTareasEliminadas(tarea);
      });
  }, []);

//Envia con un fetch la tarea editada
  let sendTareaEditada = (tarea, nuevoTitulo, nuevaDescripcion, tipo)=>{
    //si es menor a 1 que no se pueda editar
    if(nuevoTitulo.value.length < 1 || nuevaDescripcion.value.length < 1){
      alert('No puedes enviar un texto vacio!')
    }
    else{
      fetch("http://localhost:3001/posthacer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"tipo":tipo, "tarea":tarea,"lista":document.querySelector('.listName').value, "nuevoTitulo":nuevoTitulo.value, "nuevaDescripcion":nuevaDescripcion.value})
      })
      showEditTarea(false)
    }
  } 

//Abre el label para editar la tarea, o para crear una nueva
  let EditarTarea = (props) =>{
    return(
      <div className="editTareaLabelMaster">
        <div className="editTareaLabelTapador"></div>
      <div className="editLabelContainer">
        <div>
          <div className="editTareaLabel">{
            addOrEdit == 'edit'?`Editar "${props.tarea[numero].titulo}"`:"Añadir Tarea"
          }</div>
          <div className="literralyJustABar"></div>
        </div>
        <input className='nuevoTitulo' placeholder="Nuevo Titulo..." /*value={props.tarea[numero].titulo}*//>
        <textarea className="nuevaDescripcion" placeholder="Nueva Descripcion..." /*value={props.tarea[numero].descripcion}*/ style={{resize:"none"}}/>
        <div className="editTareaBotonesLabel">
          <input type="button" className="cancelEditTareaButtonLabel" value='Cancelar' onClick={()=>{showEditTarea(false)}}/>
          <input type="button" className="acceptEditTareaButtonLabel" value='Aceptar' onClick={()=>{sendTareaEditada(props.tarea[numero], document.querySelector('.nuevoTitulo'), document.querySelector('.nuevaDescripcion'), addOrEdit == 'edit'?'modificar':'crear')}}/>
        </div>
      </div>
      </div>
    )
  }

//Abre un label para ver el titulo y la descripcion, nada mas
  let OpenLabel = (props) => {
    useEffect(()=>{
    },[handleClick])
    return (
      <div className="labelContMaster">
        <div className="editTareaLabelTapador"></div>
        <div className="labelCont">
          <div className="continaerLabelText">
          <div className="tituloContLabel">
            <div className="tituloLabel">{props.tarea[numero].titulo}</div>
          </div>
          <div className="descContLabel">
            <div className="descLabel">{props.tarea[numero].descripcion}</div>
          </div>
          <div className="cerrarLabel" onClick={()=>{
            setMostrar(false)
          }}>cerrar</div>
          </div>
        </div>
      </div>
    );
  };

//Comprobacion final a la hora de mover una tarea a 'eliminar tareas'
  let AdvertDeleteTask = (props) =>{
    return(
      <div className="delTaskContMaster">
        <div className="editTareaLabelTapador"></div>
        <div className="delTaskCont">
          <div className="delTaskTitle">¿Realmente quieres mover esta Tarea? (" {props.tarea[numero].titulo} ") a 'Tareas eliminadas'</div>
          <div className="delTaskBtnCont">
            <input type="button" className="delTaskDel"value='Borrar' onClick={()=>{
                fetch("http://localhost:3001/posthacer", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({"tipo":'borrar', "tarea":props.tarea[numero],"lista":document.querySelector('.listName').value})
                })
              setAdvertTask(false)
              console.log(props.tarea[numero])
              }}></input>
            <input type="button" className="delTaskCancel"value='Cancelar' onClick={()=>{setAdvertTask(false)}}></input>
          </div>
        </div>
      </div>
    )
  }
  
//combinar permanentDelete con advertDeleteTask
  let PermanentDelete = (props)=>{
    return(
      <div className="delTaskContMaster">
        <div className="editTareaLabelTapador"></div>
        <div className="delTaskCont">
          <div className="delTaskTitle">¿Realmente quieres eliminar permanentemente (" {props.tarea[numero].titulo} ")</div>
          <div className="alertDel">Esta accion es irreversible!</div>
          <div className="delTaskBtnCont">
            <input type="button" className="delTaskDel"value='Borrar' onClick={()=>{
                fetch("http://localhost:3001/posthacer", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({"tipo":'eliminar', "tarea":props.tarea[numero],"lista":document.querySelector('.listName').value})
                })
              setPermanentDel(false)
              console.log(props.tarea[numero])
              }}></input>
            <input type="button" className="delTaskCancel"value='Cancelar' onClick={()=>{setPermanentDel(false)}}></input>
          </div>
        </div>
      </div>
    )
  }

//Comprueba cual es el nombre de la lista y settea 'menuElegido'
  let checkMenu = (menu) =>{
    if(menu == 'Tareas Hacer'){
      setMenuElegido(tareasHacer)
    }
    if(menu == 'Tareas Eliminadas'){
      setMenuElegido(tareasEliminadas)
    }
  }

  return (
    <>
      <div className="container">
        <div className="listCont">
          <select className="listName" onChange={(e)=>{checkMenu(e.target.value)}}>
            <option className="selector" >Selecciona tu lista de tareas</option>
            <option className="selector" value='Tareas Hacer' >Tareas para hacer</option>
            <option className="selector" value='Tareas Eliminadas' >Tareas eliminadas</option>
          </select>
        </div>
        <div className="literallyJustABar"></div>
        <div className="tareasCont">
            <div className="addNewTaskCont" onClick={()=>{showEditTarea(true); setAddOrEdit('add'); console.log(addOrEdit)}}>
              <div className="addNewTask">Añadir nueva tarea</div> {/*meter un valor por default a la lista de tareas en el node*/}
            </div>
          {()=>{if(document.querySelector('.listName').textContent != 'Selecciona tu lista de tareas'){
            document.querySelector('.addNewTaskCont').style.display = 'block'
          }
          else{
            document.querySelector('.addNewTaskCont').style.display = 'hidden'
          }}}
          {menuElegido.map((tarea, index) => {
            return(
            <div className={"tarea tarea"+index} key={index}>
              <div className="titulo" onClick={() => {handleClick(index); setMostrar(true)}}>{tarea.titulo}</div>
              <div className="botonesCont">
              <div className="btnCompletar" onClick={()=>{document.querySelectorAll('.tarea')[index].classList.toggle('complete')}}>
                  <i className="icon fa fa-solid fa-check"></i>
                </div>
                <div className="btnModificar" onClick={()=>{showEditTarea(true); setAddOrEdit('edit') ; handleClick(index); console.log(numero);}}>
                  <i className="icon fa fa-solid fa-pencil" ></i></div>
                <div className="btnEliminar" onClick={()=>{handleClick(index); if(document.querySelector('.listName').value == 'Tareas Hacer'){setAdvertTask(true); } else{setPermanentDel(true)}}}>
                  <i className="icon fa fa-solid fa-trash"></i></div>
              </div>
            </div>
            )
          })}
          {advertTask == true? <AdvertDeleteTask keys={numero} tarea={menuElegido}/>: null}
          {permanentDel == true? <PermanentDelete keys={numero} tarea={menuElegido}/>: null}
          {mostrar == true ? <OpenLabel keys={numero} tarea={menuElegido} /> : null}
          {editarTarea == true ? <EditarTarea keys={numero}  tarea={menuElegido}/> : null}
          <div style={tareasHacer.length != "0" ? { display: "none" }: { display: "inline" }}> Añadir Nueva Tarea</div>
        </div>
      </div>
    </>
  );
}

export { ToDoList };
