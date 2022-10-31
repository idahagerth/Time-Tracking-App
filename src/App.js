import React from "react";
import { Link, NavLink } from "react-router-dom";
import AppRouter from "./AppRouter";
import "./index.css";
import { FcClock } from "react-icons/fc";
import { FcTodoList } from "react-icons/fc";
import { FcCalendar } from "react-icons/fc";

function App() {
  return (
    <div>
      <ul id="nav-list">
        <li>
          <NavLink to="/calendar" style={({ isActive }) => 
                      (isActive ? {borderBottom: ' 10px solid #A8DADC'} : {border: "none"})}
>
            <FcCalendar size={42} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/timekeeping" style={({ isActive }) => 
                      (isActive ? {borderBottom: ' 10px solid #A8DADC'} : {border: "none"})}
>
            <FcClock size={42} />
          </NavLink>
        </li>

        <li>
          <NavLink to="/home" style={({ isActive }) => 
                      (isActive ? {borderBottom: ' 10px solid #A8DADC'} : {border: "none"})}
>
            <FcTodoList size={42} />
          </NavLink>
        </li>
      </ul>
      <AppRouter />
    </div>
  );
}

export default App;
