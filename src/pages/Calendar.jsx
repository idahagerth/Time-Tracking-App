import React, { useContext } from "react";
import { Context } from "../AppRouter";

function Calendar() {
  const [timer] = useContext(Context);
  return (
    <div>
      <h1>{timer}</h1>
    </div>
  );
}

export default Calendar;
