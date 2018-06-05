import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "../../shared/services/users.service";
import {Subscription} from "rxjs/Rx";
import {fadeStateTrigger} from "../../shared/animations/fade.animation";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'autotourism-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [ fadeStateTrigger ]
})
export class AuthComponent implements OnInit, OnDestroy {
  subscription:Subscription;
  message:string;

  constructor(
    private userService:UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userService.logout();
    this.route.queryParams
      .subscribe((params: Params) =>{
        if(params['accessDenied']){
          this.message = "Пожалуйста, авторизируйтесь.";
          setTimeout(()=>{
            this.message = null;
          },5000)
        }
      })
  }

  onLogin(form){
    this.subscription = this.userService.login(form.value.username, form.value.password)
      .subscribe((user)=> {
        if(user){
          this.router.navigate(['/admin', 'crew']);
        }else{
          this.message = "Пользователь с таким логином и паролем не найден, попробуйте ещё раз.";
          setTimeout(()=>{
            this.message = null;
          },5000)
        }
      });
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

}
