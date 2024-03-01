import "./App.css";
import { useState } from "react";
import { Id } from "./types";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import SecondarySidebar from "./components/SecondarySidebar/SecondarySidebar";

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
