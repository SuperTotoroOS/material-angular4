import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { cardAnim } from '../../anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ cardAnim ],
})
export class ProjectItemComponent {
  @Input() item;
  @Output() itemSelected = new EventEmitter<void>();
  @Output() launchUpdateDialog = new EventEmitter<void>();
  @Output() launchInviteDailog = new EventEmitter<void>();
  @Output() launchDeleteDailog = new EventEmitter<void>();
  @HostBinding('@card') cardState = 'out';

  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter(target) {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave(target) {
    this.cardState = 'out';
  }

  onClick(ev: Event) {
    ev.preventDefault();
    this.itemSelected.emit();
  }

  openUpdateDialog(ev: Event) {
    ev.preventDefault();
    this.launchUpdateDialog.emit();
  }

  openInviteDialog(ev: Event) {
    ev.preventDefault();
    this.launchInviteDailog.emit();
  }

  openDeleteDialog(ev: Event) {
    ev.preventDefault();
    this.launchDeleteDailog.emit();
  }

  constructor() {}
}
