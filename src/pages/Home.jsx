import React, { useState, useEffect, useContext } from "react";
//import ReactDOM from "react-dom";
import Modal from "react-modal";
import { Context } from "../AppRouter";
import axios from "axios";
import uuid from "react-uuid";
import { findRenderedComponentWithType } from "react-dom/test-utils";


function Home() {
  const contexts = useContext(Context);
  const [context, setContext] = useState(contexts);
  const customStyles = {
    content: {
      border: "none",
    },
  };

  let modelTitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [name, setName] = useState("");
  const [projekt, setProjekt] = useState("");

  const deleteTasks = (e, f) => {
    const id = context.findIndex((obj) => {
      return obj.name === f;
    });
    const task = context[id].tasks.findIndex((obj) => {
      return obj.name === e;
    });

    
    let newcontext = context
    newcontext[id].tasks.splice(task,1)
    setContext(context => newcontext)
    

    console.log(context);
  };
  
  const getProjects = () => {
    return axios.get("http://localhost:3000/projects").then(res => res.data)
   };
   
   
   const addTask = () => {
    /*const id = getProjects().then(items => {
     //items.find(x => x.name === projekt).id
     return items.find(x => x.name === projekt).id
    });*/
    const tasksInfo = {
      "id":uuid(),
      "name":name,
      "projectId": getProjects().then(items => {
        /* project id funkar inte än*/
        return items.find(x => x.name === projekt).id
       })
    }


    

    axios.post("http://localhost:3000/tasks", tasksInfo)
    .then(function(res) {
      console.log("request okey");
    })
    .catch(function(error){
      console.log(error);
    })
    /*const id = context.findIndex((obj) => {
      return obj.name === projekt;
    });*/

    //context[id].tasks.push(taskObject);

    setName("");
    setProjekt("");
    setIsOpen(false);
  };
  const [blockPickerColor, setBlockPickerColor] = useState("#37d67a");

  return (
    <div className="wrappAll">
      {Array.isArray(context) ? context.map((projekt) => {
        if (projekt.length === 0) return;
        return (
          <div>
            {projekt.tasks.map((task) => {
              return (
                <div
                  className="listOfTasks"
                  style={{ backgroundColor: projekt.color }}
                >
                  <p>{task.name}</p>
                  <button
                    onClick={() => deleteTasks(task.name, projekt.name)}
                  ></button>
                </div>
              );
            })}
          </div>
        );
      }) : null}

      <button className="ant" onClick={openModal}>
        Add New Tasks
      </button>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <h2 ref={(_modelTitle) => (modelTitle = _modelTitle)}>Add</h2>

        <input
          className="input1"
          type="text"
          placeholder="Task Name"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input2"
          type="text"
          placeholder="Project"
          id="projekt"
          name="projekt"
          value={projekt}
          onChange={(e) => setProjekt(e.target.value)}
        />

        <button className="tasksButton" onClick={addTask}>
          Add Task
        </button>
      </Modal>
    </div>
  );
}

export default Home;
