import React from "react";
import { Routes, Route } from "react-router-dom";

import Calendar from "./pages/Calendar";
import ReactTabs from "./components/ReactTabs";
import TimeKeeping from "./pages/TimeKeeping";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function AppRouter() {
  return (
    <Routes>
      <Route path="calendar" element={<Calendar />} />
      <Route path="home" element={<ReactTabs />} />
      <Route path="timekeeping" element={<TimeKeeping />} />
    </Routes>
  );
}

export default AppRouter;
