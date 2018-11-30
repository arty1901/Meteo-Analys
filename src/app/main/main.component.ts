import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeteoService } from '../meteo.service';
import { Chart } from '../../../node_modules/chart.js';
import { Observable } from 'rxjs';
import { City } from '../interfaces/city';

interface Date {
  year?: number;
  month?: number;
  day?: number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  chart = []; // Переменная будет содержать информацию для графика
  city = []; // Список городов
  selectedCity: number;
  selectedType: string;
  selectedDate = '';
  dataType = [
    {value: 'month', name: 'Месячные'},
    {value: 'day', name: 'Дневные'},
  ];
  public options: Pickadate.DateOptions = {
    clear: 'Clear', // Clear button text
    close: 'Ok',    // Ok button text
    today: 'Today', // Today button text
    closeOnClear: true,
    closeOnSelect: false,
    format: 'dddd, dd mmm, yyyy', // Visible date format (defaulted to formatSubmit if provided otherwise 'd mmmm, yyyy')
    formatSubmit: 'yyyy-mm-dd',   // Return value format (used to set/get value)
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 10,    // Creates a dropdown of 10 years to control year,
  };
  parsedDate: Date;
  constructor(private meteoService: MeteoService) {}

  ngOnInit() {
    this.meteoService.getCity().subscribe(data => {
      this.city = data;
    }, error1 => {
      console.log(error1);
    });
  }
  showDate() {
    this.parsedDate.year = Number(this.selectedDate.split('-')[0]);
    this.parsedDate.month = Number(this.selectedDate.split('-')[0]);
    this.parsedDate.day = Number(this.selectedDate.split('-')[0]);
    console.log(this.parsedDate);
  }
  public getData() {
    if (this.selectedType === 'month') {
      this.meteoService.getMonthData().subscribe(next => {
          const monthData = []; // Список месячных данных
          const monthDate = []; // Список данных формата Date
        const chartLabes = [];
          let result;
          next.forEach(el => {
            if (el.indexVMO === this.selectedCity) {
              for (let i = 1; i < 13; i++) {
                monthData.push(el[i]);
              }
            }
          });
          result = this.city.find(i => i.indexVMO === this.selectedCity);
          // Создание графика
          this.buildChart(monthData, result.city);
        },
        error1 => {
          console.log(error1);
        });
    } else {
      this.meteoService.getDayliData().subscribe(data => {
        const dayliData = []; // Список месячных данных
        const dayliDate = []; // Список данных формата Date
        let result;
        data.forEach(el => {
          if (el.indexVMO === this.selectedCity) {
            dayliData.push(el.maxTemp);
          }
        });
        result = this.city.find(i => i.indexVMO === this.selectedCity);
        this.buildChart(dayliData, result.city);
      }, error1 => {
        console.log(error1);
      });
    }
  }
  public buildChart(data, chartName: string) {
    const labelsNumber = data.length;
    const labelsArray = [];
    for (let i = 0; i < labelsNumber; i++) {
      labelsArray.push(i);
    }
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labelsArray,
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
        title: {
          display: true,
          text: chartName
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
}
