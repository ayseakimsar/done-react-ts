import { useMemo, useState } from "react";
import { Column, Id, Project, Task } from "../../types";
import ColumnContainer from "./ColumnContainer";
import { initialColumnData, initialTaskData } from "../../initialData";
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
import { columnColors } from "../../columnColors";
import { generateId } from "../../utils/generateId";
import TaskModal from "./TaskModal/TaskModal";

interface Props {
  activeProject: Project | null;
  projects: Project[];
}

export default function KanbanBoard({ activeProject, projects }: Props) {
  const [columns, setColumns] = useState<Column[]>(initialColumnData);
  const [tasks, setTasks] = useState<Task[]>(initialTaskData);
  const [columnOnDrag, setColumnOnDrag] = useState<Column | null>();
  const [taskOnDrag, setTaskOnDrag] = useState<Task | null>();
  const [activeTask, setActiveTask] = useState<Task | null>();

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
    })
  );
  const filteredColumns = activeProject?.id
    ? columns.filter((col) => col.projectId === activeProject?.id)
    : columns;

  function createNewColumn(projectId: Id = activeProject?.id || 0) {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
      color: generateColor(),
      projectId: projectId,
    };
    setColumns([...columns, columnToAdd]);
  }

  function generateColor() {
    const index = Math.round(Math.random() * columnColors.length);
    return columnColors[index];
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

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId: columnId,
      content: `Task ${tasks.length + 1}`,
      dueDate: null,
      labelId: null,
      parentTaskId: null,
    };
    setTasks([...tasks, newTask]);
  }

  function updateTask(taskId: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      } else return { ...task, content };
    });

    setTasks(newTasks);
  }

  function deleteTask(taskId: Id) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
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
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        const overIndex = tasks.findIndex((task) => task.id === overId);
        if (overIndex === -1) return tasks;
        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        return arrayMove(tasks, activeIndex, overIndex);
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

  function handleTaskClick(task: Task) {
    setActiveTask(task);
  }

  return (
    <div className="flex gap-10 h-[100vh] overflow-x-auto bg-light-mainBackground dark:bg-dark-mainBackground ml-10">
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
                updateColumn={updateColumn}
                deleteColumn={deleteColumn}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                tasks={tasks.filter((task) => task.columnId === column.id)}
                tasksId={tasksId}
                onTaskClick={handleTaskClick}
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
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                tasks={tasks.filter(
                  (task) => task.columnId === columnOnDrag.id
                )}
                tasksId={tasksId}
                onTaskClick={handleTaskClick}
              />
            )}

            {taskOnDrag && (
              <TaskCard
                updateTask={updateTask}
                task={taskOnDrag}
                deleteTask={deleteTask}
                subtasks={tasks}
                onTaskClick={handleTaskClick}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
      <button
        className="bg-light-task dark:bg-dark-task h-[80%] w-[200px] rounded-xl shadow-md mt-[70px] text-light-primaryTextLightest text-3xl hover:shadow-2xl transition duration-[300ms]"
        onClick={() => createNewColumn()}
      >
        + New column
      </button>

      <div>
        {activeTask &&
          createPortal(
            <div>
              <div
                tabIndex={0}
                onClick={() => setActiveTask(null)}
                onKeyDown={(e) => console.log(e.key)}
                className="w-screen h-screen bg-dark-mainBackground opacity-50 fixed top-0 left-0  z-10"
              />
              <TaskModal
                projects={projects}
                columns={columns}
                task={activeTask}
                subtasks={tasks.filter(
                  (task) => task.parentTaskId === activeTask.id
                )}
              />
            </div>,
            document.body
          )}
      </div>
    </div>
  );
}
