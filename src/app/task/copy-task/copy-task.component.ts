import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { TaskList } from '../../domain';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-copy-task',
  templateUrl: './copy-task.component.html',
  styleUrls: ['./copy-task.component.scss']
})
export class CopyTaskComponent implements OnInit {
  form: FormGroup;
  dialogTitle: string;
  lists$: Observable<TaskList>;

  constructor(private fb: FormBuilder,
              @Inject(MD_DIALOG_DATA) private data: any,
              private dialogRef: MdDialogRef<CopyTaskComponent>) {
  }

  ngOnInit() {
    this.lists$ = this.data.lists;
    if (this.data.type === 'move') {
      this.dialogTitle = '移动所有任务';
    }
    this.form = this.fb.group({
      targetList: ['', Validators.required]
    });
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close({srcListId: this.data.srcListId, targetListId: value.targetList});
  }
}
