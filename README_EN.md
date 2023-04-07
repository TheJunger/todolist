# To-do List made with MongoDB Express React Node.js
This project is a web application that allows users to manage their daily tasks.

Users can create an account and then add, edit, and delete tasks. They can also mark tasks as completed and view a history of completed tasks.

---

The application uses a **MongoDB** database, so you'll need to create a MongoDB account if you don't have one already.

Once you have an account, copy the connection URL provided by MongoDB and paste it in the application source code, on the line that begins with mongoose.connect. Replace the user and pass variables with your MongoDB username and password, respectively.

# Backend
To start the application, run the 'npm start' command in the root folder of the project. This will start the server at localhost:3001.

## Components description
## index.js
This code is a web server written in **Node.js** using the **Express.js** framework and the **Mongoose.js** library to interact with a MongoDB database.

The server provides a REST API for performing CRUD (Create, Read, Update, Delete) operations on a list of pending tasks and deleted tasks.

The application has three routes:

* **/gethacer:** Gets all tasks in the "To-Do Tasks" list.
* **/geteliminadas:** Gets all tasks in the "Deleted Tasks" list.
* **/posthacer:** Adds, modifies or deletes tasks from the "To-Do Tasks" list.

The **/posthacer** route requires the following data in JSON format:

* **type:** The type of action you want to perform. It can be "create", "delete", "modify", or "remove".

* **list:** The list to which the task belongs. In this case, it should be "To-Do Tasks".

* **newTitle (only for "create"):** The title of the new task.

* **newDescription (only for "create"):** The description of the new task.

* **task:** An object containing the information of the task you want to delete or modify.

It must contain the following fields:

* **idNum:** The identification number of the task.
* **title:** The title of the task.
* **description:** The description of the task.
* **newTitle (only for "modify"):** The new title of the task.
* **newDescription (only for "modify"):** The new description of the task.

## schema.js
This code defines two Mongoose schemas, one for the to-do task list and another for deleted tasks.

Each schema defines the properties of the tasks and is used to define the corresponding Mongoose model.

The models are exported so they can be used in other parts of the application.

# Frontend
## App.js
This code is a React to-do list application that uses **useState** and **useEffect** hooks.

It stores two task lists, one for to-do tasks and another for deleted tasks. It also has several state variables that control how tasks are displayed and whether new tasks are being edited or created.

The code uses **useEffect** to load tasks from the server database. When the page loads, the to-do task list and deleted task list are loaded using the **GET** method of fetch.

The main **ToDoList** function contains the main logic of the application.

In the body of the function, a series of state variables are declared using the **useState** hook.

These state variables are objects that maintain information about:

* the to-do task list,
* the deleted task list,
* the currently selected menu,
* whether an edit task popup is displayed,
* whether a warning about incomplete tasks is displayed,
* whether a new task is being added or an existing task is being