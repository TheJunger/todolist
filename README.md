# To do list hecho con MongoDB Express React Node.js

Este proyecto es una aplicación web que permite a los usuarios gestionar sus tareas diarias. 

Los usuarios pueden crear una cuenta y luego agregar, editar y eliminar tareas. 

También pueden marcar las tareas como completadas y ver un historial de tareas completadas.

-----------------

La aplicación utiliza una base de datos de **MongoDB**, así que necesitarás crear una cuenta de MongoDB si aún no tienes una. 

Una vez que tengas una cuenta, copia la URL de conexión que te proporciona MongoDB y pégala en el código fuente de la aplicación, en la línea que comienza con mongoose.connect. 

Reemplaza las variables user y pass con tu nombre de usuario y contraseña de MongoDB, respectivamente.

# Backend

Para iniciar la aplicación, ejecuta el comando ' `npm start` ' en la carpeta raíz del proyecto. Esto iniciará el servidor en localhost:3001.

## Descripcion de los componentes

## index.js

Este código es un servidor web escrito en **Node.js** utilizando el framework **Express.js** y la biblioteca Mongoose.js para interactuar con una base de datos **MongoDB**. 

El servidor proporciona una API REST para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en una lista de tareas pendientes y tareas eliminadas.

La aplicación tiene tres rutas:

* **/gethacer:** Obtiene todas las tareas en la lista "Tareas Hacer".
* **/geteliminadas:** Obtiene todas las tareas en la lista "Tareas Eliminadas".
* **/posthacer:** Añade, modifica o elimina tareas de la lista "Tareas Hacer".

La ruta **/posthacer**, requiere los siguientes datos en formato JSON:

**tipo:** El tipo de acción que deseas realizar. Puede ser "crear", "borrar", "modificar" o "eliminar".

**lista:** La lista a la que pertenece la tarea. En este caso, debe ser "Tareas Hacer".

**nuevoTitulo (sólo para "crear"):** El título de la nueva tarea.

**nuevaDescripcion (sólo para "crear"):** La descripción de la nueva tarea.

**tarea:** Un objeto que contiene la información de la tarea que deseas borrar o modificar. 

Debe contener los siguientes campos:
* **idNum:** El número de identificación de la tarea.
* **titulo:** El título de la tarea.
* **descripcion:** La descripción de la tarea.

**nuevoTitulo (sólo para "modificar"):** El nuevo título de la tarea.

**nuevaDescripcion (sólo para "modificar"):** La nueva descripción de la tarea.

## schema.js

Este código define dos esquemas de Mongoose, uno para la lista de tareas por hacer y otro para las tareas eliminadas.

Cada esquema define las propiedades de las tareas y se utiliza para definir el modelo Mongoose correspondiente. 

Los modelos se exportan para que puedan ser utilizados en otras partes de la aplicación.

# Frontend

## App.js

Este código es una aplicación de lista de tareas en React que utiliza **useState** y **useEffect** hooks. 

Almacena dos listas de tareas, una de las tareas por hacer y otra de las tareas eliminadas. 

También tiene varias variables de estado que controlan cómo se muestran las tareas y si se están editando o creando tareas nuevas.

El código utiliza **useEffect** para cargar las tareas de la base de datos en el servidor. 

Cuando se carga la página, se carga la lista de tareas por hacer y la lista de tareas eliminadas utilizando el método **GET** de fetch. 

La función principal **ToDoList** que contiene la lógica principal de la aplicación. 

En el cuerpo de la función, se declaran una serie de variables de estado utilizando el hook **useState.**

Estas variables de estado son objetos que mantienen información sobre 
* la lista de tareas por hacer, 
* la lista de tareas eliminadas, 
* el menú actualmente seleccionado, 
* si se muestra una ventana emergente para editar una tarea, * si se muestra una advertencia sobre tareas incompletas, 
* si se está agregando una tarea nueva o editando una tarea existente 
* y si se deben eliminar permanentemente las tareas eliminadas.

Luego se define la función **handleClick** que se utiliza para manejar el evento de clic en una tarea en la lista. 

Esta función establece la tarea seleccionada y muestra información sobre la tarea en la consola.

A continuación, se definen dos efectos secundarios con useEffect. 

El **primer efecto** secundario se ejecuta al cargar la página y utiliza la función fetch para obtener datos sobre las tareas por hacer desde un servidor. 

Luego, los datos se transforman en un objeto que se utiliza para actualizar la variable de estado tareasHacer. 

El **segundo efecto** secundario es similar, pero se utiliza para obtener datos sobre las tareas eliminadas.

Después, se definen dos funciones auxiliares: **sendTareaEditada** y **EditarTarea.** 

**sendTareaEditada** se utiliza para enviar una tarea editada al servidor a través de una solicitud **POST**. 

**Antes de enviar la tarea, se realiza una validación** para asegurarse de que el nuevo título y la nueva descripción no estén vacíos. 

Si están vacíos, se muestra una alerta en la pantalla. 

**EditarTarea** se utiliza para mostrar una ventana emergente que permite editar una tarea existente o agregar una tarea nueva.

La última función auxiliar es **OpenLabel**, que se utiliza para mostrar información detallada sobre una tarea seleccionada en una ventana emergente.

Finalmente, se **exporta** la función principal **ToDoList** para que pueda ser utilizada en otros archivos de código.