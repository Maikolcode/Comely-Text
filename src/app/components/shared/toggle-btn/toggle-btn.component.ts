import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-btn',
  templateUrl: './toggle-btn.component.html'
})
export class ToggleBtnComponent implements OnInit {
  @Input() type!: 'Enriquecido' | 'Gramatica';
  @Output() toggle = new EventEmitter<any>();
  toggleStatus: boolean = false;
  descriptions = {
    Enriquecido: 'Activar el texto con estilos',
    Gramatica: 'Activar Grammarly'
  }

  constructor() { }

  ngOnInit(): void {
  }

  handleChangeToggle(type: string): void {
    this.toggle.emit({
      type,
      status: this.toggleStatus
    })
  }
}
