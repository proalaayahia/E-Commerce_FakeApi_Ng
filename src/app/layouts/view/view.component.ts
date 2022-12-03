import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  isOffline!: boolean
  @HostListener(`window:offline`, [`$event`])
  isWindowOnline(event: any) {
    if (event.type === 'offline')
      this.isOffline = true
  }
  constructor() { }
  ngOnInit(): void {
  }
  refresh() {
    window.location.reload()
  }
}
