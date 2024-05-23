import "./App.css";
import { useState } from "react";
import { Column, Id, Label, Project, Task } from "./types";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import SecondarySidebar from "./components/SecondarySidebar/SecondarySidebar";
import MainSidebar from "./components/MainSidebar/MainSidebar";
import Topbar from "./components/Topbar/Topbar";
import {
  initialColumnData,
  initialLabelData,
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
  const [labels, setLabels] = useState(initialLabelData);
  const [activeProject, setActiveProject] = useState<Project | null>({
    id: "inbox",
    title: "Inbox",
    type: "main-filter",
  });
  const [activeTask, setActiveTask] = useState<Task | null>();
  const [activeLabel, setActiveLabel] = useState<Label | null>();

  if (activeLabel)
    console.log(
      tasks.filter((task) => task.labelIds?.includes(activeLabel?.id))
    );

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
      labelId: null,
    };

    const doingColumn = {
      id: generateId(),
      title: `doing`,
      color: columnColors[10],
      projectId: newProject.id,
      labelId: null,
    };

    const doneColumn = {
      id: generateId(),
      title: `done`,
      color: columnColors[5],
      projectId: newProject.id,
      labelId: null,
    };
    setColumns([...columns, todoColumn, doingColumn, doneColumn]);
    setProjects([...projects, newProject]);
  }

  function createNewLabel() {
    const newLabel = {
      id: generateId(),
      title: `Label ${labels.length + 1} `,
      type: "label",
    };

    const labelColumn: Column = {
      id: generateId(),
      title: newLabel.title,
      color: columnColors[7],
      projectId: null,
      labelId: newLabel.id,
    };

    setColumns([...columns, labelColumn]);

    setLabels([...labels, newLabel]);
  }

  function handleProjectSelection(project: Project) {
    setActiveProject(project);
    setActiveLabel(null);
  }

  function handleLabelSelection(label: Label) {
    setActiveLabel(label);
    setActiveProject(null);
  }

  function updateTaskPriority(taskId: Id, priority: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id !== taskId) return task;
      else return { ...task, priority: priority };
    });

    setTasks(updatedTasks);
  }

  return (
    <div className="grid-kanban-board h-[100vh]">
      <Topbar activeProject={activeProject} activeLabel={activeLabel} />
      <MainSidebar />
      <SecondarySidebar
        handleProjectSelection={handleProjectSelection}
        handleLabelSelection={handleLabelSelection}
        createNewProject={createNewProject}
        createNewLabel={createNewLabel}
        projects={projects}
        labels={labels}
      />
      <KanbanBoard
        activeLabel={activeLabel}
        activeProject={activeProject}
        projects={projects}
        columns={columns}
        setColumns={setColumns}
        tasks={tasks}
        setTasks={setTasks}
        activeTask={activeTask}
        setActiveTask={setActiveTask}
        updateTaskPriority={updateTaskPriority}
        labeledTasks={
          activeLabel
            ? tasks.filter((task) => task.labelIds?.includes(activeLabel.id))
            : null
        }
      />
    </div>
  );
}

export default App;
