import { MediaMatcher } from '@angular/cdk/layout'
import { Input, ChangeDetectorRef, Component, OnDestroy, Output, EventEmitter } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnDestroy {
  @Input() links: any[] = []
  opened!: boolean
  @Input('Shopping_Cart') cart!: any[]
  @Input() isClick: boolean = false
  @Input() current!: string
  @Input() isNav!: boolean
  @Output() changeLanguage = new EventEmitter()
  mobileQuery: MediaQueryList

  private _mobileQueryListener: () => void

  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public translate: TranslateService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addEventListener('change', this._mobileQueryListener)
  }
  langChange(event: any) {
    this.changeLanguage.emit(event)
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener)
  }
}
