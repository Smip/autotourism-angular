import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ICustomControl} from '@shared/models/form.model';
import {FormService} from '@shared/services/form.service';
import {AuthService} from '@shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  button: string = 'buttons.login';
  form: FormGroup;
  private _prefix: string = 'auth.login.form.';
  controls: ICustomControl[] = [
    {
      id: 'username',
      type: 'text',
      label: this._prefix + 'username.label',
      icon: 'account_circle',
      validators: ['required', 'minLength'],
      minLength: 4,
    },
    {
      id: 'password',
      type: 'password',
      label: this._prefix + 'password.label',
      icon: 'vpn_key',
      validators: ['required', 'minLength'],
      minLength: 6,
      // pattern: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
    },
  ];

  constructor(private _formBuilder: FormBuilder,
              private _auth: AuthService,
              private _formService: FormService) {
  }

  ngOnInit() {
    const formControls = this._formService.configureControls(this.controls, this._prefix);
    this.form = this._formBuilder.group(formControls);
  }

  onSubmit() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({onlySelf: true});
      });
      return;
    }
    this._auth.logIn(this.form.value);
  }
}
