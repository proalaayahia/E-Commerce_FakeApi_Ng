import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  event: string = "all"
  @Input('isAll') isAllOption = true
  @Input() data$: Observable<string[]> = null!;
  @Output() filterVal = new EventEmitter()
  constructor() { }

  filteration() {
    this.filterVal.emit(this.event)
  }
}
