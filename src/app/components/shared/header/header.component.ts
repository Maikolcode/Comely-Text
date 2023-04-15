import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../data/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  animations: [
    trigger('slideInOut', [
      state('void', style({ height: '0px', opacity: '0', overflow: 'hidden' })),
      state('*', style({ height: '*', opacity: '1', overflow: 'hidden' })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],
})
export class HeaderComponent implements OnInit {

  decrease: boolean = false;

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.decrease = this.headerViewValidation()
  }

  handleChangeView(): void {
    this.decrease = !this.decrease;
    this.store.setObjectToStorage('decrease', this.decrease)
  }

  headerViewValidation(): boolean {
    return this.store.objectExistBy('decrease') ? this.store.getObjectFromStorage('decrease') : false;
  }
}
