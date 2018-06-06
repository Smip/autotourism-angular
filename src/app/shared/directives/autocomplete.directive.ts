import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import * as M from '../../../../node_modules/materialize-css/dist/js/materialize.js';


@Directive({
  selector: '[autotourismAutocomplete]'
})
export class AutocompleteDirective implements OnInit {

  @Input('autotourismAutocomplete') autotourismAutocomplete: object;
  options: object;
  instance;


  constructor(
    private element: ElementRef,
    private renderer: Renderer2,

  ) {}

  ngOnInit() {
    this.options = {
      'minLength': 1,
      'data': {},
      'onAutocomplete': (d) => {
         this.element.nativeElement.dispatchEvent(new CustomEvent('input'));
      }
    };
    this.autotourismAutocomplete = Object.assign(this.options, this.autotourismAutocomplete);
    M.Autocomplete.init(this.element.nativeElement, this.autotourismAutocomplete);
    this.instance = M.Autocomplete.getInstance(this.element.nativeElement);
    this.renderer.listen(this.element.nativeElement, 'keyup', (e) => {
      if (e.keyCode !== 13 || e.keyCode !== 38 || e.keyCode !== 40) {
        this.instance.open();
      }
    });
  }

}
