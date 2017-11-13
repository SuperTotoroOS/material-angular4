import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskRoutingModule } from './task-routing.module';
import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskListHeaderComponent } from './task-list-header/task-list-header.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewTaskListComponent } from './new-task-list/new-task-list.component';
import { CopyTaskComponent } from './copy-task/copy-task.component';
import { QuickTaskComponent } from './quick-task/quick-task.component';

@NgModule({
  imports: [
    SharedModule,
    TaskRoutingModule
  ],
  declarations: [
    TaskListComponent,
    TaskItemComponent,
    TaskHomeComponent,
    TaskListHeaderComponent,
    NewTaskComponent,
    NewTaskListComponent,
    CopyTaskComponent,
    QuickTaskComponent,
  ],
  entryComponents: [
    NewTaskComponent,
    NewTaskListComponent,
    CopyTaskComponent
  ]
})
export class TaskModule {
}
