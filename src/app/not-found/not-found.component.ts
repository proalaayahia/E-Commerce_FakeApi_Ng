import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  constructor(private router: Router, public translate: TranslateService) { }

  ngOnInit(): void {
  }
  goHome() {
    this.router.navigate(['']).then(x => { window.location.reload() });
  }

}
