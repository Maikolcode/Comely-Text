import { Component, OnInit, ViewChild } from '@angular/core';
import { EditorConfig, GrammarlyEditorPluginElement, init } from '@grammarly/editor-sdk';
import { Toggle, ToggleFlags } from 'src/app/models/toggle.model';
import { ToolbarOptions } from 'src/assets/utils/toolbar';
import { environment } from 'src/environments/environment';
import { StoreService } from '../data/store.service';
import { QuillEditorComponent } from 'ngx-quill';
import { TextUtilities } from 'src/app/models/utils.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  @ViewChild('editor') editor!: QuillEditorComponent;
  toolbar = ToolbarOptions;
  htmlContent: string = '';
  textLength: number = 0;
  grammarlyEditor!: GrammarlyEditorPluginElement;
  flags: ToggleFlags = {
    enrich: false,
    grammar: false,
  };
  textUtilities: TextUtilities = {
    text: '',
    html: ''
  }

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.getFlagsValues();
    if(this.flags.grammar) this.initGrammarly();
  }

  toggleChangeBy(event: Toggle): void {
    this.saveToggleValue(event);
  }

  saveToggleValue(event: Toggle): void {
    this.flags[event.type] = event.status;
    if(event.type === 'grammar') this.flags.grammar ? this.initGrammarly() : this.disconnectGrammarly();
    this.store.setObjectToStorage(event.type, event.status);
  }

  getFlagsValues(): void {
    this.flags.enrich = this.flagValidationBy('enrich');
    this.flags.grammar = this.flagValidationBy('grammar');
  }

  flagValidationBy(type: string): boolean {
    return this.store.objectExistBy(type) ? this.store.getObjectFromStorage(type) : false;
  }

  initGrammarly(): void {
    (async () => {
      const config: EditorConfig = {
        activation: 'immediate',
        autocomplete: 'off',
        toneDetector: 'off',
        introText:
          'Comely helps you write clearly and mistake-free.',
      };

      const Grammarly = await init(environment.grammar_client, config);
      const textArea = document.querySelector('.ql-editor') as HTMLElement;
      this.grammarlyEditor = Grammarly.addPlugin(textArea);
    })();
  }

  disconnectGrammarly(): void {
    this.grammarlyEditor.disconnect();
  }

  getCurrentCharacters(event: any): void {
    if (event.event === 'text-change') {
      if(event.html !== null) {
        let {text, html} = event;
        this.textUtilities = {
          text,
          html
        }
      }

      this.textLength = this.editor.quillEditor.getLength() - 1;
    }
  }

  clearText(): void {
    this.editor.quillEditor.setText('');
  }
}
