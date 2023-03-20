import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle-btn',
  templateUrl: './toggle-btn.component.html'
})
export class ToggleBtnComponent implements OnInit {
  @Input() type!: 'Enriquecido' | 'Gramatica';
  toggleStatus: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  handleChangeToggle(): void {
    console.log(this.toggleStatus)
  }

}
