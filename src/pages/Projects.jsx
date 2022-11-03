import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useAppContext } from "../Context";
import { BlockPicker } from "react-color";
import axios from "axios";
import uuid from "react-uuid";
import { AiTwotoneDelete } from "react-icons/ai";

function Projects() {
  const { deleteStatus, setDeleteStatus } = useAppContext();
  let modelTitle;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  const customStyles = {
    content: {
      border: "none",
    },
  };

  function closeModal() {
    setIsOpen(false);
  }
  const [name, setName] = useState("");
  const [blockPickerColor, setBlockPickerColor] = useState("#37d67a");

  const getProjects = () => {
    return axios.get("http://localhost:3000/projects").then((res) => res.data);
  };

  const addProject = () => {
    const serverInfo = {
      id: uuid(),
      name: name,
      color: blockPickerColor,
    };
    axios
      .post("http://localhost:3000/projects", serverInfo)
      .then(function (res) {
        console.log("request okey");
      })
      .catch(function (error) {
        console.log(error);
      });

    setName("");
    setIsOpen(false);
  };
  const deleteProject = (id) => {
    return axios
      .delete(`http://localhost:3000/projects/${id}`)
      .then(() => setDeleteStatus("Delete Successful" + uuid()));
  };

  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    let mounted2 = true;
    getProjects().then((items2) => {
      if (mounted2) {
        setProjectList(items2);
      }
    });
    return () => (mounted2 = false);
  }, [modalIsOpen, deleteStatus]);

  return (
    <div className="wrappAll">
      {projectList.map((project) => {
        if (project.length === 0) return;
        return (
          <div
            key={project.id}
            className="listOfProjects"
            style={{ backgroundColor: project.color }}
          >
            <p>{project.name}</p>
            <a onClick={() => deleteProject(project.id)}>
              <AiTwotoneDelete size={28} />
            </a>
          </div>
        );
      })}

      <button className="newProjectButton" onClick={openModal}>
        Add Project
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
          className="projectInput"
          type="text"
          placeholder="Project Name"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <BlockPicker
          color={blockPickerColor}
          onChange={(color) => {
            setBlockPickerColor(color.hex);
          }}
        />
        <button className="modalProject" onClick={addProject}>
          Add Project
        </button>
      </Modal>
    </div>
  );
}

export default Projects;
