import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import Validation from 'src/app/core/validators/confirm.pssw.validator';
import { ValidatePassword } from 'src/app/core/validators/validate.password';
import { I18nService } from 'src/app/services/i18n.service';

@Component({
  selector: 'app-password-confirm',
  templateUrl: './password-confirm.component.html',
  styleUrls: ['./password-confirm.component.css']
})
export class PasswordConfirmComponent implements OnInit, OnDestroy {

  hide = true
  show = true
  isAr: boolean = false
  subscribe!: Subscription
  confirmPasswordForm!: FormGroup
  messages =
    {
      password: {
        required: 'PASSWORD_REQUIRED',
        minlength: 'PASSWORD_MIN',
        maxlength: 'PASSWORD_MAX'
      },
      confirmPassword: {
        required: 'CONPASSWORD_REQUIRED',
        match: 'CONPASS_MATCH'
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

    this.confirmPasswordForm = this.fb.group({
      password: ['',
        {
          validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30), ValidatePassword()]
        }],
      confirmPassword: ['',
        {
          validators: [Validators.required]
        }]
    }, { validators: [Validation.match('password', 'confirmPassword')] })
  }
  onSubmit() {
  }

  get password() {
    return this.confirmPasswordForm.get('password');
  }
  get confirmPassword() {
    return this.confirmPasswordForm.get('confirmPassword');
  }
  //*************************************Validation***************************************** */
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
  //submit button validation
  submitDisabledIf() {
    return this.confirmPasswordForm.invalid || this.password?.invalid
  }
  ngOnDestroy() {
    if (this.subscribe)
      this.subscribe.unsubscribe();
  }
}
