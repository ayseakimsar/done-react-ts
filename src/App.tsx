import "./App.css";
import { useState } from "react";
import { Column, Project, Task } from "./types";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import SecondarySidebar from "./components/SecondarySidebar/SecondarySidebar";
import MainSidebar from "./components/MainSidebar/MainSidebar";
import Topbar from "./components/Topbar/Topbar";
import {
  initialColumnData,
  initialProjectData,
  initialTaskData,
} from "./initialData";
import { generateId } from "./utils/generateId";
import "./index.css";
import { columnColors } from "./columnColors";

function App() {
  const [columns, setColumns] = useState<Column[]>(initialColumnData);
  const [tasks, setTasks] = useState<Task[]>(initialTaskData);
  const [projects, setProjects] = useState<Project[]>(initialProjectData);
  const [activeProject, setActiveProject] = useState<Project>({
    id: "inbox",
    title: "Inbox",
    type: "main-filter",
  });

  function createNewProject() {
    const newProject = {
      id: generateId(),
      title: `Project ${projects.length + 1}`,
      type: "project",
    };
    const todoColumn = {
      id: generateId(),
      title: `to do`,
      color: columnColors[7],
      projectId: newProject.id,
    };

    const doingColumn = {
      id: generateId(),
      title: `doing`,
      color: columnColors[10],
      projectId: newProject.id,
    };

    const doneColumn = {
      id: generateId(),
      title: `done`,
      color: columnColors[5],
      projectId: newProject.id,
    };
    setColumns([...columns, todoColumn, doingColumn, doneColumn]);
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
      <KanbanBoard
        activeProject={activeProject}
        projects={projects}
        tasks={tasks}
        setTasks={setTasks}
        columns={columns}
        setColumns={setColumns}
      />
    </div>
  );
}

export default App;
