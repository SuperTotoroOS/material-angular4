import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskListComponent implements OnInit {
  form: FormGroup;
  dialogTitle: string;

  constructor(private fb: FormBuilder,
              @Inject(MD_DIALOG_DATA) private data: any,
              private dialogRef: MdDialogRef<NewTaskListComponent>) {
  }

  ngOnInit() {
    if (!this.data.name) {
      this.form = this.fb.group({
        name: ['', Validators.compose([Validators.required, Validators.maxLength(10)])]
      });
      this.dialogTitle = 'Create list';
    } else {
      this.form = this.fb.group({
        name: [this.data.name, Validators.compose([Validators.required, Validators.maxLength(10)])],
      });
      this.dialogTitle = 'Update list';
    }
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(value.name);
  }
}
