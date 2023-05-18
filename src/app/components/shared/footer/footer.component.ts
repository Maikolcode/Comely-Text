import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ToggleFlags } from 'src/app/models/toggle.model';
import { TextUtilities } from 'src/app/models/utils.model';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Input() flags!: ToggleFlags;
  @Input() characters!: number;
  @Input() textUtilities!: TextUtilities;
  @Output() cleanText = new EventEmitter<void>();

  constructor(private snackBar: MatSnackBar) {}

  handleCleanText(): void {
    this.cleanText.emit();
    this.showAlert('Todo limpio! 🔥')
  }

  copyFormat(): void {
    const clipboardItem = new ClipboardItem({
      "text/plain": new Blob(
        [this.textUtilities.html],
        { type: "text/plain" }
      ),
      "text/html": new Blob(
        [this.textUtilities.html],
        { type: "text/html" }
      ),
    });

    navigator.clipboard.write([clipboardItem]).then(() => {
      this.showAlert('Formato copiado 🔥');
    });
  }

  copyText(): void {
    navigator.clipboard.writeText(this.textUtilities.text).then(() => {
      this.showAlert('Copiado en el portapapeles 🔥');
    });
  }

  showAlert(message: string): void {
    if(this.characters !== 0) {
      this.snackBar.openFromComponent(AlertComponent, {
        duration: 3000,
        data: message
      })
    }
  }
}

export class PizzaPartyAnnotatedComponent {
  snackBarRef = inject(MatSnackBarRef);
}
