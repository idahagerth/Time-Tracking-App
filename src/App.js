import React from "react";
import { Link } from "react-router-dom";
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
          <Link to="/calendar">
            <FcCalendar size={42} />
          </Link>
        </li>
        <li>
          <Link to="/timekeeping">
            <FcClock size={42} />
          </Link>
        </li>

        <li>
          <Link to="/">
            <FcTodoList size={42} />
          </Link>
        </li>
      </ul>
      <AppRouter />
    </div>
  );
}

export default App;
