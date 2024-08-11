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
    color: "",
  });
  const [activeTask, setActiveTask] = useState<Task | null>();
  const [activeLabel, setActiveLabel] = useState<Label | null>();
  const [view, setView] = useState("board");

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
    const newProject: Project = {
      id: generateId(),
      title: `Project ${projects.length - 2}`,
      type: "project",
      color: "",
    };

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

  function updateLabelColor(labelId: Id, color: string) {
    const updatedLabels = labels.map((label) => {
      if (label.id !== labelId) return label;
      return { ...label, color: color };
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

  // filters todays tasks
  const todayTasks: Task[] = [];

  function getTodayTasks(task: Task) {
    if (!task.dueDate) return;
    const today = new Date();
    const taskDate = new Date(task?.dueDate);
    if (
      taskDate.getFullYear() === today.getFullYear() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getDate() === today.getDate()
    )
      todayTasks.push(task);
  }

  tasks.forEach((task) => {
    getTodayTasks(task);
  });

  // filters todays tasks

  return (
    <div className="grid-kanban-board h-[100vh]">
      <Topbar
        activeProject={activeProject}
        activeLabel={activeLabel}
        setView={setView}
      />
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
        updateLabelColor={updateLabelColor}
      />
      <KanbanBoard
        view={view}
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
        todayTasks={todayTasks}
      />
    </div>
  );
}

export default App;
