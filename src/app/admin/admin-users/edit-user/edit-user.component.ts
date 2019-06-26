import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../../shared/models/user.model';
import {UsersService} from '../../../shared/services/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {toast, updateTextFields} from '@smip/ngx-materialize';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {

  subscription: Subscription;
  subscription2: Subscription;
  isLoaded = false;
  form: FormGroup;
  id: number;

  constructor(private _users: UsersService,
              private _route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _router: Router,
  ) {
  }

  ngOnInit() {
    this.id = +this._route.snapshot.params['id'];
    if (this.id) {
      this.subscription = this._users.getUser(this.id)
                              .subscribe((data) => {
                                this.form = this.getForm(data['user']);
                                this.isLoaded = true;
                                setTimeout(() => {
                                  updateTextFields();
                                }, 0);
                              });
    } else {
      this.form = this.getForm();
      this.isLoaded = true;
    }
  }

  getForm(user: User = new User()) {
    return this._formBuilder.group({
        'username': [user.username, [Validators.required, Validators.minLength(4)]],
        'password': [user.password, [Validators.required, Validators.minLength(4)]],
      },
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({onlySelf: true});
      });
      return;
    }
    if (this.id) {
      this.subscription2 = this._users.editUser(this.id, this.form.value)
                               .subscribe((data) => {
                                 toast({html: 'Сохранено'});
                               });
    } else {
      this.subscription2 = this._users.addUser(this.form.value)
                               .subscribe((data) => {
                                 toast({html: 'Добавлено!'});
                                 this._router.navigate(['/admin', 'users', data['user'].id]);
                               });
    }

  }

}
