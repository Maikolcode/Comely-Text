import { Component, OnInit } from '@angular/core';
import { Toggle, ToggleFlags } from 'src/app/models/toggle.model';
import { ToolbarOptions } from 'src/assets/utils/toolbar';
import { StoreService } from '../data/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  toolbar = ToolbarOptions;
  htmlContent: string = '';
  flags: ToggleFlags = {
    enrich: false,
    grammar: false,
  };

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.getFlagsValues();
  }

  toggleChangeBy(event: Toggle): void {
    this.saveToggleValue(event);
  }

  saveToggleValue(event: Toggle): void {
    this.flags[event.type] = event.status;
    this.store.setObjectToStorage(event.type, event.status);
  }

  getFlagsValues(): void {
    this.flags.enrich = this.flagValidationBy('enrich');
    this.flags.grammar = this.flagValidationBy('grammar');
  }

  flagValidationBy(type: string): boolean {
    return this.store.objectExistBy(type) ? this.store.getObjectFromStorage(type) : false;
  }

  textChanged(): void {
    console.log(this.htmlContent);
  }
}
