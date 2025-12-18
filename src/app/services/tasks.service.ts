import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "../tasks/task.model";
import { LoggingService } from "./logging.service";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private tasks = signal<Task[]>([]);
  private loggingService = inject(LoggingService);

  allTasks = this.tasks.asReadonly();

  constructor() {}

  addTask(task: { title: string; description: string }) {
    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 15),
      title: task.title,
      description: task.description,
      status: "OPEN",
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
    this.loggingService.log(`Task added: ${newTask.title}`);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) => {
        return task.id === taskId ? { ...task, status: newStatus } : task;
      })
    );
    this.loggingService.log(`Task status updated: ${taskId} to ${newStatus}`);
  }
}
