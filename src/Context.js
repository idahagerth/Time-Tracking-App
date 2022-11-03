import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [timerList, setTimerList] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const [projectId, setProjectId] = useState([]);

  return (
    <AppContext.Provider
      value={{
        timerList,
        setTimerList,
        deleteStatus,
        setDeleteStatus,
        projectId,
        setProjectId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  return context;
}
