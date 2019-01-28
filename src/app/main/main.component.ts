import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MeteoService} from '../meteo.service';
import {Chart} from '../../../node_modules/chart.js';
import {Papa} from 'ngx-papaparse';
import {Plotly} from 'angular-plotly.js/src/app/shared/plotly.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // Инициализация формы
  form = this.fb.group({
    measureType: ['', Validators.required],
    stationPosition: ['', Validators.required],
    serialNumber: ['', Validators.required],
    amkParam: ['', Validators.required],
    timeInterval: ['', Validators.required],
    dateFrom: ['', Validators.required],
    dateTo: ['', Validators.required],
  });

  plotly: any;

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
              private papa: Papa,
              private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  // Получает данные в зависимости от типа выбранных данных и выводит график
  public getData() {

    let horizontalAxe = [];
    let labels = [];

    let requestURL = this.meteoService.makeUrl(
      this.form.value.measureType,
      this.form.value.dateFrom,
      this.form.value.dateTo,
      this.form.value.stationPosition,
      this.form.value.serialNumber,
      this.form.value.timeInterval);

    console.log(requestURL);

    this.papa.parse(requestURL, {
      step: results => {
        horizontalAxe.push(results.data[0][this.form.value.amkParam]);
        labels.push(results.data[0][0]);
      },
      complete: results => {
        console.log(horizontalAxe, labels);
        this.plotly = {
          data: [
            {x: labels, y: horizontalAxe, type: 'scatter', mode: 'lines', marker: {color: 'red'}}
          ],
          layout: {
            width: 1000, height: 600, title: 'test'
          },
          xaxis: {
            visible: true,
            title: {
              text: 'x Axis',
              font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#000'
              }
            },
          },
          yaxis: {
            visible: true,
            title: {
              text: 'Ось ординат',
              font: {
                family: 'Courier New, Times New Roman',
                size: 18,
                color: 'black'
              }
            }
          }
        };
      },
      download: true,
      newline: '',
      delimiter: ';'
    });
  }
}
