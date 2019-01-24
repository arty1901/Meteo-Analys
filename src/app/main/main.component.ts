import {Component, OnInit} from '@angular/core';
import {MeteoService} from '../meteo.service';
import {Chart} from '../../../node_modules/chart.js';
import {Papa} from 'ngx-papaparse';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // лольканые перменные
  chart = []; // Переменная будет содержать информацию для графика
  selectedMeasureType: number; // выбранный тип измерения
  selectedStation: string; // выбранная станция
  selectedSerialNumber: string; // выбранный серийный номер
  dateFrom = '';
  dateTo = '';
  parsedDateFrom: Date;
  parsedDateTo: Date;

  measureType = [
    {type: 'amk', name: 'АМК (мгновенные)'}
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

  constructor(private meteoService: MeteoService,
              private papa: Papa) {
  }

  ngOnInit() {
  }

  // Получает данные в зависимости от типа выбранных данных и выводит график
  public getData() {
    this.parsedDateFrom = new Date(this.dateFrom);
    this.parsedDateTo = new Date(this.dateTo);

    let horizontalAxe = [];
    let labels = [];

    this.papa.parse(this.meteoService.remoteMaskURL, {
      step: results => {
        horizontalAxe.push(results.data[0][4]);
        labels.push(results.data[0][0]);
      },
      complete: results => {
        console.log(horizontalAxe, labels);
        this.buildChart(horizontalAxe, labels);
      },
      download: true,
      newline: '',
      delimiter: ';'
    });
  }

  public buildChart(data, labels) {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Средняя температура воздуха'
            }
          }],
        }
      }
    });
  }
}
