import { Component, OnInit } from '@angular/core';
import { toolbarOptions } from 'src/assets/utils/toolbar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  toolbar = toolbarOptions;
  htmlContent: string = '';
  enrichStatus: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log(this.toolbar);
  }

  toggleChangeBy(event: any): void {
    if (event.type === 'Enriquecido') this.enrichStatus = event.status;
  }

  textChanged(): void {
    console.log(this.htmlContent);
  }
}
