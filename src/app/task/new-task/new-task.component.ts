import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskComponent implements OnInit {

  form: FormGroup;
  dialogTitle: string;
  notConfirm = true;
  delInvisible = true;
  priorities: { label: string; value: number }[] = [
    {
      label: 'NOMAL',
      value: 3
    },
    {
      label: 'IMPORTANT',
      value: 2
    },
    {
      label: 'URGENT',
      value: 1
    },
  ];

  constructor(private fb: FormBuilder,
              @Inject(MD_DIALOG_DATA) private data: any,
              private dialogRef: MdDialogRef<NewTaskComponent>) {}

  ngOnInit() {
    if (!this.data.task) {
      this.form = this.fb.group({
        desc: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
        priority: [3],
        dueDate: [],
        reminder: [],
        owner: [[this.data.owner]],
        followers: [[]],
        remark: ['',  Validators.maxLength(40)]
      });
      this.dialogTitle = 'Create task';
      this.delInvisible = true;
    } else {
      this.form = this.fb.group({
        desc: [this.data.task.desc, Validators.compose([Validators.required, Validators.maxLength(20)])],
        priority: [this.data.task.priority],
        dueDate: [this.data.task.dueDate],
        reminder: [this.data.task.reminder],
        owner: [this.data.task.owner ? [{name: this.data.task.owner.name, value: this.data.task.owner.id}] : []],
        followers: [this.data.task.participants ? [...this.data.task.participants] : []],
        remark: [this.data.task.remark, Validators.maxLength(40)]
      });
      this.dialogTitle = 'Update task';
      this.delInvisible = false;
    }
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close({type: 'addOrUpdate', task: {
      desc: value.desc,
      participantIds: value.followers.map(u => u.id),
      ownerId: value.owner.length > 0 ? value.owner[0].id : null,
      dueDate: value.dueDate,
      reminder: value.reminder,
      priority: value.priority,
      remark: value.remark
    }});
  }

  onDelClick(confirm: boolean) {
    this.notConfirm = confirm;
  }

  reallyDel() {
    this.dialogRef.close({type: 'delete', task: this.data.task})
  }
}
