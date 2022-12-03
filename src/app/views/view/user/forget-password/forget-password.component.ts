import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AsyncValidator } from 'src/app/core/validators/async.validator';
import { I18nService } from 'src/app/services/i18n.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  isAr!: boolean
  subscribe!: Subscription
  forgetPasswordForm!: FormGroup
  messages =
    {
      email: {
        required: 'EMAIL_REQUIRED',
        exist: 'EMAIL_EXIST',
        match: 'EMAIL_PATTERN',
        pattern: 'PSSW_PATTERN'
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

    this.forgetPasswordForm = this.fb.group({
      email: ['',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [AsyncValidator('https://jsonplaceholder.typicode.com/users/2', 'email')],
          updateOn: 'blur'
        }
      ],
    })
  }
  onSubmit() {
  }

  get email() {
    return this.forgetPasswordForm.get('email');
  }
  //email validation
  emailExist() {
    return this.email?.errors?.['controlExist'];
  }
  emailRequired() {
    return this.email?.errors?.['required'] && (this.email?.touched || this.email?.dirty);
  }

  //submit button validation
  submitDisabledIf() {
    return this.forgetPasswordForm.invalid || this.email?.pending;
  }
  ngOnDestroy() {
    if (this.subscribe)
      this.subscribe.unsubscribe();
  }

}
