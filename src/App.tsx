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
import { generateColor } from "./utils/generateColor";

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

  function getParentTaskList() {
    if (!activeTask) return;
    const parentTaskList: Task[] = [];

    let currentParentId = activeTask?.parentTaskId;

    function findTaskById(taskId: Id): Task | undefined {
      return tasks.find((task) => task.id === taskId);
    }

    while (currentParentId !== null) {
      const parentTask = findTaskById(currentParentId);
      if (parentTask) {
        parentTaskList.push(parentTask);
        currentParentId = parentTask.parentTaskId;
      } else {
        break;
      }
    }

    return parentTaskList.reverse();
  }

  const parentTaskList = getParentTaskList();
  if (activeTask) parentTaskList?.push(activeTask);
  function getProjectIdTaskBelongTo() {
    // it takes the last element of the list (which is grandgrand...grandparent task) it takes the project from it
    // so you can see which folder/prject it lays on
    if (parentTaskList?.length !== 0) {
      return columns.find(
        (column) => column.id === parentTaskList?.[0]?.columnId,
      )?.projectId;
    } else
      return columns.find((column) => column.id === activeTask?.columnId)
        ?.projectId;
  }

  const projectIdTaskBelongTo = getProjectIdTaskBelongTo();

  function findParentProjectById() {
    if (activeTask)
      return projects.find((project) => project.id === projectIdTaskBelongTo);
  }

  const parentProject: Project | undefined = findParentProjectById();

  function createNewProject() {
    console.log(projects);
    const newProject = {
      id: generateId(),
      title: `Project ${projects.length - 2}`,
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

  function updateProjectTitle(projectId: Id, newTitle: string) {
    const updatedProjects = projects.map((project) => {
      if (project.id !== projectId) return project;
      return { ...project, title: newTitle };
    });

    setProjects(updatedProjects);
  }

  function deleteProject(projectId: Id) {
    const updatedProjects = projects.filter(
      (project) => project.id !== projectId,
    );

    setProjects(updatedProjects);
  }

  function updateLabelTitle(labelId: Id, newTitle: string) {
    const updatedLabels = labels.map((label) => {
      if (label.id !== labelId) return label;
      return { ...label, title: newTitle };
    });

    setLabels(updatedLabels);
  }

  function createNewLabel() {
    const newLabel = {
      id: generateId(),
      title: `Label ${labels.length + 1} `,
      type: "label",
      color: generateColor("label"),
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

  function deleteLabel(labelId: Id) {
    const updatedLabels = labels.filter((label) => label.id !== labelId);
    setLabels(updatedLabels);
    console.log("a label is deleted!");
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

  function updateTaskLabels(taskId: Id, labelId: Id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id !== taskId) return task;
      if (task.labelIds?.includes(labelId)) return task;
      return {
        ...task,
        labelIds: task.labelIds
          ? [...task.labelIds, Number(labelId)]
          : [Number(labelId)],
      };
    });

    setTasks(updatedTasks);
  }

  function deleteLabelInTask(taskId: Id, labelId: Id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id !== taskId) return task;
      return {
        ...task,
        labelIds: task.labelIds
          ? task.labelIds?.filter((label) => label !== labelId)
          : task.labelIds,
      };
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
        deleteProject={deleteProject}
        deleteLabel={deleteLabel}
        createNewLabel={createNewLabel}
        projects={projects}
        labels={labels}
        updateProjectTitle={updateProjectTitle}
        updateLabelTitle={updateLabelTitle}
      />
      <KanbanBoard
        parentProject={parentProject}
        parentTaskList={parentTaskList}
        activeLabel={activeLabel}
        activeProject={activeProject}
        labels={labels}
        projects={projects}
        columns={columns}
        setColumns={setColumns}
        tasks={tasks}
        setTasks={setTasks}
        activeTask={activeTask}
        setActiveTask={setActiveTask}
        updateTaskPriority={updateTaskPriority}
        updateTaskLabels={updateTaskLabels}
        deleteLabelInTask={deleteLabelInTask}
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
