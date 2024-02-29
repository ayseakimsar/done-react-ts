import { useState } from "react";
import "./App.css";
import KanbanBoard from "./components/KanbanBoard";
import SecondarySidebar from "./components/SecondarySidebar";
import { Id } from "./types";

function App() {
  const [activeProjectId, setActiveProjectId] = useState<Id | null>(null);

  function handleProjectSelection(projectId: Id) {
    setActiveProjectId(projectId);
  }

  return (
    <div className="flex">
      <SecondarySidebar handleProjectSelection={handleProjectSelection} />
      <KanbanBoard activeProjectId={activeProjectId} />
    </div>
  );
}

export default App;
