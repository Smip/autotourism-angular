import {Injectable} from '@angular/core';

@Injectable()
export class GlobalsService {
  datepickerOptions = {
    autoClose: true,
    format: 'yyyy-mm-dd',
    setDefaultDate: true,
    firstDay: 1,
    showDaysInNextAndPreviousMonths: true,
    container: 'body',
    i18n: {
      'cancel': 'Отменить',
      'clear': 'Очистить',
      'done': 'Ок',
      'previousMonth': '‹',
      'nextMonth': '›',
      'months': ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      'monthsShort': ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      'weekdays': ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      'weekdaysShort': ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Суб'],
      'weekdaysAbbrev': ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    },
  };

  constructor() {
  }
}

