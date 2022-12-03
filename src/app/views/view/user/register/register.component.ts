import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { I18nService } from 'src/app/services/i18n.service';
import { AsyncValidator } from 'src/app/core/validators/async.validator';
import Validation from 'src/app/core/validators/confirm.pssw.validator';
import { ValidatePassword } from 'src/app/core/validators/validate.password';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  hide = true
  show = true
  isAr: boolean = false
  submitted: boolean = false
  // disable: boolean = true
  subscribe!: Subscription
  registerForm!: FormGroup
  messages = {
    username: {
      required: 'USERNAME_REQUIRED',
      exist: 'USERNAME_EXIST',
      minlength: 'USER_MIN',
      maxlength: 'USER_MAX'
    },
    email: {
      required: 'EMAIL_REQUIRED',
      exist: 'EMAIL_EXIST',
      match: 'EMAIL_PATTERN',
      pattern: 'PSSW_PATTERN'
    },
    password: {
      required: 'PASSWORD_REQUIRED',
      minlength: 'PASSWORD_MIN',
      maxlength: 'PASSWORD_MAX'
    },
    confirmPassword: {
      required: 'CONPASSWORD_REQUIRED',
      match: 'CONPASS_MATCH'
    },
    acceptTerms: {
      required: 'TERMS_REQUIRED'
    }
  }
  constructor(private fb: FormBuilder, public translate: TranslateService,
    private tranlateService: I18nService) { }

  ngOnInit(): void {
    // /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    this.subscribe = this.tranlateService.localEvent.subscribe((res) => {
      this.translate.use(res);
      (res === 'ar') ? this.isAr = true : this.isAr = false
    })

    this.registerForm = this.fb.group({
      username: ['',
        {
          validators: [Validators.required, Validators.minLength(6), Validators.maxLength(15)],
          asyncValidators: [AsyncValidator('https://jsonplaceholder.typicode.com/users/2', 'username')],
          updateOn: 'blur'
        }
      ],
      email: ['',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [AsyncValidator('https://jsonplaceholder.typicode.com/users/2', 'email')],
          updateOn: 'blur'
        }
      ],
      password: ['',
        {
          validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30), ValidatePassword()]
        }],
      confirmPassword: ['',
        {
          validators: [Validators.required]
        }],
      acceptTerms: [false, { validators: [Validators.requiredTrue] }]
    }, { validators: [Validation.match('password', 'confirmPassword')] }
    )
  }
  onSubmit() {
    this.submitted = true
    this.registerForm.valid ? console.log(this.registerForm.value) : console.log(this.registerForm.errors)
  }
  get userName() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get acceptTerms() {
    return this.registerForm.get('acceptTerms');
  }
  //*************************************Validation***************************************** */
  //username validation
  userNameExist() {
    return this.userName?.errors?.['controlExist'];
  }
  userNameRequired() {
    return this.userName?.errors?.['required'] && (this.userName?.touched || this.userName?.dirty);
  }
  userNameMinLength() {
    return this.userName?.errors?.['minlength'] && (this.userName?.touched || this.userName?.dirty);
  }
  userNameMaxLength() {
    return this.userName?.errors?.['maxlength'] && (this.userName?.touched || this.userName?.dirty);
  }
  //email validation
  emailExist() {
    return this.email?.errors?.['controlExist'];
  }
  emailRequired() {
    return this.email?.errors?.['required'] && (this.email?.touched || this.email?.dirty);
  }
  //password validation
  passwordRequired() {
    return this.password?.errors?.['required'] && (this.password?.touched || this.password?.dirty);
  }
  passwordMinLength() {
    return this.password?.errors?.['minlength'] && (this.password?.touched || this.password?.dirty);
  }
  passwordMaxLength() {
    return this.password?.errors?.['maxlength'] && (this.password?.touched || this.password?.dirty);
  }
  validPassword() {
    return this.password?.errors?.['validPass'] && (this.password?.touched || this.password?.dirty);
  }
  //password confirmation validation
  confirmPasswordRequired() {
    return this.confirmPassword?.errors?.['required'] && (this.confirmPassword?.touched || this.confirmPassword?.dirty);
  }
  confirmPasswordMatch() {
    return this.confirmPassword?.errors?.['matching'] && (this.confirmPassword?.touched && this.confirmPassword?.dirty);
  }
  //terms acception validation
  acceptTermsRequired() {
    return this.submitted && this.acceptTerms?.errors
  }
  //submit button validation
  submitDisabledIf() {
    return this.registerForm.invalid || this.password?.invalid || this.email?.pending || this.userName?.pending;
  }
  ngOnDestroy() {
    if (this.subscribe)
      this.subscribe.unsubscribe();
  }
}
