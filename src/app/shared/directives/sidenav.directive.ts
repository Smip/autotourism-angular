import {Directive, ElementRef, OnInit} from '@angular/core';
import * as M from '../../../../node_modules/materialize-css/dist/js/materialize.js';

@Directive({
  selector: '[autotourismSidenav]'
})
export class SidenavDirective implements OnInit {

  constructor(private element: ElementRef) {}

  ngOnInit(){
    M.Sidenav.init(this.element.nativeElement);
  }

}
