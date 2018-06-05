import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import * as M from '../../../../node_modules/materialize-css/dist/js/materialize.js';

@Directive({
  selector: '[autotourismParallax]'
})
export class ParallaxDirective implements OnInit {
  @Input('autotourismParallax') autotourismParallax: object;
  options: object;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.options = {
    };
    console.log('autotourismParallax');

    setTimeout(() => {
      this.autotourismParallax = Object.assign(this.options, this.autotourismParallax);
      M.Parallax.init(this.element.nativeElement, this.autotourismParallax);
    }, 0);
  }


}
