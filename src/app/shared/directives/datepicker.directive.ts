import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import * as M from '../../../../node_modules/materialize-css/dist/js/materialize.js';
import * as moment from 'moment';

@Directive({
  selector: '[autotourismDatepicker]'
})
export class DatepickerDirective implements OnInit {
  @Input('autotourismDatepicker') autotourismDatepicker: object;
  @Input() ngModel;

  options: object;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.options = {
      'autoClose': true,
      'format': 'yyyy-mm-dd',
      'firstDay': 1,
      'setDefaultDate': true,
      'defaultDate': moment(this.ngModel).toDate(),
      'i18n': {
        'cancel': 'Отменить',
        'clear': 'Очистить',
        'done': 'Ок',
        'previousMonth': '‹',
        'nextMonth': '›',
        'months': ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        'monthsShort': ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        'weekdays': ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        'weekdaysShort': ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Суб'],
        'weekdaysAbbrev': ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
      },
      'onClose': (d) => {
        this.element.nativeElement.dispatchEvent(new CustomEvent('input'));
      }
    };
    if (typeof this.autotourismDatepicker['defaultDate'] === 'string') {
      this.autotourismDatepicker['defaultDate'] = moment(this.autotourismDatepicker['defaultDate']).toDate();
    }
    this.autotourismDatepicker = Object.assign(this.options, this.autotourismDatepicker);
    M.Datepicker.init(this.element.nativeElement, this.autotourismDatepicker);
  }

}
