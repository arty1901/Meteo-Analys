import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeteoService } from '../meteo.service';
import { Chart } from '../../../node_modules/chart.js';
import {Observable} from 'rxjs';

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
      this.meteoService.getMonthData().subscribe(next => {
          const monthData = []; // Список месячных данных
          const monthDate = []; // Список данных формата Date
        console.log(this.selectedCity);
          next.forEach(el => {
            if (el.indexVMO === 36096) {
              for (let i = 1; i < 13; i++) {
                monthData.push(el[i]);
              }
            }
          });

          // Создание графика
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
                  data: monthData,
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
                text: this.selectedCity
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
        },
        error1 => {
          console.log(error1);
        });
  }
}
