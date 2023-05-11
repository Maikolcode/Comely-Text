import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Toggle, ToggleType } from 'src/app/models/toggle.model';

@Component({
  selector: 'app-toggle-btn',
  templateUrl: './toggle-btn.component.html'
})
export class ToggleBtnComponent {

  @Input() type!: ToggleType;
  @Input() status!: boolean;
  @Output() toggle = new EventEmitter<Toggle>();

  descriptions = {
    enrich: {
      text: 'Activar el texto con estilos',
      name: 'Enriquecido'
    },
    grammar: {
      text: 'Activar Grammarly (Only English Texts)',
      name: 'Grammarly'
    }
  }

  handleChangeToggle(type: ToggleType): void {
    console.log(type);

    this.toggle.emit({
      type,
      status: this.status
    })
  }
}
