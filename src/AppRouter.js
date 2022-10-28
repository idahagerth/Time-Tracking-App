import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";


import Calendar from "./pages/Calendar";
import ReactTabs from "./components/ReactTabs";
import TimeKeeping from "./pages/TimeKeeping";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

export const Context = React.createContext([]);


function AppRouter() {
  
  const context = React.useContext(Context);
  return (
    <Context.Provider value={[context]}>
      <Routes>
        <Route path="calendar" element={<Calendar />} />
        <Route path="/" element={<ReactTabs />} />
        <Route path="timekeeping" element={<TimeKeeping />} />
      </Routes>
    </Context.Provider>
  );
}

export default AppRouter;
