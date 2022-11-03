import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useAppContext } from "../Context";
import { Timer } from "timer-node";
import { Dropdown } from "react-bootstrap";
import uuid from "react-uuid";

import { FcAlarmClock } from "react-icons/fc";
import { MdCloudDone } from "react-icons/md";
import { HiPlay, HiStop } from "react-icons/hi";
import { TiMediaPlayReverse } from "react-icons/ti";

function TimeKeeping() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  const customStyles = {
    content: {
      border: "none",
    },
  };
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const { timerList, setTimerList } = useAppContext();
  const { projectId, setProjectId } = useAppContext();
  const [taskList, setTaskList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [time, setTime] = useState("");

  const date = new Date();
  const intervalRef = useRef();
  const timeRef = useRef(new Timer());
  const timer = timeRef.current;

  const [startTime, setStarttime] = useState("");
  const [endTime, setendTime] = useState("");

  const saveServer = (taskId) => {
    const timePacket = {
      id: uuid(),
      taskId: taskId,
      start: startTime,
      end: endTime,
      time: time,
      date: date.getDate() + " " + months[date.getMonth()],
    };
    axios
      .post("http://localhost:3000/timelogs", timePacket)
      .then(function (res) {
        console.log("request okey");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function interval() {
    const int = setInterval(() => {
      setTime(timer.format("%h:%m:%s"));
    }, 100);
    intervalRef.current = int;
  }

  function startTimer() {
    setStarttime(
      date.toString() +
        "T" +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds() +
        "." +
        date.getMilliseconds()
    );
    timer.start();
    interval();
    console.log(startTime);
  }
  function pauseTimer() {
    setendTime(
      date.toString() +
        "T" +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds() +
        "." +
        date.getMilliseconds()
    );
    timer.pause();
    console.log(endTime);
  }
  function resumeTimer() {
    timer.resume();
  }

  function closeModal() {
    setIsOpen(false);
  }
  const getProjects = () => {
    return axios.get("http://localhost:3000/projects").then((res) => res.data);
  };
  const getTasks = () => {
    return axios
      .get(`http://localhost:3000/tasks?projectId=${projectId}`)
      .then((res) => res.data);
  };

  useEffect(() => {
    let mounted2 = true;
    getProjects().then((items2) => {
      if (mounted2) {
        setProjectList(items2);
      }
    });
    return () => (mounted2 = false);
  }, [modalIsOpen]);

  useEffect(() => {
    let mounted2 = true;
    getTasks().then((items2) => {
      if (mounted2) {
        setTaskList([]);
        setTaskList(items2);
      }
    });

    return () => (mounted2 = false);
  }, [projectId]);

  return (
    <div>
      <h1 className="headerTime">Timer</h1>
      <button className="newTimerButton" onClick={openModal}>
        Add
      </button>
      {timerList.map((timer) => {
        return (
          <>
            {" "}
            <div className="timerDisplay">
              <h1>{time}</h1>
            </div>
            <div
              className="timeList"
              key={timer.id}
              style={{ backgroundColor: timer.projectColor }}
            >
              <p>{timer.name}</p>

              <a onClick={startTimer}>
                <HiPlay size={32} />
              </a>
              <a onClick={pauseTimer}>
                <HiStop size={32} />
              </a>
              <a onClick={resumeTimer}>
                <TiMediaPlayReverse size={32} />
              </a>
              <a onClick={() => saveServer(timer.id)}>
                <MdCloudDone size={32} />
              </a>
            </div>
          </>
        );
      })}

      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <Dropdown className="text-center">
          <Dropdown.Toggle
            variant="danger"
            id="dropdown-variant-Primary"
            size="lg"
          >
            Projects
          </Dropdown.Toggle>
          <Dropdown.Menu variant="variant.toLowerCase" id="dropdown-basic">
            {projectList.map((project) => (
              <Dropdown.Item
                key={project.id}
                onClick={() => [setProjectId(project.id)]}
              >
                {project.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {taskList.map((task) => {
          return (
            <div
              style={{ backgroundColor: task.projectColor }}
              className="itemsFromLists"
              key={task.id}
            >
              {task.name}
              <a
                onClick={() => [
                  timerList.push({
                    id: task.id,
                    name: task.name,
                    projectColor: task.projectColor,
                  }),
                  setIsOpen(false),
                ]}
              >
                <FcAlarmClock size={38} />
              </a>
            </div>
          );
        })}
      </Modal>
    </div>
  );
}

export default TimeKeeping;
