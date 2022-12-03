import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { I18nService } from 'src/app/services/i18n.service';
// import { AsyncValidator } from 'src/app/validators/async.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isAr: boolean = false
  hide = true
  subscribe!: Subscription
  loginForm!: FormGroup
  messages = {
    username: {
      required: 'USERNAME_REQUIRED',
      exist: 'USERNAME_EXIST'
    },
    password: {
      required: 'PASSWORD_REQUIRED'
    }
  }
  url = 'https://jsonplaceholder.typicode.com/users/1'
  constructor(private fb: FormBuilder, public translate: TranslateService,
    private tranlateService: I18nService) { }

  ngOnInit(): void {
    this.subscribe = this.tranlateService.localEvent.subscribe({
      next: (res) => {
        this.translate.use(res);
        (res === 'ar') ? this.isAr = true : this.isAr = false
      },
      error: err => console.log("something went error :( " + err)
    })

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    })
  }
  get userName() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  //*********************************Validation********************************* */
  userNameRequired() {
    return this.userName?.errors?.['required'] && (this.userName?.touched || this.userName?.dirty);
  }
  //password validation
  passwordRequired() {
    return this.password?.errors?.['required'] && (this.password?.touched || this.password?.dirty);
  }
  //submit button validation
  submitDisabledIf() {
    return this.loginForm.invalid || this.userName?.pending;
  }
  submit() { }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
