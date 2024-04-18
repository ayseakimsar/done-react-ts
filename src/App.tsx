import "./App.css";
import { useState } from "react";
import { Project } from "./types";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import SecondarySidebar from "./components/SecondarySidebar/SecondarySidebar";
import MainSidebar from "./components/MainSidebar/MainSidebar";
import Topbar from "./components/Topbar/Topbar";
import { initialProjectData } from "./initialData";
import { generateId } from "./utils/generateId";
import "./index.css";

function App() {
  const [activeProject, setActiveProject] = useState<Project>({
    id: "inbox",
    title: "Inbox",
    type: "main-filter",
  });
  const [projects, setProjects] = useState<Project[]>(initialProjectData);

  function createNewProject() {
    const newProject = {
      id: generateId(),
      title: `Project ${projects.length + 1}`,
      type: "project",
    };
    setProjects([...projects, newProject]);
  }

  function handleProjectSelection(project: Project) {
    setActiveProject(project);
  }

  return (
    <div className="grid-kanban-board h-[100vh]">
      <Topbar activeProject={activeProject} />
      <MainSidebar />
      <SecondarySidebar
        handleProjectSelection={handleProjectSelection}
        createNewProject={createNewProject}
        projects={projects}
      />
      <KanbanBoard activeProject={activeProject} projects={projects} />
    </div>
  );
}

export default App;
