import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import * as M from '../../../../node_modules/materialize-css/dist/js/materialize.js';


@Directive({
  selector: '[autotourismDropdown]'
})
export class DropdownDirective implements OnInit{
  @Input('autotourismDropdown') autotourismDropdown: object;
  options: object;

  constructor(private element: ElementRef) {}

  ngOnInit(){
    this.options = {
      'constrainWidth':false
    };
    setTimeout(()=>{
      this.autotourismDropdown = Object.assign(this.options, this.autotourismDropdown);
      M.Dropdown.init(this.element.nativeElement, this.autotourismDropdown);
    },0);
  }
}
