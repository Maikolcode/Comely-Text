import { Component, OnInit } from '@angular/core';
import { EditorConfig, GrammarlyEditorPluginElement, init } from '@grammarly/editor-sdk';
import { Toggle, ToggleFlags } from 'src/app/models/toggle.model';
import { ToolbarOptions } from 'src/assets/utils/toolbar';
import { environment } from 'src/environments/environment';
import { StoreService } from '../data/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  toolbar = ToolbarOptions;
  htmlContent: string = '';
  grammarlyEditor!: GrammarlyEditorPluginElement;
  flags: ToggleFlags = {
    enrich: false,
    grammar: false,
  };

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
        toneDetector: 'on',
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

  textChanged(): void {
    console.log(this.htmlContent);
  }
}
