import React, { useContext, useState } from "react";
//import ReactDOM from "react-dom";
import Modal from "react-modal";
import { Context } from "../AppRouter";
import { BlockPicker } from "react-color";



function Projects() {
  const context = useContext(Context);
  let modelTitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  const customStyles = {
    content:{
      border:"none"
    }
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [name, setName] = useState("");
  

  const [blockPickerColor, setBlockPickerColor] = useState("#37d67a");

  const addProject = () => {
    
    const infoArray = {
      name: name,
      color: blockPickerColor,
      tasks: [],
    };
    context.push(infoArray);
    setName("");
    setIsOpen(false);
  };
  

  return (
    <div className="wrappAll">
      {context.map((project) => {
        if (project.length === 0) return;
        return (
          <div className="listOfProjects" style={{backgroundColor: project.color}}>
            <p>{project.name}</p>
          </div>
        );
      })}

      <button className="newProjectButton" onClick={openModal}>Add Project</button>
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
        <button className="modalProject" onClick={addProject}>Add Project</button>
      </Modal>
    </div>
  );
}

export default Projects;
