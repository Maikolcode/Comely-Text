import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  myContent: any;
  enrichStatus: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleChangeBy(event: any): void {
    if (event.type === 'Enriquecido') this.enrichStatus = event.status;
  }
}
