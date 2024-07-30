import { useEffect, useMemo, useState } from "react";
import { Column, Id, Label, Project, Task } from "../../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import { generateId } from "../../utils/generateId";
import TaskModal from "./TaskModal/TaskModal";
import { generateColor } from "../../utils/generateColor";

interface Props {
  activeProject: Project | null;
  labels: Label[];
  projects: Project[];
  tasks: Task[];
  labeledTasks: Task[] | null;
  setTasks: (tasks: Task[]) => void;
  columns: Column[];
  setColumns: (columns: Column[]) => Task[] | void;
  activeTask: Task | null | undefined;
  activeLabel: Label | null | undefined;
  setActiveTask: (activeTask: Task | null | undefined) => Task[] | void;
  updateTaskPriority: (taskId: Id, priority: string) => void;
  updateTaskLabels: (taskId: Id, labelId: Id) => void;
  deleteLabelInTask: (taskId: Id, labelId: Id) => void;
  parentProject: Project | undefined;
  parentTaskList: Task[] | undefined;
}

export default function KanbanBoard({
  parentProject,
  parentTaskList,
  activeProject,
  activeLabel,
  labels,
  projects,
  tasks,
  setTasks,
  columns,
  setColumns,
  activeTask,
  setActiveTask,
  updateTaskPriority,
  updateTaskLabels,

  labeledTasks,
  deleteLabelInTask,
}: Props) {
  const [columnOnDrag, setColumnOnDrag] = useState<Column | null>();
  const [taskOnDrag, setTaskOnDrag] = useState<Task | null>();

  const columnsId = useMemo(() => {
    return columns.map((col) => col.id);
  }, [columns]);
  const tasksId = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );
  const filteredColumnsByProject = activeProject?.id
    ? columns.filter((col) => col.projectId === activeProject?.id)
    : columns;

  const filteredColumnsByFilter = activeLabel?.id
    ? columns.filter((col) => col.labelId === activeLabel.id)
    : columns;

  const filteredColumns = activeProject
    ? filteredColumnsByProject
    : activeLabel
      ? filteredColumnsByFilter
      : columns;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveTask(null);
      }
    };

    // Add event listener when modal is active
    if (activeTask) {
      document.addEventListener("keydown", handleKeyDown);
    }

    // Clean up event listener when component unmounts or modal is closed
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeTask]);

  function createNewColumn(projectId: Id = activeProject?.id || 0) {
    const columnToAdd: Column = {
      id: generateId(),
      title: `New Column`,
      color: generateColor("column"),
      projectId: projectId,
      labelId: null,
    };
    setColumns([...columns, columnToAdd]);
  }
  function updateColumn(columnId: Id, title: string) {
    const updatedColumns = columns.map((column) => {
      if (column.id !== columnId) {
        return column;
      } else return { ...column, title };
    });

    setColumns(updatedColumns);
  }
  function deleteColumn(columnId: Id) {
    const newColumns = columns.filter((col) => col.id !== columnId);
    setColumns(newColumns);
    const newTasks = tasks.filter((task) => task.columnId !== columnId);
    setTasks(newTasks);
  }
  function createTask(columnId: Id, labelId: Id | null = null) {
    const newTask: Task = {
      id: generateId(),
      columnId: columnId,
      content: `Task ${tasks.length + 1}`,
      dueDate: null,
      labelIds: labelId ? [labelId] : null,
      parentTaskId: null,
      completed: false,
      priority: "none",
      description: "",
    };
    setTasks([...tasks, newTask]);
  }
  function createSubTask(taskId: Id) {
    const newSubTask: Task = {
      id: generateId(),
      columnId: null,
      content: "New subtask",
      dueDate: null,
      labelIds: null,
      parentTaskId: taskId,
      completed: false,
      priority: "none",
      description: "",
    };

    setTasks([...tasks, newSubTask]);
  }
  function updateTask(taskId: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      } else return { ...task, content };
    });

    setTasks(newTasks);
  }
  function updateTaskDueDate(taskId: Id, date: Date | null) {
    console.log(date);
    const updatedTasks = tasks.map((task) => {
      if (task.id !== taskId) return task;
      else return { ...task, dueDate: date };
    });

    setTasks(updatedTasks);
  }
  function updateTaskDescription(taskId: Id, content: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id !== taskId) return task;
      else return { ...task, description: content };
    });

    setTasks(updatedTasks);
  }
  function deleteTask(taskId: Id) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }
  function completeTask(taskId: Id) {
    const newTasks: Task[] = tasks.map((task) => {
      if (task.id !== taskId) return task;
      if (task.id === taskId && task.completed === true)
        return { ...task, completed: false };
      if (task.id === taskId && task.completed === false)
        return { ...task, completed: true };
    });
    setTasks(newTasks);
  }
  function handleTaskClick(task: Task) {
    setActiveTask(task);
  }
  function onDragStart(event: DragStartEvent) {
    setColumnOnDrag(null);
    setTaskOnDrag(null);
    if (event.active.data.current?.type === "Column") {
      setColumnOnDrag(event.active.data.current?.column);
    }

    if (event.active.data.current?.type === "Task") {
      setTaskOnDrag(event.active.data.current?.task);
    }
  }
  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;
    const activeIndex = columns.findIndex((col) => col.id === activeId);
    const overIndex = columns.findIndex((col) => col.id === overId);
    if (active.data.current?.type === "Task") return;
    setColumns(arrayMove(columns, activeIndex, overIndex));
  }
  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;
    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = active.data.current?.type === "Task";
    if (!isActiveATask) return;
    //dropping a task over a task

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex(
          (task: Task) => task.id === activeId,
        );
        const overIndex = tasks.findIndex((task: Task) => task.id === overId);
        if (overIndex === -1) return tasks;
        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        const result: Task[] = arrayMove(tasks, activeIndex, overIndex);
        return result;
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // dropping task over a column
    if (isActiveATask && isOverAColumn) {
      const newTasks: Task[] = tasks.map((task) => {
        if (task.id !== activeId) return task;
        else return { ...task, columnId: over.id };
      });

      setTasks(newTasks);
    }
  }

  return (
    <div className="ml-10 flex h-[100vh] gap-10 overflow-x-auto bg-light-mainBackground dark:bg-dark-mainBackground">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex gap-8">
          <SortableContext items={columnsId}>
            {filteredColumns.map((column) => (
              <ColumnContainer
                key={column.id}
                column={column}
                completeTask={completeTask}
                updateColumn={updateColumn}
                deleteColumn={deleteColumn}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                allTasks={tasks}
                tasks={
                  activeLabel && labeledTasks
                    ? labeledTasks
                    : tasks.filter((task) => task.columnId === column.id)
                }
                tasksId={tasksId}
                onTaskClick={handleTaskClick}
                activeLabel={activeLabel}
              />
            ))}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {columnOnDrag && (
              <ColumnContainer
                column={columnOnDrag}
                updateColumn={updateColumn}
                deleteColumn={deleteColumn}
                completeTask={completeTask}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                allTasks={tasks}
                tasks={tasks.filter(
                  (task) => task.columnId === columnOnDrag.id,
                )}
                tasksId={tasksId}
                onTaskClick={handleTaskClick}
                activeLabel={activeLabel}
              />
            )}

            {taskOnDrag && (
              <TaskCard
                completeTask={completeTask}
                updateTask={updateTask}
                task={taskOnDrag}
                deleteTask={deleteTask}
                subtasks={tasks}
                onTaskClick={handleTaskClick}
              />
            )}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
      {/* New Column Button */}
      {!activeLabel && (
        <button
          className="mt-[70px] h-[80%] w-[200px] rounded-xl bg-light-task text-3xl text-light-primaryTextLightest shadow-md transition duration-[300ms] hover:shadow-2xl dark:bg-dark-task"
          onClick={() => createNewColumn()}
        >
          + New column
        </button>
      )}
      {/* New Column Button */}

      {/* Task Modal */}
      <div>
        {activeTask &&
          createPortal(
            <div>
              <div
                tabIndex={0}
                onClick={() => setActiveTask(null)}
                onKeyDown={(e) => console.log(e.key)}
                className="fixed left-0 top-0 z-10 h-screen w-screen bg-dark-mainBackground opacity-50"
              />
              <TaskModal
                setActiveTask={setActiveTask}
                parentProject={parentProject}
                parentTaskList={parentTaskList}
                labels={labels}
                deleteLabelInTask={deleteLabelInTask}
                projects={projects}
                columns={columns}
                task={tasks.filter((task) => task.id === activeTask.id)[0]}
                createSubTask={createSubTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                updateTaskDueDate={updateTaskDueDate}
                updateTaskDescription={updateTaskDescription}
                completeTask={completeTask}
                updateTaskPriority={updateTaskPriority}
                updateTaskLabels={updateTaskLabels}
                handleTaskClick={handleTaskClick}
                subtasks={tasks.filter(
                  (task) => task.parentTaskId === activeTask.id,
                )}
              />
            </div>,
            document.body,
          )}
      </div>
      {/* Task Modal */}
    </div>
  );
}
