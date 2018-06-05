import {Directive, ElementRef, OnInit} from '@angular/core';
import * as M from '../../../../node_modules/materialize-css/dist/js/materialize.js';

@Directive({
  selector: '[autotourismTabs]'
})
export class TabsDirective implements OnInit {

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    M.Tabs.init(this.element.nativeElement);
  }

}
