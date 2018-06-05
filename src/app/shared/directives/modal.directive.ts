import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import * as M from '../../../../node_modules/materialize-css/dist/js/materialize.js';

@Directive({
  selector: '[autotourismModal]'
})
export class ModalDirective implements OnInit {
  @Input('autotourismModal') autotourismModal: object;
  options: object;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.options = {};

    setTimeout(() => {
      this.autotourismModal = Object.assign(this.options, this.autotourismModal);
      M.Modal.init(this.element.nativeElement, this.autotourismModal);
      const instance = M.Modal.getInstance(this.element.nativeElement);
      console.log(instance);
    }, 0);
  }

}
