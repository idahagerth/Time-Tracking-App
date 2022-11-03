import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useAppContext } from "../Context";
import axios from "axios";
import uuid from "react-uuid";
import { AiTwotoneDelete } from "react-icons/ai";

function Home() {
  const { deleteStatus, setDeleteStatus } = useAppContext();

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

  const deleteTasks = (id) => {
    return axios
      .delete(`http://localhost:3000/tasks/${id}`)
      .then(() => setDeleteStatus("Delete Successful" + uuid()));
  };

  const addTask = async () => {
    const getProjectId = async () => {
      return axios
        .get(`http://localhost:3000/projects?name=${projekt}`)
        .then((response) => response.data[0].id);
    };
    const getProjectColor = async () => {
      return axios
        .get(`http://localhost:3000/projects?name=${projekt}`)
        .then((response) => response.data[0].color);
    };

    const tasksInfo = {
      id: uuid(),
      name: name,
      projectId: await getProjectId(),
      projectColor: await getProjectColor(),
    };

    axios
      .post("http://localhost:3000/tasks", tasksInfo)
      .then(function (res) {
        console.log("request okey");
      })
      .catch(function (error) {
        console.log(error);
      });

    setName("");
    setProjekt("");
    setIsOpen(false);
  };

  const getTasks = () => {
    return axios.get("http://localhost:3000/tasks").then((res) => res.data);
  };

  const [taskList, setTaskList] = useState([]);
  useEffect(() => {
    console.log("Running tasks");
    let mounted1 = true;

    getTasks().then((items1) => {
      if (mounted1) {
        setTaskList(items1);
      }
    });
    return () => (mounted1 = false);
  }, [modalIsOpen, deleteStatus]);

  return (
    <div className="wrappAll">
      {taskList.map((task) => {
        return (
          <div
            key={task.id}
            className="listOfTasks"
            style={{ backgroundColor: task.projectColor }}
          >
            <p>{task.name}</p>
            <a onClick={() => deleteTasks(task.id)}>
              <AiTwotoneDelete size={28} />
            </a>
          </div>
        );
      })}

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
