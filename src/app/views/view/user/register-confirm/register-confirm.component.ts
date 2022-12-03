import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { I18nService } from 'src/app/services/i18n.service';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.css']
})
export class RegisterConfirmComponent implements OnInit, OnDestroy {
  isAr: boolean = false
  subscribe!: Subscription
  constructor(public translate: TranslateService,
    private tranlateService: I18nService) { }

  ngOnInit(): void {
    this.subscribe = this.tranlateService.localEvent.subscribe((res) => {
      this.translate.use(res);
      (res === 'ar') ? this.isAr = true : this.isAr = false
    })
  }
  ngOnDestroy() {
    if (this.subscribe)
      this.subscribe.unsubscribe();
  }
}
