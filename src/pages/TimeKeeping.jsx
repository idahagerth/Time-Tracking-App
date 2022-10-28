import React, { useContext } from "react";
import { Context } from "../AppRouter";

function TimeKeeping() {
 
  const [timer, setTimer] = useContext(Context);

  function click() {
    setTimer(timer +1)
  }

  return (
    <div>
        <button onClick={click}>blabla</button>
      <h1>{timer}</h1>
    </div>
  );
}

export default TimeKeeping;
