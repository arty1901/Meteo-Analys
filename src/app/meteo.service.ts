import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Papa} from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  public remoteMaskURL = '/api/t/idd_amkf/*/tm/2018-04-10T16:31:00+07/2018-04-10T17:31:00+07?ids_group=1&sn=15409AMK-03';
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

  private options = {
    complete: result => {
      console.log(result);
    },
    newline: '',
    download: true,
    delimiter: ';'
  };

  constructor() {}

  public makeUrl (measureType: String, dateFrom: String, dateTo: String, stationPosition: String, serialNumber: String, interval?: String): string {
    if (interval === '') {

      return '/api/t/idd_' + measureType + '/*/tm/' + dateFrom + 'T16:31:00+07/' + dateTo + 'T17:31:00+07?ids_group=' + stationPosition + '&sn=' + serialNumber;
    } else {

      return '/api/tl/' + interval + '/idd_' + measureType + '/*/tm/' + dateFrom + 'T16:31:00+07/' + dateTo + 'T17:31:00+07?ids_group=' + stationPosition + '&sn=' + serialNumber;
    }
  }
}
