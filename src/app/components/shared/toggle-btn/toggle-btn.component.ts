import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-btn',
  templateUrl: './toggle-btn.component.html'
})
export class ToggleBtnComponent {
  @Input() type!: 'Enriquecido' | 'Gramatica';
  @Output() toggle = new EventEmitter<any>();
  toggleStatus: boolean = false;
  descriptions = {
    Enriquecido: 'Activar el texto con estilos',
    Gramatica: 'Activar Grammarly (Only English Texts)'
  }

  handleChangeToggle(type: string): void {
    this.toggle.emit({
      type,
      status: this.toggleStatus
    })
  }
}
