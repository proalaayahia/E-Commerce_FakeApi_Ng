import { Injectable, OnDestroy } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Subject, Subscription } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class I18nService implements OnDestroy {
  /**
   *
   */
  subscribe!: Subscription
  localEvent = new Subject<string>()
  constructor(private translate: TranslateService) { }
  changeLocal(locale: string) {
    this.translate.use(locale)
    this.localEvent.next(locale)
  }
  isCurrentLangAr() {
    let isar: boolean = false
    this.localEvent.subscribe({
      next: (res) => {
        this.translate.use(res);
        (res === 'ar') ? isar = true : isar = false
      },
      error: err => console.log("something went error :( " + err)
    })
    return isar;
  }
  ngOnDestroy(): void {
    if (this.subscribe)
      this.subscribe.unsubscribe
  }
}
