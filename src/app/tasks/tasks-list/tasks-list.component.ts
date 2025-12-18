import { Component, computed, inject, signal } from "@angular/core";

import { TaskItemComponent } from "./task-item/task-item.component";
import { TasksService } from "../../services/tasks.service";

@Component({
  selector: "app-tasks-list",
  standalone: true,
  templateUrl: "./tasks-list.component.html",
  styleUrl: "./tasks-list.component.css",
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  private selectedFilter = signal<string>("all");
  private taskService = inject(TasksService);
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case "open":
        return this.taskService
          .allTasks()
          .filter((task) => task.status === "OPEN");
      case "done":
        return this.taskService
          .allTasks()
          .filter((task) => task.status === "DONE");
      case "in-progress":
        return this.taskService
          .allTasks()
          .filter((task) => task.status === "IN_PROGRESS");
      default:
        return this.taskService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
