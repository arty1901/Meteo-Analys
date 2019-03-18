import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MeteoService} from '../meteo.service';
import {Chart} from '../../../node_modules/chart.js';
import {Papa} from 'ngx-papaparse';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  plotly: any;

  // Инициализация формы
  form = this.fb.group({
    measureType: ['', Validators.required],
    stationPosition: ['', Validators.required],
    serialNumber: ['', Validators.required],
    amkParam: ['', Validators.required],
    displayMethod: [''],
    timeInterval: [''],
    dateFrom: ['', Validators.required],
    dateTo: ['', Validators.required],
  });

  measureType = [
    {type: 'amkf', name: 'АМК (мгновенные)'}
  ];
  stationPosition = [
    {number: 1, name: 'Станция 167.4'},
    {number: 2, name: 'Станция 160'},
    {number: 3, name: 'Станция 158.1'},
    {number: 4, name: 'Станция 151'},
    {number: 5, name: 'Станция 105'},
    {number: 6, name: 'Станция 202'},
  ];
  serialNumber = [
    {value: '15407AMK-03'},
    {value: '15408AMK-03'},
    {value: '15409AMK-03'},
  ];

  constructor(public meteoService: MeteoService,
              private papa: Papa,
              private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  public getData() {

    let paramsLength = this.form.value.amkParam.length;
    let labels = [];
    let arr = [];

    let requestURL = this.meteoService.makeUrl(
      this.form.value.measureType,
      this.form.value.dateFrom,
      this.form.value.dateTo,
      this.form.value.stationPosition,
      this.form.value.serialNumber,
      this.form.value.timeInterval);

    if (paramsLength > 1) {

      /**
       * Инициализируем элементы конечного массива
       */
      this.form.value.amkParam.forEach((el, index) => {
        arr[index] = [];
      });

      this.papa.parse(requestURL, {
        download: true,
        newline: '',
        delimiter: ';',
        skipEmptyLines: true,
        step: results => {
          /**
           * В зависимости от колличества выбранных параметров, которые надо выводить,
           * создается ассоциированный массив
           */
          for (let i = 0; i < this.form.value.amkParam.length; i++) {
            arr[i].push(results.data[0][this.form.value.amkParam[i]]);
          }
          labels.push(results.data[0][0]);
        },

        complete: results => {

          // console.log(this.createAxis(this.form.value.amkParam.length));
          this.plotly = {
            data: this.createData(
              arr,
              labels,
              this.form.value.amkParam
            ),
            layout: {
              margin: {
                autoexpand: true
              },
              grid: {
                rows: this.form.value.amkParam.length,
                columns: 1,
                pattern: 'independent',
                roworder: 'bottom to top'
              }
            },
          };
        },
      });

    }
  }

  /**
   * Данный метод создает массив объектов данных для графиков
   *
   * @param data Массив данных по оси У
   * @param label Массив данных по оси Х
   */
  public createData(data: any, label: any, axisLabel: Array<String>): Array<Object> {
    let obj = [];
    let axixCount = 2;

    for (let i = 0; i < data.length; i++) {

      if (i === 0) {

        obj[i] = {
          x: label,
          y: data[i],
          name: this.getPropName(this.meteoService.amkParams, +axisLabel[i]),
          type: 'scatter',
          mode: 'lines',
          marker: {color: this.meteoService.getRandomColor()}
        };
      } else {

        obj[i] = {
          y: data[i],
          name: this.getPropName(this.meteoService.amkParams, +axisLabel[i]),
          type: 'scatter',
          mode: 'lines',
          marker: {color: this.meteoService.getRandomColor()},
          xaxis: 'x' + axixCount,
          yaxis: 'y' + axixCount
        };
        axixCount++;
      }
    }

    return obj;
  }

  /**
   * Вытаскиваем значения свойств из массива this.meteoService.amkParams
   *
   * @param propList Массив объектов свойств
   * @param propNumber Номер необходимого свойства
   */
  public getPropName(propList: Array<Object>, propNumber: any): String {

    let obj = propList.filter(el => {
      return el['id'] === propNumber;
    });

    return obj[0]['paramName'];
  }
}
