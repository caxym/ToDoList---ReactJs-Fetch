import React, { useEffect, useState } from "react";
import './App.css';


function App() {

  useEffect(() => {
    getTasks();
  }, []);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);


  /*fetch("https://assets.breatheco.de/apis/fake/todos/user/raulAraque", {
   method:"POST",
   headers: {
     "Content-Type":"application/json"
 },
 body: JSON.stringify([]),
 }).then(respuesta => respuesta.json())
 .then(data => console.log(data))
 .catch(error => console.log(error));
 */

 const getTasks = () => {
  fetch("http://assets.breatheco.de/apis/fake/todos/user/raulAraque")
    .then((respuesta) => respuesta.json())
    .then((data) => {setTasks(data)})
    .catch((error) => console.log(error));
};
const clearAll =()=>{
  fetch("https://assets.breatheco.de/apis/fake/todos/user/raulAraque", {
  method:"PUT",
  headers: {
    "Content-Type":"application/json"
},
body: JSON.stringify([{label: "sin tareas", done:false}]),
}).then(respuesta => respuesta.json())
.then(data => console.log(data))
.catch(error => console.log(error));
}

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task !== "") {
      setTasks([...tasks, { label: task, done: false }]);
      setTask("");
      fetch("http://assets.breatheco.de/apis/fake/todos/user/raulAraque")
        .then((respuesta) => respuesta.json())
        .then((data) => {
          const actualizarTareas = [...data, { label: task, done: false }]
          return actualizarTareas;
        })
        .then((actualizarTareas) => {
          fetch("http://assets.breatheco.de/apis/fake/todos/user/raulAraque", {
            method: "PUT",
            body: JSON.stringify(actualizarTareas),
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(actualizarTareas),
          }).then(respuesta => respuesta.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
        })

    } 
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    fetch("http://assets.breatheco.de/apis/fake/todos/user/raulAraque", {
      method: "PUT",
      body: JSON.stringify(newTasks),
      headers: {
        "content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => { })
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <p className=" h1 text-center" >Lista de Pendientes</p>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control form-control-lg mb-3"
            type="text"
            placeholder="¿Cuál es la tarea?"
            value={task}
            onChange={handleChange}
            aria-label="form text" />
        </form>
      </div>

      <ul className="list-group">
        {tasks.length > 0 ? (
          tasks.map((tareas, index) => (
            <ul key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <li className="form-control form-control-lg" type="text" readOnly>{tareas.label}</li>
              <span>
                <button type="button" className="btn btn-outline-danger ms-2" onClick={() => handleDelete(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                  </svg></button>
              </span>
            </ul>
          ))
        ) : (
        <div className="alert alert-warning text-center" role="alert">
          No Hay tareas Disponibles
        </div>
        )}
      </ul>
      <div className="d-flex justify-content-between align-items-center">
      <button type="button" className="btn btn-info mt-3" disabled>
        tareas disponibles<span className="badge text-bg-danger m-2">{tasks.length}{tasks.length === 1 ? "" : ""} </span>
      </button>
      <button type="button" className="btn btn-outline-danger ms-2" onClick={() => clearAll()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                  </svg>  Borrar Todas las tareas </button>
    </div>
    </div>
  );

}

export default App;






