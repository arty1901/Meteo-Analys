import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeteoService } from '../meteo.service';
import { Chart } from '../../../node_modules/chart.js';
import { Observable } from 'rxjs';
import { City } from '../interfaces/city';

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
  dataType = [
    {value: 'month', name: 'Месячные'},
    {value: 'day', name: 'Дневные'},
  ];
  constructor(private meteoService: MeteoService) {}

  ngOnInit() {
    this.meteoService.getCity().subscribe(data => {
      this.city = data;
    }, error1 => {
      console.log(error1);
    });
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
      this.meteoService.getDayliData().subscribe(data => {});
    }
}
  public buildChart(data, chartName: string) {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [
          'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
          'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
          'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ],
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
