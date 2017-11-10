import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private store$: Store<fromRoot.State>) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required]
    });
  }

  onSubmit({value, valid}) {
    if (!valid) {
      return;
    }
    console.log(value);
  }
}
