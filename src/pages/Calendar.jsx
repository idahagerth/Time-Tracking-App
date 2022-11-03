import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import uuid from "react-uuid";
import { RiDeleteBack2Line } from "react-icons/ri";

function Calendar() {
  const [timeLogs, setTimeLogs] = useState([]);
  const [taskId, setTaskId] = useState([]);
  const [taskIdList, setTaskIdList] = useState([]);
  const [taskIdName, setTaskIdName] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState([]);

  function getTimeLogs() {
    return axios.get("http://localhost:3000/timelogs").then((res) => res.data);
  }
  function getTask() {
    return axios
      .get(`http://localhost:3000/timelogs?taskId=${taskId}`)
      .then((res) => res.data);
  }
  function getTaskName() {
    return axios
      .get(`http://localhost:3000/tasks?id=${taskId}`)
      .then((res) => res.data);
  }
  function deleteTimelog(id) {
    return axios
      .delete(`http://localhost:3000/timelogs/${id}`)
      .then(() => setDeleteStatus("Delete Successful" + uuid()));
  }

  useEffect(() => {
    let mounted2 = true;
    getTimeLogs().then((data) => {
      if (mounted2) {
        setTimeLogs(data);
      }
    });
    return () => (mounted2 = false);
  }, []);

  useEffect(() => {
    let mounted2 = true;
    getTask().then((items2) => {
      if (mounted2) {
        setTaskIdList(items2);
      }
    });

    return () => (mounted2 = false);
  }, [taskId, deleteStatus]);

  useEffect(() => {
    let mounted2 = true;
    getTaskName().then((items2) => {
      if (mounted2) {
        setTaskIdName(items2);
      }
    });

    return () => (mounted2 = false);
  }, [taskId]);

  return (
    <div>
      <h1 className="calHeader">Calendar</h1>
      <Dropdown className="text-center">
        <Dropdown.Toggle
          variant="danger"
          id="dropdown-variant-Primary"
          size="lg"
        >
          C A L E N D A R
        </Dropdown.Toggle>
        <Dropdown.Menu variant="variant.toLowerCase" id="dropdown-basic">
          {timeLogs.map((calendar) => (
            <Dropdown.Item
              key={calendar.id}
              onClick={() => [setTaskId(calendar.taskId)]}
            >
              {calendar.date}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <div className="calendarStyling">
        {taskIdList.map((tasks) => {
          return (
            <>
              {taskIdName.map((name) => {
                return (
                  <p style={{ backgroundColor: name.projectColor }}>
                    {name.name}
                  </p>
                );
              })}
              <p>{tasks.time}</p>
              <a onClick={() => deleteTimelog(tasks.id)}>
                <RiDeleteBack2Line size={32} />
              </a>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
