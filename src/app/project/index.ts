import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { InviteComponent } from './invite/invite.component';
import { ProjectItemComponent } from './project-item/project-item.component';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule
  ],
  exports: [ProjectListComponent],
  entryComponents: [NewProjectComponent, InviteComponent],
  declarations: [
    ProjectListComponent,
    NewProjectComponent,
    InviteComponent,
    ProjectItemComponent
    ]
})
export class ProjectModule {
}
