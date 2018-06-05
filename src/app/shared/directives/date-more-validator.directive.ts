import {Attribute, Directive, forwardRef, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import * as moment from "moment";

@Directive({
  selector: '[validateDateMore]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateMoreValidator), multi: true }
  ]
})
export class DateMoreValidator implements Validator {
  @Input('validateDateMore') validateDateMore: string;
  constructor(@Attribute('reverse') public reverse: string) {
  }

  private get isReverse() {
    if (!this.reverse) return false;
    return this.reverse === 'true' ? true: false;
  }




  validate(c: AbstractControl): { [key: string]: any } {
    // self value
    let v = c.value;

    let e = c.root.get(this.validateDateMore);

    if (e && moment(v).isBefore(e.value) && !this.isReverse) {
      return {
        validateDateMore: true
      }
    }



    // value equal and reverse
    if (e && e.errors && !moment(v).isAfter(e.value) && this.isReverse) {
      delete e.errors['validateDateMore'];
      if (!Object.keys(e.errors).length) e.setErrors(null);
    }

    // value not equal and reverse
    if (e && moment(v).isAfter(e.value) && this.isReverse) {
      e.setErrors({ 'validateDateMore': true });
    }

    return null;
  }

}



