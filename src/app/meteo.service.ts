import {Injectable, Input} from '@angular/core';
import {Papa} from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  public amkParams = [
    {id: 3, paramName: 'Высота установки от уровня земли'},
    {id: 4, paramName: 'Средняя температура, градусы Цельсия'},
    {id: 5, paramName: 'Средняя скорость горизонтального ветра'},
    {id: 6, paramName: 'Среднне направление гор. ветра, градусы'},
    {id: 7, paramName: 'Мин. скорость мгновенного гор. ветра, м/с'},
    {id: 8, paramName: 'Макс. скорость мгновенного гор. ветра, м/с'},
    {id: 9, paramName: 'Средння скорость верт. ветра, м/с'},
    {id: 10, paramName: 'Атмосферное давлние, мм.рт.ст.'},
    {id: 11, paramName: 'Относительная влажность воздуха, %'},
    {id: 12, paramName: 'Температура точки росы, градусы Цельсия'},
    {id: 13, paramName: 'Упругость (давление) водянного пара, гПа'},
    {id: 14, paramName: 'Абсолютная влажность, г/м^3'},
    {id: 15, paramName: 'Плотность воздуха, кг/м^3'},
    {id: 16, paramName: 'Скорость звука в воздухе, м/с'},
  ];

  public options: Pickadate.DateOptions = {
    clear: 'Clear', // Clear button text
    close: 'Ok',    // Ok button text
    today: 'Today', // Today button text
    closeOnClear: true,
    closeOnSelect: true,
    format: 'dddd, dd mmm, yyyy', // Visible date format (defaulted to formatSubmit if provided otherwise 'd mmmm, yyyy')
    formatSubmit: 'yyyy-mm-dd',   // Return value format (used to set/get value)
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 10,    // Creates a dropdown of 10 years to control year,
  };

  constructor() {}

  public makeUrl (measureType: String, dateFrom: String, dateTo: String, stationPosition: String, serialNumber: String, interval?: String): string {
    if (interval === '') {

      return '/api/t/idd_' + measureType + '/*/tm/' + dateFrom + 'T16:31:00+07/' + dateTo + 'T17:31:00+07?ids_group=' + stationPosition + '&sn=' + serialNumber;
    } else {

      return '/api/tl/' + interval + '/idd_' + measureType + '/*/tm/' + dateFrom + 'T16:31:00+07/' + dateTo + 'T17:31:00+07?ids_group=' + stationPosition + '&sn=' + serialNumber;
    }
  }

  /**
   * Генератор случайного цвета
   */
  public getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
