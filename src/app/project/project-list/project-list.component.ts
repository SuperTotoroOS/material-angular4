import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/project.action';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared';
import { defaultRouteAnim, listAnimation } from '../../anim';
import { Project } from '../../domain';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    defaultRouteAnim,
    listAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent {

    @HostBinding('@routeAnim') state;
    projects$: Observable<Project[]>;
    listAnim$: Observable<number>;

    constructor(private store$: Store<fromRoot.State>,
                private dialog: MdDialog) {
      this.store$.dispatch(new actions.LoadProjectsAction({}));
      this.projects$ = this.store$.select(fromRoot.getProjects);
      this.listAnim$ = this.projects$.map(p => p.length);
    }

    selectProject(project: Project) {
      this.store$.dispatch(new actions.SelectProjectAction(project));
    }

    openNewProjectDialog() {
      const img = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
      const thumbnails$ = this.getThumbnailsObs();
      const dialogRef = this.dialog.open(NewProjectComponent, {data: { thumbnails: thumbnails$, img: img}});
      dialogRef.afterClosed().take(1).subscribe(val => {
        if (val) {
          const converImg = this.buildImgSrc(val.coverImg);
          this.store$.dispatch(new actions.AddProjectAction({...val, coverImg: converImg}));
        }
      });
    }

    openUpdateDialog(project) {
      const thumbnails$ = this.getThumbnailsObs();
      const dialogRef = this.dialog.open(NewProjectComponent, {data: { project: project, thumbnails: thumbnails$}});
      dialogRef.afterClosed().take(1).subscribe(val => {
        if (val) {
          const converImg = this.buildImgSrc(val.coverImg);
          this.store$.dispatch(new actions.UpdateProjectAction({...val, id: project.id, coverImg: converImg}));
        }
      });
    }

    openInviteDialog(project) {
      let members = [];
      this.store$.select(fromRoot.getProjectMembers(project.id))
        .take(1)
        .subscribe(m => members = m);
      const dialogRef = this.dialog.open(InviteComponent, {data: { members: members}});
      // 使用 take(1) 来自动销毁订阅，因为 take(1) 意味着接收到 1 个数据后就完成了
      dialogRef.afterClosed().take(1).subscribe(val => {
        if (val) {
          this.store$.dispatch(new actions.InviteMembersAction({projectId: project.id, members: val}));
        }
      });
    }

    openDeleteDialog(project) {
      const confirm = {
        title: 'Delete project',
        content: 'Are you sure to delete project',
        confirmAction: 'Confirm'
      };
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {dialog: confirm}});

      // 使用 take(1) 来自动销毁订阅，因为 take(1) 意味着接收到 1 个数据后就完成了
      dialogRef.afterClosed().take(1).subscribe(val => {
        if (val) {
          this.store$.dispatch(new actions.DeleteProjectAction(project));
        }
      });
    }

    private getThumbnailsObs(): Observable<string[]> {
      return Observable
        .range(0, 40)
        .map(i => `/assets/img/covers/${i}_tn.jpg`)
        .reduce((r, x) => {
          return [...r, x];
        }, []);
    }

    private buildImgSrc(img: string): string {
      return img.indexOf('_') > -1 ? img.split('_', 1)[0] + '.jpg' : img;
    }
  }
